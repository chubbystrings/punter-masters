<template>
   <section class="section-four">
     <div class="section-wrapper" ref="wrapperFour">
      <base-square :styles="{ top: '-25px', right: '45px', background: '#8E6BBF' }"
      ref="parentRefFour"
      ></base-square>
       <div class="content-side" ref="contentFour">
        <div class="animOne primary--text">
          <h2>Rollover Game</h2>
          <p>
         Play our automated rollover game that will
         help you stake and manage risks, give you detailed view about your savings and progress
          </p>
        </div>
        <div class="animOne">
          <v-btn :small="$vuetify.breakpoint.xs" to="/signup" color="button"
           class="white--text" depressed>
            Join Now!
          </v-btn>
        </div>
      </div>
       <div class="vector-wrapper" ref="imgRefFour">
        <img src="../../assets/images/rollover.svg" />
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
    const contentFour = gsap.utils.selector(this.$refs.contentFour);
    this.tween = gsap.timeline({
      scrollTrigger: {
        trigger: this.$refs.contentFour,
        start: 'top center',
        end: 'top 200px',
        scrub: 3,
      },
    });
    this.tween.from(this.$refs.parentRefFour.$refs.baseEl, {
      opacity: 0,
      y: 100,
      ease: 'none',

    })
      // .to(this.$refs.wrapperFour, {
      //   backgroundColor: '#fafafa',
      //   boxShadow: 'rgba(17, 12, 46, 0.15) 0px 48px 100px 0px',
      // })
      .from(contentFour('.animOne'), {
        opacity: 0,
        y: 30,
        stagger: 0.2,
        ease: 'none',
      }).from(this.$refs.imgRefFour, {
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

.section-four .section-wrapper {
 display: grid;
  grid-template-columns: 1fr 1fr;
  transition: all 0.5s ease;
  position: relative;
  width: 100%;
  box-sizing: border-box;
  padding: 20px 60px;
  border-radius: 10px;
  background: transparent;

}

/* .section-four .section-wrapper::after {
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

.section-four {
  position: relative;
  box-sizing: border-box;
  padding: 20px 60px;
  height: 100vh;
}

.vector-wrapper {
  width: 100%;
  display: grid;
  place-items: center;
  height: 600px;
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
  .section-four .section-wrapper {
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
  .section-four .section-wrapper {
    padding: 20px;
  }
  .section-four {
    padding: 50px 20px;
  }
  .animOne p  {
    max-width: 150px;
  }
}
@media screen and (max-width: 395px) {
  .section-four .section-wrapper {
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
