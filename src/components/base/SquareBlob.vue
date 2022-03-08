<template>
    <div class="blob" :style="{...styles}"></div>
</template>
<script>
export default {
  props: ['styles'],
  name: 'BaseSquare',
};
</script>
<style scoped>
.blob {
  height: 50px;
  width: 55px;
  background: yellow;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  border-radius: 5px;
  position: absolute;
  z-index: 999;
}

</style>
