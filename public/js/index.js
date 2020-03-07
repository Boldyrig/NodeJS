window.onload = function () {

    const { MESSAGES } = CONFIG;

    const socket = io('http://localhost:3000');
    
    function sendMessage() {
        let name = document.getElementById('name').value;
        let message = document.getElementById('message').value;
        socket.emit(MESSAGES.NEW_MESSAGE, { name, message });
    }

    function newMessage(data) {
        let chat = document.getElementById('chat');
        let div = document.createElement('div');
        div.innerHTML = `<b>${data.name}</b>: ${data.message}`;
        chat.appendChild(div);
    }

    document.getElementById('newMessage').addEventListener('click', sendMessage);

    socket.on(MESSAGES.NEW_MESSAGE, newMessage);
};