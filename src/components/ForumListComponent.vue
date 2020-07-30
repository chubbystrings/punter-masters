<template>
<div>
    <v-list three-line v-for="(item) in paginatedPosts" :key="item.id">
        <v-divider
          :key="item.content"
          class="pt-0"
        ></v-divider>
        <v-list-item
        class="hover"
          :key="item.title"
          @click="openPost(item.id, item.forum)"
        >
          <v-list-item-avatar>
            <v-img :src="item.avatar"></v-img>
          </v-list-item-avatar>

          <v-list-item-content>
            <small
             class="caption primary--text"
             >{{item.name }} posted {{item.createdOn | formatDate}}</small>
            <v-list-item-title >{{ item.title | upperCase}}</v-list-item-title>
            <v-list-item-subtitle>{{item.content}}</v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-action>
            <v-badge
            inline
            class="mt-4 mr-2"
            :content="`${item.comments}`"
            >
              <small class="primary--text text--bold">comments</small>
            </v-badge>
            <v-badge
            inline
            class="mt-5 mr-2"
            :content="`${item.likes}`"
            >
              <small class="primary--text text--bold">likes</small>
            </v-badge>
          </v-list-item-action>
        </v-list-item>
    </v-list>
    <v-divider></v-divider>
     <div v-if="posts.length > 0" class="text-center">
    <v-pagination
      v-model="page"
      :length="pages"
      circle
      :disabled="posts.length <= 1"
    ></v-pagination>
  </div>
</div>
</template>
<script>
import moment from 'moment';
import { mapState } from 'vuex';

export default {
  data: () => ({
    forumName: '',
    pagination: {},
    page: 1,
  }),

  beforeUpdate() {
    this.$store.commit('OVERLAY_ON');
  },

  updated() {
    setTimeout(() => {
      this.$store.commit('OVERLAY_OFF');
    }, 1000);
  },

  watch: {
    // eslint-disable-next-line no-unused-vars
    $route(to, from) {
      console.log('route changed loaded post from here');
      this.$store.dispatch('loadPosts', this.$route.params.id);
    },
  },

  computed: {
    ...mapState(['posts']),
    pages() {
      return (
        this.posts.length > 3
          ? Math.ceil(this.posts.length / 5) : 1);
    },

    paginatedPosts() {
      const start = (this.page - 1) * 5;
      const stop = this.page * 5;

      return this.posts ? this.posts.slice(start, stop) : '';
    },
  },

  filters: {
    formatDate(val) {
      console.log(val);
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

    upperCase(val) {
      return val.toUpperCase();
    },
  },

  // eslint-disable-next-line no-unused-vars
  // beforeRouteUpdate(to, from, next) {
  //   console.log('Heyyy');
  //   this.loadPosts();
  // },

  methods: {
    openPost(post, forum) {
      this.$router.push({ name: 'ViewPost', params: { id: post, forum } });
    },
  },

  created() {
    console.log('created loaded post from here');
    this.$store.dispatch('loadPosts', this.$route.params.id);
  },

};
</script>
<style scoped>
@import "https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.2/animate.min.css";

.hover:hover {
    background-color: #FCE4EC;
}
.v-pagination__item, .v-pagination__navigation {
  outline: none !important;
}

div {
  transition: all .3s ease-out;
}

</style>
