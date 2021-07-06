<template>
  <div class="container">
    <h1 class="title">Welcome To SuperLiga</h1>
    <br>
    <h2 align="right">Favorite Games</h2>
    <LoginPage id="loginpage" v-if="!$root.store.username" ></LoginPage>
    <FavoriteGames id="favoritegames" v-else></FavoriteGames>
    
    <LeagueInfo id="leagueinfo" ></LeagueInfo>
  </div>
</template>

<script>
import LeagueInfo from "../components/LeagueInfo";
import FavoriteGames from "../components/FavoriteGames";
import LoginPage from "../pages/LoginPage";
export default {
  components: {
    LeagueInfo, 
    LoginPage, 
    FavoriteGames
  },
};
</script>

<style lang="scss" scoped>
#loginpage {
  position: absolute;
  right: 15%;
  top: 33%;
}

#leagueinfo{
  position: absolute;
  left: 15%;
  top: 20%;
}

#favoritegames{
  position: absolute;
  right: 18%;
  top: 10%;
}

.title{
  text-align: center;
}
.blur {
  -webkit-filter: blur(5px); /* Safari 6.0 - 9.0 */
  filter: blur(2px);
}
::v-deep .blur .recipe-preview {
  pointer-events: none;
  cursor: default;
}
</style>
