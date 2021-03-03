import Vue from 'vue'
// import VueGoogleApi from 'vue-google-api'
import VueGapi from 'vue-gapi'

const str = '342254215043-jubqp6pblbce1fu8kqurn6lq1capeeei'
const config = {
  apiKey: 'AIzaSyDq011I58LWBlkJLAQb9MdaO6vXijIil1w',
  clientId: str + '.apps.googleusercontent.com',
  scope: 'https://www.googleapis.com/auth/spreadsheets',
  discoveryDocs: ['https://sheets.googleapis.com/$discovery/rest?version=v4'],
}

Vue.use(VueGapi, config)
// Vue.use(VueGoogleApi, config)

export default new VueGapi(config)