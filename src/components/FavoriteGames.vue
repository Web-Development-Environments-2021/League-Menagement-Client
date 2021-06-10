<template>
  <div>
    <GamePreview
      v-for="g in games"
      :id="g.id" 
      :hostTeam="g.home_team_name" 
      :guestTeam="g.away_team_name" 
      :date="g.date" 
      :hour="g.date" 
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
          hour: "20:00"
        },
        {
          id:"39",
          home_team_name: "Hapoel Tel-Aviv",
          away_team_name: "Maccabi Haifa",
          date: "29/5/21",
          hour: "20:00"
        }
      ]
    };
  },
  methods: {
    async updateGames(){
      console.log("response");
      try {
        const response = await this.axios.get(
          "http://localhost:3000/users/getFavoriteGames",{
            withCredentials: true // If true, send cookie stored in jar
        },);
        const games = response.data;
        // let away ="";
        // let home ="";
        // for( let i = 0; i < games.length; i++){
        //   away = games[i].away_team_name; 
        //   home = games[i].home_team_name;
        //   delete games[i].away_team_name; 
        //   delete games[i].home_team_name;
        //   games[i]["hostTeam"] = home;
        //   games[i]["guestTeam"] = away;
        //   games[i]["id"] = parseInt(games[i].id, 10)
        // }
        this.games = [];
        this.games.push(...games);
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
