<template>
  <div id="content">
    <div>
      <h1 class="title">Search Page</h1>
      <b-input-group prepend="Search Query:" id="search-input">
        <b-form-input v-model="searchQueryText"></b-form-input>
        <b-input-group-append>
          <b-button variant="success" v-on:click="search">Search</b-button>
        </b-input-group-append>
      </b-input-group>
      <br/>
      <h4>Your search Query: {{ searchQueryText }} </h4> 
    </div>
    <div>
      <b-button :class="{green: deleteClicked}" v-b-toggle.collapse-1 pill variant="primary">Search player</b-button>
      <b-button :class="{green: !deleteClicked}" v-b-toggle.collapse-2 pill @click="handleVisibility" variant="primary"
        value= "/teams/:searchQuery" id="collapse-2" >Search Team</b-button>
      <b-collapse id="collapse-1" class="mt-2">
        <b-card>
          <p class="card-text">Option to serach players</p>
          <b-button v-b-toggle.collapse-3-inner @click="handleVisibility_inner('playerNameTag')" id="playerNameTag"
            value= "/players/:searchQuery" size="sm">Search player only by name</b-button>
          <br/><br/>
          <b-button v-b-toggle.collapse-1-inner @click="handleVisibility_inner('positionTagCollapse')" id="positionTag"
             value= "/players/:searchQuery/filterByPosition/:positionName" size="sm">Search player by position</b-button>
          
          <b-collapse  class="mt-2" id="positionTagCollapse" >
            <b-form-select v-model="selected" class="mb-3" style="width: 250px" >
              <b-form-select-option :value="null">Please select an option</b-form-select-option>
              <b-form-select-option value="Goalkeeper"> Goalkeeper</b-form-select-option>
              <b-form-select-option value="Defender">Defender</b-form-select-option>
              <b-form-select-option value="Midfielder">Midfielder</b-form-select-option>
              <b-form-select-option value="Attacker">Attacker</b-form-select-option>
            </b-form-select>
          </b-collapse>
          <br/><br/>
          <b-button v-b-toggle.collapse-2-inner @click="handleVisibility_inner('teamNameTag')" size="sm">Search player by team name</b-button>
          <b-collapse id="teamNameTag" class="mt-3">
            <b-form-input v-model="searchQueryTextAddition" id="additionInput" value= "/players/:searchQuery/filterByTeam/:teamName"
                placeholder="Please insert team name here" style="width: 250px;"></b-form-input>
          </b-collapse>
        </b-card>
      </b-collapse>
    </div>
    <div>
      <br/>
      <b-button v-b-toggle.filter pill  @click="handleVisibilityOfResult('filter')"> View Filter</b-button>
      <b-button v-b-toggle.sort pill  @click="handleVisibilityOfResult('sort')"> View Sort</b-button>
      <b-collapse id="sort" class="mt-5">
        <b-card>
          <p class="card-text">Sort Options: </p>
          <b-button v-b-toggle.sort-1-inner :disabled.sync="this.$store.state.filterAndSortFlag" @click="sortByPlayerName()" size="sm">Sort By Player Name</b-button>
          <b-button v-b-toggle.sort-2-inner :disabled.sync="this.$store.state.filterAndSortFlag"  @click="sortByTeamName" size="sm">Sort By Team Name</b-button>
        </b-card>
      </b-collapse>

      <b-collapse id="filter" class="mt-6">
        <b-card>
          <p class="card-text">Filter Options: </p>
            <b-form-input v-model="inputPositionFilter" id="inputPositionFilter" 
                placeholder="Please insert position name" v-on:input="filterByPosition()" style="width: 250px;"></b-form-input>
            <b-form-input v-model="inputTeamNameFilter"  id="inputTeamNameFilter" 
                placeholder="Please insert team name" v-on:input="filterByTeamName()" style="width: 250px;"></b-form-input>
        </b-card>
      </b-collapse>
    </div>
    <div>
      <span v-for="player_details in playerList" :key="player_details.playerID">
        <player-preview
        @fullDetailes="showFullPlayerDetailes(player_details)"
        :PlayerFullName="player_details.name"
        :player_id="player_details.playerID"
        :teamName="player_details.team_name"
        :playerPosition="player_details.player_position"        
        :image_url="player_details.player_image_url" 
        :flag="true"       
        ></player-preview>        
      </span>
      <PlayerCard ref="pc1"
        button_name="Get More Data"
        close_btn="Close Card"
        add_to_favorite="Add To Favorite"
        :fullDetailes="fullPlayer"
      ></PlayerCard>
      <span v-for="team_details in teamList" :key="team_details">
        <TeamPreview
        @fullDetailes="showFullTeamDetailes(team_details)"
        :TeamFullName="team_details.name"
        :logo_path="team_details.team_logo_path"        
        ></TeamPreview>
      </span>
      <team-card :id="team_id"  v-show="team_id > -1"></team-card>

    </div>  
  </div> 
</template>

<script>

import PlayerPreview from "../components/PlayerPreview.vue";
import TeamCard from "../components/TeamCard.vue";
import TeamPreview from "../components/TeamPreview.vue";
import PlayerCard from "../components/playerCard.vue";


export default {
  name: "SearchPage",
  components:{
    PlayerPreview,
    TeamPreview,
    TeamCard,
    PlayerCard
  },
  props:{
    show:{
      type: Boolean
    }
  },
  data() {
    return {
      searchQueryText:"",
      searchQueryTextAddition:"",
      selected: null,
      isTeamVisible: false,
      inputPositionFilter: null,
      inputTeamNameFilter: "",
      fullPlayer:[],
      team_id:-1,
      deleteClicked : true,
      disabled: true
    }    
  },
  computed: {
    playerList() { 
      return this.$store.state.players;
    },

    teamList() { 
      return this.$store.state.teams;
    },
    
  },
  methods: {

    sortByPlayerName(){
      let copyPlayerArr = this.$store.state.players;
      return this.$store.actions.sort_names(copyPlayerArr);
      
    },
    sortByTeamName(){
      let copyTeamArr = [];
      if(this.isTeamVisible){
        copyTeamArr = this.$store.state.teams;
        return this.$store.actions.sort_names(copyTeamArr);        
      }
      else{
        copyTeamArr = this.$store.state.players;
        return this.$store.actions.sort_player_by_team_name(copyTeamArr);
      }      
    },
    async showFullPlayerDetailes(player_details){      
      let urlPath = `http://localhost:3000/teams/playerFullDetails/${player_details.playerID}`;
      const response = await this.axios.get(
        urlPath,
        {withCredentials: true},
      );
      console.log(response)
      this.fullPlayer = [
        response,
        [{
          name: player_details.name,
          team_name : player_details.team_name,
          position:player_details.player_position
        }]
      ];
      // this.$refs["pc1"].$refs["mod"].show();  
      console.log(this.fullPlayer)
    },

    showFullTeamDetailes(team_details){
      console.log(team_details.team_id)
      this.$store.state.team_id = team_details.team_id;

      this.$router.push("/TeamCard");
    },

    filterByPosition(){      
      this.$store.state.players =  this.$store.actions.filter_players(this.$store.state.players, this.inputPositionFilter ,"position");     
    },

    filterByTeamName(){      
      this.$store.state.players = this.$store.actions.filter_players(this.$store.state.players, this.inputTeamNameFilter,"team_name");
    },

    handleVisibility() {
      let vis = document.getElementById("collapse-1");
      vis.style.display = "none";
      this.isTeamVisible = true;
      this.selected = null;
      this.searchQueryTextAddition = "";
      this.deleteClicked = false;
    },

    handleVisibilityOfResult(result) {
      console.log("result", result);
      document.getElementById("sort").style.display = "none";
      document.getElementById("filter").style.display = "none";
      document.getElementById(result).style.display = "block";
      // this.isTeamVisible = true;      
    },

    handleVisibility_inner(tagName) {
      this.deleteClicked = true;
      let vis = document.getElementById(tagName);
      let vis1 = document.getElementById("positionTagCollapse");
      let vis2 = document.getElementById("teamNameTag");      
      vis1.style.display = "none";
      vis2.style.display = "none";
      if(tagName == 'playerNameTag'){
        this.isTeamVisible = false;
        return;
      }
      vis.style.display = "block";
      this.selected = null;
      this.searchQueryTextAddition = "";
      this.isTeamVisible = false;
    },
 
    async search(){
      try{
        let pathToSearch = "";
        let params_from_user = {
          searchQuery: this.searchQueryText,
        }
        let path_and_variables = "";
        this.deleteClicked = true;
        if(this.selected != null){ //position
          // pathToSearch = document.getElementById("positionTag").value;
          // params_from_user["positionName"] = this.selected;
          path_and_variables = `/players/${this.searchQueryText}/filterByPosition/${this.selected}`

        }
        else if(this.searchQueryTextAddition != ""){ //team Name
          // pathToSearch = document.getElementById("teamNameTag").value;
          // params_from_user["teamName"] = this.searchQueryTextAddition;
          path_and_variables = `/players/${this.searchQueryText}/filterByTeam/${this.searchQueryTextAddition}`
          
        }
        else if(this.isTeamVisible == true){ //search team
          this.deleteClicked = false;
          // pathToSearch = document.getElementById("collapse-2").value;
          path_and_variables = `/teams/${this.searchQueryText}`;
        }
        else{ //only by name
          // pathToSearch = document.getElementById("playerNameTag").value;
          path_and_variables = `/players/${this.searchQueryText}`;
        }
        
        // close collapse
        document.getElementById("collapse-1").style.display = "none";


        let urlPath = "http://localhost:3000/search" + path_and_variables;
        console.log("urlPath  ",urlPath);
        // urlPath,{
        //     params: params_from_user
        //   },
        const response = await this.axios.get(
          urlPath,
          {withCredentials: true},
        );
        console.log("response",response);
        if(this.isTeamVisible == true){
          this.$store.state.teams = [];
          for(let i =0; i <response.data.length; i++){
            this.$store.state.players = [];
             this.$store.actions.add_team(response.data[i]);            
          }
        }
        else{
          this.$store.state.players = [];
          for(let i =0; i <response.data.length; i++){
            this.$store.state.teams = [];
            this.$store.actions.add_player(response.data[i]);
          }
        }
        this.searchQueryText="";
        
        // return response.data;
        // this.answer_search_data = response.data;;
        // const teamName = "sdff";
        // const playerPosition = "sdff";
        // this.playerFullName = response.data.name;
        // this.$root.loggedIn = true;
        // console.log(this.$root.store.login);
        // this.$root.store.login(this.form.username);
        // this.$router.push("/");
      } catch (err) {
        console.log("err");
      } 
    },
  },  
  mounted(){
    console.log("search mounted");
    // this.search();
  },  
};

</script>

<style scoped>

#content{
  text-align: center;
}
#search-input {
  margin-left: 35%; 
  width: 500px; 
}
#btn-radios-2{
  background-color: #80120a;
  outline: none;
}

.green{
  background-color: green;
}
</style>