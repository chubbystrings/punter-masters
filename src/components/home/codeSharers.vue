<template>
  <v-card
    max-width="400"
    class="mx-auto"
    rounded
    outlined
    height="430"
    :loading="loading"
    flat
  >

    <v-list three-line subheader>
       <v-subheader class="accent">Code Sharers Today</v-subheader>
      <template v-for="(item, index) in codes">

        <v-divider inset :key="index" v-if="index > 0"></v-divider>

        <v-list-item
          :key="item.id"
        >
          <v-list-item-avatar>
            <v-img
            @click="openProfile(item.userId)"
             class="hoverImg" :src="item.userAvatar"></v-img>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title >
              I shared {{ item.forum}} code!!
              </v-list-item-title>
            <v-list-item-subtitle >
              {{ item.code.toUpperCase()}}
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </template>
    </v-list>
  </v-card>
</template>

<script>
import { codesCollection } from '../../firebase';

export default {
  data: () => ({
    loading: false,
    codes: [],
  }),
  async created() {
    this.loading = true;
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);
    const endOfToday = new Date();
    endOfToday.setHours(23, 59, 59, 999);

    try {
      const querySnapShot = codesCollection.where('createdOn', '>=', startOfToday).where('createdOn', '<=', endOfToday).orderBy('createdOn', 'desc').limit(4);
      const docRef = await querySnapShot.get();
      docRef.forEach((doc) => {
        this.codes.push({
          ...doc.data(),
          id: doc.id,
        });
      });
      this.loading = false;
    } catch (error) {
      this.$store.commit('SET_ALERT', {
        alert: true,
        type: 'error',
        message: 'Opps something went wrong',
      });
      this.loading = false;
    }
  },
  methods: {
    openProfile(id) {
      this.$router.push({ name: 'Profile', params: { id } });
    },
  },
};
</script>
<style scoped>
.v-card {
  border: 1px solid #a38d65;
}
.hoverImg:hover {
  cursor: pointer;
}
</style>
