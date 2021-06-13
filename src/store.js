const state = {
  server_domain: "localhost:3000/",
  league: "superliga",
  league_id: 217,
  players: [],
  players_counter: 0
};

const actions = {

  add_player: (new_player) => {
    if (new_player === "")
      return
    state.players.push({
      player_name: new_player.name,
      player_team_name: new_player.team_name,
      player_position: new_player.position.data.name,
      player_image_url: new_player.image
    });
    actions.count_players()
  },
  remove_player: () => {
    state.players.pop()
    actions.count_players()
  },
  count_players: () => {
    state.players_counter = state.players.length
  },
  initiate: () => {
    [].forEach(player => {
      actions.add_player(player)
    });
  }
}

export { state, actions };