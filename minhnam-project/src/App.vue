<template>
  <v-app>
    
    <v-card class="mx-auto mt-5" width="600">
      <v-card-title class="pb-0">
        <h1 class="display-1">Scalar Daily Reports</h1>
      </v-card-title>
      <v-divider></v-divider>
      <p>Daily Report form for team VMOJP - C10 - Scalar Dev.</p>
      <v-spacer></v-spacer>
      <p class="font-weight-light">
        Your email address will be recorded when you submit this form.
      </p>
      <v-spacer></v-spacer>
      <!-- <p>
        Not <strong><div id="name"></div></strong> ?
        <a @click="switchAccount">Switch account</a>
      </p> -->
      <div id="gSignInWrapper">
    <span class="label">Sign in with:<div id="name"></div></span>
      <a @click="switchAccount">Switch account</a>
  </div>
  
      <v-spacer></v-spacer>
      <p>
        <span class="red--text">* Required</span>
      </p>
    </v-card>
<v-form @submit="onFormSubmit">
    <v-card class="mx-auto mt-5" width="600" required>
      <p class="headline">Member Name <span class="red--text">*</span></p>
      <v-spacer></v-spacer>
      <p class="caption">The name of person responsible for this report.</p>
      <v-spacer></v-spacer><br />
      <v-autocomplete
        label="Choose"
        :items="names"
        dense
        filled
        required
        :rule="rules"
        v-model="form.memberName"
      ></v-autocomplete>
    </v-card>

    <v-card class="mx-auto mt-5" width="600" required>
      <p class="headline">Today Task <span class="red--text">*</span></p>
      <br />
      <p class="caption">What are you doing today?</p>
      <v-text-field
        label="Your answer"
        type="text"
        v-model="form.todayTask"
        :rules="rules"
      ></v-text-field>
    </v-card>

    <v-card class="mx-auto mt-5" width="600" required>
      <p class="headline">Actual Progress <span class="red--text">*</span></p>
      <v-spacer></v-spacer>
      <p class="caption">How much have you done based on your today plan?</p>
      <v-text-field
        label="Your answer"
        type="text"
        v-model="form.actualProgress"
        :rules="rules"
      ></v-text-field>
    </v-card>

    <v-card class="mx-auto mt-5" width="600">
      <p class="headline">Issues</p>
      <v-spacer></v-spacer>
      <p class="caption">
        Is there any problem that prevents you from completing your tasks?
      </p>
      <v-text-field
        label="Your answer"
        type="text"
        v-model="form.issues"
      ></v-text-field>
    </v-card>

    <v-card class="mx-auto mt-5" width="600" required>
      <p class="headline">
        Actions/Future plan <span class="red--text">*</span>
      </p>
      <v-spacer></v-spacer>
      <p class="caption">
        Do you have any solution for the existed problems, or what is your next
        plan (If you are currently doing self-learning or with no asigned task)?
      </p>
      <v-text-field
        label="Your answer"
        type="text"
        v-model="form.plan"
        :rules="rules"
      ></v-text-field>
    </v-card>

    <v-card class="mx-auto mt-5" width="600">
      <p class="headline">Suggestions</p>
      <v-spacer></v-spacer>
      <p class="caption">
        Do you have any constructive suggestions to help improving the team
        performance, or is there any issues in our team that you find in
        effective and could have been done better?
      </p>
      <v-text-field
        label="Your answer"
        type="text"
        v-model="form.suggest"
      ></v-text-field>
    </v-card>

    <v-card class="mx-auto mt-5" width="600">
      <v-switch label="Send me a copy of my responses."></v-switch>     
        <v-btn @click="onFormSubmit" color="purple" class="mr-4">Submit</v-btn>
    </v-card>
</v-form>

    <v-footer class="mt-5 mx-auto">
      <v-toolbar-title class="caption">
        This form was created inside of VMO. Report Abuse
      </v-toolbar-title>
    </v-footer>
  </v-app>
</template>

<script src="https://apis.google.com/js/platform.js" async defer></script>
<script>

const BASE_CONFIG = {
  clientId:
    "342254215043-jubqp6pblbce1fu8kqurn6lq1capeeei.apps.googleusercontent.com",
  clientSecret: "TfG6g00whVxcmKopj1oTt1_x",
  apiKey: "AIzaSyDq011I58LWBlkJLAQb9MdaO6vXijIil1w",
  sheetId: "1DhDezMWlCXqNBsVOvZ8GBTQZ5otcPdKp48JdLu4QByI",
  tabName: "DailyReports",
  cellRange: "A1:Z1000",
  discoveryDocs: ["https://sheets.googleapis.com/$discovery/rest?version=v4"],
  scopes: "https://www.googleapis.com/auth/spreadsheets",
};

export default {

  data: () => ({
    
    email: "",
    names: [
      "Hoàng Hà Nam",
      "Đỗ Huỳnh Đức",
      "Trần Quang Hiệp",
      "Hà Văn Quang",
      "Phạm Nguyễn Minh Nam"
    ],
    form: {
      memberName: "",
      todayTask: "",
      actualProgress: "",
      issues: "",
      plan: "",
      suggest: ""
    },
    rules: [(value) => value.length !== 0 || "This is a required question."],
    gapi: null,
    isLoggedIn: false,
    sheetTitle: "",
    sheetHeaders: [],
    sheetData: [],
    sheetId: "1DhDezMWlCXqNBsVOvZ8GBTQZ5otcPdKp48JdLu4QByI",
    apiKey: "AIzaSyDq011I58LWBlkJLAQb9MdaO6vXijIil1w",
    tabName: "DailyReports",
    cellRange: "A1:Z1000",
    mainContent: "Description",
    rowIndex: 1,
    display: false,
    locked: true,
  }),
  computed: {
    config() {
      return {
        apiKey: this.apiKey !== "" ? this.apiKey : BASE_CONFIG.apiKey,
        clientId: BASE_CONFIG.clientId,
        memberName: this.memberName !=="" ? this.memberName : BASE_CONFIG.memberName,
        todayTask:
          this.todayTask !== "" ? this.todayTask : BASE_CONFIG.todayTask,
        actualProgress: BASE_CONFIG.actualProgress,
        discoveryDocs: BASE_CONFIG.discoveryDocs,
        scope: BASE_CONFIG.scopes,
        sheetId: this.sheetId !== "" ? this.sheetId : BASE_CONFIG.sheetId,
        issues: this.issues !== "" ? this.issues : BASE_CONFIG.issues,
        plan: this.plan !== "" ? this.plan : BASE_CONFIG.plan,
        suggest: this.suggest !== "" ? this.suggest : BASE_CONFIG.suggest,
      };
    },
  },

  created() {
    // this.connect()
  },

  methods: {
  startApp() {
    gapi.load('auth2', function(){
      // Retrieve the singleton for the GoogleAuth library and set up the client.
      auth2 = gapi.auth2.init({
        client_id: '342254215043-jubqp6pblbce1fu8kqurn6lq1capeeei.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        // Request scopes in addition to 'profile' and 'email'
        //scope: 'additional_scope'
      });
      attachSignin(document.getElementById('customBtn'));
    });
  },

  attachSignin(element) {
    console.log(element.id);
    auth2.attachClickHandler(element, {},
        function(googleUser) {
          document.getElementById('name').innerText = "Signed in: " +
              this.googleUser.getBasicProfile().getName();
        }, function(error) {
          alert(JSON.stringify(error, undefined, 2));
        });
  },
    switchAccount() {
      if (this.gapi === null)
        this.$gapi.getGapiClient().then((gapi) => {
          this.gapi = gapi;
          this.initClient();
        });
      else if (!this.isLoggedIn) {
        this.gapi.auth2.getAuthInstance().signIn();
        this.getSheetData(this.config);
      } else this.gapi.auth2.getAuthInstance().signOut();
    },
    initClient() {
      this.gapi.client
        .init({
          apiKey: this.config.apiKey,
          clientId: this.config.clientId,
          discoveryDocs: this.config.discoveryDocs,
          scope: this.config.scope,
        })
        .then(
          () => {
            this.gapi.auth2.getAuthInstance().signIn();
            // Listen for sign-in state changes.
            this.gapi.auth2
              .getAuthInstance()
              .isSignedIn.listen(this.updateSigninStatus);

            // Handle the initial sign-in state.
            this.updateSigninStatus(
              this.gapi.auth2.getAuthInstance().isSignedIn.get()
            );
          },
          (error) => {
            alert(JSON.stringify(error, null, 2));
          }
        );
    },

    updateSigninStatus(isSignedIn) {
      if (isSignedIn) {
        this.isLoggedIn = true;
        this.getSheetData(this.config);
      } else {
        this.isLoggedIn = false;
      }
    },
    getSheetData(config) {
      this.gapi.client.sheets.spreadsheets.values
        .get({
          spreadsheetId: config.sheetId,
          range: "A1:Z1000",
        })
        .then(
          (response) => {
            const data = response.result;
            const headers = data.values.shift();
            const sheetData = data.values;
            // reset values
            this.sheetHeaders = [];
            this.sheetData = [];

            for (let i = 0; i < headers.length; i++) {
              this.sheetHeaders.push({ text: headers[i] });
            }
            for (let i = 0; i < sheetData.length; i++) {
              const tmp = {};
              for (let j = 0; j < headers.length; j++) {
                tmp[headers[j]] = sheetData[i][j];
              }
              this.sheetData.push(tmp);
            }
            console.log({
              response,
              data,
              headers: this.sheetHeaders,
              sheetData: this.sheetData,
            });
          },
          (response) => {
            alert(JSON.stringify(response, null, 2));
          }
        );
    },
    onFormSubmit() {
      const dateNow = new Date();
      const submissionValues  = [
        dateNow, this.form.memberName, this.form.todayTask, this.form.actualProgress, this.form.issues, this.form.plan, this.form.suggest
      ]
       if (this.gapi === null)
        this.$gapi.getGapiClient().then((gapi) => {
          this.gapi = gapi;
          this.initClient();
        });
      else if (this.gapi != null) {
        const params = {
          spreadsheetId: "1DhDezMWlCXqNBsVOvZ8GBTQZ5otcPdKp48JdLu4QByI",

          range: "A1:Z1000",

          valueInputOption: "RAW",

          insertDataOption: "INSERT_ROWS",
        };
      const valueRangeBody = {
        majorDimension: "ROWS", //log each entry as a new row (vs column)
        values: [submissionValues], //convert the object's values to an array
      };
      console.log(submissionValues)
      let request = this.gapi.client.sheets.spreadsheets.values.append(
        params,
        valueRangeBody
      );
      console.log(this.gapi)
      request.then(
        function (response) {
          // TODO: Insert desired response behaviour on submission
          console.log(response.result);
        },
        function (reason) {
          console.error("error: " + reason.result.error.message);
        }
      );
     }
    },
  },
};
</script>
