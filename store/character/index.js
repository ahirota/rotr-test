export const state = () => ({
  characters: [],
  listenerUnsubscribe: null
});

export const getters = {

};

export const mutations = {
  setCharacters (state, value) {
    state.characters = value;
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
  getUserCharacters ({ dispatch, commit, state, rootState }) {
    const unsubscribe = this.$fire.firestore.collection('characters')
      .where('user', '==', rootState.user.uid)
      .onSnapshot((querySnapshot) => {
        const characters = [];
        querySnapshot.forEach(function (doc) {
          characters.push({
            id: doc.id
          });
        }, (error) => {
          console.error(error);
        });
        commit('setCharacters', characters);
      });
    commit('SET_LISTENER_UNSUBSCRIBE', unsubscribe);
  }
};
