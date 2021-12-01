// WebSocket var
const url = "ws://localhost:3000/WebSocketTest"
const wsServerTest = new WebSocket(url)

// DOM elements
const messages = document.getElementById("messages")
const msgInput = document.getElementById("message")
const sendButton = document.getElementById("send")

sendButton.disabled = true
sendButton.addEventListener("click", sendMsg, false)

// client send msg
function sendMsg() {
    const text = msgInput.value
    msgGeneration(text, "Client")
    wsServerTest.send(text)
}


// elements to show received messages in the browser
function msgGeneration(msg, from) {
    const Message = document.createElement("h4")
    Message.innerText = `${from} says: ${msg}`
    messages.appendChild(Message)
}

// changing state of sendButton
wsServerTest.onopen = function() {
    sendButton.disabled = false
    console.log('WebSocket Client Connected');
}

// msg event handler
wsServerTest.onmessage = function(event) {
    const { data } = event
    msgGeneration(data, "Server")
}