<template>
  <div>
    <b-card-group class="favorites_content" style="top:120px; width:800px; left:25%;" deck>
      <b-card header-bg-variant="info" border-variant="dark"  header-text-variant="white" align="center">
        <template #header>
          <h4 class="mb-0">Favorites Games</h4>
        </template>
        <b-list-group>
          <b-container class="bv-example-row">
          <b-list-group-item>          
            <b-row>
              <b-col><b> Date </b> </b-col>
              <b-col><b> Time </b> </b-col>
              <b-col><b> Host </b> </b-col>
              <b-col><b> Score </b> </b-col>
              <b-col><b> Guest </b> </b-col>
            </b-row>           
        </b-list-group-item>
        <b-overlay :show="show" rounded="sm">            
        </b-overlay>
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
          </b-container>
        </b-list-group>
     </b-card >
    </b-card-group>
    <div>
      <b-alert :show="flag" variant="info" style="left: 25%;">
        <h4 class="alert-heading">Welcome to SuperLiga VUE site!</h4>
        <p>
          Aww yeah, you successfully read this important alert message.
          You can add favorites game to your favorites and see it here.
        </p>
        <hr>
        <p class="mb-0">
          Contact as Whenever you need.
        </p>
      </b-alert>
    </div>
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
      games: [],
      flag: false,
      show: true
    };
  },
  methods: {
    async updateGames(){
      try {
        const response = await this.axios.get(
          "http://localhost:3000/users/getFavoriteGames",{withCredentials: true}
        );
        const games = response.data;
        if(games == "There is no content to send for this request."){
          this.games=[];
          this.flag = true;
          return;
        }
        this.games = [];
        this.games.push(...games);       
        this.games.map(game=>{
          // console.log(new Date());
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
  },
  updated() {
    this.show=false;
  },
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

.b-alert{
  right: 100%;
  top: 200px;
}

</style>
