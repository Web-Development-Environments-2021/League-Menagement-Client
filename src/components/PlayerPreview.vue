<template>
  <div class="card" style="width: 200px">
    <div class="card-body">
      <h5 class="card-title">{{ PlayerFullName }}</h5>
      <br/>
      <img
      :src="`${image_url}`"
      class="card-img-top"
      style="height: 100px; width: 100px"
      />
      <p class="card-text">
        <ul class="player-content" v-if="flag">
          <li> Team Name: {{ teamName }}</li>
          <li> Player Position: {{ playerPosition }}</li>
       </ul>  
      </p>
      <b-button id="show-btn" @click="show_player_data">Get More Data</b-button>

      <!-- <PlayerCard 
      button_name="Get More Data"
      close_btn="Close Card"
      add_to_favorite="Add To Favorite"
      :playerId="player_id"
      ></PlayerCard> -->
    </div>
  </div>
</template>

<script>

// import PlayerCard from "../components/playerCard.vue";

export default {
  name: "PlayerPreview",
  components:{
    // PlayerCard
  },
  data(){
    return{
      show_player_card:true,
    }
  },
  props: {
      PlayerFullName: {
        // type: String,
        required: true
      },
      player_id:{
        type: Number,
      },
      teamName: {
        type: String,
      },
      playerPosition: {
        type: String,
      },
      image_url: {
        type: String,
        required: true
      },
      showDetailes:{
        type: Boolean
      },
      flag:{
        type: Boolean
      }
  }, 
  methods: {
    show_player_data(){
      this.$emit("fullDetailes")
    }
  },
  mounted(){
    console.log("player preview mounted");
  } 
};
</script>

<style>
/*.card {
  width: 18px;
   display: inline-block; 
  margin: 10px;
}*/
</style>