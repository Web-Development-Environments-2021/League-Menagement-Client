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
    <!-- <div>
       <b-form-group
        label="Please choose your option that fit to your search"
        v-slot="{ ariaDescribedby }"
      >
        <b-form-radio-group
          id="btn-radios-2"
          v-model="selected"
          :options="options"
          :aria-describedby="ariaDescribedby"
          button-variant="outline-primary"
          size="lg"
          name="radio-btn-outline"
          buttons
        ></b-form-radio-group>
      <b-form-input v-model="searchQueryTextAddition" id="additionInput"
      placeholder="Please insert your text here" style="width: 250px; display:none"></b-form-input>
      </b-form-group>
    </div> 
    <div class="mt-2">Selected: <strong>{{ selected }}</strong></div>
        <b-card>
          <p class="card-text">Collapse contents Here</p>
          <b-button v-b-toggle.collapse-1-inner size="sm">Toggles Inner Collapse</b-button>
          <b-collapse id="collapse-1-inner" class="mt-2">
            <b-card>Hello!</b-card>
          </b-collapse>
        </b-card>
    
    
    -->
    <div>
      <b-button v-b-toggle.collapse-1 variant="primary">Search player by name</b-button>
      <b-button v-b-toggle.collapse-2 variant="primary">Search Team by name</b-button>
      <b-collapse id="collapse-1" class="mt-2">
        <b-card>
          <p class="card-text">Collapse contents Here</p>
          <b-button v-b-toggle.collapse-1-inner size="sm">Search player by position</b-button>
          <b-collapse id="collapse-1-inner" class="mt-2">
            <b-form-select v-model="selected" class="mb-3" style="width: 250px">
              <b-form-select-option :value="null">Please select an option</b-form-select-option>
              <b-form-select-option value="1"> Keeper</b-form-select-option>
              <b-form-select-option value="2">Right-back</b-form-select-option>
              <b-form-select-option value="34">Central defender</b-form-select-option>
              <b-form-select-option value="4">Left-back</b-form-select-option>
              <b-form-select-option value="5">Right central midfielder</b-form-select-option>
              <b-form-select-option value="6">Central midfielder</b-form-select-option>
              <b-form-select-option value="7">Left central midfielder</b-form-select-option>
              <b-form-select-option value="8">Right-winger</b-form-select-option>
              <b-form-select-option value="9">Central forward</b-form-select-option>
              <b-form-select-option value="10">Left-winger</b-form-select-option>
            </b-form-select>
          </b-collapse>
          <br/><br/>
          <b-button v-b-toggle.collapse-2-inner size="sm">Search player by team name</b-button>
          <b-collapse id="collapse-2-inner" class="mt-3">
            <b-form-input v-model="searchQueryTextAddition" id="additionInput"
                placeholder="Please insert team name here" style="width: 250px;"></b-form-input>
          </b-collapse>

        </b-card>
      </b-collapse>

      <!-- <b-collapse id="collapse-2" class="mt-2">
        <b-card>
          <p class="card-text">Collapse contents Here</p>
          <b-button v-b-toggle.collapse-1-inner size="sm">Toggled Inner Collapse</b-button>
          <b-collapse id="collapse-2-inner" class="mt-2">
            <b-card>Hello!</b-card>
          </b-collapse>
        </b-card>
      </b-collapse> -->
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
    
    async search(){
      try{
        let pathToSearch = Array.from(document.getElementsByName("radio-btn-outline")).find(r => r.checked).value;
        let urlPath = "http://localhost:3000/search" + pathToSearch;
        console.log(urlPath);
        const response = await this.axios.get(
          urlPath,{
            params: {
              searchQuery: this.searchQueryText
            }
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

#search-input {
  margin-left: 20px; 
  width: 500px; 
}
#btn-radios-2{
  background-color: #80120a;
  outline: none;
}
</style>