#!/usr/bin/env node

console.log("starting velocemente server")

import express from "express"
import compression from "compression"

import { createServer as createViteServer } from 'vite'

var app = express();
app.use(compression());

const env = process.env.VELOCEMENTE_SERVER_ENV || "dev";
if (env == "dev"){
  console.log("running in dev mode, creating a vite server for hot reloading");
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'custom'
  });
  app.use(vite.middlewares);
} else if (env == "prod") {
  console.log("running in prod mode, serving files statically");
  app.use(express.static("dist"));
} else {
  throw new Error("unknown server mode");
}

// serve index.html
app.get("/", function (req, res) {
  // do not use __dirname here, because it is not supported by esm
  res.sendFile("index.html", { root: "./" });
});

// start the server
app.listen(3980, function () {
  console.log("velocemente server listening on port 3980!");
  // if running in dev mode, show where to go
  if (env == "dev"){
    console.log("go to http://localhost:3980");
  }
});
