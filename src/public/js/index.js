(() => {

    const socket = io();
    let user;
    const chatBox = document.getElementById('chatBox');
    const nameUser = document.getElementById('name');

    Swal.fire({
        title: "Identificate",
        input: "text",
        text: "Ingrese el usuario para indentificarte en el chat",
        inputValidator: (value) => {
            return !value && "Necesitas escribir u nnombre de usuario para continuar!"
        },
        allowOutsideClick: false,
        customClass: {
            title: 'mi-titulo',
            confirmButton: 'mi-boton'
        },
        background: "#f5f5dc"

    }).then(result => {
        user = result.value
        nameUser.textContent = `Bienvenido ${user}`;
    });


    // chatBox.addEventListener('keyup', evt => {
    //     if (evt.key === "Enter") {
    //         if (chatBox.value.trim().legth > 0) {
    //             socket.emit('message', { user: user, message: chatBox.value });
    //             chatBox.value = "";
    //         }
    //     }
    // });

    chatBox.addEventListener('keyup', evt => {
        if (evt.key === "Enter") {
            if (chatBox.value.trim().length > 0) {
                socket.emit("message", { user: user, message: chatBox.value });
                chatBox.value = "";
            }
        }
    });

    socket.on('messageLogs', data => {
        let log = document.getElementById('messageLogs');
        let messages = "";
        data.forEach(message => {
            messages = messages + `${message.user} dice : ${message.message} </br>`
        });
        log.innerHTML = messages;
    })



})();
