// (Node.js server)
const http = require("http");
const port = process.env.PORT || 8000;
const server = http.createServer().listen(port);
console.log(`listening on port ${port}`);
const events = require("events");
const ee = new events.EventEmitter();
function callback(response, data) {
  response.write(JSON.stringify({ dummy: "dummy", ...data }));
}
server.on("request", async function (request, response) {
  console.log(`METHOD: ${request.method}; URL: ${request.url}`);
  switch (request.method) {
    case "GET":
    case "PUT":
    case "POST":
    case "PATCH":
    case "DELETE":
      ee.emit("get", { get: "hello" });

      response.writeHead(200, {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*", // REQUIRED CORS HEADER
        "Access-Control-Allow-Headers":
          "Origin, X-Requested-With, Content-Type, Accept", // REQUIRED CORS HEADER
      });
      let aa = "";
      await ee.on("get", async (dd) => {
        console.log({ dd });
        aa = dd;
        ee.write(JSON.stringify({ dummy: "dummy", ...aa }));
        //callback(response, dd);
      });
      //   console.log({ aa });
      //   response.write(JSON.stringify({ dummy: "dummy", ...aa }));
      response.end();
      //response.write(JSON.stringify({ dummy: "dummy" }));

      break;
    case "OPTIONS": // THE CLIENT OCCASIONALLY - NOT ALWAYS - CHECKS THIS
      response.writeHead(200, {
        "Access-Control-Allow-Origin": "*", // REQUIRED CORS HEADER
        "Access-Control-Allow-Methods": "GET, POST, DELETE, PUT, PATCH", // REQUIRED CORS HEADER
        "Access-Control-Allow-Headers":
          "Origin, X-Requested-With, Content-Type, Accept", // REQUIRED CORS HEADER
      });
      response.end();
      break;
    default:
      response.writeHead(405, {
        "Content-Type": "application/json",
      });
      response.end(
        JSON.stringify({ error: `method ${request.method} not allowed` })
      );
      break;
  }
});
