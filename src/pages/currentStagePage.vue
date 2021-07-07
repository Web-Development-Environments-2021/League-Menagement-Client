<template>
  <div id="currentStage">
    <div class="text-center">
    <b-button @click="returnToGames()" variant="info" v-if="team_id > -1"> Back to games</b-button>
    </div>
    <games-tables :pGames="pGames" :fGames="fGames" @teamClicked="updateTeamId($event)" v-if="mounted" ></games-tables>
    <team-card :id="team_id"  v-if="team_id > -1"></team-card>
  </div>
</template>


<script>

import gamesTables from "../components/gamesTables.vue"
import TeamCard from "../components/TeamCard.vue";
export default {
  name: "curr-stage",
  
  data (){
  return{
    mounted:false,
    team_id: -1,
    pGames:{
          type: Object,
          require: true,
      },
    fGames:{
          type: Object,
          require: true,
      },
  }
  },
  components: {
    gamesTables,
    TeamCard
    },
   methods: {
     returnToGames(){
      this.team_id = -1;
      this.mounted = true;
     },
     async getData(){
      this.pGames = await this.axios.get(
        "http://localhost:3000/league/getPastGame",
        { withCredentials: true }
      );
      this.pGames = this.pGames.data;
      console.log(this.pGames);
      this.fGames = await this.axios.get(
        "http://localhost:3000/league/getFutureGame",
        { withCredentials: true }
      );
      this.fGames = this.fGames.data;
      this.mounted = true;
    },
    updateTeamId(id){
      this.team_id = id;
      this.mounted = false;
    }
  },
  computed: {

  },

    created(){
      this.team_id = -1;
      this.getData();

    }

  
  };


</script>
<style scoped>
  button {
        display: inline-block;
        background-color: #12a9d6;
        border-radius: 10px;
        border: 4px double #cccccc;
        color: #eeeeee;
        text-align: center;
        font-size: 28px;
        padding: 20px;
        width: 400px;
        transition: all 0.5s;
        cursor: pointer;
        margin: 5px;
      }
      button span {
        cursor: pointer;
        display: inline-block;
        position: relative;
        transition: 0.5s;
      }
      button span:after {
        content: '\00bb';
        position: absolute;
        opacity: 0;
        top: 0;
        right: -20px;
        transition: 0.5s;
      }
      button:hover {
        background-color: #f7c2f9;
      }
      button:hover span {
        padding-right: 25px;
      }
      button:hover span:after {
        opacity: 1;
        right: 0;
      }
</style>