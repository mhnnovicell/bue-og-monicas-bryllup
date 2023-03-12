import { createRouter, createWebHistory } from 'vue-router';
const Login = () => import('../components/Login.vue');
const Home = () => import('../pages/Home.vue');
const Kontakt = () => import('../pages/Kontakt.vue');
const Gaveønsker = () => import('../pages/Gaveønsker.vue');

const routes = [
  { path: '/', component: Login, name: 'Login' },
  { path: '/forside', component: Home, name: 'Home' },
  { path: '/kontakt', component: Kontakt, name: 'Kontakt' },
  { path: '/gaveønsker', component: Gaveønsker, name: 'Gaveønsker' },
];

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  },
});

router.onError((e, to) => {
  if (e && typeof e.message === 'string') {
    if (e.message.startsWith('Failed to fetch dynamically imported module')) {
      // After a deployment, users must re-fresh the page to update the async components locations
      window.location.href = to.fullPath;
    }
  }
});

export default router;
