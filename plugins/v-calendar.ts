import { defineNuxtPlugin } from '#app'
import { Calendar, DatePicker } from 'v-calendar';
import 'v-calendar/style.css';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component('DatePicker', DatePicker)
  nuxtApp.vueApp.component('Calendar', Calendar)
})