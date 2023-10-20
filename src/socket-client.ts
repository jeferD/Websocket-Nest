import {Manager} from 'socket.io-client'
export const connectToServer = () =>{
    // http://localhost:3008/socket.io/socket.io.js
    const manager = new Manager('http://localhost:3008/socket.io/socket.io.js');
    const socket = manager.socket('/');
    console.log('socket: ', {socket});
}