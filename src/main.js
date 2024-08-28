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
app.use(PrimeVue, {
    locale: {
        dayNames: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
        dayNamesShort: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
        dayNamesMin: ['日', '一', '二', '三', '四', '五', '六'],
        monthNames: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
        monthNamesShort: ['1 月', '2 月', '3 月', '4 月', '5 月', '6 月', '7 月', '8 月', '9 月', '10 月', '11 月', '12 月'],
        today: '今日',
        weekHeader: '周',
        firstDayOfWeek: 0,
        dateFormat: 'yy/mm/dd',
    },
});
app.component('Button', Button);

app.mount('#app');
