<template>
  <div class="card" style="width: 200px">
    <div class="card-body">
      <h5 class="card-title" @click="show_player_data">{{ PlayerFullName }}</h5>
      <br/>
      <img
      :src="`${image_url}`"
      class="card-img-top"
      style="height: 100px; width: 100px"
      @click="show_player_data"
      />
      <p class="card-text">
        <ul class="player-content" v-if="flag">
          <li> Team Name: {{ teamName }}</li>
          <li> Player Position: {{ playerPosition }}</li>
       </ul>  
      </p>
      <b-button id="show-btn" variant="info" @click="show_player_data">Get More Data</b-button>
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
      //  this.$refs["pc"].$refs["mod"].show();
      this.$emit("fullDetailes")
    }
  },
  mounted(){
    console.log("player preview mounted");
  } 
};
</script>

<style>

</style>