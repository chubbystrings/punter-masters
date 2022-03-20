<template>
  <div class="main--wrapper" :style="{ zIndex: !preloader ? 2 : -1 }">
    <Header />
    <div class="sections-wrapper" ref="mainRef">
      <section-one></section-one>
      <section-two></section-two>
      <section-three></section-three>
    </div>
    <Footer />
  </div>
</template>

<script>
import { gsap } from 'gsap';
import SectionOne from './SectionOne.vue';
import SectionTwo from './SectionTwo.vue';
import SectionThree from './SectionThree.vue';
import Header from './Header.vue';
import Footer from './Footer.vue';

export default {
  data: () => ({
    tween: null,
  }),
  props: ['preloader'],
  components: {
    SectionOne,
    SectionTwo,
    SectionThree,
    Header,
    Footer,
  },

  methods: {

  },

  mounted() {
    this.tween = gsap.from(
      this.$refs.mainRef,
      {
        opacity: 0,
        delay: 0.5,
        duration: 1,
        paused: true,
      },
    );
  },

  watch: {
    preloader(val) {
      if (!val) {
        this.tween.play();
      }
    },
  },
};

</script>

<style scoped>
.sections-wrapper {
  display: flex;
  flex-direction: column;
  font-family: Mulish;
}
.main--wrapper {
  position: relative;
  box-sizing: border-box;
  padding-bottom: 100px;
}
</style>
