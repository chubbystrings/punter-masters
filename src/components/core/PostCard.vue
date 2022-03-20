<template>
  <v-hover v-slot="{ hover }">
    <v-card :elevation="hover ? 4 : 0"
    @click="openPost(item.id, item.forum)"
     class="mx-auto post-card" width="250" height="270">
      <v-list-item three-line>
        <v-list-item-content>
          <small class="primary--text small--text">
            {{ item.name }} {{ item.createdOn | formatDate }}
          </small>
          <v-list-item-title class=" mt-8">
            {{ item.title }}
          </v-list-item-title>
          <v-list-item-subtitle class="mt-4">{{ item.content | trimLength }}</v-list-item-subtitle>
        </v-list-item-content>

        <v-list-item-avatar tile size="20" color="grey" rounded>
          <v-img :src="item.userAvatar"></v-img>
        </v-list-item-avatar>
      </v-list-item>

      <div class="icon-action">
        <v-icon color="primary"> mdi-comment-outline</v-icon>
        <span>{{ item.comments }}</span>
        <v-icon color="primary">mdi-heart-outline</v-icon><span>{{ item.likes }}</span>
      </div>
    </v-card>
  </v-hover>
</template>

<script>
import moment from 'moment';

export default {
  props: ['item'],
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

    upperCase(val) {
      return val.toUpperCase();
    },
  },
  methods: {
    openPost(post, forum) {
      this.$router.push({ name: 'ViewPost', params: { id: post, forum } });
    },
  },
};
</script>

<style scoped>
.icon-action {
  position: absolute;
  bottom: 10px;
  left: 15px;
  display: flex;
  gap: 5px;
}
.small--text {
  position: absolute;
  top: 20px;
  left: 15px;
  font-size: 9px;
}
.post-card {
  transition: all .5s linear !important;
  cursor: pointer;
}
</style>
