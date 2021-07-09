<template>
  <div id="currentStage">
    <games-tables :pGames="pGames" :fGames="fGames" v-if="mounted" ></games-tables>
  </div>
</template>


<script>

import gamesTables from "../components/gamesTables.vue"
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
        width: 300px;
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
        background-color: #31bb1fe8;
      }
      button:hover span {
        padding-right: 25px;
      }
      button:hover span:after {
        opacity: 1;
        right: 0;
      }
</style>