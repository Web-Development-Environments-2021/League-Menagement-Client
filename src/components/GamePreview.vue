<template>
  <div class="game-preview">
    <div :title="id" class="game-title">
      <b>Game Id:</b> {{ id }}
    </div>
    <ul class="game-content">
      <li> hostTeam: {{ hostTeam }}</li>
      <li> guestTeam: {{ guestTeam }}</li>
      <li> date: {{ date }}</li>
      <li> time: {{ hour }}</li>
      <b-button color="primary" size="button--size-l" @click="addFavorite(id)">add to favorite</b-button>
    </ul>
  </div>
</template>

<script>
// import ButtonPlugin from "../main";
// import Vue from "vue";
// import {
// ButtonPlugin
// } from "bootstrap-vue";
// [
//  ButtonPlugin
// ].forEach((x) => Vue.use(x));
import Vue from "vue";
  import { BButton } from 'bootstrap-vue';
  Vue.component('b-button', BButton);
  import vueButtonEffect from 'vue-button-effect';
Vue.use(vueButtonEffect);
export default {

  name: "GamePreview",
  props: {
      id: {
        type: String,
        required: true
      },
      hostTeam: {
        type: String,
        required: true
      },
      guestTeam: {
        type: String,
        required: true
      },
      date: {
        type: String,
        required: true
      },
      hour: {
        type: String,
        required: true
      }
  }, 
  methods:{
    async addFavorite(id){
      try {
        const response = await this.axios.post(
          "http://localhost:3000/users/addFavoriteGames",{"game_id":id},{withCredentials: true}
        );
      } catch (error) {
        console.log("error in update games")
        console.log(error);
      }
    }
  },
  mounted(){
    console.log("game preview mounted")
    
  } 
};
</script>

<style>
.game-preview {
  display: inline-block;
  width: 250px;
  height: 200px;
  position: relative;
  margin: 10px 10px;
  border-style: solid;
  border-radius: 10px;
  border-width: 5px;
  border-color:cadetblue;
}

.game-preview .game-title {
  text-align: center;
  text-transform: uppercase;
  color:  rgb(111, 197, 157);
}

.game-preview .game-content {
  width: 100%;
  overflow: hidden;
}



</style>
