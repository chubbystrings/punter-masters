<template>
  <div :class="paginatedSharedCodes.length > 0 ? '' : ''" class="timeline-wrapper">
    <base-back v-if="paginatedSharedCodes.length > 0" />
    <transition-group
      mode="out-in"
      enter-active-class="animated fadeIn"
      leave-active-class="animated fadeOut"
    >
      <v-timeline key="timeline" dense v-if="paginatedSharedCodes.length > 0" class="pa-0">
        <v-timeline-item
          fill-dot
          v-for="(code, i) in paginatedSharedCodes"
          :key="code.id"
          class="pa-0 mb-2 "
          small
        >

          <template v-slot:icon>
              <router-link :to="{ name: 'Profile', params: { id: code.userId} }">
            <v-avatar size="30">
                <img :src="code.userAvatar ? code.userAvatar : 'primary'" />
            </v-avatar>
              </router-link>
          </template>
          <v-hover v-slot="{ hover }" open-delay="200">
            <v-card
              class="mx-n5 code-card"
              rounded
              max-height="200"
              flat
              :key="i"
              color="#fff"
              shaped
              :elevation="hover ? 4 : 0"
            >
              <v-card-title class="pa-0 pl-2">
                <v-btn class="pa-0" text @click="openUser(code)">{{ code.sharerName }}</v-btn>
                <small class="caption pl-1 text-color" style="color: blue;">
                  shared {{ code.createdOn | formatDate }}
                </small>
              </v-card-title>
              <v-card-text class="pa-0 pl-2 font-weight-bold">
                {{ code.code | upperCase }}
                <small>({{ code.forum }})</small>
              </v-card-text>
              <v-card-actions class="pa-0 pr-2">
                <v-btn
                  @click.stop="rateCodeSelected(code, i)"
                  text
                  x-small
                  class="caption"
                  color="primary"
                  :disabled="code.userId === userProfile.userId"
                >
                  rate code
                </v-btn>
                <v-btn
                  v-if="code.userId === userProfile.userId"
                  @click.stop="codeToDelete(code, i)"
                  text
                  small
                  class="caption text-lowercase delete-btn"
                  color="primary"
                >
                  Delete
                </v-btn>
                <v-spacer></v-spacer>
                <v-rating
                  :value="code.averageRatings"
                  background-color="primary"
                  color="yellow"
                  x-small
                  dense
                  class="mr-2"
                  readonly
                  half-increments
                ></v-rating>
                <span class="mr-1 hidden-sm-and-down">
                  <v-btn
                    :disabled="code.userId === userProfile.userId"
                    icon
                    small
                    @click.prevent="thumbsUp(code, i)"
                  >
                    <v-icon small class="mr-1">mdi-thumb-up-outline </v-icon>
                  </v-btn>
                  {{ code.thumbsUp }}
                </span>
                <span class="mr-1 hidden-sm-and-down">
                  <v-btn
                    :disabled="code.userId === userProfile.userId"
                    icon
                    small
                    @click.prevent="thumbsDown(code, i)"
                  >
                    <v-icon small class="mr-1">mdi-thumb-down-outline </v-icon>
                  </v-btn>
                  {{ code.thumbsDown }}
                </span>
              </v-card-actions>
              <span class="mr-1 hidden-md-and-up">
                <v-btn
                  :disabled="code.userId === userProfile.userId"
                  @click.prevent="thumbsUp(code, i)"
                  icon
                >
                  <v-icon class="ml-2">mdi-thumb-up-outline </v-icon>
                </v-btn>
                {{ code.thumbsUp }}
              </span>
              <span class="ml-2 hidden-md-and-up">
                <v-btn
                  :disabled="code.userId === userProfile.userId"
                  icon
                  @click="thumbsDown(code, i)"
                >
                  <v-icon class="mr-1">mdi-thumb-down-outline </v-icon>
                </v-btn>
                {{ code.thumbsDown }}
              </span>
            </v-card>
          </v-hover>
        </v-timeline-item>
      </v-timeline>
      <v-pagination
        v-if="codes.length > 0"
        key="pagination"
        v-model="page"
        :length="pages"
        circle
        class="pagination--view "
      ></v-pagination>
    </transition-group>
    <v-row justify="center">
      <v-dialog v-model="ratingDialog" persistent max-width="290">
        <v-card class="elevation-16 mx-auto" width="300">
          <v-card-title class="headline">
            Rate This code
          </v-card-title>
          <v-card-text>
            How did this code perform?
            <div class="text-center mt-12">
              <v-rating
                v-model="rating"
                color="yellow darken-3"
                background-color="grey darken-1"
                empty-icon="$ratingFull"
                half-increments
                hover
              ></v-rating>
            </div>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions class="justify-space-between">
            <v-btn @click="cancel" text>No Thanks </v-btn>
            <v-btn color="primary" text @click="ok">
              Rate Now
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
    <p v-if="paginatedSharedCodes.length <= 0" class="display-1 no-codes">
      No codes yet
    </p>
    <base-dialog @delete="deleteCode" />
  </div>
</template>
<script>
// eslint-disable-next-line no-unused-vars
import moment from 'moment';
import { mapState } from 'vuex';
import { codesCollection } from '../firebase';

export default {
  data: () => ({
    reverse: true,
    fullPost: {},
    page: 1,
    codes: [],
    rate: false,
    rating: 0,
    ratingDialog: false,
    selectedCodeInfo: {},
    selectedCodeToDelete: {},
  }),
  computed: {
    ...mapState(['sharedCodes', 'userProfile']),
    pages() {
      return this.codes.length > 5 ? Math.ceil(this.codes.length / 5) : 1;
    },
    paginatedSharedCodes() {
      const start = (this.page - 1) * 5;
      const stop = this.page * 5;
      return this.codes ? this.codes.slice(start, stop) : '';
    },
  },
  filters: {
    formatDate(val) {
      if (!val) {
        return '-';
      }
      if (val.seconds) {
        return moment(Date.parse(val.toDate())).fromNow();
      }
      return moment(Date.parse(val)).fromNow();
    },
    trimLength(val) {
      if (val.length < 200) {
        return val;
      }
      return `${val.substring(0, 200)}...`;
    },
    lowerCase(val) {
      return val.toLowerCase();
    },
    upperCase(val) {
      return val.toUpperCase();
    },
  },
  async created() {
    try {
      this.$store.commit('OVERLAY_ON', '');
      const docRef = await codesCollection.orderBy('createdOn', 'desc').get();
      docRef.forEach((doc) => {
        this.codes.push({
          ...doc.data(),
          id: doc.id,
          averageRatings: Number((doc.data().ratings / doc.data().userRated).toFixed(1)),
        });
      });
      this.$store.commit('OVERLAY_OFF');
    } catch (error) {
      this.$store.commit('SET_ALERT', {
        alert: true,
        type: 'error',
        message: 'Opps something went wrong',
      });
      this.$store.commit('OVERLAY_OFF');
    }
  },
  methods: {
    async ok() {
      try {
        const ratingsRef = await codesCollection.doc(this.selectedCodeInfo.id).get();
        if (ratingsRef.exists) {
          const docRef = await codesCollection.doc(this.selectedCodeInfo.id).get();
          await codesCollection.doc(this.selectedCodeInfo.id).update({
            ratings: docRef.data().ratings + this.rating,
            userRated: docRef.data().userRated + 1,
          });
          const codeIndex = this.selectedCodeInfo.index;
          this.codes[codeIndex].ratings += this.rating;
          this.codes[codeIndex].userRated += 1;
          // eslint-disable-next-line max-len
          this.codes[codeIndex].averageRatings = this.codes[codeIndex].ratings / this.codes[codeIndex].userRated;
          this.$store.commit('SET_ALERT', {
            alert: true,
            type: 'success',
            message: 'Thanks for rating!!!',
          });
          this.ratingDialog = false;
          this.$store.dispatch('updateRatings', this.selectedCodeInfo.userId);
        } else {
          this.$store.commit('SET_ALERT', {
            alert: true,
            type: 'error',
            message: 'Oops seems code has been deleted',
          });
          this.ratingDialog = false;
        }
      } catch (error) {
        this.ratingDialog = false;
        this.$store.commit('SET_ALERT', {
          alert: true,
          type: 'error',
          message: 'Oops an Error occurred',
        });
      }
    },
    rateCodeSelected(code, i) {
      this.selectedCodeInfo = {
        index: i,
        ...code,
      };
      this.ratingDialog = !this.ratingDialog;
    },
    codeToDelete(code, i) {
      this.selectedCodeToDelete = {
        index: i,
        ...code,
      };
      this.$store.commit('OPEN_ACTION_DIALOG', {
        type: 'Delete',
        message: 'Are you sure you want to delete code ?',
      });
    },
    deleteCode() {
      this.$store.dispatch('DeleteCode', this.selectedCodeToDelete.id);
      const { index } = this.selectedCodeToDelete;
      this.codes.splice(index, 1);
    },
    cancel() {
      this.ratingDialog = false;
    },
    async thumbsUp(code, index) {
      try {
        const docRef = await codesCollection.doc(code.id).get();
        if (docRef.exists) {
          await codesCollection.doc(code.id).update({
            thumbsUp: docRef.data().thumbsUp + 1,
          });
          this.codes[index].thumbsUp += 1;
        } else {
          this.$store.commit('SET_ALERT', {
            alert: true,
            type: 'error',
            message: 'Oops seems code has been deleted',
          });
        }
      } catch (error) {
        this.$store.commit('SET_ALERT', {
          alert: true,
          type: 'error',
          message: 'Oops an Error occurred',
        });
      }
    },
    async thumbsDown(code, index) {
      try {
        const docRef = await codesCollection.doc(code.id).get();
        if (docRef.exists) {
          await codesCollection.doc(code.id).update({
            thumbsDown: docRef.data().thumbsDown + 1,
          });
          this.codes[index].thumbsDown += 1;
        } else {
          this.$store.commit('SET_ALERT', {
            alert: true,
            type: 'error',
            message: 'Oops seems code has been deleted',
          });
        }
      } catch (error) {
        this.$store.commit('SET_ALERT', {
          alert: true,
          type: 'error',
          message: 'Oops an Error occurred',
        });
      }
    },
    openUser(user) {
      this.$router.push({ name: 'Profile', params: { id: user.userId } });
    },
  },
};
</script>
<style scoped>
@import "https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.2/animate.min.css";
.v-pagination__item,
.v-pagination__navigation {
  outline: none !important;
}
.timeline-wrapper {
  box-sizing: border-box;
  padding-bottom: 50px;
}
.code-card {
  position: relative;
}
div {
  transition: all 0.3s ease-out;
}

.delete-btn {
  position: absolute;
  bottom: 2px;
  right: 10px;
}
.no-codes {
  position: absolute;
  left: 50%;
  top: 20%;
  transform: translateX(-50%);
}
@media screen and (min-width: 958px) {
  .delete-btn {
    position: absolute;
    top: 2px;
    right: 10px;
  }
}
@media screen and (max-width: 375px) {
  .timeline-wrapper *,
  button {
    font-size: 10px !important;
  }
}
</style>
