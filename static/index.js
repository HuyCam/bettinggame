const socket = io();

socket.on('connect', (data) => {
    socket.emit('join', 'Client joined');
})