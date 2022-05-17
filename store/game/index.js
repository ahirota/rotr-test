export const state = () => ({
  games: [],
  listenerUnsubscribe: null
});

export const getters = {

};

export const mutations = {
  setGames (state, value) {
    state.games = value;
  },
  SET_LISTENER_UNSUBSCRIBE (state, val) {
    state.listenerUnsubscribe = val;
  },
  RESET_STORE (state) {
    state.listenerUnsubscribe();
    state.listenerUnsubscribe = null;
  }
};

export const actions = {
  getUserGames ({ dispatch, commit, state, rootState }) {
    const unsubscribe = this.$fire.firestore.collection('games')
      .where('users', 'array-contains', rootState.user.uid)
      .onSnapshot((querySnapshot) => {
        const games = [];
        querySnapshot.forEach(function (doc) {
          games.push({
            id: doc.id
          });
        }, (error) => {
          console.error(error);
        });
        commit('setGames', games);
      });
    commit('SET_LISTENER_UNSUBSCRIBE', unsubscribe);
  }
};
