import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';

// import gapi from './plugins/vue-gapi';

import VueGapi from 'vue-gapi'

import router from './router'

const str = '342254215043-jubqp6pblbce1fu8kqurn6lq1capeeei'
const config = {
  apiKey: 'AIzaSyDq011I58LWBlkJLAQb9MdaO6vXijIil1w',
  clientId: str + '.apps.googleusercontent.com',
  scope: 'https://www.googleapis.com/auth/spreadsheets',
  discoveryDocs: ['https://sheets.googleapis.com/$discovery/rest?version=v4'],
}

Vue.use(VueGapi, config)

Vue.config.productionTip = false

new Vue({
  vuetify,
  router,

  // gapi,
  render: h => h(App)
}).$mount('#app')
