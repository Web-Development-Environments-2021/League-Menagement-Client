<template>
  <div class="admin-page">
      <b-button class="createNewGameBtn" pill variant="primary" @click="showGameForm"> Create New Game</b-button>
      <b-button class="insertEventsBtn" pill variant="primary" @click="showEventForm"> Insert Events</b-button>
      <b-button class="insertScoresBtn" pill variant="primary" @click="showScoreForm"> Insert scores</b-button>
      <br/>
      <br/>
      <current-stage></current-stage>
      

    <b-modal ref="gameForme" id="bv-modal-example" hide-footer>
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
        required
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
          required
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
          required
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
        </option> 
        </b-form-select>
      </b-form-group>
      
      <b-form-group
          id="input-group-away"
          label-cols-sm="3"
          label="Away Team:"
      >
      <b-form-select v-model="selectedAway" required>
        <option disabled value="">Please select Home Team</option>
          <option v-for="team in teams" :key="team.team_name">
          {{team.team_name}}
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
          required
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
          required        
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
    </div>  
    </b-modal> 
      
    <b-modal ref="eventForme" id="bv-modal-example-2" hide-footer>
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
        required
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
        required
      ></b-form-datepicker>      
      <b-form-invalid-feedback v-if="!date_event">
      Date Event is required
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
          required
        ></b-form-timepicker>
        <b-form-invalid-feedback v-if="!time_event">
        FirstName is required
        </b-form-invalid-feedback>            
      </b-form-group>

      <b-form-group
          id="input-group-minute-game"
          label-cols-sm="3"
          label="Game time:"
          label-for="minute-game"
      >
          <b-form-input
          id="minute_game"
          v-model="minute_game"
          type="text"
          placeholder="Minute in the game"
          required
          ></b-form-input>
          <b-form-invalid-feedback v-if="!minute_game">
           minute in the game is required
          </b-form-invalid-feedback>
      </b-form-group>

      <b-form-group
          id="input-group-player_name"
          label-cols-sm="3"
          label="Player Name:"
          label-for="player_name"
      >
        <b-form-input
          id="player_name"
          v-model="player_name"
          type="text"
          required
          ></b-form-input>
          <b-form-invalid-feedback v-if="!player_name">
           Player Name is required
          </b-form-invalid-feedback>
      </b-form-group>

      <b-form-group
          id="input-group-evnet-discription"
          label-cols-sm="3"
          label="Discription:"
      >
        <b-form-select v-model="eventDiscription" :options="options" required>
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
        required       
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

    <b-modal ref="scoreForme" id="bv-modal-example-3" hide-footer>
      <div class="container-3">
      <h1 class="title">Insert Score Form</h1>
      <b-form @submit.prevent="oninsertNewGameScore" @reset.prevent="onResetScoreForm">
      <b-form-group
        id="input-group-game-id-score"
        label-cols-sm="3"
        label="Game id:"
        label-for="game-id"
    >
      <b-form-input
      id="game_id_score_form"
      v-model="game_id_score_form"
      type="text"
      required
      ></b-form-input>
      <b-form-invalid-feedback v-if="!game_id_score_form">
      Game id is required
      </b-form-invalid-feedback>
      </b-form-group>


      <b-form-group
          id="input-group-home-score"
          label-cols-sm="3"
          label="Home Team:"
      >
      <b-form-select v-model="selectedHomeTeamScoreFrom" required>
        <option disabled value="">Please select Home Team</option>
          <option v-for="team in teams" :key="team.team_name">
          {{team.team_name}}
        </option> 
      </b-form-select>
      </b-form-group>
      
      <b-form-group
          id="input-group-away-score"
          label-cols-sm="3"
          label="Away Team:"
      >
      <b-form-select v-model="selectedAwayTeamScoreFrom" required>
        <option disabled value="">Please select Home Team</option>
          <option v-for="team in teams" :key="team.team_name">
          {{team.team_name}}
        </option> 
      </b-form-select>
      </b-form-group>

      <b-form-group
          id="input-group-home-score"
          label-cols-sm="3"
          label="Home Score:"
          label-for="home-score"
      >
          <b-form-input
          id="minute_game"
          v-model="home_score"
          type="text"
          required
          ></b-form-input>
          <b-form-invalid-feedback v-if="!home_score">
           Home Score is required
          </b-form-invalid-feedback>
      </b-form-group>

      <b-form-group
          id="input-group-away-score"
          label-cols-sm="3"
          label="Away Score:"
          label-for="away-score"
      >
          <b-form-input
          id="away_score"
          v-model="away_score"
          type="text"
          required
          ></b-form-input>
          <b-form-invalid-feedback v-if="!away_score">
           Away score is required
          </b-form-invalid-feedback>
      </b-form-group>
      <div>
        <b-button type="reset" variant="danger">Reset</b-button>
        <b-button
          type="submit"
          variant="primary"
          style="width:230px;"
          class="ml-5 w-70"
          @click="$bvModal.hide('bv-modal-example-3')"
          >Insert scores</b-button
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
        // new game form
        selectedAway: '',
        selectedHome: '',
        venue: '',
        teams:[],
        date:'',
        time:'',
        league_name:'',
        referee:'', 
        
        // new event score
        options: [
          { value: 'goal', text: 'goal' },
          { value: 'own-goal' , text: 'own-goal' },
          { value: 'Offside', text: 'Offside' },
          { value: 'Offense' , text: 'Offense' },
          { value: 'yellowcard', text: 'yellowcard' },
          { value: 'redcard', text: 'redcard' },
          { value: 'injuried', text: 'injuried' },
          { value: 'redcard', text: 'redcard' },
          { value: 'substitution', text: 'substitution' },
        ],    
        game_id:'', 
        eventDiscription:'', 
        minute_game:'', 
        time_event:'', 
        date_event:'', 
        player_name:'',

        // scores form
        game_id_score_form:'',
        selectedHomeTeamScoreFrom:'',
        selectedAwayTeamScoreFrom:'',
        home_score:'',
        away_score:'',

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
    async showScoreForm(){
      this.$refs["scoreForme"].show();
        // get all teams
        let urlPath = `http://localhost:3000/teams/getAllTeamsByCountry/320`;
        const teams = await this.axios.get(
            urlPath,{withCredentials: true});
        this.teams = teams.data;
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
        // this.$router.push("/AdminPage");
        // console.log(response);
      } catch (err) {
        console.log(err.response);
        this.form.submitError = err.response.data.message;
      }
    },
    async InsertNewEvent() {
      try {
        var playerId="";        
        let urlPath = "http://localhost:3000/search/players/" + `${this.player_name}`;
        const responsePlayer = await this.axios.get(
          urlPath,
          {withCredentials: true},
        );
        for(let i =0; i <responsePlayer.data.length; i++){
          console.log(responsePlayer.data[i]);
            if(responsePlayer.data[i].name.includes(this.player_name)){
              playerId = responsePlayer.data[i].id;
              break;
          }            
        }
        const response = await this.axios.post(
          "http://localhost:3000/league/addEvent",
          {
                game_id: this.game_id,
                event_description: this.eventDiscription,
                minute_game: this.minute_game,
                time_event: this.time_event,
                date_event: this.date_event,
                player_id: player_id,     
                player_name: this.player_name     
          }
        );
      } catch (err) {
        console.log(err.response);
        this.form.submitError = err.response.data.message;
      }
    },
    async insertNewGameScore(){
      try {
        const response = await this.axios.post(
          "http://localhost:3000/league/insertGameScore",
          {
            game_id_score_form: this.game_id_score_form,
            selectedHomeTeamScoreFrom: this.selectedHomeTeamScoreFrom,
            selectedAwayTeamScoreFrom: this.selectedAwayTeamScoreFrom,
            home_score: this.home_score,
            away_score: this.away_score
                      
          }
        );
        // this.$router.push("/AdminPage");
        // console.log(response);
      } catch (err) {
        console.log(err.response);
        this.form.submitError = err.response.data.message;
      }
    },
    onInsertNewEvent(){
      // this.$v.form.$touch();
      this.InsertNewEvent();
    },
    onInsertNewGame() {
      // this.$v.form.$touch(); 
      this.insertNewGame();
    },
    oninsertNewGameScore(){
      this.insertNewGameScore();
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
      this.eventDiscription= ''; 
      this.minute_game= ''; 
      this.time_event= ''; 
      this.date_event= ''; 
    //   this.$nextTick(() => {
    //     this.$v.$reset();
    //   });
    },
    onResetScoreForm() {
      this.game_id_score_form='';
      this.selectedHomeTeamScoreFrom='';
      this.selectedAwayTeamScoreFrom='';
      this.home_score='';
      this.away_score='';
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
