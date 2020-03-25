window.onload = function () {

    const { MESSAGES } = CONFIG;

    const socket = io('http://localhost:3000');
    
    function sendMessage() {
        const name = document.getElementById('name').value;
        const message = document.getElementById('message').value;
        socket.emit(MESSAGES.NEW_MESSAGE, { name, message });
    }

    function newMessage(data) {
        let chat = document.getElementById('chat');
        let div = document.createElement('div');
        div.innerHTML = `<b>${data.name}</b>: ${data.message}`;
        chat.appendChild(div);
    }

    function auth() {
        const login = document.getElementById('login').value;
        const password = document.getElementById('password').value;
        if (login && password) {
            socket.emit(MESSAGES.USER_LOGIN, { login, password });
        }
    }

    document.getElementById('newMessage').addEventListener('click', sendMessage);
    document.getElementById('userLogin').addEventListener('click', auth);

    socket.on(MESSAGES.NEW_MESSAGE, newMessage);
    socket.on(MESSAGES.USER_LOGIN, data => console.log(data));
};