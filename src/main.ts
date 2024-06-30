window.global ||= window
import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createVCodeBlock } from '@wdns/vue-code-block'

import App from './App.vue'
import router from './router'

const app = createApp(App)
const VCodeBlock = createVCodeBlock({
  // options
})
app.use(createPinia())
app.use(router)
app.use(VCodeBlock)

app.mount('#app')
