<template>
    <div class="blob" :style="{...styles}"  ref="baseEl"></div>
</template>
<script>
// import { gsap } from 'gsap';
// import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default {
  props: ['styles'],
  name: 'BaseSquare',
  data: () => ({
    reference: null,
  }),

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

@media screen and (max-width: 970px) {
  .blob {
    height: 30px;
    width: 35px;
  }
}

</style>
