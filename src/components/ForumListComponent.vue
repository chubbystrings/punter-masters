<template>
<div class="post-card-wrapper">
  <post-card
  v-for="item in paginatedPosts"
  :key="item.id"
  class="hover"
  :item="item"
  >
  </post-card>
     <div v-if="posts.length > 0" class="text-center paginate-wrapper">
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
import PostCard from './core/PostCard.vue';

export default {
  data: () => ({
    forumName: '',
    pagination: {},
    page: 1,
  }),
  components: {
    PostCard,
  },

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
    //
  },

  created() {
    this.$store.dispatch('loadPosts', this.$route.params.id);
  },

};
</script>
<style scoped>
@import "https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.2/animate.min.css";

.v-pagination__item, .v-pagination__navigation {
  outline: none !important;
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

.post-card-wrapper {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  height: 75vh;
}
.paginate-wrapper {
  position: absolute;
  bottom: 5px;
  left: 50%;
  transform: translateX(-50%)
}

</style>
