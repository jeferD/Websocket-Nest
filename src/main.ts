import './style.css'
import { connectToServer } from './socket-client.ts';

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <h1> WEBSOCKET CLIENT  </h1>
    <span>Offline</span>

    
 </div>
`
connectToServer();
// http://localhost:3008/socket.io/socket.io.js
