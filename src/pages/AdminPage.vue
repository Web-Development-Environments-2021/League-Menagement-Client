<template>
    <div class="admin-page">
        <button @click="showForm"> Insert New Game</button>
        <b-modal ref="gameForme" id="bv-modal-example" @hide="cleanForm" hide-footer>
        <select v-model="selectedAway">
        <option disabled value="">Please select Away Team</option>
        <option v-for="team in teams" :key="team.team_name">
            {{team.team_name}}
            <template slot="option">
                            <img :src="`${team.logo_path}`" class="card-img-top" style="height: 200px; width: auto"/>
            </template>
        </option>      
        </select>
        <span>Selected: {{ selectedAway }}</span>

        <select v-model="selectedHome">
        <option disabled value="">Please select Home Team</option>
        <option v-for="team in teams" :key="team.team_name">
            {{team.team_name}}
            <template slot="option">
                            <img :src="`${team.logo_path}`" class="card-img-top" style="height: 200px; width: auto"/>
            </template>
        </option>      
        </select>
        <span>Selected: {{ selectedHome }}</span>
        </b-modal>
    </div>
</template>
<script>

export default{
    name: "admin-page",
    data: function(){
        return{
        selectedAway: '',
        selectedHome: '',
        teams:[],

        }
    },
    methods: {
            async showForm(){
                this.$refs["gameForme"].show();
                let urlPath = `http://localhost:3000/teams/getAllTeamsByCountry/320`;
                const teams = await this.axios.get(
                        urlPath,{withCredentials: true});
                console.log(teams)
                this.teams = teams.data;
            },
            cleanForm(){
                this.selectedAway = '';
                this.selectedHome = '';
            }

        },
}
</script>