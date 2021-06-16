<template>
  <div class="card" style="width: 18rem">
    <div class="card-body">
      <h5 class="card-title">{{ TeamFullName }}</h5>
      <br/>
      <img
      :src="`${logo_path}`"
      class="card-img-top"
      style="height: 200px; width: auto"
      />
      <!-- <p class="card-text">
        <ul class="team-content">
          <li> Team Name: {{ TeamFullName }}</li>
       </ul>  
      </p> -->
      <a
        target="_blank"
        :href="`https://www.pokemon.com/us/pokedex/${TeamFullName}`"
        class="btn btn-primary"
        >Get more data</a
      >
    </div>
    
  </div>
</template>

<script>
export default {
  name: "PlayerPreview",
  props: {
    //   id: {
    //     type: Number,
    //     required: true
    //   },
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
    get_image(player_name) {
      try {
        Pokemon.getSprite(player_name);
        return "johan"; 
      } catch (err) {
        return "https://assets.pokemon.com/assets/cms2/img/pokedex/full/158.png";
      }
    },
  },
  mounted(){
    console.log("team preview mounted");
  } 
};
</script>

<style>
.card {
  /* width: 18rem; */
  display: inline-block;
  margin: 10px;
}
</style>