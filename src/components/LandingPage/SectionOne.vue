<template>
  <section class="section-one" ref="sectionOne">
  <div class="section-wrapper" ref="wrapper">
      <base-square
      :styles="{ top: '50px', left: '-10px', background: '#8E6BBF' }"
      ref="parentRef"
      class="baseOne"
    >
    </base-square>
    <div class="content-side" ref="contentOne">
      <div class="animOne primary--text">
        <h2 class="heading--text">Punter Masters</h2>
        <p>
          Join the best Platform to get sure bet codes from your fellow masters, Talk sports, odds
          and anything actually Join Now!
        </p>
      </div>
      <div class="animOne">
        <v-btn :small="$vuetify.breakpoint.xs" to="/signup"
        class="white--text" color="button" depressed>
         Join The Masters
        </v-btn>
      </div>
    </div>
    <div class="vector-wrapper" ref="imgRef">
      <img src="../../assets/images/Saly-43.svg" />
    </div>
  </div>
  </section>
</template>

<script>
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default {
  data: () => ({
    tween: null,
  }),

  mounted() {
    gsap.registerPlugin(ScrollTrigger);
    const contentOne = gsap.utils.selector(this.$refs.contentOne);
    gsap.from(contentOne('.animOne'), {
      opacity: 0,
      y: 30,
      duration: 0.5,
      stagger: 0.2,
      ease: 'none',
    });

    gsap.from(
      this.$refs.parentRef.$refs.baseEl,
      {
        opacity: 0,
        x: -50,
        ease: 'none',
        duration: 0.5,

      },
    );

    gsap.from(this.$refs.imgRef, {
      opacity: 0,
      y: 30,
      ease: 'none',
      duration: 0.5,
    });

    this.tween = gsap.timeline({
      scrollTrigger: {
        trigger: this.$refs.contentOne,
        start: 'top 50px',
        scrub: 2,
        end: 'bottom top',
      },
    });

    this.tween
      .to(
        this.$refs.parentRef.$refs.baseEl,
        {
          opacity: 0,
          x: -50,
          duration: 3,
          ease: 'none',
          delay: 1,
        },
        '-=1.2',
      )
      // .fromTo(this.$refs.wrapper, {

      //   backgroundColor: '#fafafa',
      //   boxShadow: 'rgba(17, 12, 46, 0.15) 0px 48px 100px 0px',
      // }, {
      //   backgroundColor: 'transparent',
      //   boxShadow: 'none',
      // })
      .to(contentOne('.animOne'), {
        opacity: 0,
        y: 30,
        duration: 1,
        stagger: 0.2,
        ease: 'none',
        delay: 0.5,
      })
      .to(this.$refs.imgRef, {
        opacity: 0,
        y: 30,
        duration: 1,
        ease: 'none',
        delay: 0.5,
      });
  },

  beforeDestroy() {
    this.tween.kill();
  },
};
</script>

<style scoped>

.animOne h2 {
  font-weight: 900;
  font-size: 50px;
}
.section-one .section-wrapper {
  display: grid;
  grid-template-columns: 1fr 1fr;
  transition: all .5s ease;
  position: relative;
  width: 100%;
  box-sizing: border-box;
  padding: 20px 60px;
  border-radius: 10px;
  z-index: 100000;
  margin-top: 30px;
  background: #fafafa;
  min-height: 620px;
}

/* .section-one .section-wrapper::after {
  content: '';
  position: absolute;
  bottom: -100px;
  width: 100%;
  height: 3px;
  border-radius: 5px;
  background: #EDE9F2;
  z-index: inherit;
} */

.content-side {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: left;
  margin: 0 auto;
  gap: 50px;
}

.content-side > div {
  width: 100%;
}

.section-one {
  position: relative;
  box-sizing: border-box;
  padding: 50px 60px;
  height: 100vh;
}

.vector-wrapper {
  width: 100%;
  display: grid;
  place-items: center;
}

/* .vector-wrapper::before {
  content: '';
  width: 230px;
  height: 230px;
  border: 10px solid #8E6BBF;
  position: absolute;
} */

.vector-wrapper img {
  width: 100%;
  position: relative;
}

@media screen and (max-width: 970px) {
  .section-one .section-wrapper {
    height: 100%;
    grid-template-columns: 1fr;
    place-items: center;
  }

  .animOne h2 {
    font-size: 15px;
  }
  .animOne p {
    font-size: 10px;
  }

  .vector-wrapper::before {
    width: 130px;
  height: 130px;
  }

  .vector-wrapper {
    width: 350px;
    height: 300px;
    order: 2;
  }
}

@media screen and (max-width: 575px) {
  .section-one .section-wrapper {
    padding: 20px;
  }
  .section-one {
    padding: 50px 20px;
  }
  .animOne p  {
    max-width: 150px;
  }
}
@media screen and (max-width: 395px) {
  .section-one .section-wrapper {
    padding: 2px;
  }

   .vector-wrapper::before {
    width: 90px;
  height: 90px;
  }

  .vector-wrapper {
    width: 150px;
    height: 200px;
  }
}
</style>
