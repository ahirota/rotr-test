export const state = () => ({
  loggedIn: false,
  uid: null,
  email: null
});

export const getters = {};

export const mutations = {
  setLoggedInStatus (state, value) {
    state.loggedIn = value;
  },
  setUserProps (state, userObj) {
    state.uid = userObj.uid;
    state.email = userObj.email;
  },
  resetUserProps (state) {
    state.uid = null;
    state.email = null;
  }
};

export const actions = {
  async setUserFirebaseEntry ({ commit, state, rootState }, parameters) {
    try {
      const userRef = this.$fire.firestore.collection('users').doc(parameters.uid);
      await userRef.set(parameters, { merge: true });
    } catch (error) {
      // Add Some Error Handling
      console.error('Error writing to document: ', error);
    }
  },
  async loginSetup ({ dispatch, commit, state, rootState }) {
    try {
      const provider = new this.$fireModule.auth.GoogleAuthProvider();
      await this.$fire.auth.signInWithPopup(provider);
      if (!this.$fire.auth.currentUser.emailVerified) {
        console.log('Unauthorized User.');
        await this.$fire.auth.signOut();
        return false;
      }
      commit('setLoggedInStatus', true);
      commit('setUserProps', this.$fire.auth.currentUser);
      await dispatch('setUserFirebaseEntry', {
        loggedIn: true,
        uid: this.$fire.auth.currentUser.uid,
        name: this.$fire.auth.currentUser.displayName,
        email: this.$fire.auth.currentUser.email,
        defaultIcon: this.$fire.auth.currentUser.photoURL
      });
      return true;
    } catch (error) {
      console.error('Error logging in: ', error);
      return false;
    }
  },
  async logoutCleanup ({ dispatch, commit, state, rootState }) {
    try {
      await dispatch('setUserFirebaseEntry', { loggedIn: false, uid: state.uid });
      await this.$fire.auth.signOut();
      commit('setLoggedInStatus', false);
      commit('resetUserProps');
    } catch (error) {
      console.error('Error logging out: ', error);
    }
  }
};
