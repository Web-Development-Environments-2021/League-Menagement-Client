<template>
    <div>
        <button @click="open = true">{{ button_name }}</button>
        <vue-modaltor 
        :visible="open"
        @hide="open = false"
        bg-overlay="rgba(0,0,0,0.5)"
        >
        <b-button id="show-btn" @click="showModal">Open Modal</b-button>
        <b-button id="toggle-btn" @click="toggleModal">Toggle Modal</b-button>

        <b-modal centered ref="my-modal" hide-footer title="Using Component Methods">
        <div class="d-block text-center">
            <h3>Hello From My Modal!</h3>
        </div>
        <b-button class="mt-3" variant="outline-danger" block @click="hideModal">Close Me</b-button>
        <b-button class="mt-2" variant="outline-warning" block @click="toggleModal">Toggle Me</b-button>
        </b-modal>
        </vue-modaltor>
        
    </div>
</template>

<script>
import Vue from "vue";
import VueModalTor from "vue-modaltor/dist/vue-modaltor.common";
import "vue-modaltor/dist/vue-modaltor.css";

Vue.use(VueModalTor, {
  bgPanel: "#7957d5", // add custome options
});

export default {
    data(){
        return{
            open: false,
        };
    },  
    methods: {
      showModal() {
        this.$refs['my-modal'].show()
      },
      hideModal() {
        this.$refs['my-modal'].hide()
      },
      toggleModal() {
        // We pass the ID of the button that we want to return focus to
        // when the modal has hidden
        this.$refs['my-modal'].toggle('#toggle-btn')
      }
    }
  }
</script>

<style>

</style>