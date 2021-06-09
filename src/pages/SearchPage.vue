<template>
  <div>
    <div>
      <h1 class="title">Search Page</h1>
      <b-input-group prepend="Search Query:" id="search-input">
        <b-form-input v-model="searchQuery"></b-form-input>
        <b-input-group-append>
          <b-button variant="success">Search</b-button>
        </b-input-group-append>
      </b-input-group>
        <br/>
        Your search Query: {{ searchQuery }}
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
  </div>
  
</template>

<script>
export default {
  data() {
    return {
      searchQuery:"",
      selected: 'radio1',
      options: [
        { text: 'Search by player position', value: 'radio1' },
        { text: 'Search by player name', value: 'radio2' },
        { text: 'Radio 3 (disabled)', value: 'radio3', disabled: true },
        { text: 'Search Team by name', value: 'radio4' }
      ]
    }    
  },
  methods: {
    async search(){
      try{
        const response = await this.axios.post(
          "http://localhost:3000/search",
          {
            username: this.form.username,
            password: this.form.password
          }
        );
        console.log(response);
        this.$root.loggedIn = true;
        console.log(this.$root.store.login);
        this.$root.store.login(this.form.username);
        this.$router.push("/");
      } catch (err) {
        console.log(err.response);
        this.form.submitError = err.response.data.message;
      } 
    }
  },
  mounted(){
    console.log("search mounted");
    this.search();
  }
}
</script>

<style scoped>

#search-input {
  margin-left: 20px; 
  width: 500px; 
}
</style>