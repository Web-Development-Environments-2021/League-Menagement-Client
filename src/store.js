const state = {
  server_domain: "localhost:3000/",
  league: "superliga",
  league_id: 217,
  players: [],
  players_ids: [],
  players_counter: 0,
  teams: [],
  teams_ids: [],
  teams_counter: 0,
  temp_store_players: [],
  filter_dict: {},
  show_player_card: false,
};

const actions = {

  change_show_player_card_status: (status)=>{
      state.show_player_card = status;
  },

  add_player: (new_player) => {
    if (new_player === "")
      return
    if(state.players_ids.includes(new_player.id)){
      return
    }
    state.players.push({
      playerID: new_player.id,    
      name: new_player.name,
      team_name: new_player.team_name,
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
  sort_names(arr_to_sort){
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
  sort_player_by_team_name(arr_to_sort){
    return arr_to_sort.sort(function compareFn(firstEl, secondEl) {
      var nameA = firstEl.team_name.toUpperCase(); // ignore upper and lowercase
      var nameB = secondEl.team_name.toUpperCase(); // ignore upper and lowercase
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
  filter_players(arr_to_filter, object, option){
    // if(state.filter_dict.length == 0){
    //   state.filter_dict[object] = state.players;
    // }
     if(state.filter_dict.hasOwnProperty(object)){
        let ans = state.filter_dict[object];
        delete state.filter_dict.object;
        return ans;
      }
    if( option == "position" ){
      state.filter_dict[object] = arr_to_filter;
      return arr_to_filter.filter(function(el) {
        return el.player_position.toLowerCase().indexOf(object.toLowerCase()) !== -1
      });
    }
    else{
      state.filter_dict[object] = arr_to_filter;
      return arr_to_filter.filter(function(el) {
        return el.team_name.toLowerCase().indexOf(object.toLowerCase()) !== -1
      });
    }
  },

  add_team: (new_team) => {
    if (new_team === "")
      return
    if(state.teams_ids.includes(new_team.id)){
      return
    }
    state.teams.push({      
      team_id: new_team.team_id,
      name: new_team.team_name,
      team_logo_path: new_team.logo_path
    });
    state.teams_ids.push( new_team.id,);
    actions.count_teams()
  },
  remove_team: () => {
    state.teams.pop()
    actions.count_teams()
  },
  count_teams: () => {
    state.teams_counter = state.teams.length
  },

  initiate: () => {
    [].forEach(player => {
      actions.add_player(player)
    });
    [].forEach(team => {
      actions.add_team(team)
    });
  }
};

const logout = ()=>{

  console.log("logout2");
}

export { state, actions, logout};