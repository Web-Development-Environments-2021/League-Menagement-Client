<template>
  <div>
      <div class="admin-page">
          <b-button pill variant="primary" @click="showForm"> Create New Game</b-button>
          <current-stage></current-stage>
          <b-modal ref="gameForme" id="bv-modal-example" @hide="cleanForm" hide-footer>
          <div class="container">
          <h1 class="title">New Game Form</h1>
          <b-form @submit.prevent="onInsertNewGame" @reset.prevent="onReset">
          <b-form-group
              id="input-group-date"
              label-cols-sm="3"
              label="Date:"
              label-for="date"
          >
          <b-form-datepicker>        
        <b-form-group
            id="input-group-date"
            label-cols-sm="3"
            label="Date:"
            label-for="date"
        >
            <b-form-input
            id="date"
            v-model="date"
            today-button
            reset-button
            close-button
            locale="en"
          ></b-form-datepicker>      
          <b-form-invalid-feedback v-if="!date">
          Username is required
          </b-form-invalid-feedback>            
          </b-form-group>

          <b-form-group
              id="input-group-time"
              label-cols-sm="3"
              label="Time:"
              label-for="time"
              
          >
            <b-form-timepicker
              id="time"
              v-model="time"
              right
              show-seconds
              placeholder="HH:mm:ss"
              locale="en"
              aria-controls="example-input"
            ></b-form-timepicker>
            <b-form-invalid-feedback v-if="!time">
            FirstName is required
            </b-form-invalid-feedback>            
          </b-form-group>

          <b-form-group
              id="input-group-league_name"
              label-cols-sm="3"
              label="League Name:"
              label-for="league_name"
          >
              <b-form-input
              id="league_name"
              v-model="league_name"
              type="text"
              ></b-form-input>
              <b-form-invalid-feedback v-if="!league_name">
              LastName is required
              </b-form-invalid-feedback>
          </b-form-group>

          <b-form-group
              id="input-group-country"
              label-cols-sm="3"
              label="Home Team:"
          >
          <b-form-select v-model="selectedHome">
            <option disabled value="">Please select Home Team</option>
              <option v-for="team in teams" :key="team.team_name">
              {{team.team_name}}
              <template slot="option">
                              <img :src="`${team.logo_path}`" class="card-img-top" style="height: 200px; width: auto"/>
              </template>
          </option> 
          </b-form-select>
          </b-form-group>
          
          <b-form-group
              id="input-group-country"
              label-cols-sm="3"
              label="Away Team:"
          >
          <b-form-select v-model="selectedAway">
            <option disabled value="">Please select Home Team</option>
              <option v-for="team in teams" :key="team.team_name">
              {{team.team_name}}
              <template slot="option">
                  <img :src="`${team.logo_path}`" class="card-img-top" style="height: 200px; width: auto"/>
              </template>
          </option> 
          </b-form-select>
          </b-form-group>

          <b-form-group
              id="input-group-venue"
              label-cols-sm="3"
              label="Field:"
              label-for="venue"
          >
              <b-form-input
              id="venue"
              v-model="venue"
              ></b-form-input>
              <b-form-invalid-feedback v-if="!venue">
              venue is required
              </b-form-invalid-feedback>            
          </b-form-group>

          <b-form-group
              id="input-group-referee"
              label-cols-sm="3"
              label="Referee:"
              label-for="referee"
          >
              <b-form-input
              id="referee"
              v-model="referee"
              type="text"            
              ></b-form-input>
          </b-form-group>
          <div>
          <b-button type="reset" variant="danger">Reset</b-button>
          <b-button
              type="submit"
              variant="primary"
              style="width:230px;"
              class="ml-5 w-70"
              >Insert Game</b-button
          >
          </div>
          </b-form>
          <!-- <b-alert
          class="mt-2"
          v-if="form.submitError"
          variant="warning"
          dismissible
          show
          >
          Register failed: {{ form.submitError }}
          </b-alert> -->
          <!-- <b-card class="mt-3 md-3" header="Form Data Result">
          <pre class="m-0"><strong>form:</strong> {{ form }}</pre>
          <pre class="m-0"><strong>$v.form:</strong> {{ $v.form }}</pre>
          </b-card> -->
          
      </div>  
      </b-modal> 
      </div>
    </div>
</template>

<script>

import currentStage from "../pages/currentStagePage.vue";

export default {
  name: "admin-page",
  components:{
    currentStage
  },
  data() {
    return {
        selectedAway: '',
        selectedHome: '',
        venue: '',
        teams:[],
        date:'',
        time:'',
        league_name:'',
        referee:'',        
        errors: [],
        validated: false
    };
  },
  methods: {
    async showForm(){
        this.$refs["gameForme"].show();

        // get all teams
        let urlPath = `http://localhost:3000/teams/getAllTeamsByCountry/320`;
        const teams = await this.axios.get(
                urlPath,{withCredentials: true});
        console.log(teams)
        this.teams = teams.data;
    },
    cleanForm(){
        this.selectedAway = '';
        this.selectedHome = '';
    },

    async insertNewGame() {
      try {
        const response = await this.axios.post(
          "http://localhost:3000/league/insertNewGame",
          {
            date: this.date,
            time: this.time,
            league_name: this.league_name,
            home_team_name: this.selectedHome,
            away_team_name:this.selectedAway,
            field: this.venue,
            referee: this.referee
                      
          }
        );
        this.$router.push("/currentStage");
        // console.log(response);
      } catch (err) {
        console.log(err.response);
        this.form.submitError = err.response.data.message;
      }
    },
    onInsertNewGame() {
      // console.log("register method called");
      this.$v.form.$touch();
    //   if (this.$v.form.$anyError) {
    //     return;
    //   }
      // console.log("register method go");
      this.insertNewGame();
    },
    onReset() {
        this.selectedAway= '';
        this.selectedHome= '';
        this.venue= '';
        this.teams=[];
        this.date='';
        this.time='';
        this.league_name='';
        this.referee='';  
    //   this.$nextTick(() => {
    //     this.$v.$reset();
    //   });
        }
    }
    }
</script>
<style lang="scss" scoped>
.container {
  max-width: 500px;
}
</style>
