<template>
  <div>
    <!-- <b-button id="show-btn" @click="getPlayerFullData">Get More Data</b-button> -->
    <b-modal ref="mod" id="bv-modal-example" @show="getPlayerFullData" hide-footer>
      <template #modal-title>
        Using <code>$bvModal</code> Methods
      </template>
      <img
      :src="image_url"
      class="card-img-top"
      style="height: 200px; width: auto"
      />
      <div class="d-block text-center">
        <h3>Hello From This Modal!</h3>
      </div>
      <b-card no-body class="text-center">
        <div >
          Player Name : {{playername}}
        </div>
        <div class="bg-secondary text-light">
          This is some content without the default 
        </div>
        <div class="bg-secondary text-light">
          This is some content without the default.
        </div>
      </b-card>
      <b-button class="mt-3" block @click="$bvModal.hide('bv-modal-example')">{{add_to_favorite}}</b-button>
      <b-button class="mt-3" block @click="$bvModal.hide('bv-modal-example')">{{close_btn}}</b-button>
    </b-modal>
  </div>
</template>

<script>


export default {
    data(){
      return{
        image_url:"",
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
      playerId:{
        required: true,
      },
      fullDetailes:{
        type: Object
      }
    },
    // computed:{
     
      
    // },
    methods: {
       hide(){
              this.$bvModal.hide('bv-modal-example');
              this.$store.actions.change_show_player_card_status(false);
        },
        show_player_dataa(){
        if(!this.$store.state.show_player_card){
          this.$store.actions.change_show_player_card_status(true);
          return true;
        }
        return false;
      },
      
      async getPlayerFullData(){

        // if(this.$store.state.show_player_card){
        //   this.$store.actions.change_show_player_card_status(false);
        //   this.$bvModal.hide('bv-modal-example');
        //   return;
        // }
        // this.$bvModal.show('bv-modal-example');
        // console.log(playerId);
        // let urlPath = `http://localhost:3000/teams/playerFullDetails/${playerId}`;
        // const response = await this.axios.get(
        //   urlPath,
        //   {withCredentials: true},
        // );
        this.playername= this.fullDetailes.data.common_name;

        this.image_url =this.fullDetailes.data.image_path;
        this.teamname=this.fullDetailes.data.image_path;
        this.playerposition=this.fullDetailes.data.image_path;
        this.common_name=this.fullDetailes.data.image_path;                
        this.nationality=this.fullDetailes.data.nationality;                
        this.birthcountry=this.fullDetailes.data.birthcountry;
        this.birthdate=this.fullDetailes.data.birthdate;               
        this.height=this.fullDetailes.data.height;               
        this.weight=this.fullDetailes.data.weight;
        return this.image_url;
      }
    }
  }
</script>

<style>

</style>