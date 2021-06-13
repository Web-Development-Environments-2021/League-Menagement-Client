<template>
  <div class="card" style="width: 18rem">
    <div class="card-body">
      <h5 class="card-title">{{ PlayerFullName }}</h5>
      <br/>
      <img
      :src="`${image_url}`"
      class="card-img-bottom"
      style="height: 200px; width: auto"
      />
      <p class="card-text">
        <ul class="player-content">
          <li> Team Name: {{ teamName }}</li>
          <li> Player Position: {{ playerPosition }}</li>
       </ul>  
      </p>
      <a
        target="_blank"
        :href="`https://www.pokemon.com/us/pokedex/${PlayerFullName}`"
        class="btn btn-primary"
        >Get more data</a
      >
    </div>
    
  </div>
  <!-- <div>
    "get_image(PlayerFullName)"
   <b-card
    :title="playerFullName"
    :img-src="image_url"
    img-alt="Image"
    img-top
    tag="article"
    style="max-width: 20rem;"
    class="mb-2"
  >
  <b-card-text>
      
  </b-card-text>

  <b-button href="#" variant="primary">Go somewhere</b-button>
  </b-card> 
</div> -->
</template>

<script>
export default {
  name: "PlayerPreview",
  props: {
      PlayerFullName: {
        // type: String,
        required: true
      },
      teamName: {
        type: String,
        required: true
      },
      playerPosition: {
        type: String,
        required: true
      },
      image_url: {
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
    console.log("player preview mounted");
  } 
};
</script>

<style>
.card {
  width: 18rem;
  display: inline-block;
  margin: 10px;
}
</style>