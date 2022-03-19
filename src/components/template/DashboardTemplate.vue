<template>
 <div>
   <nav-drawer />
    <right-drawer />
    <app-bar />
    <slot></slot>
 </div>
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

<style>

</style>
