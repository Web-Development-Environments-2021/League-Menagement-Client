<template>
  <div>
    <GamePreview
      v-for="g in games"
      :id="g.id" 
      :hostTeam="g.home_team_name" 
      :guestTeam="g.away_team_name" 
      :date="g.date" 
      :hour="g.time" 
      :key="g.id"></GamePreview>
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
      games: [
        {
          id:"25",
          home_team_name: "Maccabi Tel-Aviv",
          away_team_name: "Hapoel Beer-Sheva",
          date: "27/5/21",
          time: "20:00"
        },
        {
          id:"39",
          home_team_name: "Hapoel Tel-Aviv",
          away_team_name: "Maccabi Haifa",
          date: "29/5/21",
          time: "20:00"
        }
      ]
    };
  },
  methods: {
    async updateGames(){
      console.log("response");
      try {
        const response = await this.axios.get(
          "http://localhost:3000/users/getFavoriteGames",{withCredentials: true}
        );
        const games = response.data;
        this.games = [];
        this.games.push(...games);
        this.games.map(game=>{
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

<style></style>
