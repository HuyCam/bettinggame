const socket = io();

socket.on('connect', (data) => {
    socket.emit('join', 'Client joined');
})

socket.on('update', () => {
    console.log('update result');
})