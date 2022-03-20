<template>
  <v-card
    max-width="400"
    class="mx-auto"
    height="430"
    rounded
    :loading="loading"
    elevation="8"
  >
    <v-list subheader three-line>
      <v-subheader class="primary accent--text">Top Code Sharers</v-subheader>

      <v-list-item
        v-for="item in users"
        :key="item.id"
      >
        <v-list-item-avatar>
          <v-img :src="item.avatar"></v-img>
        </v-list-item-avatar>

        <v-list-item-content >
              <v-list-item-title class="pa-0">
              <v-btn
              class="pa-0 text-lowercase"
               @click="toProfile(item.id)" text>
               {{ item.displayName ? '@' + item.displayName : item.name }}
               </v-btn>
            </v-list-item-title>
          <v-list-item-subtitle >
              has shared {{ item.codeShared}} times
            </v-list-item-subtitle>
        </v-list-item-content>

        <v-list-item-icon>
          <v-icon :color="'deep-purple accent-4'">mdi-fire</v-icon>
        </v-list-item-icon>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script>
import { usersCollection } from '../../firebase';

export default {
  data: () => ({
    users: [],
    loading: false,
    items2: [
      { title: 'Travis Howard', avatar: 'https://cdn.vuetifyjs.com/images/lists/5.jpg' },
    ],
  }),

  async created() {
    // const compareCodeShared = (a, b) => {
    //   let comparism = 0;
    //   if (a.codeShared > b.codeShared) {
    //     comparism = 1;
    //   } else if (a.codeShared < b.codeShared) {
    //     comparism = 0;
    //   }

    //   return comparism * -1;
    // };
    this.loading = true;
    try {
      const snapShot = usersCollection.where('codeShared', '>', 0).orderBy('codeShared', 'desc').limit(4);
      const docRef = await snapShot.get();
      docRef.forEach((doc) => {
        this.users.push({
          name: `${doc.data().firstname} ${doc.data().lastname}`,
          codeShared: doc.data().codeShared,
          displayName: doc.data().displayName,
          id: doc.id,
          avatar: doc.data().photoURL,
        });
      });

      //   if (this.codes.length > 0) {
      //     this.codes = this.codes.sort(compareCodeShared);
      //     if (this.codes.length > 4) {
      //       this.codes = this.codes.slice(0, 5);
      //     }
      //   }

      this.loading = false;
    } catch (error) {
      this.$store.commit('SET_ALERT', {
        alert: true,
        type: 'error',
        message: 'Opps something went wrong',
      });
      this.loading = false;
      console.log(error);
    }
  },

  methods: {
    toProfile(id) {
      this.$router.push({ name: 'Profile', params: { id } });
    },
  },
};
</script>
<style scoped>
</style>
