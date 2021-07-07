<template>
  <div>
    <!-- <b-button id="show-btn" @click="getPlayerFullData">Get More Data</b-button> -->
    <b-modal ref="mod" id="bv-modal-example" @hide="clear" hide-footer>
      <template #modal-title>
        {{playerFullname}}
      </template>
      <img
      :src="image_url"
      class="card-img-top"
      style="height: 200px; width: 250px; margin-left: 110px"
      />
      <div class="d-block text-center">
        <h3>Common Name: {{playername}}</h3>
      </div>
      <b-card no-body class="text-center">        
        <div class="bg-outline-secondary text-dark" v-if="!isCoache">
          Player Position: {{playerposition}}
        </div>
        <div class="bg-outline-secondary text-dark" >
          Team Name: {{teamname}}
        </div>
        <div class="bg-outline-secondary text-dark">
          Nationality: {{nationality}}
        </div>
        <div class="bg-outline-secondary text-dark">
          Birthdate: {{birthdate}} 
        </div>
        <div class="bg-outline-secondary text-dark" v-if="!isCoache">
          Heigt: {{height}}
        </div>
        <div class="bg-outline-secondary text-dark" v-if="!isCoache">
          Weigt: {{weight}}
        </div>
      </b-card>
      <b-button class="mt-3" variant="success"  block @click="$bvModal.hide('bv-modal-example')">{{add_to_favorite}}</b-button>
      <b-button class="mt-3" variant="primary" block @click="$bvModal.hide('bv-modal-example')">{{close_btn}}</b-button>
    </b-modal>
  </div>
</template>

<script>


export default {
    data(){
      return{
        image_url:"",
        playerFullname:"",
        playername:"",
        teamname:"",
        playerposition:"",
        common_name:"",                
        nationality:"",                
        birthcountry:"",
        birthdate:"",               
        height:"",               
        weight:"",
      }                
    },  
    props:{
      // button_name:{
      //   type: String,
      //   required: true,
      // },
      close_btn:{
        type: String,
        required: true,
      },
      add_to_favorite:{
        type: String,
        required: true,
      },
      // playerId:{
      //   required: true,
      // },
      fullDetailes:{
        type:Array
      },
      isCoache:{
        type:Boolean
      }
    },
    // computed:{
     
      
    // },
    watch:{
      fullDetailes(){
        this.playerFullname=this.fullDetailes[1][0].name;
        this.teamname=this.fullDetailes[1][0].team_name ;
        this.playerposition=this.fullDetailes[1][0].position;

        this.playername= this.fullDetailes[0].data[0].common_name;
        this.image_url =this.fullDetailes[0].data[0].image_path;
        this.nationality=this.fullDetailes[0].data[0].nationality;                
        this.birthcountry=this.fullDetailes[0].data[0].birthcountry;
        this.birthdate=this.fullDetailes[0].data[0].birthdate;               
        this.height=this.fullDetailes[0].data[0].height;               
        this.weight=this.fullDetailes[0].data[0].weight;

     
        this.$refs["mod"].show();  

      }
    },
    methods: {
      clear(){
        this.fullDetailes = [];
      },
      getPlayerFullData(){

        // let urlPath = `http://localhost:3000/teams/playerFullDetails/${playerId}`;
        // const response = await this.axios.get(
        //   urlPath,
        //   {withCredentials: true},
        // );
        if(this.fullDetailes[1] == undefined){
          return;
        }   
        this.playerFullname=this.fullDetailes[1][0].name;
        this.teamname=this.fullDetailes[1][0].team_name ;
        this.playerposition=this.fullDetailes[1][0].position;

        this.playername= this.fullDetailes[0].data[0].common_name;
        this.image_url =this.fullDetailes[0].data[0].image_path;
        this.nationality=this.fullDetailes[0].data[0].nationality;                
        this.birthcountry=this.fullDetailes[0].data[0].birthcountry;
        this.birthdate=this.fullDetailes[0].data[0].birthdate;               
        this.height=this.fullDetailes[0].data[0].height;               
        this.weight=this.fullDetailes[0].data[0].weight;

        return this.image_url;
      }
    }
  }
</script>

<style>

</style>