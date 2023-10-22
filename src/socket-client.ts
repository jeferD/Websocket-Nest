import {Manager, Socket} from 'socket.io-client'

let socket:Socket
export const connectToServer = (token: string) =>{
    // http://localhost:3008/socket.io/socket.io.js
    const manager = new Manager('http://localhost:3000/socket.io/socket.io.js', {
        extraHeaders:{
            authentication: token
        }
    });
    socket?.removeAllListeners()

    socket = manager.socket('/');
    console.log('socket: ', {socket});
    addListeners()
}

const addListeners = () => {
    const serverStatusLabel = document.querySelector('#server-status')!
    const clientsUl = document.querySelector('#clients-ul')!

    // socket.on//escuchar el servidor
    // socket.emit//es emitir algo al servidor

    const messageForm = document.querySelector<HTMLFormElement>('#message-form')!
    const messageInput = document.querySelector<HTMLInputElement>('#message-input')!
    const messageUl = document.querySelector<HTMLUListElement>('#messages-ul')!

    socket.on('connect',()=>{//cuando se conectan al socket coloca esto
        console.log('Conectado desde el addListener')
        serverStatusLabel.innerHTML='conectado'
    })

    socket.on('disconnect',()=>{//cuando se des conectan al socket coloca esto
        console.log('Des-conectado desde el addListener')
        serverStatusLabel.innerHTML='desconectado'

    })

    socket.on('clients-updated', (cliens: string[])=> {//cuando hay una peticion con este identificador clients-updated
        console.log('cliens: ', cliens);
        let clientsHtml = ''
        cliens.forEach(clientId =>{
            clientsHtml +=`
                <li>${clientId}</li>
            `

        })

        clientsUl.innerHTML = clientsHtml
    })

    messageForm.addEventListener('submit', (event)=>{
        event.preventDefault();
        if(messageInput.value.trim().length <= 0){
            return 
        }
        console.log({id: 'Yo', message: messageInput.value})
        socket.emit('message-from-client', {id: 'Yo', message: messageInput.value})
        messageInput.value = ''
    })


    socket.on('message-from-server', (payload: {fullName: string, message: string}) =>{
        console.log(payload)
        const newMessage =`
            <li>
                <strong> ${payload.fullName}: </strong>
                <span> ${payload.message}</span>
            </li>
        `

        const li = document.createElement('li')
        li.innerHTML = newMessage;
        messageUl.append(li)
    })
}