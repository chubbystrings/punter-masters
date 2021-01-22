import Vue from 'vue';
import VueRouter from 'vue-router';
import { auth } from '../firebase';
import Home from '../views/Home.vue';
// import Login from '../views/Login.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/home',
    name: 'AuthHome',
    component: () => import('../views/AuthHome.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "settings" */ '../views/Login.vue'),
  },

  {
    path: '/signup',
    name: 'Signup',
    component: () => import(/* webpackChunkName: "settings" */ '../views/Signup.vue'),
  },

  {
    path: '/settings',
    name: 'Settings',
    component: () => import(/* webpackChunkName: "settings" */ '../views/Settings.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/deposit',
    name: 'Deposit',
    component: () => import(/* webpackChunkName: "settings" */ '../views/Deposit.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/rollover',
    name: 'Rollover',
    component: () => import(/* webpackChunkName: "settings" */ '../views/Rollover.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/receipt/:id/success',
    name: 'ReceiptSuccess',
    component: () => import(/* webpackChunkName: "settings" */ '../views/ReceiptSuccess.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/receipt/:id/error',
    name: 'ReceiptError',
    component: () => import(/* webpackChunkName: "settings" */ '../views/ReceiptError.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/forums/:forum/:id',
    name: 'Forum',
    component: () => import(/* webpackChunkName: "settings" */ '../views/Forums.vue'),
    meta: {
      requiresAuth: true,
    },
  },

  {
    path: '/post/:forum/:id',
    name: 'ViewPost',
    component: () => import(/* webpackChunkName: "settings" */ '../views/ViewPost.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/banter-room',
    name: 'Banter',
    component: () => import(/* webpackChunkName: "settings" */ '../views/BanterRoom.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/code-room',
    name: 'CodeRoom',
    component: () => import('../views/CodeRoom.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/profile/:id',
    name: 'Profile',
    component: () => import('../views/Profile.vue'),
    meta: {
      requiresAuth: true,
    },
    async beforeEnter(to, from, next) {
      if (!to.params.id) {
        return;
      }

      next();
    },
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  try {
    const requiresAuth = to.matched.some((x) => x.meta.requiresAuth);
    // if (to.name === 'Home' && auth.currentUser) {
    //   if (router.currentRoute.name === 'AuthHome') {
    //     return;
    //   }

    //   next({ name: 'AuthHome' });
    // }

    if (requiresAuth && !auth.currentUser) {
      next('/login');
    } else {
      next();
    }
  } catch (error) {
    //
  }
});

export default router;
