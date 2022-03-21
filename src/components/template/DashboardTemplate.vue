<template>
  <transition name="list">
    <div>
      <nav-drawer />
      <right-drawer />
      <app-bar />
      <slot></slot>
    </div>
  </transition>
</template>

<script>
export default {
  components: {
    AppBar: () => import('@/components/core/AppBar'),
    NavDrawer: () => import('@/components/core/NavDrawer'),
    rightDrawer: () => import('@/components/core/RightDrawer.vue'),
  },
};
</script>

<style scoped>
.list-enter-active,
.list-leave-active,
.list-move {
  transition: 500ms cubic(0.64, 0.26, 0.08, 0.03);
  transition-property: opacity, transform;
}

.list-enter-active {
  opacity: 0;
  transform: translateY(50px) scaleY(0.5);
}

.list-enter-to {
  opacity: 1;
  transform: translateX(0) scaleY(1);
}

.list-leave-active {
  position: absolute;
  opacity: 0;
}
</style>
