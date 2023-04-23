import { createApp } from 'vue'
import { createPinia } from 'pinia'

import store from "./stores";

import App from './App.vue'
import router from './router'
import ArgonDashboard from "./argon-dashboard";

import 'bootstrap'

import './assets/bootstrap-icons/bootstrap-icons.css'
import global from '../src/global'
import './assets/main.css'
import "./assets/css/nucleo-icons.css";
import "./assets/css/nucleo-svg.css";
import 'sweetalert2/dist/sweetalert2.min.css'

const app = createApp(App)
app.use(createPinia())
app.provide('global', global)
app.use(ArgonDashboard);
app.use(router)
app.use(store);
app.mount('#app')
