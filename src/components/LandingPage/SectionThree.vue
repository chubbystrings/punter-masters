<template>
   <section class="section-three">
     <div class="section-wrapper" ref="wrapperThree">
      <base-square :styles="{ top: '-25px', right: '45px', background: '#8E6BBF' }"
      ref="parentRefThree"
      ></base-square>
      <div class="vector-wrapper" ref="imgRefThree">
        <img src="../../assets/images/Saly-32.svg" />
      </div>
       <div class="content-side" ref="contentThree">
        <div class="animOne primary--text">
          <h2>Share Bet Codes</h2>
          <p>
            Join thousands of masters like you who share bet codes, your rating
            depends on the wining rate of your bet codes.
          </p>
        </div>
        <div class="animOne">
          <v-btn :small="$vuetify.breakpoint.xs" to="/signup" color="button"
           class="white--text" depressed>
            Join To Share
          </v-btn>
        </div>
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
    const contentThree = gsap.utils.selector(this.$refs.contentThree);
    this.tween = gsap.timeline({
      scrollTrigger: {
        trigger: this.$refs.contentThree,
        start: 'top center',
        end: 'top 200px',
        scrub: 3,
      },
    });
    this.tween.from(this.$refs.parentRefThree.$refs.baseEl, {
      opacity: 0,
      y: 100,
      ease: 'none',

    })
      // .to(this.$refs.wrapperThree, {
      //   backgroundColor: '#fafafa',
      //   boxShadow: 'rgba(17, 12, 46, 0.15) 0px 48px 100px 0px',
      // })
      .from(contentThree('.animOne'), {
        opacity: 0,
        y: 30,
        stagger: 0.2,
        ease: 'none',
      }).from(this.$refs.imgRefThree, {
        opacity: 0,
        y: 30,
        ease: 'none',
      });
  },

  beforeDestroy() {
    this.tween.kill();
  },
};
</script>

<style scoped>

.section-three .section-wrapper {
 display: grid;
  grid-template-columns: 1fr 1fr;
  transition: all 0.5s ease;
  position: relative;
  width: 100%;
  box-sizing: border-box;
  padding: 20px 60px;
  border-radius: 10px;
  background: #fafafa;

}

/* .section-three .section-wrapper::after {
  content: '';
  position: absolute;
  top: -100px;
  width: 100%;
  height: 3px;
  border-radius: 5px;
  background: #EDE9F2;
  z-index: inherit;
} */

.animOne h2 {
  font-weight: 900;
  font-size: 50px;
}

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

.section-three {
  position: relative;
  box-sizing: border-box;
  padding: 20px 60px;
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
  .section-three .section-wrapper {
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
  .section-three .section-wrapper {
    padding: 20px;
  }
  .section-three {
    padding: 50px 20px;
  }
  .animOne p  {
    max-width: 150px;
  }
}
@media screen and (max-width: 395px) {
  .section-three .section-wrapper {
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
