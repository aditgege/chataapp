/*
*
*Aditia Dwi Pratomo 1942806
*Erio Hermawan 1942808
*
*
*/
import seen from "../utils/seen";

export const state = () => ({
  user: {},
  messages: [],
  users: [],
  seen: [],
  last_user_message: null
});

export const getters = {
  typingUsers: ({ users, user }) => users.filter(({ typingStatus, id }) => typingStatus && user.id !== id),
  typingStatus: ({ user }) => user.typingStatus,
};

export const mutations = {
  setUser(state, user) {
    state.user = user;
  },
  SOCKET_newMessage(state, msg) {
    state.messages = [...state.messages, msg];
  },
  SOCKET_updateUsers(state, users) {
    state.users = users;
  },
  SOCKET_updateSeen(state, messages) {
    state.seen = messages
  },
  
  clearData(state) {
    state.user = {};
    state.messages = [];
    state.users = [];
  },
  setTypingStatus(state, status) {
    state.user.typingStatus = status;
  },
  setMessageSeen(state, value) {
    state.user.seen = value
  }
};

export const actions = {
  socketEmit(_, { action, payload }) {
    return this._vm.$socket.emit(action, payload);
  },
  createMessage({ dispatch, state }, msg) {
    const { user } = state;
    const payload = {
      msg,
      id: user.id,
    };
    dispatch("socketEmit", {
      action: "createMessage",
      payload,
    });
  },
  joinRoom({ dispatch, state }) {
    const { user } = state;

    dispatch("socketEmit", {
      action: "joinRoom",
      payload: user,
    });
  },
  leftRoom({ commit, dispatch }) {
    dispatch("socketEmit", {
      action: "leftChat",
      payload: null,
    });

    commit("clearData");
  },
  setTypingStatus({ dispatch, commit, state }, typingStatus) {
    commit("setTypingStatus", typingStatus);
    const { user } = state;
    dispatch("socketEmit", {
      action: "setTypingStatus",
      payload: user,
    });
  },

  async addSeen({ dispatch, state }, msg) {
    const { user } = state;
    const payload = {
      msg,
      id: user.id,
    };
    dispatch("socketEmit", {
      action: "addSeen",
      payload,
    });
  },

  async createUser({ commit, dispatch }, user) {
    const { id } = await dispatch("socketEmit", {
      action: "createUser",
      payload: user,
    });
    
    commit("setUser", { id, ...user });
  },
  SOCKET_reconnect({ state, dispatch }) {
    const { user } = state;
    if (Object.values(user).length) {
      const { id, ...userInfo } = user;
      dispatch('createUser', userInfo);
      dispatch('joinRoom');
    }
  },
};
