const net = require("net");

const server = net.createServer((socket) => {
  // 'socket' is the client that has connected

  // Send a message to the client
  //   socket.socket.socket;

  //   write("Hello, client!\n");

  // Listen for data from the client
  //   socket.socket.socket;

  socket.on("data", (data) => {
    // 'data' is the message sent by the client

    // Print the message to the console
    console.log(`Received message from client: ${data}`);

    // Send a response back to the client
    socket.write("Thanks for sending a message!\n");
  });
});

// Start the server on port 8000
server.listen(8000);
