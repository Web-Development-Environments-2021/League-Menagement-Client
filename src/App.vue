<template>
  <div id="app">
    <b-navbar toggleable="lg" type="dark" variant="info">
      <b-navbar-brand :to="{ name: 'main' }">Superliga Vue</b-navbar-brand>
      <b-navbar-nav>
        <b-nav-item :to="{ name: 'search' }" exact-path>Search</b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav>
        <b-nav-item :to="{ name: 'currentStage' }" exact-path>Current stage</b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav>
        <b-nav-item :to="{ name: 'about' }">About</b-nav-item>
        <b-nav-item :to="{ name: 'AdminPage' }" v-if="$root.store.username=='admin'">League Menagment</b-nav-item>
        <b-nav-item-dropdown text="Personal" is-nav  v-if="$root.store.username">
        <b-dropdown-item :to="{ name: 'favorite'}">Favorites</b-dropdown-item>
      </b-nav-item-dropdown>
      </b-navbar-nav>

      
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="ml-auto" v-if="!$root.store.username">
          <b-nav-item>Hello Guest</b-nav-item>
          <b-nav-item :to="{ name: 'login' }">Login</b-nav-item>
          <b-nav-item :to="{ name: 'register' }">Register</b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav class="ml-auto" v-else>
        <b-nav-item-dropdown right>
          <template #button-content> 
            {{getUser}}
          </template>
          <b-dropdown-item :to="{ name: 'favorite'}">Favorites</b-dropdown-item>
          <b-dropdown-item @click="Logout">Log Out</b-dropdown-item>
        </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  data(){
    return {
      User: this.$root.store.username,
    }
  },

  computed:{
    getUser(){
      return this.$root.store.username;
    }
  },
  methods: {
    async Logout() {
      this.$root.store.logout(this.$root.store.username);
      this.$root.toast("Logout", "User logged out successfully", "success");
      
      // clear user search history
      this.$store.state.teams = [];
      this.$store.state.players = [];
      try {
        const response = await this.axios.post(
          "http://localhost:3000/Logout",
          {withCredentials: true} // If true, send cookie stored in jar
        );
      } catch (error) {
        console.log("logout good");
      }
      this.$router.push("/").catch(() => {
        this.$forceUpdate();
      });
    }
  },
  created() {
    this.$store.actions.initiate();
  },
};
</script>

<style lang="scss">
@import "@/scss/form-style.scss";

#app {
  // font-family: Avenir, Helvetica, Arial, sans-serif;
  background-image: url("./assets/background.jpg");
  /* Full height */
  height: 100%; 

  /* Center and scale the image nicely */
  // background-position: center;
  // background-repeat: no-repeat;
  background-size: cover;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  min-height: 100vh;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
