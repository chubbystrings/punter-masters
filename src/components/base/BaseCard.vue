<template>
    <div id="baseCard"
     v-on="$listeners"
     v-bind="$attrs"
     >
        <slot></slot>
    </div>
</template>
<script>
export default {
  name: 'BaseCard',
};
</script>
<style scoped>
div#baseCard {
  border-radius: 12px;
  box-shadow: 1px 2px 8px 2px rgba(0, 0, 0, 0.26);
  padding: 1rem;
  margin: 1rem ;
  width: inherit;
}

</style>
