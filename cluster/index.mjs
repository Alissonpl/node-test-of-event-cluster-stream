import cluster from "node:cluster";
import http from "node:http";
import { availableParallelism } from "node:os";
import process from "node:process";

const numCPUs = availableParallelism();

if (cluster.isPrimary) {
  console.log(`Primary ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  // When Worker process has died, Log the worker
  cluster.on("exit", (worker, code, signal) => {
    if (code !== 0 && !worker.exitedAfterDisconnect) {
      console.log(`Worker ${worker.process.pid} died`);
      cluster.fork();
    }
  });

  cluster.on("exit", (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
  });
} else {
  //   //Workers can share any TCP connection
  //   //In this case it is an HTTP server
  const server = http
    .createServer((req, res) => {
      try {
        // console.log(`Worker ${process.pid} started`);
        res.writeHead(200);
        res.end("hello world\n");
      } catch (error) {
        console.log("error!!", error);
        response.writeHead(500);
        response.end();
      }
    })
    .listen(8000);

  setTimeout(() => {
    process.exit(1);
  }, Math.random() * 1e4);

  console.log(`Worker ${process.pid} started`);
  process.on("SIGINT", () => {
    console.log("server ending", Date.now());
    server.close(() => process.exit());
  });
}
