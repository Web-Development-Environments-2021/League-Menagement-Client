<template>
    <div class="league-preview">
      <b-card
      img-src="https://www.wheretobet.net/wp-content/uploads/2019/12/where-to-bet-danish-superliga.jpg"
      img-alt="Image"
      img-top
      tag="article"
      style="max-width: 20rem;"
      class="mb-2"
      >
      <!-- <b-card-title>{{leagueName}}</b-card-title> -->
      <b-card-text>
        <strong>Season: </strong>{{ season }}
        <br/>
        <strong>Stage: </strong> {{ stage }}
        <br/>
        <GamePreview
        v-for="g in nextGame"
        :id="g.id" 
        :hostTeam="g.hostTeam" 
        :guestTeam="g.guestTeam" 
        :date="g.date" 
        :hour="g.hour" 
        :key="g.id"></GamePreview>
      </b-card-text>
    </b-card>
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
      leagueName: "superliga",
      season: "season", 
      stage: "stage",
      nextGame: []
    };
  },
  methods:{
    async updateLeagueInfoDataFromServer(){
      try {
        const response = await this.axios.get("http://localhost:3000/league/getDetails");
        console.log("res", response);
        console.log("liga", response.data.league_name);
        this.leagueName = response.data.league_name;
        this.season = response.data.current_season_name;
        this.stage = response.data.current_stage_name;
        this.nextGame = [
        {
          id:response.data.nextGame,
          hostTeam: response.data.home_team,
          guestTeam: response.data.away_team,
          date: response.data.date, //.toISOString().replace(/T/, ' ').replace(/\..+/, ''),
          hour: response.data.date //.toISOString().replace(/T/, ' ').replace(/\..+/, '')
        },
      ]
      // document.getElementById("nextGameBtn").disabled = true;
      } catch (error) {
        console.log(error.response);
      }
    }
  },
  mounted() {
    this.updateLeagueInfoDataFromServer();
  },
}
</script>

<style>
.league-preview {
  display: inline-block;
  width: 330px;
  height: 441px;
  position: relative;
  margin: 10px 10px;
  border-style: solid;
  border-radius: 10px;
  border-width: 5px;
  border-color:rgb(44, 89, 116);
  /* background: transparent; */
}

.league-preview .league-title {
  text-align: center;
  text-transform: uppercase;
  color:  rgb(111, 155, 197);
}

.league-preview .league-content {
  width: 100%;
  overflow: hidden;
}

</style>