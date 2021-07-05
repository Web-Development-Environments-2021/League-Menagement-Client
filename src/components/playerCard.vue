<template>
  <div>
    <b-button id="show-btn" @click="getPlayerFullData">Get More Data</b-button>
    <b-modal id="bv-modal-example" hide-footer>
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
      
      async getPlayerFullData(playerId){

        if(this.$store.state.show_player_card){
          this.$store.actions.change_show_player_card_status(false);
          this.$bvModal.hide('bv-modal-example');
          return;
        }
        this.$bvModal.show('bv-modal-example');
        console.log(playerId);
        let urlPath = `http://localhost:3000/teams/playerFullDetails/${playerId}`;
        const response = await this.axios.get(
          urlPath,
          {withCredentials: true},
        );
        this.playername= response.data.common_name;

        this.image_url =response.data.image_path;
        this.teamname=response.data.image_path;
        this.playerposition=response.data.image_path;
        this.common_name=response.data.image_path;                
        this.nationality=response.data.nationality;                
        this.birthcountry=response.data.birthcountry;
        this.birthdate=response.data.birthdate;               
        this.height=response.data.height;               
        this.weight=response.data.weight;
        return this.image_url;
      }
    }
  }
</script>

<style>

</style>