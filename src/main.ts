import { createApp, defineAsyncComponent } from 'vue';
import { StoryblokVue, apiPlugin } from '@storyblok/vue';
import App from './App.vue';
import './style.css';
import router from './router/router';
import 'aos/dist/aos.css';

const app = createApp(App);

app.use(StoryblokVue, {
  accessToken: 'fpFPEDuWQ86ZBL7KGBoQ8Att',
  bridge: process.env.NODE_ENV !== 'production', // optimizes by excluding the bridge on production
  use: [apiPlugin],
});

app.use(router);

app.component(
  'Login',
  defineAsyncComponent(() => import('./components/Login.vue'))
);

app.component(
  'Page',
  defineAsyncComponent(() => import('./components/Page.vue'))
);

app.component(
  'Countdown',
  defineAsyncComponent(() => import('./components/Countdown.vue'))
);

app.component(
  'Intro',
  defineAsyncComponent(() => import('./components/Intro.vue'))
);

app.component(
  'Praktisk',
  defineAsyncComponent(() => import('./components/Praktisk.vue'))
);

app.mount('#app');
