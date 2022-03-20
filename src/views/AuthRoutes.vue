<template>
 <transition mode="out-in" name="route" appear>
  <dashboard-template>
    <transition mode="out-in" name="route" appear>
    <router-view></router-view>
    </transition>
  </dashboard-template>
   </transition>
</template>

<script>
import DashboardTemplate from '@/components/template/DashboardTemplate.vue';

export default {
  components: {
    DashboardTemplate,

  },

};
</script>

<style scoped>

.route-enter-from,
.route-leave-to {
  opacity: 0;
}

.route-enter-active,
.route-leave-active {
  transition: all .2s ease;
}

.route-enter-to,
.route-leave-from {
  opacity: 1;
}

</style>
