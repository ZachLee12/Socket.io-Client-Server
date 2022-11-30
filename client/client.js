import { io } from "socket.io-client";

let usernameInput = document.querySelector("#usernameInput")
let sessionInput = document.querySelector("#sessionInput")
let chatBox = document.querySelector(".chatBox")

//global scope function
function appendMessage(message) {
    let newDiv = document.createElement("div")
    newDiv.classList.add("chat")
    newDiv.textContent = message;
    chatBox.append(newDiv);
}

//for now, only errors in (1)username and (2)session_id
let informError = (...args) => {
    args.forEach((msg) => {
        if (msg.value.trim() === "") {
            let error = document.createElement("div")
            error.classList.add("error")
            error.textContent = `${msg.placeholder} must not be empty!`
            document.querySelector(".errorBox").append(error)
            
            setTimeout(() => {
                error.remove();
            },1500)
        }
    })
}

const socket = io("ws://localhost:3000")

// send a message to the server
socket.on("connect", () => {
    socket.emit("connected", "Hi, I am client: " + socket.id)
})

//received message from server after successful connection
socket.on("confirmConnection", (message, user_id) => {
    console.log(message)
    appendMessage(`[Server]: ${message}`)
    appendMessage(`[Server]: Your ID is ${user_id}`)
})

socket.on("database", (...args) => {
   let msg = args.reduce((accummulator, current) => accummulator + " " + current)
    appendMessage(`[database]: INSERT ${msg}`)
})

document.querySelector("#sendUsername").addEventListener("click", () => {
    let username = usernameInput.value.trim()
    let session_id = sessionInput.value.trim()

    let regex = /^(?!\s*$).+/ //non-empty string
    let validation = (username.match(regex) && session_id.match(regex)) ? true : false;
    return validation ? socket.emit("sendData", username, session_id) : informError(usernameInput,sessionInput)
})

