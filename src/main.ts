import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import icons from './icons'

// use `moment` language zh-cn
import 'moment/locale/zh-cn';

// use global style
import '@/style/base.less';

// use `mock`
import '@/mock';

createApp(App)
  .use(icons)
  .use(store)
  .use(router)
  .mount('#app');
