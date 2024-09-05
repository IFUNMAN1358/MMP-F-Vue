import SockJS from 'sockjs-client';

const socket = new SockJS(`${process.env.VUE_APP_BACK_BASE_URL}/ws`);

export default socket;