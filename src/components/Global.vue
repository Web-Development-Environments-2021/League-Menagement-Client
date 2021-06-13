<template>
  <div style="background-color: red; padding: 10px">
    <h2>
      I am global, here is the counter: {{ $store.state.players_counter }}
    </h2>
    <input
      type="text"
      v-model="new_player"
      placeholder="write pokemon's name"
    />
    <button @click="add_new_player">catch pokemon</button>
    <button @click="$store.actions.remove_player()">Pokemon go!</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      new_player: "",
    };
  },
  methods: {
    add_new_player() {
      this.$store.actions.add_player(this.new_player);
      debugger;
      this.new_player = "";
    },
  },
};
</script>

<style></style>