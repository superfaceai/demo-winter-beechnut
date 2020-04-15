// server.js
// where your node app starts
const http = require("http");
const express = require("express");
const { createTerminus } = require("@godaddy/terminus");

const { setupAPIRoutes } = require("./routes");
const { register, unregister } = require("./register");

// Create Express app & server
const app = express();
const server = http.createServer(app);
createTerminus(server, {
  signal: "SIGINT",
  onShutdown: unregister  // Register at Superface registry
});

// Setup the Provider API endpoints
setupAPIRoutes(app);

// Listen for requests :)
const listener = app.listen(process.env.PORT, function() {
  console.log("Your app is listening on port " + listener.address().port);

  // Register at Superface registry
  register();
});
