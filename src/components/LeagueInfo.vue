<template>
    <div class="league-preview">
      <b-card
      img-alt="Image"
      tag="article"
      style="max-width: 20rem;"
      class="mb-2"
    >
      <b-card-title>{{leagueName}}</b-card-title>
      <b-card-text>
        Season: {{ season }}
        <br/>
        Stage: {{ stage }}
        <br/>
        nextGame: {{ nextGame }}
      </b-card-text>
      <b-button href="#" variant="primary">Go somewhere</b-button>
    </b-card>
  </div>
</template>

<script>
export default {
 data() {
    return {
      leagueName: "superliga", 
      season: "season", 
      stage: "stage",
      nextGame: "No Game For These Season"
    };
  },
  method:{
    async updateLeagueInfoDataFromServer(){
      try {
        const response = await this.axios.get("http://localhost:3000/leagu/getDetailse");
        this.leagueName = response.league_name;
        this.season = response.current_season_name;
        this.stage = response.current_stage_name;
        this.nextGame = response.home_team;
      } catch (error) {
        console.log(error.response);
      }
    }
  },
  beforeCreate() {
    updateLeagueInfoDataFromServer()
  },
}
</script>

<style>
.league-preview {
  display: inline-block;
  width: 350px;
  height: 220px;
  position: relative;
  margin: 10px 10px;
  border-style: solid;
  border-radius: 10px;
  border-width: 5px;
  border-color:rgb(44, 89, 116);
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