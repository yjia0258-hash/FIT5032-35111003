import { createRouter, createWebHistory } from 'vue-router'
import WeatherView from '../views/WeatherView.vue'
import GetBookCountView from '../views/GetBookCountView.vue'
import CountBookAPI from '../views/CountBookAPI.vue'   // ← 新增

const routes = [
  { path: '/WeatherCheck',  name: 'GetWeather',    component: WeatherView },
  { path: '/GetBookCount',  name: 'GetBookCount',  component: GetBookCountView },
  { path: '/CountBookAPI',  name: 'CountBookAPI',  component: CountBookAPI }, // ← 新增
]

export default createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})
