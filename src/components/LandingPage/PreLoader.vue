<template>
<div class="preloader--wrapper" :style="{ display: animation}" ref="preloaderWrap">

  <div class="preloader" ref="preloader">
    <img src="../../assets/images/football.svg" />
  </div>
</div>
</template>

<script>
import { gsap } from 'gsap';

export default {
  data: () => ({
    tween: null,
    animationDone: false,
  }),

  methods: {
    done() {
      this.animationDone = true;
    },
  },

  computed: {
    animation() {
      return this.animationDone ? 'none' : 'block';
    },
  },
  mounted() {
    this.tween = gsap.timeline();
    this.tween.from(this.$refs.preloaderWrap, {
      opacity: 0,
      duration: 1,
    })
      .fromTo(this.$refs.preloader, {
        opacity: 0,
        y: -100,

      }, {
        opacity: 1,
        y: 130,
        duration: 3,
        repeat: 1,
        ease: 'Bounce.easeOut',
        // ease: Elastic.easeOut,
        // ease: Elastic.easeOut.config(1.75, 1),
        yoyo: true,

        onComplete: () => {
          this.$emit('done');
          this.done();
        },
      });
  },

  beforeDestroy() {
    this.tween.kill();
  },
};
</script>

<style>
.preloader--wrapper {
  background-color: #EDE9F2;
  width: 100%;
  height: 100vh;
  margin: 0;
  padding: 0;
  position: absolute;
  z-index: 2;
}
.preloader {
  border-radius: 50%;
  width: 300px;
  height: 300px;
  margin: 0 auto;
  position: absolute;
  left: 0;
  right: 0;
  top: 150px;
}

.preloader img{
  width: 100%;
  height: 100%;
}
</style>
