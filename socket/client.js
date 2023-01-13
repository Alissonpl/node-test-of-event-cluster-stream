const net = require("net");

// Create a connection to the server on localhost, port 8000
const client = net.createConnection(8000, "localhost");

// Listen for data from the server
client.on("data", (data) => {
  // 'data' is the message sent by the server

  // Print the message to the console
  console.log(`Received message from server: ${data}`);
});

// Send a message to the server
client.write("Hello, server!\n");
