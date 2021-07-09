<template>
  <div class="admin-page">
      <b-button class="createNewGameBtn" pill variant="primary" @click="showGameForm"> Create New Game</b-button>
      <b-button class="insertEventsBtn" pill variant="primary" @click="showEventForm"> Insert events</b-button>
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
      <b-form-datepicker
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
          id="input-group-home"
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
          id="input-group-away"
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
          @click="$bvModal.hide('bv-modal-example')"
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
      
    <b-modal ref="eventForme" id="bv-modal-example-2" @hide="cleanForm" hide-footer>
      <div class="container-2">
      <h1 class="title">New Events Form</h1>
      <b-form @submit.prevent="onInsertNewEvent" @reset.prevent="onResetEventForm">
      <b-form-group
        id="input-group-game-id"
        label-cols-sm="3"
        label="Game id:"
        label-for="game-id"
    >
        <b-form-input
        id="game_id"
        v-model="game_id"
        type="text"
        ></b-form-input>
        <b-form-invalid-feedback v-if="!game_id">
        Game id is required
        </b-form-invalid-feedback>
      </b-form-group>

      <b-form-group
          id="input-group-date-event"
          label-cols-sm="3"
          label="Date:"
          label-for="date"
      >
      <b-form-datepicker
        id="date-event"
        v-model="date_event"
        today-button
        reset-button
        close-button
        locale="en"
      ></b-form-datepicker>      
      <b-form-invalid-feedback v-if="!date_event">
      Username is required
      </b-form-invalid-feedback>            
      </b-form-group>

      <b-form-group
          id="input-group-time-event"
          label-cols-sm="3"
          label="Time:"
          label-for="time-event"
          
      >
        <b-form-timepicker
          id="time"
          v-model="time_event"
          right
          show-seconds
          placeholder="HH:mm:ss"
          locale="en"
          aria-controls="example-input"
        ></b-form-timepicker>
        <b-form-invalid-feedback v-if="!time_event">
        FirstName is required
        </b-form-invalid-feedback>            
      </b-form-group>

      <b-form-group
          id="input-group-minute-game"
          label-cols-sm="3"
          label="minute in game:"
          label-for="minute-game"
      >
          <b-form-input
          id="minute_game"
          v-model="minute_game"
          type="text"
          ></b-form-input>
          <b-form-invalid-feedback v-if="!minute_game">
          LastName is required
          </b-form-invalid-feedback>
      </b-form-group>

      <b-form-group
          id="input-group-evnet-discription"
          label-cols-sm="3"
          label="evnet-discription:"
      >
        <b-form-select v-model="evnetDiscription" :options="options">
        </b-form-select>

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
          @click="$bvModal.hide('bv-modal-example-2')"
          >Insert event</b-button
        >
        </div>
        </b-form>      
      </div>  
    </b-modal> 

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
        options: [
          { value: 1, text: 'goal' },
          { value: 9, text: 'own-goal' },
          { value: 2, text: 'Offside' },
          { value: 3, text: 'Offense' },
          { value: 4, text: 'yellowcard' },
          { value: 5, text: 'redcard' },
          { value: 6, text: 'injuried' },
          { value: 7, text: 'redcard' },
          { value: 8, text: 'substitution' },

        ],    
        game_id:'', 
        evnetDiscription:'', 
        minute_game:'', 
        time_event:'', 
        date_event:'', 
        errors: [],
        validated: false
    };
  },
  methods: {
    async showGameForm(){
        this.$refs["gameForme"].show();

        // get all teams
        let urlPath = `http://localhost:3000/teams/getAllTeamsByCountry/320`;
        const teams = await this.axios.get(
                urlPath,{withCredentials: true});
        console.log(teams)
        this.teams = teams.data;
    },
    async showEventForm(){
        this.$refs["eventForme"].show();
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
    async InsertNewEvent() {
      try {
        // const response = await this.axios.post(
        //   "http://localhost:3000/league/insertNewGame",
        //   {
        //     date: this.date,
        //     time: this.time,
        //     league_name: this.league_name,
        //     home_team_name: this.selectedHome,
        //     away_team_name:this.selectedAway,
        //     field: this.venue,
        //     referee: this.referee
                      
        //   }
        // );
        this.$router.push("/currentStage");
      } catch (err) {
        console.log(err.response);
        this.form.submitError = err.response.data.message;
      }
    },

    onInsertNewEvent(){
      this.$v.form.$touch();
      this.InsertNewEvent();
    },
    onInsertNewGame() {
      this.$v.form.$touch(); 
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
    },
    onResetEventForm() {
      this.game_id= ''; 
      this.evnetDiscription= ''; 
      this.minute_game= ''; 
      this.time_event= ''; 
      this.date_event= ''; 
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

.admin-page .createNewGameBtn{
  top:50%;
}
</style>
