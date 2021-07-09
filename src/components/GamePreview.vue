<template>
<div>    
    <b-list-group-item class="favorites_content" v-if="isFavorite">
        <b-row>
          <b-col >{{ date }} </b-col>
          <b-col >{{ hour }} </b-col>
          <b-col >{{ hostTeam }}</b-col>
          <b-col>--</b-col>
          <b-col>{{ guestTeam }}</b-col>
        </b-row>    
    </b-list-group-item>

  <div class="game-preview" v-if="!isFavorite">
    <div :title="id" class="game-title"> 
      <b>Game Id:</b> {{ id }}
        <button @click="addFavorite()" style="padding: 0;border: none;background: none;"  v-if="!isFavorite" >❤</button>
        
    </div>    
  <div class="row">
    <div class="col">
<img :src="hostImg" height=50 width=50 :alt="hostTeam"  style="text-align:left">
Home: {{ hostTeam }} 
    
    </div>
    <div class="col">
      <img :src="guestImg" height=50 width=50 :alt="guestTeam" style="text-align:right">
       Away: {{ guestTeam }}
      
    </div>

   </div>


        

        
        <li> date: {{ date }}</li>
        <li> time: {{ hour }}</li>
        <br/>

    </div>
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
      },
      isFavorite:{
        type: Boolean,
        default: false,
      },
      hostImg:{
        type:String
      },
      guestImg:{
        type:String
      }
  }, 
  methods:{
    async addFavorite(){
      try {
        const response = await this.axios.post(
          "http://localhost:3000/users/addFavoriteGames",
          {"game_id":this.id},
          {withCredentials: true}
        );
        alert(response.data)

      } catch (error) {
        console.log(error);
      }
    }
  },
  mounted(){
    console.log("game preview mounted")
  },
};
</script>

<style>

.game-preview {
  display: inline-block;
  width: 400px;
  height: 150px;
  position: relative;
  margin: 10px 10px;
  border-style: solid;
  border-radius: 10px;
  border-width: 5px;
  background: whitesmoke;
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

.favorites_content{
  position: relative;
}


</style>
