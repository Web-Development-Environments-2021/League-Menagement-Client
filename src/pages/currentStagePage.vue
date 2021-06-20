<template>
  <div id="currentStage">
    <div class="text-center">
      <button @click="switchDiv()">Click here to change games period</button>
    </div>

    <vue-bootstrap4-table
      :rows="rows"
      :columns="columns"
      :config="config"
      v-show="flag"
    >
      <template slot="events" slot-scope="row">
        <popup
          button_name="events"
          :events_list="events"
          :game_id="row"
          @click="currGameId(row)"
        ></popup>
      </template>
    </vue-bootstrap4-table>
    <vue-bootstrap4-table
      :rows="rows1"
      :columns="columns1"
      :config="config1"
      v-show="!flag"
    > <template slot="add_to_favorite" slot-scope="row">
      <button @click="addFavorite(row.row.id)">add to favorite</button>
      </template>
    </vue-bootstrap4-table>
  </div>
</template>


<script>
import VueBootstrap4Table from "vue-bootstrap4-table";
import popup from "../components/popup.vue";
import TeamCard from "../components/TeamCard.vue"

export default {
  name: "currStage",
  // router,
  data: function () {
    return {
      flag: true,
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
          label: "date",
          name: "date",
          sort: true,
          filter: {
            type: "simple",
            placeholder: "Enter field name",
          },
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
          label: "away_score",
          name: "away_score",
          filter: {
            type: "simple",
            placeholder: "Enter away score",
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
          label: "League Name",
          name: "league_name",
          filter: {
            type: "simple",
            placeholder: "Enter league name",
          },
        },
        {
          label: "Winner",
          name: "winner",
          filter: {
            type: "simple",
            placeholder: "Enter winner team",
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
        card_title: "Past games",
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
          label: "date",
          name: "date",
          sort: true,
          filter: {
            type: "simple",
            placeholder: "Enter field name",
          },
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
        card_title: "Future games",
      },
      events: [],
      game_id: {},
    };
  },
  components: {
    VueBootstrap4Table,
    
    popup,
  },
  methods: {
    async pastGames() {
      console.log("response");
      try {
        const response = await this.axios.get(
          "http://localhost:3000/league/getPastGame",
          { withCredentials: true }
        );
        response.data.games_info.map((game) => {
          game.date = game.date.split(":00.000Z")[0];
          this.rows.push(game);
        });
        this.events = response.data.events_info;
      } catch (error) {
        console.log("error in update games");
        console.log(error);
      }
    },
    async futurGames() {
      console.log("response");
      try {
        const response1 = await this.axios.get(
          "http://localhost:3000/league/getFutureGame",
          { withCredentials: true }
        );
        console.log(response1.data);
        response1.data.map((game1) => {
          game1.date = game1.date.split(":00.000Z")[0];
          this.rows1.push(game1);
        });
      } catch (error) {
        console.log("error in update games");
        console.log(error);
      }
    },
    async currGameId(row) {
      this.game_id = row.row.id;
    },
    async switchDiv() {
      this.flag = !this.flag;
    },
    async addFavorite(id){
      try {
        const response = await this.axios.post(
          "http://localhost:3000/users/addFavoriteGames",{"game_id":id},{withCredentials: true}
        );
      } catch (error) {
        console.log("error in update games")
        console.log(error);
      }
    }
  },
  mounted() {
    this.futurGames();
    this.pastGames();

  },
};
</script>
<style scoped>

</style>