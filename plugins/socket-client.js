/*
*
*Aditia Dwi Pratomo 1942806
*Erio Hermawan 1942808
*
*
*/
import Vue from 'vue';
import VueSocketIO from 'vue-socket.io';
import store from '../store';
import io from 'socket.io-client';

const socketInstance = io('/', {
  transports: ['websocket'],
  rejectUnauthorized: false,
  reconnection: true,
  reconnectionDelay: 1000,
  reconnectionDelayMax : 5000,
  reconnectionAttempts: 15,
});

export default ({ store }) => {
  Vue.use(new VueSocketIO({
    debug: true,
    connection: socketInstance,
    vuex: {
      store,
      actionPrefix: 'SOCKET_',
      mutationPrefix: 'SOCKET_',
    },
  }));
};