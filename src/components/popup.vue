<template>
  <div>
    <vue-modaltor
      :visible="open"
      @hide="open = false"
      bg-overlay="rgba(0,0,0,0.5)"
    >
      <template #header>
        <!--    add your custom header     -->
        <div>
          <button @click="open = false">x</button>
          <!-- <i class="closeicon">x</i> -->
        </div>
      </template>
      <template #body>
        <vue-bootstrap4-table :rows="rows" :columns="columns" :config="config">
        </vue-bootstrap4-table>
      </template>
    </vue-modaltor>
    <button @click="open = true">{{ button_name }}</button>
  </div>
</template>

<script>
import Vue from "vue";
import VueModalTor from "vue-modaltor/dist/vue-modaltor.common";
import "vue-modaltor/dist/vue-modaltor.css";
import VueBootstrap4Table from "vue-bootstrap4-table";

Vue.use(VueModalTor, {
  bgPanel: "#7957d5", // add custome options
});
export default {
  name: "popup",
  props: {
    button_name: {
      type: String,
      required: true,
    },
    events_list: {
      type: Array,
      required: true,
    },
     game_id: {
      type: Object,
      required: true,
    }
  },
   data: function () {
    return {
      rows: [

      ],
      columns: [
        {
          label: "event description",
          name: "type",
          filter: {
            type: "simple",
          },
          sort: true,
        },
        {
          label: "minute in the game",
          name: "minute",
          filter: {
            type: "simple",
            placeholder: "Enter minute",
          },
          sort: true,
        },
        {
          label: "date",
          name: "date",
          sort: true,
        },
        {
          label: "made by",
          name: "player_name",
          filter: {
            type: "simple",
            placeholder: "Enter player name",
          },
        },
      ],
      config: {
        checkbox_rows: true,
        rows_selectable: true,
        card_title: "events",
      },
     open: false,
    
    // game_id: 'kkk',
    };
  },
  components: {
    VueBootstrap4Table,
  },
  methods: {
    async events() {
      console.log("response");
     try {

         this.rows = [];
        console.log(this.game_id);

         this.rows = this.events_list.filter((event)=>{
          //  console.log(event.events_scheduleID===this.game_id);
          if(event.events_scheduleID===this.game_id.row.id+'001'||event.events_scheduleID===this.game_id.row.id+'002'||event.events_scheduleID===this.game_id.row.id+'003')
           return true;
         });

      } catch (error) {
        console.log("error in update games");
        console.log(error);
      }
    },
  },
  mounted() {
    this.events();
  },

};
</script>