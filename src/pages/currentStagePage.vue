<template>
  <div id="app">
    <vue-bootstrap4-table :rows="rows" :columns="columns" :config="config">
      <template slot="events" slot-scope="row">
        <popup
          button_name="events"
          :events_list="events"
          :game_id="row"
          @click="currGameId(row)"
        ></popup>
      </template>
    </vue-bootstrap4-table>
  </div>
</template>


<script>
import VueBootstrap4Table from "vue-bootstrap4-table";
import popup from "../components/popup.vue";

export default {
  name: "currStage",
  data: function () {
    return {
      rows: [

      ],
      columns: [
        {
          label: "game_id",
          name: "game_id",
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
        this.rows = [];
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
    async currGameId(row) {
      this.game_id = row.row.id;

    },
  },
  computed: {},
  mounted() {
    this.pastGames();
  },
};
</script>
<style scoped>
</style>