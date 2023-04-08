import { io } from 'socket.io-client';

const URL =  window.location.hostname + ':3000';

export const socket = io(URL);