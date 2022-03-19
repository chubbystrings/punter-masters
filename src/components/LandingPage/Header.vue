<template>
  <div>
    <transition name="fade" appear>
      <v-app-bar flat color="background" fixed :class="`header-in`" v-if="isOnTop">
        <div class="img--wrapper">
          <img src="../../assets/logo2.png" alt="company logo" />
        </div>
        <v-spacer></v-spacer>
        <div class="link--wrapper">
          <v-btn to="/login" text large class="btn--text">Login</v-btn>
          <v-btn to="/signup" text large class="btn--text">Signup</v-btn>
        </div>
      </v-app-bar>
    </transition>
    <transition name="pop" appear>
      <div :class="`header header-out`" v-if="!isOnTop">
        <div class="img--wrapper">
          <img src="../../assets/logo2.png" alt="company logo" />
        </div>
        <div class="link--wrapper">
          <v-btn to="/login" x-small text class="btn--text white--text">
          Login</v-btn>
          <v-btn to="/signup" x-small text class="btn--text white--text">
          Signup</v-btn>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  data: () => ({
    isOnTop: true,
  }),
  mounted() {
    window.addEventListener('scroll', () => {
      if (window.scrollY >= 30) {
        this.isOnTop = false;
      } else {
        this.isOnTop = true;
      }
    });
  },

  beforeDestroy() {
    window.removeEventListener('scroll', () => {
      //
    });
  },

  computed: {
    changeBg() {
      return this.isOnTop ? 'bgWhite header-in' : 'bgPrimary header-out';
    },
  },
};
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  z-index: 1000000;
  box-sizing: border-box;
  padding: 0 15px;
  transition: all 0.4s linear;
}

.header-in {
  top: 0;
  height: 100px;
  border: 1px solid red;
}

.header-out {
  max-width: 40rem;
  top: 5px;
  left: 50%;
  right: 0px;
  margin-left: -300px;
  /* animation: drop 0.3s linear;
  opacity: 0.8; */
  background-color: #260d40;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  height: 70px;
  opacity: 0.7;
}

.bgWhite {
  background-color: white;
}
.bgPrimary {
  background-color: #8e6bbf;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
}

.img--wrapper {
  width: 50px;
  height: 50px;
}

.img--wrapper img {
  width: 100%;
  height: 100%;
}

.link-wrapper {
  display: flex;
  align-items: center;
  gap: 5px;
}
.btn--text {
  font-family: Mulish;
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s linear;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.pop-enter-active,
.pop-leave-active {
  transition: all 0.2s linear;
}

.pop-enter-from,
.pop-leave-to {
  opacity: 0;
}

.pop-enter-to,
.pop-leave-from {
  transform: translateY(40px);
}

@keyframes drop {
  from {
    opacity: 0;
    transform: translateY(-40px);
  }

  to {
    opacity: 0.8;
    transform: translateY(0px);
  }
}

@media screen and (max-width: 970px) {
  .header-out {
    width: 70%;
    left: 0;
    right: 0;
    margin: auto;
  }
}
</style>
