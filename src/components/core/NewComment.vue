<template>
  <transition
    mode="out-in"
    enter-active-class="animated fadeIn"
    leave-active-class="animated fadeOut"
  >
    <div class="comment-card" :style="{ marginLeft: index % 2 !== 0 ? '50px' : '0' }">
      <div></div>
      <p>{{ commentData.content | trimLength }}</p>
      <small> {{ commentData.name }} {{ commentData.createdOn | formatDate }} </small>
    </div>
  </transition>
</template>

<script>
import moment from 'moment';

export default {
  props: ['commentData', 'index'],
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
      if (val.length < 250) {
        return val;
      }
      return `${val.substring(0, 250)}...`;
    },

    lowerCase(val) {
      return val.toLowerCase();
    },
  },
  created() {
    //
  },
};
</script>

<style scoped>
.comment-card {
  background-color: #fafafa;
  border-radius: 5px;
  position: relative;
  box-sizing: border-box;
  padding: 15px;
  max-width: 700px;
  max-height: 200px;
  margin-bottom: 15px;
  border-radius: 30px;
  font-size: 12px;
}
.comment-card:before {
  content: "";
  display: block;
  width: 0;
  height: 0;
  position: absolute;
  border-top: 12px solid transparent;
  border-bottom: 12px solid transparent;
  border-right: 12px solid #fafafa;
  border-left: 12px solid transparent;
  left: 10px;
  bottom: -10px;
}
.comment-card small {
  position: absolute;
  bottom: 2px;
  right: 15px;
  font-size: 9px;
}
</style>
