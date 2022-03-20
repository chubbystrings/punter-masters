<template>
  <section class="section-two" ref="sectionTwo">
    <div class="section-wrapper" ref="wrapperTwo">
      <base-square
        :styles="{ top: '50px', left: '-10px', background: '#8E6BBF' }"
        ref="parentRefTwo"
      ></base-square>
      <div class="content-side" ref="contentTwo">
        <div class="animOne primary--text">
          <h2>Get Bet Codes</h2>
          <p>
            Get the best and latest bet codes from fellow masters. Rate their code according to it's
            win rate.
          </p>
        </div>
        <div class="animOne">
          <v-btn :small="$vuetify.breakpoint.xs" to="/signup"
           class="white--text" color="button" depressed>
            Join The Masters
          </v-btn>
        </div>
      </div>
      <div class="vector-wrapper" ref="imgRefTwo">
        <img src="../../assets/images/Saly-2.svg" />
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
    const contentTwo = gsap.utils.selector(this.$refs.contentTwo);
    this.tween = gsap.timeline({
      scrollTrigger: {
        trigger: this.$refs.contentTwo,
        start: 'top center',
        end: 'top 200px',
        scrub: 3,
      },
    });
    this.tween
      .from(this.$refs.parentRefTwo.$refs.baseEl, {
        opacity: 0,
        x: -50,
        duration: 1,
        ease: 'none',
      })
      // .to(this.$refs.wrapperTwo, {
      //   backgroundColor: '#fafafa',
      //   boxShadow: 'rgba(17, 12, 46, 0.15) 0px 48px 100px 0px',
      // })
      .from(contentTwo('.animOne'), {
        opacity: 0,
        y: 30,
        stagger: 0.2,
        ease: 'none',
      })
      .from(this.$refs.imgRefTwo, {
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
.section-two .section-wrapper {
  display: grid;
  grid-template-columns: 1fr 1fr;
  transition: all 0.5s ease;
  position: relative;
  width: 100%;
  box-sizing: border-box;
  padding: 20px 60px;
  border-radius: 10px;
  margin-top: 20px;

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

.animOne h2 {
  font-weight: 900;
  font-size: 50px;
}

.content-side > div {
  width: 100%;
}

.section-two {
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

.vector-wrapper::before {
  content: "";
  width: 230px;
  height: 230px;
  border: 10px solid #8e6bbf;
  position: absolute;
}

.vector-wrapper img {
  width: 100%;
  position: relative;
}

@media screen and (max-width: 970px) {
  .section-two .section-wrapper {
    height: 100%;
    grid-template-columns: 1fr;
    place-items: center;
    padding: 100px 5px;
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
  }
}

@media screen and (max-width: 575px) {
  .section-two .section-wrapper {
    padding: 20px;
  }
  .section-two {
    padding: 50px 20px;
  }
  .animOne p  {
    max-width: 150px;
  }
}

@media screen and (max-width: 395px) {
  .section-two .section-wrapper {
    padding: 2px;
    grid-auto-rows: 1fr 3fr;
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
