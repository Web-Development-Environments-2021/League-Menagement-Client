<template>
    <div id="app">
        <vue-bootstrap4-table :rows="rows" :columns="columns" :config="config">
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
                "id":'17948787',
                "league_name":'Superliga',
                "winner":'Draw'
                    }],
                columns: [{
                        label: "away_team_name",
                        name: "away_team_name",
                        filter: {
                            type: "simple",
                            placeholder: "id"
                        },
                        sort: true,
                    },
                    {
                        label: "home_team_name",
                        name: "home_team_name",
                        filter: {
                            type: "simple",
                            placeholder: "Enter first name"
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
                            placeholder: "Enter country"
                        }
                        },

                    {
                        label: "away_score",
                        name: "away_score",
                        filter: {
                            type: "simple",
                            placeholder: "Enter country"
                        }
                        },
                    {
                        label: "home_score",
                        name: "home_score",
                        filter: {
                            type: "simple",
                            placeholder: "Enter country"
                        }
                        },
                    {
                        label: "id",
                        name: "id",
                        filter: {
                            type: "simple",
                            placeholder: "Enter country"
                        }
                        },
                    {
                        label: "league_name",
                        name: "league_name",
                        filter: {
                            type: "simple",
                            placeholder: "Enter country"
                        }
                        },
                    {
                        label: "winner",
                        name: "winner",
                        filter: {
                            type: "simple",
                            placeholder: "Enter country"
                        
                        },
                    }],
                config: {
                    checkbox_rows: true,
                    rows_selectable: true,
                    card_title: "Vue Bootsrap 4 advanced table"
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
            this.rows.push(game)
        })
        console.log(this.rows)
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