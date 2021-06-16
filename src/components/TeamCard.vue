<template>
  <div class="team-card">

  </div>
</template>

<script>

// import Vue from "vue";
//   import { BButton } from 'bootstrap-vue';
//   Vue.component('b-button', BButton);
//   import vueButtonEffect from 'vue-button-effect';
// Vue.use(vueButtonEffect);
export default {

  name: "TeamCard",
  props: {
    id:{
        type: Number,
        required: true
    }

  }, 
  methods:{
    async teamFullDetailes(id){
      try {
        if(id == -1){
          return;
        }
        const response = await this.axios.get(
          `http://localhost:3000/teams/teamFullDetails/${id}` ,{withCredentials: true}
        );
        // console.log(response)
      } catch (error) {
        console.log("error in teamFullDetailes")
        console.log(error);
      }
    }
  },
  mounted(){
   this.teamFullDetailes(this.id)
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
