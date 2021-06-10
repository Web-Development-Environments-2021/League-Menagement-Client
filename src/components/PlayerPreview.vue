<template>
  <div>
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
    <ul class="player-content">
      <li> Team Name: {{ teamName }}</li>
      <li> Player Position: {{ playerPosition }}</li>
    </ul>    
  </b-card-text>

  <b-button href="#" variant="primary">Go somewhere</b-button>
  </b-card>
</div>
</template>

<script>
export default {
  name: "PlayerPreview",
  props: {
      playerFullName: {
        type: String,
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
  mounted(){
    console.log("player preview mounted");
  } 
}
</script>

<style>

</style>