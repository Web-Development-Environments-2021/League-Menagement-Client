<template>
  <div id="games-tables">
    <vue-bootstrap4-table
      :rows="rows"
      :columns="columns"
      :config="config"
      v-show="flagPast"
      :actions="actions"
      @switch-div="switchDiv">
    >
      <template slot="events" slot-scope="row">
        <popup
          button_name="events"
          :events_list="events"
          :game_id="row"
          @click="currGameId(row)"
        ></popup>
      </template>
      <b-button class="btn bg-transparent" variant="light" slot="home_team_name" slot-scope="row" @click="showTeam(row.row.home_team_name)">{{row.row.home_team_name}}</b-button>
       <b-button class="btn bg-transparent" variant="light" slot="away_team_name" slot-scope="row" @click="showTeam(row.row.away_team_name)">{{row.row.away_team_name}}</b-button>
       <img  slot="home_team_img" slot-scope="row"  :src="teams[row.row.home_team_name]" height=50 width=50/>
      <img slot="away_team_img"  slot-scope="row" :src="teams[row.row.away_team_name]" height=50 width=50 />
    </vue-bootstrap4-table>
    <vue-bootstrap4-table
      :rows="rows1"
      :columns="columns1"
      :config="config1"
      v-show="flagFuture"
      :actions="actions"
      @switch-div="switchDiv">
    >
      <b-button class="btn bg-transparent" slot="add_to_favorite" slot-scope="row" variant="light" @click="addFavorite(row.row.id)">❤</b-button>
      <b-button class="btn bg-transparent"  slot="home_team_name" slot-scope="row" variant="light" @click="showTeam(row.row.home_team_name)">{{row.row.home_team_name}}</b-button>
      <b-button class="btn bg-transparent" slot="away_team_name" slot-scope="row" variant="light" @click="showTeam(row.row.away_team_name)">{{row.row.away_team_name}}</b-button>
      <img slot="home_team_img" slot-scope="row" :src="teams[row.row.home_team_name]" height=50 width=50/>
      <img  slot="away_team_img"  slot-scope="row" :src="teams[row.row.away_team_name]" height=50 width=50 />
    </vue-bootstrap4-table>
  
 
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
      actions: [
          {
              btn_text: "Click here to change games period",
              event_name: "switch-div",
              class: "btn btn-primary my-custom-class",
              event_payload: {
                  msg: "my custom msg"
              }
          }
      ],
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
          game.date = game.date.split(":00.000Z")[0].replace('T',' ');
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
          game1.date = game1.date.split(":00.000Z")[0].replace('T',' ');
          this.rows1.push(game1);
        });
      } catch (error) {
        console.log("error in update games");
        console.log(error);
      }
    },
    async showTeam(team_name){
      try {
        // console.log(team_name)
        const response2 = await this.axios.get(
          `http://localhost:3000/search/teams/${team_name}`,{ withCredentials: true });
          this.$store.state.team_id = response2.data[0].team_id;
          this.$router.push("/TeamCard");

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
        this.futurGames();
        this.pastGames();

  },
  // updated() {
  //   this.show=false;
  // },

};
</script>
<style scoped>
</style>