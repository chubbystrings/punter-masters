<template>
  <div class="">
    <base-back v-if="userProfile" />
    <base-reset />
    <v-card class="mx-auto pa-3" color="transparent" outlined flat>
      <h3 class="primary--text">User Settings</h3>
      <v-container fluid>
        <v-row>
          <v-col cols="12">
            <v-row>
              <v-col cols="12" class="">
                <v-card style="width: 95vw;" class="" color="transparent" flat>
                  <small>
                    current Username :
                    <span class="primary--text"
                      >{{ userProfile.displayName ? "@" + userProfile.displayName : "None" }}
                    </span> </small
                  ><br />
                  <small
                    :class="isTaken || loading || username.length < 4 ? 'redColor' : 'greenColor'"
                  >
                    {{ checking }}
                  </small>
                  <v-text-field
                    @input="checkUsername"
                    v-model="username"
                    dense
                    filled
                    label="username"
                    prepend-icon="@"
                  ></v-text-field>
                  <v-btn
                    small
                    depressed
                    class="accent--text"
                    color="primary"
                    :disabled="
                      username.length < 4 ||
                        !username ||
                        displayName ||
                        isTaken ||
                        loading === 'loading'
                    "
                    @click.prevent="changeUsername"
                  >
                    {{ userProfile.displayName ? "Change" : "Add" }}
                  </v-btn>
                </v-card>
              </v-col>
              <v-col cols="12">
                <p>Change Password</p>
                  <v-btn @click="resetOpen"
                  depressed color="primary" class="accent--text" small>
                  Reset Password
                  </v-btn>
              </v-col>
              <v-col cols="12">
                <v-card class="" color="transparent" flat>
                  <p class="primary--text">Select Avatar</p>
                  <v-container fluid>
                    <v-row dense>
                      <v-col>
                        <v-card flat :loading="avatarLoad" color="transparent">
                          <v-avatar class="mb-2 mr-3"
                          size="24"
                          v-for="(avatar, i) in avatars" :key="i">
                            <v-img
                              @load="onload"
                              class="hoverImg"
                              @click="confirm(avatar)"
                              :src="avatar"
                            >
                            </v-img>
                          </v-avatar>
                        </v-card>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
    <base-dialog @delete="select" />
  </div>
</template>
<script>
import { mapState } from 'vuex';
import { usersCollection } from '../firebase';

export default {
  data: () => ({
    loading: '',
    avatarLoad: true,
    isTaken: true,
    username: '',
    displayName: false,
    avatars: [
      'https://avataaars.io/?avatarStyle=Circle&topType=LongHairStraight&accessoriesType=Blank&hairColor=BrownDark&facialHairType=Blank&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=Light',
      'https://avataaars.io/?avatarStyle=Circle&topType=LongHairFrida&accessoriesType=Kurt&hairColor=Red&facialHairType=BeardLight&facialHairColor=BrownDark&clotheType=GraphicShirt&clotheColor=Gray01&graphicType=Skull&eyeType=Wink&eyebrowType=RaisedExcitedNatural&mouthType=Disbelief&skinColor=Brown',
      'https://avataaars.io/?avatarStyle=Circle&topType=LongHairMiaWallace&accessoriesType=Sunglasses&hairColor=BlondeGolden&facialHairType=Blank&clotheType=BlazerSweater&eyeType=Surprised&eyebrowType=RaisedExcited&mouthType=Smile&skinColor=Pale',
      'https://avataaars.io/?avatarStyle=Circle&topType=ShortHairFrizzle&accessoriesType=Prescription02&hairColor=Black&facialHairType=MoustacheMagnum&facialHairColor=BrownDark&clotheType=BlazerSweater&clotheColor=Black&eyeType=Default&eyebrowType=FlatNatural&mouthType=Default&skinColor=Tanned',
      'https://avataaars.io/?hairColor=BrownDark&clotheType=Hoodie&avatarStyle=Circle',
      'https://avataaars.io/?accessoriesType=Prescription01&avatarStyle=Circle&clotheType=Hoodie&eyeType=EyeRoll&eyebrowType=UnibrowNatural&facialHairType=BeardLight&hairColor=Black&mouthType=Eating&skinColor=Yellow&topType=LongHairShavedSides',
      'https://avataaars.io/?accessoriesType=Blank&avatarStyle=Circle&clotheColor=Black&clotheType=GraphicShirt&eyeTyp',
      'https://avataaars.io/?accessoriesType=Prescription02&avatarStyle=Circle&clotheColor=Gray02&clotheType=BlazerShirt&eyeType=Hearts&eyebrowType=DefaultNatural&facialHairColor=Blonde&facialHairType=Blank&hatColor=Blue03&mouthType=Smile&skinColor=Yellow&topType=ShortHairShaggyMullet',
      'https://avataaars.io/?accessoriesType=Prescription01&avatarStyle=Circle&clotheColor=Red&clotheType=GraphicShirt&eyeType=Default&eyebrowType=UnibrowNatural&facialHairColor=Auburn&facialHairType=Blank&hairColor=Brown&hatColor=PastelRed&mouthType=Concerned&skinColor=DarkBrown&topType=ShortHairSides',
      'https://avataaars.io/?accessoriesType=Kurt&avatarStyle=Circle&clotheColor=Pink&clotheType=ShirtCrewNeck&eyeType=Side&eyebrowType=SadConcerned&facialHairColor=Black&facialHairType=MoustacheFancy&graphicType=Diamond&hairColor=Brown&hatColor=PastelRed&mouthType=Sad&skinColor=Tanned&topType=LongHairFro',
      'https://avataaars.io/?accessoriesType=Wayfarers&avatarStyle=Circle&clotheColor=Blue01&clotheType=Hoodie&eyeType=Cry&eyebrowType=DefaultNatural&facialHairColor=BrownDark&facialHairType=BeardMedium&graphicType=Cumbia&hairColor=SilverGray&hatColor=PastelYellow&mouthType=Default&skinColor=Tanned&topType=ShortHairTheCaesar',
      'https://avataaars.io/?accessoriesType=Prescription01&avatarStyle=Circle&clotheColor=PastelRed&clotheType=Hoodie&eyeType=EyeRoll&eyebrowType=UpDown&facialHairColor=BrownDark&facialHairType=BeardMagestic&graphicType=Bat&hairColor=BlondeGolden&hatColor=Gray02&mouthType=Smile&skinColor=DarkBrown&topType=ShortHairTheCaesar',
      'https://avataaars.io/?accessoriesType=Wayfarers&avatarStyle=Circle&clotheColor=PastelGreen&clotheType=BlazerShirt&eyeType=Side&eyebrowType=FlatNatural&facialHairColor=Red&facialHairType=BeardLight&graphicType=Bat&hairColor=Brown&hatColor=Red&mouthType=Twinkle&skinColor=Tanned&topType=Hat',
      'https://avataaars.io/?accessoriesType=Prescription01&avatarStyle=Circle&clotheColor=Gray01&clotheType=Hoodie&eyeType=Squint&eyebrowType=AngryNatural&facialHairColor=Red&facialHairType=BeardMagestic&graphicType=Selena&hairColor=Black&hatColor=PastelBlue&mouthType=Concerned&skinColor=Yellow&topType=ShortHairShortRound',
      'https://avataaars.io/?accessoriesType=Blank&avatarStyle=Circle&clotheColor=Blue01&clotheType=CollarSweater&eyeType=Happy&eyebrowType=RaisedExcited&facialHairColor=Blonde&facialHairType=MoustacheFancy&graphicType=Bear&hairColor=BrownDark&hatColor=PastelBlue&mouthType=ScreamOpen&skinColor=Pale&topType=ShortHairDreads01',
    ],
    selectedAvatar: '',
  }),
  computed: {
    ...mapState(['userProfile']),

    checking() {
      if (this.username && this.username.length < 4) {
        return 'username too short';
      }
      if (this.username && this.displayName && this.loading === '') {
        return `@${this.username} already exists`;
      }
      if (this.username && this.loading === 'loading') {
        return 'please wait....';
      }
      if (this.username && !this.displayName && this.loading === '') {
        return `@${this.username} is available`;
      }

      return '';
    },
  },

  methods: {
    resetOpen() {
      this.$store.commit('OPEN_RESET_PASS');
    },

    changeUsername() {
      this.$store.dispatch('changeUsername', this.username);
      this.username = '';
    },

    confirm(avatar) {
      this.selectedAvatar = avatar;
      this.$store.commit('OPEN_ACTION_DIALOG', {
        type: 'Change Avatar',
        message: 'Are you sure you want to Change Avatar ?',
      });
    },
    onload() {
      this.avatarLoad = false;
    },
    async checkUsername() {
      this.loading = 'loading';
      const doc = await usersCollection.where('displayName', '==', this.username).get();
      if (doc.size > 0) {
        this.displayName = true;
        this.isTaken = true;
        this.loading = '';
      } else {
        this.displayName = false;
        this.isTaken = false;
        this.loading = '';
      }
    },
    select() {
      this.$store.dispatch('updateAvatar', this.selectedAvatar);
      this.selectedAvatar = '';
      this.$store.commit('CLOSE_ACTION_DIALOG');
    },
  },
};
</script>
<style scoped>
.hoverImg:hover {
  cursor: pointer;
  -webkit-filter: blur(3px);
  filter: blur(3px);
}
.redColor {
  color: red;
}
.greenColor {
  color: green;
}
</style>
