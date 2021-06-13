const state = {
  server_domain: "localhost:3000/",
  league: "superliga",
  league_id: 217,
  players: [],
  players_ids: [],
  players_counter: 0,
};

const actions = {

  add_player: (new_player) => {
    if (new_player === "")
      return
    if(state.players_ids.includes(new_player.id)){
      return
    }
    state.players.push({      
      player_name: new_player.name,
      player_team_name: new_player.team_name,
      player_position: new_player.position.data.name,
      player_image_url: new_player.image
    });
    state.players_ids.push( new_player.id,);
    actions.count_players()
  },
  remove_player: () => {
    state.players.pop()
    actions.count_players()
  },
  count_players: () => {
    state.players_counter = state.players.length
  },
  sort_players(arr_to_sort){
    return arr_to_sort.sort(function compareFn(firstEl, secondEl) {
      var nameA = firstEl.name.toUpperCase(); // ignore upper and lowercase
      var nameB = secondEl.name.toUpperCase(); // ignore upper and lowercase
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      // names must be equal
      return 0;

    });
  },
  filter_players(arr_to_filter, object){
    return arr_to_filter.filter(function(el) {
      return el.toLowerCase().indexOf(object.toLowerCase()) !== -1
  })

  },
  initiate: () => {
    [].forEach(player => {
      actions.add_player(player)
    });
  }
}

export { state, actions };