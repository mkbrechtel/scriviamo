#!/usr/bin/env node

console.log("starting scriviamo server")

import express from "express"
import expressWs from 'express-ws'
import compression from "compression"

import { createServer as createViteServer } from 'vite'

// @ts-expect-error import directly from dist folder
import { setupWSConnection } from 'y-websocket/bin/utils'

const { app } = expressWs(express())
app.use(compression());
app.use(express.json())

const env = process.env.SCRIVIAMO_SERVER_ENV || "dev";
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


app.ws('/collaboration/:document', (ws, req) => {
  setupWSConnection(ws, req, { docName: req.params.document })
})


const port = process.env.scriviamo_SERVER_PORT || 3980
app.listen(port, function () {
  console.log(`scriviamo server listening on port ${port}!`);
  // if running in dev mode, show where to go
  if (env == "dev"){
    console.log("go to http://localhost:3980");
  }
});
