<template>
  <div>
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
      <b-button v-b-toggle.collapse-1 variant="primary">Search player by name</b-button>
      <b-button v-b-toggle.collapse-2 @click="handleVisibility" variant="primary"
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
              <!-- <b-form-select-option value="5">Right central midfielder</b-form-select-option>
              <b-form-select-option value="6">Central midfielder</b-form-select-option>
              <b-form-select-option value="7">Left central midfielder</b-form-select-option>
              <b-form-select-option value="8">Right-winger</b-form-select-option>
              <b-form-select-option value="9">Central forward</b-form-select-option>
              <b-form-select-option value="10">Left-winger</b-form-select-option> -->
            </b-form-select>
             <!-- <div class="mt-2">Selected: <strong>{{ selected }}</strong></div> -->
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
      <h2>Search Result: </h2>
      <span v-for="player_details in playerList" :key="player_details">
        <player-preview
        :PlayerFullName="player_details.player_name"
        :teamName="player_details.player_team_name"
        :playerPosition="player_details.player_position"        
        :image_url="player_details.player_image_url"        
        ></player-preview>
      </span>
    </div>
  </div> 
</template>

<script>

import PlayerPreview from "../components/PlayerPreview.vue";


export default {
  name: "SearchPage",
  components:{
    PlayerPreview
  },
  data() {
    return {
      searchQueryText:"",
      searchQueryTextAddition:"",
      selected: null,
      isTeamVisible: false,
      // selected: 'radio1',
      options: [
        { text: 'Search player by position', value: '/players/:searchQuery/filterByPosition/:positionName'},
        { text: 'Search player by name', value: '/players/:searchQuery', checked:'checked'},
        { text: 'Search player by team name', value: '/players/:searchQuery/filterByTeam/:teamName' },
        { text: 'Search Team by name', value: '/teams/:searchQuery' }
      ],
    }    
  },
  computed: {
    playerList() { 
      return this.$store.state.players;
    },
  },
  methods: {

    handleVisibility() {
      let vis = document.getElementById("collapse-1");
      vis.style.display = "none";
      this.isTeamVisible = true;
      // if (vis.style.display === "none") {
        
      // } else {
      //   vis.style.display = "none";
      // }
    },

    handleVisibility_inner(tagName) {
      let vis = document.getElementById(tagName);
      let vis1 = document.getElementById("positionTagCollapse");
      let vis2 = document.getElementById("teamNameTag");
      // let vis3 = document.getElementById("playerNameTag");
      vis1.style.display = "none";
      vis2.style.display = "none";
      // vis3.style.display = "none";
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
        if(this.selected != null){ //position
          pathToSearch = document.getElementById("positionTag").value;
          params_from_user["positionName"] = this.selected;
        }
        else if(this.searchQueryTextAddition != ""){ //team Name
          pathToSearch = document.getElementById("teamNameTag").value;
          params_from_user["teamName"] = this.searchQueryTextAddition;
        }
        else if(this.isTeamVisible == true){ //search team
          pathToSearch = document.getElementById("collapse-2").value;
        }
        else{ //only by name
          pathToSearch = document.getElementById("playerNameTag").value;
        }
        
        // close collapse
        document.getElementById("collapse-1").style.display = "none";


        let urlPath = "http://localhost:3000/search" + pathToSearch;
        
        const response = await this.axios.get(
          urlPath,{
            params: params_from_user
          },
          {withCredentials: true},
        );
        for(let i =0; i <response.data.length; i++){
          this.$store.actions.add_player(response.data[i]);
        }
        // return response.data;
        this.answer_search_data = response.data;;
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
    this.search();
  },  
};

</script>

<style scoped>

#collapsed-2 > .when-open,
#collapsed-1 > .when-open {
  display: none;
}

#search-input {
  margin-left: 20px; 
  width: 500px; 
}
#btn-radios-2{
  background-color: #80120a;
  outline: none;
}
</style>