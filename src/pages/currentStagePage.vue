<template>
    <div id="app">
        <vue-bootstrap4-table :rows="rows" :columns="columns" :config="config">
                <template slot="events" >
      <button @click="open=true">events</button>

    </template>
        </vue-bootstrap4-table>
    </div>
    
</template>


<script>

import VueBootstrap4Table from 'vue-bootstrap4-table'

export default {
  name: 'App',
  data:function() {
       
            return {
                rows: [{
                        
                "away_score":1,
                "away_team_name":'Randers',
                "date":"Sun May 16 2021 14:00:00 GMT+0300 (Israel Daylight Time)",
                "field":'MCH Arena',
                "home_score":1,
                "home_team_name":'Midtjylland',
                "league_name":'Superliga',
                "winner":'Draw',
                "events":'',
                    }],
                columns: [{
                        label: "away_team_name",
                        name: "away_team_name",
                        filter: {
                            type: "simple",
                            placeholder: "Enter away team name"
                        },
                        sort: true,
                    },
                    {
                        label: "home_team_name",
                        name: "home_team_name",
                        filter: {
                            type: "simple",
                            placeholder: "Enter home team name"
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
                            placeholder: "Enter field name"
                        }
                        },

                    {
                        label: "away_score",
                        name: "away_score",
                        filter: {
                            type: "simple",
                            placeholder: "Enter away score"
                        }
                        },
                    {
                        label: "home_score",
                        name: "home_score",
                        filter: {
                            type: "simple",
                            placeholder: "Enter home score"
                        }
                        },
                    {
                        label: "League Name",
                        name: "league_name",
                        filter: {
                            type: "simple",
                            placeholder: "Enter league name"
                        }
                        },
                    {
                        label: "Winner",
                        name: "winner",
                        filter: {
                            type: "simple",
                            placeholder: "Enter winner team"
                        
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
                    card_title: "Past games"
                }
            }
        
       
    
  }, components: {
            VueBootstrap4Table
        },
  methods: {
    async pastGames(){
      console.log("response");
      try {
        const response = await this.axios.get(
          "http://localhost:3000/league/getPastGame",{withCredentials: true}
        );
        this.rows = [];
        response.data.games_info.map((game) =>{
            game.date = game.date.split(":00.000Z")[0]
            this.rows.push(game)
        })
      } catch (error) {
        console.log("error in update games")
        console.log(error);
      }
    }
  }, 
  mounted(){
    this.pastGames(); 
  }
};
</script>
<style scoped>

</style>