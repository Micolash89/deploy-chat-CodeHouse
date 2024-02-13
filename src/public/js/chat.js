(() => {

    const app = document.querySelector('.app');
    const socket = io();
    const message = document.getElementById('message-input');

    const sendButton = document.getElementById("send-message");
    const join = document.getElementById('join-user');
    const nameUser = document.getElementById('name');


    const form = document.querySelector('form');
    let uname;

    Swal.fire({
        title: "Identificate",
        input: "text",
        text: "Ingrese el usuario para indentificarte en el chat",
        inputValidator: (value) => {
            return !value && "Necesitas escribir un nombre de usuario para continuar!"
        },
        allowOutsideClick: false,
        customClass: {
            title: 'tittle-container',
            confirmButton: 'my-button'
        },
        background: "#f5f5dc"

    }).then(result => {
        uname = result.value
        socket.emit('newuser', uname);
        //app.querySelector('.join-screen').classList.remove('active');
        app.querySelector('.chat-screen').classList.add('active');
    });


    form.addEventListener('submit', (e) => {

        e.preventDefault();

        // sendButton.addEventListener('click', () => {

        if (!message.value.length) return;

        renderMessage('my', {
            username: uname,
            text: message.value
        });

        socket.emit('chat', {
            username: uname,
            text: message.value
        });

        message.value = '';

        // });
    });

    app.querySelector('.chat-screen #exit-chat').addEventListener('click', () => {

        socket.emit('exituser', uname);
        window.location.href = window.location.href;

    });

    socket.on('update', (update) => {

        renderMessage('update', update);

    });

    socket.on('chat', (message) => {

        renderMessage('other', message);

    });

    function renderMessage(type, message) {
        let messageContainer = app.querySelector(".chat-screen .messages");

        if (type == 'my') {
            let el = document.createElement('div');
            el.setAttribute('class', 'message my-message');
            el.setAttribute('id', 'my-message');

            el.innerHTML = `
                <div>
                    <div class="name">Tu</div>
                    <div class="text">${message.text}</div>
                </div>
            `;
            messageContainer.appendChild(el);
        } else if (type == 'other') {
            let el = document.createElement('div');
            el.setAttribute('class', 'message other-message');
            el.setAttribute('id', 'other-message');
            el.innerHTML = `
                <div>
                    <div class="name">${message.username}</div>
                    <div class="text">${message.text}</div>
                </div>
            `;
            messageContainer.appendChild(el);
        } else if (type == 'update') {
            let el = document.createElement('div');
            el.setAttribute('class', 'update');
            el.innerText = message;
            messageContainer.appendChild(el);
        }

        messageContainer.scrollTop = messageContainer.scrollHeight - messageContainer.clientHeight;

    };

})();