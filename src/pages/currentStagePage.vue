<template>
  <div id="currentStage">
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
</style>