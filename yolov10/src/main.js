import { createApp } from 'vue'
import App from './App.vue'
import { router } from './common/router'
import { createDiscreteApi } from "naive-ui"
import 'qweather-icons/font/qweather-icons.css'
import naive from 'naive-ui'
import axios from 'axios'
const { message, notification, dialog } = createDiscreteApi(['message', 'notification', 'dialog'])
const app = createApp(App)



app.use(router)
app.use(naive)
app.provide("message", message)
app.provide("axios", axios)
app.provide("notification", notification)
app.provide("dialog", dialog)
app.mount('#app')
