import { createApp } from 'vue';
import PrimeVue from 'primevue/config';
import App from './App.vue';
import router from './router';
import 'primevue/resources/themes/lara-light-indigo/theme.css';
// import './assets/style/theme.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import './assets/style/main.scss';
import Button from 'primevue/button';

const app = createApp(App);

app.use(router);
app.use(PrimeVue);
app.component('Button', Button);

app.mount('#app');
