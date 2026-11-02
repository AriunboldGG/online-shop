// Application startup file for Node.js hosting panels ("startup file: server.js").
// Serves the production build made by `npm run build`. The host sets PORT; 3000 locally.
const { createServer } = require("node:http");
const next = require("next");

const port = Number(process.env.PORT) || 3000;
const hostname = process.env.HOST || "0.0.0.0";
const dev = process.env.NODE_ENV === "development";
if (!dev) process.env.NODE_ENV = "production";

const app = next({ dev, dir: __dirname, hostname, port });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    createServer((req, res) => handle(req, res)).listen(port, hostname, () => {
      console.log(`> Online Shop ready on http://${hostname}:${port} (${dev ? "development" : "production"})`);
    });
  })
  .catch((err) => {
    console.error("Failed to start Online Shop:", err);
    process.exit(1);
  });
