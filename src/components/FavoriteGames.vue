<template>
  <div>
    <!-- <h1 class="title">Favorite Games</h1> -->
    <span  v-for="g in games" :key="g.id">
    <GamePreview class="content"     
      :id="g.id" 
      :hostTeam="g.home_team_name" 
      :guestTeam="g.away_team_name" 
      :date="g.date" 
      :hour="g.time" 
      :key="g.id"
      :isFavorite="true"></GamePreview>
    </span>
  </div>
</template>

<script>
import GamePreview from "./GamePreview.vue";
export default {
  name: "FavoriteGames",
  components: {
    GamePreview
  }, 
  data() {
    return {
      games: []
    };
  },
  methods: {
    async updateGames(){
      try {
        const response = await this.axios.get(
          "http://localhost:3000/users/getFavoriteGames",{withCredentials: true}
        );
        const games = response.data;
        this.games = [];
        this.games.push(...games);
        this.games.map(game=>{
          // console.log(game.date);
          // console.log(new Date());
          let date = Date(game.date.replace('Z', ''));
          console.log(date);
          let splited = game.date.split('T');
          game.date = splited[0];
          game.time = splited[1].split(':00.000Z')[0];
        })
        console.log(response);
      } catch (error) {
        console.log("error in update games")
        console.log(error);
      }
    }
  }, 
  mounted(){
    console.log("favorite games mounted");
    this.updateGames(); 
  }
};
</script>


<style>

.title{
  top: 10px;
  text-align: center;
}

.content{
  left: 25%;
  top: 200px;
}

</style>
