<template>
  <div class="main--wrapper">
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
  components: {
    SectionOne,
    SectionTwo,
    SectionThree,
    Header,
    Footer,
  },

  mounted() {
    gsap.fromTo(
      this.$refs.mainRef,
      {
        opacity: 0,
      },
      {
        opacity: 1,
        delay: 0.5,
        duration: 0.5,
      },
    );
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
