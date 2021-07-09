<template>
  <div class="card" style="width: 18rem">
    <div class="card-body">
      <h5 class="card-title" @click="show_player_data">{{ TeamFullName }}</h5>
      <br/>
      <img
      :src="`${logo_path}`"
      class="card-img-top"
      style="height: 200px; width: auto"
      @click="show_player_data"
      />
      <br/>
      <br/>
      <b-button id="show-btn" variant="info" @click="show_player_data">Get More Data</b-button>
      <!-- <a
        target="_blank"
        :href="`https://www.pokemon.com/us/pokedex/${TeamFullName}`"
        class="btn btn-primary"
        >Get more data</a
      > -->
    </div>
  </div>
</template>

<script>
export default {
  name: "TeamPreview",
  props: {
      TeamFullName: {
        type: String,
        required: true
      },
      logo_path: {
        type: String,
        required: true
      }
  }, 
   methods: {
    show_player_data(){
      //  this.$refs["pc"].$refs["mod"].show();
      this.$emit("fullDetailes")
    }
  },
  mounted(){
    console.log("team preview mounted");
  } 
};
</script>

<style>
.card {
   /* width: 18px;  */
  display: inline-block;
  margin: 10px;
}
</style>