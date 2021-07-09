<template>
  <div class="team-card">
      <img
      :src="`${team_logo}`"
      class="card-img-top"
      style="height: 200px; width: auto"/>
        <player-preview @fullDetailes="showFullPlayerDetailes(coach_detailes.id,-1)"
        :PlayerFullName="'Coach: ' + coach_detailes.name"       
        :image_url="coach_detailes.image"
        :flag="false"        
        ></player-preview>        
      <br/>
      <span v-for="(player,index) in squad" :key="player.id">
        <player-preview @fullDetailes="showFullPlayerDetailes(player.id,index)" 
        :PlayerFullName="player.name"       
        :image_url="player.image"
        :flag="false"        
        ></player-preview>
      </span>
      <games-tables :pGames="pGames" :fGames="fGames" v-if="mounted"></games-tables>
      <PlayerCard ref="pc"
      button_name="Get More Data"
      close_btn="Close Card"
      add_to_favorite="Add To Favorite"
      :fullDetailes="fullPlayer"
      :isCoache="isCoache"
      ></PlayerCard>
  </div>      
</template>

<script>
import gamesTables from "../components/gamesTables.vue"
import PlayerPreview from "../components/PlayerPreview.vue";
import PlayerCard from "../components/playerCard.vue";

export default {

  name: "TeamCard",
  components: {
        PlayerPreview,
        PlayerCard,
        gamesTables,
  // TeamCard
  },
  props: {

    id:{
        type: Number,
        // required: true
    },
  },
   data: function(){
  return{
      mounted:false,

      pGames:{
          type: Object,
          require: true,
      },
      fGames:{
          type: Object,
          require: true,
      },

    team_logo:{
        type: String,
        // required: true
    },
    coach_detailes:{
        type: String,
        // required: true
    },
    squad:{
        type: Array,
        // required: true
    },
    fullPlayer:{
      type:Array
    },
    isCoache:{
      type:Boolean
    }
  }
  }, 
  methods:{
    async showFullPlayerDetailes(id,index){
      if( index == -1){
        
      let urlPath = `http://localhost:3000/teams/coachFullDetails/${id}`;
      const response = await this.axios.get(
        urlPath,
        {withCredentials: true},
      );
      response.data[0].image_path = this.coach_detailes.image
      this.fullPlayer = [response,[this.coach_detailes]];
      this.isCoache = true;
      }
      else{
        let urlPath = `http://localhost:3000/teams/playerFullDetails/${id}`;
      const response = await this.axios.get(
        urlPath,
        {withCredentials: true},
      );
      this.fullPlayer = [response,[this.squad[index]]];
      this.isCoache = false;
      }
    },
    async getData (id){
      try {
        if(id == -1){
          console.log("shimon")
          return;
        }
        const response = await this.axios.get(
          `http://localhost:3000/teams/teamFullDetails/${id}` ,{withCredentials: true}
        );
        console.log(response)
        this.team_logo = response.data.team_logo;
        this.pGames = response.data.pastGames;
        this.fGames = response.data.futureGames;
        this.squad = response.data.squad;
        const coach_id = response.data.coach.coach_id;
        this.coach_detailes = await this.axios.get(`http://localhost:3000/teams/coachPreviewDetails/${coach_id}` ,{withCredentials: true});
        this.coach_detailes = this.coach_detailes.data[0]
        this.mounted = true;
        if (this.coach_detailes.image == null){
          this.coach_detailes.image = 'https://www.surfsoccer.com/wp-content/uploads/2019/09/SteveHill-1.png';
        }
        console.log(this.coach_detailes)
      } catch (error) {
        console.log("error in teamFullDetailes")
        console.log(error);
      }
    }
  },

  created(){
    this.getData(this.$store.state.team_id);  
  },


};
</script>

<style>
.team-card{
    overflow-y: auto;
}
/* .game-preview {
  display: inline-block;
  width: 250px;
  height: 200px;
  position: relative;
  margin: 10px 10px;
  border-style: solid;
  border-radius: 10px;
  border-width: 5px;
  border-color:cadetblue;
}

.game-preview .game-title {
  text-align: center;
  text-transform: uppercase;
  color:  rgb(111, 197, 157);
}

.game-preview .game-content {
  width: 100%;
  overflow: hidden;
} */



</style>
