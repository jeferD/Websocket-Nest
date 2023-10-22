import './style.css'
import { connectToServer } from './socket-client.ts';

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <h2> WEBSOCKET CLIENT  </h2>
    <input id="jwToken" placeholder= "Json Web Token"/>
    <button id="btnConnect">Conectarse</button>
    <br/>

    <span id="server-status">Offline</span>

    <ul id="clients-ul">

    </ul>

    <form id="message-form">
      <input placeholder="mensaje" id="message-input"></input>
    </form>

    <h3>Mensajes</h3>
    <ul id="messages-ul">
    </ul>
    
 </div>
`
// http://localhost:3008/socket.io/socket.io.js

// connectToServer();
const jwToken= document.querySelector<HTMLInputElement>('#jwToken')!
const btnConnect= document.querySelector<HTMLButtonElement>('#btnConnect')!

btnConnect.addEventListener('click', () => {
  if(jwToken.value.trim().length <= 0) return alert('Ingrese un token valido')
  connectToServer(jwToken.value);
})