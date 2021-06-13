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
      </b-form-group>
    </div>
    <PlayerPreview
    v-bind:="asd in answer_search_data"
    :title="asd" 
    :teamName="asd" 
    :playerPosition="asd"
    :image_url="asd"></PlayerPreview>
  </div>
  
</template>

<script>
import PlayerPreview from "../components/PlayerPreview.vue";
export default {
  name: "SearchPage",
  compinents:{
    PlayerPreview
  },
  data() {
    return {
      searchQueryText:"",
      selected: 'radio1',
      options: [
        { text: 'Search player by position', value: '/players/:searchQuery/filterByPosition/:positionName'},
        { text: 'Search player by name', value: '/players/:searchQuery', checked:'checked'},
        { text: 'Search player by team name', value: '/players/:searchQuery/filterByTeam/:teamName' },
        { text: 'Search Team by name', value: '/teams/:searchQuery' }
      ]
    }    
  },
  methods: {
    async search(){
      try{
        let pathToSearch = Array.from(document.getElementsByName("radio-btn-outline")).find(r => r.checked).value;
        let urlPath = "http://localhost:3000/search" + pathToSearch;
        const response = await this.axios.get(
          urlPath,{
            params: {
              searchQuery: this.searchQueryText
            }
          },
          {withCredentials: true},
        );
        
        console.log("response", response);
        this.answer_search_data = response.data;
        // this.$root.loggedIn = true;
        // console.log(this.$root.store.login);
        // this.$root.store.login(this.form.username);
        // this.$router.push("/");
      } catch (err) {
        console.log(err);
      } 
    },
  },
  mounted(){
    console.log("search mounted");
    this.search();
  },

}
</script>

<style scoped>

#search-input {
  margin-left: 20px; 
  width: 500px; 
}
</style>