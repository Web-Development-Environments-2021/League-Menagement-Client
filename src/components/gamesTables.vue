<template>
  <div id="games-tables">
    <div class="text-center">
      <br/>
      <b-button v-show="teamCardFlag==-1" @click="switchDiv()" variant="info">Click here to change games period</b-button>
      <br/>
      <br/>
      <!-- <h1 v-if="flagFuture"><b >Next Games</b></h1>
      <h1 v-if="flagPast"><b >Past Games</b></h1> -->
    </div>

    <vue-bootstrap4-table
      :rows="rows"
      :columns="columns"
      :config="config"
      v-show="flagPast"
    >

      <template slot="events" slot-scope="row">
        <popup
          button_name="events"
          :events_list="events"
          :game_id="row"
          @click="currGameId(row)"
        ></popup>
      </template>
      <template slot="home_team_name" slot-scope="row">
      <a @click="showTeam(row.row.home_team_name)">{{row.row.home_team_name}}</a>
      </template>
      <template slot="away_team_name" slot-scope="row">
      <a @click="showTeam(row.row.away_team_name)">{{row.row.away_team_name}}</a>
      </template>
      <template slot="home_team_img" slot-scope="row" >
        <img :src="teams[row.row.home_team_name]" height=50 width=50/>
      </template>
      <template slot="away_team_img"  slot-scope="row" >
        <img :src="teams[row.row.away_team_name]" height=50 width=50 />
      </template>
    </vue-bootstrap4-table>

    <vue-bootstrap4-table
      :rows="rows1"
      :columns="columns1"
      :config="config1"
      v-show="flagFuture"
    >
     <template slot="add_to_favorite" slot-scope="row">
      <button @click="addFavorite(row.row.id)" style="padding: 0;border: none;background: none;">❤</button>
      </template>
      <template slot="home_team_name" slot-scope="row">
      <a @click="showTeam(row.row.home_team_name)">{{row.row.home_team_name}}</a>
      </template>
      <template slot="away_team_name" slot-scope="row">
      <a @click="showTeam(row.row.away_team_name)">{{row.row.away_team_name}}</a>
      </template>
      <template slot="home_team_img" slot-scope="row" >
        <img :src="teams[row.row.home_team_name]" height=50 width=50/>
      </template>
      <template slot="away_team_img"  slot-scope="row" >
        <img :src="teams[row.row.away_team_name]" height=50 width=50 />
      </template>
    </vue-bootstrap4-table>
    <!-- <team-card :id="teamCardFlag" v-if="teamCardFlag>-1"></team-card> -->
  </div>
</template>


<script>
import VueBootstrap4Table from "vue-bootstrap4-table";
import popup from "../components/popup.vue";
// import TeamCard from "../components/TeamCard.vue";

export default {
  name: "games-tables",
  // router,
    components: {
    VueBootstrap4Table,
    // TeamCard,
    popup,
  },
  props:{
      pGames:{
        default(){
          return{
            data:0
          }
        }
      },
      fGames:{
        default(){
          return{
            data:0
          }
        }
      },
  },
  data: function () {
    return {
      flagFuture: true,
      flagPast: false,
      teamCardFlag: -1,
      teams:{},
      rows: [],
      columns: [
        {
          label: "game_id",
          name: "id",
          filter: {
            type: "simple",
            placeholder: "Enter game_id",
          },
        }, 
        {
          label: "date",
          name: "date",
          sort: true,
          filter: {
            type: "simple",
            placeholder: "Enter field name",
          },
        },
       
{
          label: "",
          name: "away_team_img",
        },
        {
          label: "away_team_name",
          name: "away_team_name",
          filter: {
            type: "simple",
            placeholder: "Enter away team name",
          },
          sort: true,
        },{
          label: "away_score",
          name: "away_score",
          filter: {
            type: "simple",
            placeholder: "Enter away score",
          },
        },{
          label: "Winner",
          name: "winner",
          filter: {
            type: "simple",
            placeholder: "Enter winner team",
          },
        },
        {
          label: "home_score",
          name: "home_score",
          filter: {
            type: "simple",
            placeholder: "Enter home score",
          },
        },
        {
          label: "home_team_name",
          name: "home_team_name",
          filter: {
            type: "simple",
            placeholder: "Enter home team name",
          },
          sort: true,
        },
       
        {
          label: "",
          name: "home_team_img",
         
        },
         {
          label: "field",
          name: "field",
          filter: {
            type: "simple",
            placeholder: "Enter field name",
          },
        },
        {
          label: "League Name",
          name: "league_name",
          filter: {
            type: "simple",
            placeholder: "Enter league name",
          },
        },
        
        {
          label: "Events",
          name: "events",
        },
      ],
      config: {
        checkbox_rows: true,
        rows_selectable: true,
        card_title: "Past Games",
      },
      rows1: [],
      columns1: [
       {
          label: "game_id",
          name: "id",
          filter: {
            type: "simple",
            placeholder: "Enter game_id",
          },
        }, 
        {
          label: "date",
          name: "date",
          sort: true,
          filter: {
            type: "simple",
            placeholder: "Enter field name",
          },
        },
       
{
          label: "",
          name: "away_team_img",
        },
        {
          label: "away_team_name",
          name: "away_team_name",
          filter: {
            type: "simple",
            placeholder: "Enter away team name",
          },
          sort: true,
        },
        {
          label: "home_team_name",
          name: "home_team_name",
          filter: {
            type: "simple",
            placeholder: "Enter home team name",
          },
          sort: true,
        },
       
        {
          label: "",
          name: "home_team_img",
         
        },
         {
          label: "field",
          name: "field",
          filter: {
            type: "simple",
            placeholder: "Enter field name",
          },
        },
        {
          label: "League Name",
          name: "league_name",
          filter: {
            type: "simple",
            placeholder: "Enter league name",
          },
        },
        {
          label: "",
          name: "add_to_favorite",
        },
      ],
      config1: {
        checkbox_rows: true,
        rows_selectable: true,
        card_title: "Future Games",
      },
      events: [],
      game_id: {},
    };
  },

  methods: {
    async pastGames() {
      console.log("response");
      try {
        const response = this.pGames;
        if(this.pGames.games_info==[0]){
          return;
        }
        console.log(response)
        response.games_info.map((game) => {
          game.date = game.date.split(":00.000Z")[0];
          this.rows.push(game);
        });
        this.events = response.events_info;
      } catch (error) {
        console.log("error in update games");
        console.log(error);
      }
    }, 
   async futurGames() {
      console.log("response");
      try {
        const response1 = this.fGames;
        if(this.fGames==[0]){
          return;
        }
        console.log(this.fGames);
        response1.map((game1) => {
          game1.date = game1.date.split(":00.000Z")[0];
          this.rows1.push(game1);
        });
      } catch (error) {
        console.log("error in update games");
        console.log(error);
      }
    },
    async showTeam(team_name){
      try {
        const response2 = await this.axios.get(
          `http://localhost:3000/search/teams/${team_name}`,{ withCredentials: true });
          console.log(response2)
        this.$emit('teamClicked', response2.data[0].team_id);

      } catch (error) {
        console.log("error in update games");
      }
    },

    async currGameId(row) {
      this.game_id = row.row.id;
    },
    async switchDiv() {
      this.flagFuture = !this.flagFuture;
      this.flagPast = !this.flagPast;

    },
    async addFavorite(id){
      try {
        const response = await this.axios.post(
          "http://localhost:3000/users/addFavoriteGames",{"game_id":id},{withCredentials: true}
        );
        alert(response.data)

      } catch (error) {
        console.log("error in update games")
        console.log(error);
      }
    },
    async getTeams(){
      try{
          let urlPath = `http://localhost:3000/teams/getAllTeamsByCountry/320`;
            const teams = await this.axios.get(
                    urlPath,{withCredentials: true});
            let teamsDict = {};
            for (const team of teams.data){
                teamsDict[team.team_name] = team.logo_path;
            }
            this.teams = teamsDict;
            this.$store.state.teams_details = teamsDict;

            console.log(teams)
      }catch(error) {
        console.log("error in update games")
        console.log(error);
      }
    }
  },
  created(){
        this.getTeams();

  },
  mounted() {
    this.futurGames();
    this.pastGames();

  },
};
</script>
<style scoped>
</style>