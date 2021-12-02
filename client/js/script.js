// WebSocket var -- wss when from https
const url = "ws://localhost:5000/chat"; // change ws to wss when using https
const socket = new WebSocket(url, ["soap", "wamp"]);

// DOM elements
const messages = document.getElementById("messages");
const msgInput = document.getElementById("message");
const sendButton = document.getElementById("send");

sendButton.disabled = true;
sendButton.addEventListener("click", () => sendMsg(), false);

// client send msg
function sendMsg() {
    const text = msgInput.value;
    msgGeneration(text, "Client");
    socket.send(text);
}


// elements to show received messages in the browser
function msgGeneration(msg, from) {
    const Message = document.createElement("h5");
    Message.innerText = `${from} says: ${msg}`;
    messages.appendChild(Message);
}

// changing state of sendButton
socket.onopen = function(event) {
    sendButton.disabled = false;
    console.log("WebSocket connection established");
}

// msg event handler
socket.onmessage = function(event) {
    const { data } = event;
    msgGeneration(data, "Server")
}

socket.onerror = function(error) {
    console.error(`[error] ${error.message}`);
  };