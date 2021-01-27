<template>
<div>
  <base-card
  v-for="item in paginatedPosts"
  :key="item.id"
  @click="openPost(item.id, item.forum)"
  class="hover"
  >
  <header>
    <div>
      <v-avatar size="32" class="mr-3">
        <v-img :src="item.userAvatar"></v-img>
      </v-avatar>
      <span>{{ item.title }}</span>
    </div>
    <div>
      <v-icon color="primary">mdi-comment-outline</v-icon><span>{{ item.comments}}</span>
      <v-icon color="primary">mdi-heart-outline</v-icon><span>{{ item.likes}}</span>
    </div>
  </header>
  <small class="primary--text">
    posted by {{item.name }} posted {{item.createdOn | formatDate}}
  </small>
  <p>{{ item.content | trimLength }}</p>
  </base-card>
    <!-- <v-list three-line v-for="(item) in paginatedPosts" :key="item.id">
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
            <v-img :src="item.userAvatar"></v-img>
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
    </v-list> -->
    <v-divider></v-divider>
     <div v-if="posts.length > 0" class="text-center">
    <v-pagination
      v-model="page"
      :length="pages"
      circle
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
    this.$store.commit('OVERLAY_ON', '');
  },

  updated() {
    setTimeout(() => {
      this.$store.commit('OVERLAY_OFF');
    }, 1000);
  },

  watch: {
    // eslint-disable-next-line no-unused-vars
    $route(to, from) {
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
      if (!val) { return '-'; }
      if (val.seconds) {
        return moment(Date.parse(val.toDate())).fromNow();
      }
      return moment(Date.parse(val)).fromNow();
    },
    trimLength(val) {
      if (val.length < 100) { return val; }
      return `${val.substring(0, 100)}...`;
    },

    upperCase(val) {
      return val.toUpperCase();
    },
  },

  // eslint-disable-next-line no-unused-vars
  // beforeRouteUpdate(to, from, next) {
  //   this.loadPosts();
  // },

  methods: {
    openPost(post, forum) {
      this.$router.push({ name: 'ViewPost', params: { id: post, forum } });
    },
  },

  created() {
    this.$store.dispatch('loadPosts', this.$route.params.id);
  },

};
</script>
<style scoped>
@import "https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.2/animate.min.css";

.hover:hover {
    background-color: #FCE4EC;
    cursor: pointer;
}
.v-pagination__item, .v-pagination__navigation {
  outline: none !important;
}

div {
  transition: all .3s ease-out;
}

 li {
  margin: auto;
  max-width: 40rem;
}

header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

h3 {
  font-size: 1.25rem;
  margin: 0.5rem 0;
}

p {
  margin: 0.5rem 0;
}

a {
  text-decoration: none;
  color: #ce5c00;
}

a:hover,
a:active {
  color: #c89300;
}

</style>
