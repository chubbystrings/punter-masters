<template>
  <div
  class="divBorder mb-1"
  >
  <base-back  v-if="paginatedSharedCodes.length > 0" />
    <transition-group
    mode="out-in"
    enter-active-class="animated fadeIn"
    leave-active-class="animated fadeOut"
    >
    <v-timeline key="timeline" dense v-if="paginatedSharedCodes.length > 0"
      class="pa-0"
    >
      <v-timeline-item
      fill-dot
        v-for="(code, i) in paginatedSharedCodes"
        :key="code.id"
        :color="`#${Math.floor(Math.random() * 16777215).toString(16)}`"
        class="pa-0 mt-2 mb-2 "
        small
      >

        <v-card class="mx-n5"
        rounded
        max-height="200"
         flat
         :key="i"
         color="secondary"
         shaped
         style="width: 95vw;"
         >
          <v-card-title class="pa-0 pl-2">
            <v-btn
            class="pa-0"
             text
              @click="openUser(code)">{{code.sharerName }}</v-btn>
            <small class="caption pl-1 text-color"  style="color: blue;">
              shared {{ code.createdOn | formatDate}}
            </small>
            </v-card-title>
          <v-card-text class="pa-0 pl-2 font-weight-bold">
            {{code.code | upperCase }}
            <small>({{ code.forum }})</small>
          </v-card-text>
          <v-card-actions class="pa-0 pr-2">
            <v-btn
              @click.stop="rateCodeSelected(code, i)"
              text
              small
              class="caption"
              color="primary"
            >
             rate code
            </v-btn>
            <v-spacer></v-spacer>
             <v-rating
                :value="code.averageRatings"
                background-color="primary"
                color="yellow"
                small
                dense
                class="mr-2"
                readonly
                half-increments
              ></v-rating>
              <span class="mr-1 hidden-sm-and-down">
                <v-btn
                icon
                @click.prevent="thumbsUp(code, i)"
                >
                  <v-icon
                  class="mr-1"
                  >mdi-thumb-up-outline
                  </v-icon>
                </v-btn>
                {{ code.thumbsUp}}
              </span>
              <span class="mr-1 hidden-sm-and-down">
                <v-btn
                 icon
                @click.prevent="thumbsDown(code, i)"
                >
                  <v-icon
                  class="mr-1"
                  >mdi-thumb-down-outline
                  </v-icon>
                </v-btn>
                {{ code.thumbsDown }}
              </span>
          </v-card-actions>
          <span class="mr-1 hidden-md-and-up">
            <v-btn
            @click.prevent="thumbsUp(code, i)"
             icon
             >
            <v-icon
            class="ml-2"
            >mdi-thumb-up-outline
            </v-icon>
            </v-btn>
            {{ code.thumbsUp }}
          </span>
          <span class="ml-2 hidden-md-and-up">
            <v-btn
            icon
            @click="thumbsDown(code, i)"
            >
            <v-icon
            class="mr-1"
            >mdi-thumb-down-outline
            </v-icon>
            </v-btn>
            {{code.thumbsDown}}
          </span>
        </v-card>
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
  <v-card
    class="elevation-16 mx-auto"
    width="300"
  >
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
      <v-btn
      @click="cancel"
       text
       >No Thanks
       </v-btn>
      <v-btn
        color="primary"
        text
        @click="ok"
      >
        Rate Now
      </v-btn>
    </v-card-actions>
  </v-card>
  </v-dialog>
  </v-row>
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
  }),

  computed: {
    ...mapState(['sharedCodes', 'userProfile']),

    pages() {
      return (
        this.codes.length > 5
          ? Math.ceil(this.codes.length / 5) : 1);
    },

    paginatedSharedCodes() {
      const start = (this.page - 1) * 5;
      const stop = this.page * 5;

      return this.codes ? this.codes.slice(start, stop) : '';
    },
  },

  filters: {
    formatDate(val) {
      if (!val) { return '-'; }
      if (val.seconds) {
        return moment(Date.parse(val.toDate())).fromNow();
      }
      return moment(Date.parse(val)).fromNow();
    },
    trimLength(val) {
      if (val.length < 200) { return val; }
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
      this.$store.commit('OVERLAY_ON');
      const docRef = await codesCollection.orderBy('createdOn', 'desc').get();
      docRef.forEach((doc) => {
        this.codes.push({
          ...doc.data(),
          id: doc.id,
          avatar: 'https://cdn.vuetifyjs.com/images/lists/4.jpg',
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
      console.log(error);
      this.$store.commit('OVERLAY_OFF');
    }
  },

  methods: {
    async ok() {
      console.log(this.selectedCodeInfo);
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
        }
      } catch (error) {
        console.log(error);
        this.ratingDialog = false;
      }
    },
    rateCodeSelected(code, i) {
      this.selectedCodeInfo = {
        index: i,
        ...code,
      };
      this.ratingDialog = !this.ratingDialog;
    },

    cancel() {
      this.ratingDialog = false;
    },

    async thumbsUp(code, index) {
      try {
        const docRef = await codesCollection.doc(code.id).get();
        await codesCollection.doc(code.id).update({
          thumbsUp: docRef.data().thumbsUp + 1,
        });
        this.codes[index].thumbsUp += 1;
      } catch (error) {
        console.log(error);
      }
    },

    async thumbsDown(code, index) {
      try {
        const docRef = await codesCollection.doc(code.id).get();
        await codesCollection.doc(code.id).update({
          thumbsDown: docRef.data().thumbsDown + 1,
        });
        this.codes[index].thumbsDown += 1;
      } catch (error) {
        console.log(error);
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
.v-pagination__item, .v-pagination__navigation {
  outline: none !important;
}
div {
  transition: all .3s ease-out;
}
</style>
