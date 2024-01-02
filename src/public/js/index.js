const socket = io();
let user;
let chatBox = document.getElementById('chatBox');

Swal.fire({
    title: "Identificate",
    input: "text",
    text: "Ingrese el usuario para indentificarte en el chat",
    inputValidator: (value) => {
        return !value && "Necesitas escribir u nnombre de usuario para continuar!"
    },
    allowOutsideClick: false

}).then(result => {
    user = result.value
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