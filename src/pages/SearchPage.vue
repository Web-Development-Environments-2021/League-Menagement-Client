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
      Your search Query: {{ searchQueryText }}
    </div>
    <div>
      <b-button v-b-toggle.collapse-1 pill variant="primary">Search player by name</b-button>
      <b-button v-b-toggle.collapse-2 pill @click="handleVisibility" variant="primary"
        value= "/teams/:searchQuery" id="collapse-2" >Search Team by name</b-button>
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
          <b-button v-b-toggle.sort-2-inner :disabled.sync="this.$store.state.filterAndSortFlag"  @click="sortByTeamName()" size="sm">Sort By Team Name</b-button>
        </b-card>
      </b-collapse>

      <b-collapse id="filter" class="mt-6">
        <b-card>
          <p class="card-text">Filter Options: </p>
          <!-- <b-button v-b-toggle.filter-1-inner  size="sm">Filter By Position</b-button> -->
          <!-- <b-collapse id="positionFilterTag" class="mt-3"> -->
            <b-form-input v-model="inputPositionFilter" id="inputPositionFilter" 
                placeholder="Please insert position name" v-on:input="filterByPosition()" style="width: 250px;"></b-form-input>
            <!-- <b-form-select v-model="inputPositionFilter" @click="filterByPosition()" class="mb-3" style="width: 250px" >
              <b-form-select-option :value="null">Please select an option</b-form-select-option>
              <b-form-select-option @click="filterByPosition()" value="Goalkeeper">Goalkeeper</b-form-select-option>
              <b-form-select-option v-on:input="filterByPosition()" value="Defender">Defender</b-form-select-option>
              <b-form-select-option @click="filterByPosition()" value="Midfielder">Midfielder</b-form-select-option>
              <b-form-select-option @click="filterByPosition()" value="Attacker">Attacker</b-form-select-option>
            </b-form-select> -->
          <!-- </b-collapse> -->
          <!-- <b-button v-b-toggle.filter-2-inner  size="sm">Filter By Team Name</b-button> -->
          <!-- <b-collapse id="teamNameFilterTag" class="mt-3"> -->
            <b-form-input v-model="inputTeamNameFilter"  id="inputTeamNameFilter" 
                placeholder="Please insert team name" v-on:input="filterByTeamName()" style="width: 250px;"></b-form-input>
          <!-- </b-collapse> -->
        </b-card>
      </b-collapse>
    </div>
    <div>
      <h2>Search Result: </h2>
      <span v-for="player_details in playerList" :key="player_details">
        <player-preview
        :PlayerFullName="player_details.name"
        :teamName="player_details.team_name"
        :playerPosition="player_details.player_position"        
        :image_url="player_details.player_image_url"        
        ></player-preview>
      </span>
      <span v-for="team_details in teamList" :key="team_details">
        <TeamPreview
        :TeamFullName="team_details.name"
        :logo_path="team_details.team_logo_path"        
        ></TeamPreview>
      </span>
    </div>  
  </div> 
</template>

<script>

import PlayerPreview from "../components/PlayerPreview.vue";
import TeamPreview from "../components/TeamPreview.vue";

export default {
  name: "SearchPage",
  components:{
    PlayerPreview,
    TeamPreview
  },
  data() {
    return {
      searchQueryText:"",
      searchQueryTextAddition:"",
      selected: null,
      isTeamVisible: false,
      inputPositionFilter: null,
      inputTeamNameFilter: "",
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
      let copyTeamArr = this.$store.state.players;
      return this.$store.actions.sort_player_by_team_name(copyTeamArr);
    },

    filterByPosition(){
      // if(this.inputPositionFilter != ''){
        // this.$store.state.temp_store_players = this.$store.state.players;
        // if(this.$store.state.filter_dict.length == 0){
          // this.$store.state.filter_dict[''] = this.$store.state.players;
        // }
        // this.$store.state.filter_dict[this.inputPositionFilter] = this.$store.state.players;
        this.$store.state.players =  this.$store.actions.filter_players(this.$store.state.players, this.inputPositionFilter ,"position");
      // }
      // else{
      //   this.$store.state.players = this.$store.state.filter_dict[''];
      //   this.$store.state.filter_dict[''] = {};
      // }
    },

    filterByTeamName(){
      // if(this.inputTeamNameFilter != ''){
      //   this.$store.state.temp_store_players = this.$store.state.players;
      //   try {
      this.$store.state.players = this.$store.actions.filter_players(this.$store.state.players, this.inputTeamNameFilter,"team_name");
      //   } catch (error) {
          
      //   }
      // }
      // else{
      //   if(this.$store.state.players.length <= this.$store.state.temp_store_players.length){
      //     this.$store.state.players = this.$store.state.temp_store_players;
      //   }
      // }
    },

    handleVisibility() {
      let vis = document.getElementById("collapse-1");
      vis.style.display = "none";
      this.isTeamVisible = true;
    },

    handleVisibilityOfResult(result) {
      
      document.getElementById("sort").style.display = "none";
      document.getElementById("filter").style.display = "none";
      document.getElementById(result).style.display = "block";
      
    },

    handleVisibility_inner(tagName) {
      let vis = document.getElementById(tagName);
      let vis1 = document.getElementById("positionTagCollapse");
      let vis2 = document.getElementById("teamNameTag");      
      vis1.style.display = "none";
      vis2.style.display = "none";
      if(tagName == 'playerNameTag'){
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
          // pathToSearch = document.getElementById("collapse-2").value;
          path_and_variables = `/teams/${this.searchQueryText}`
        }
        else{ //only by name
          // pathToSearch = document.getElementById("playerNameTag").value;
          path_and_variables = `/players/${this.searchQueryText}`
        }
        
        // close collapse
        document.getElementById("collapse-1").style.display = "none";


        let urlPath = "http://localhost:3000/search" + path_and_variables;
        
        // urlPath,{
        //     params: params_from_user
        //   },
        const response = await this.axios.get(
          urlPath,
          {withCredentials: true},
        );
        if(this.isTeamVisible == true){
          for(let i =0; i <response.data.length; i++){
            this.$store.actions.add_team(response.data[i]);
            this.$store.state.players = [];
          }
        }
        else{
          for(let i =0; i <response.data.length; i++){
            this.$store.actions.add_player(response.data[i]);
            this.$store.state.teams = [];
          }
        }
        
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
</style>