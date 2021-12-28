// server.ts
import blitz from "blitz/custom-server"
import { createServer } from "http"
import { parse } from "url"
import { log } from "next/dist/server/lib/logging"
import { Server } from "socket.io"

const { PORT = "3000" } = process.env
const dev = process.env.NODE_ENV !== "production"
const app = blitz({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  createServer((req, res) => {
    // Be sure to pass `true` as the second argument to `url.parse`.
    // This tells it to parse the query portion of the URL.
    const parsedUrl = parse(req.url!, true)
    const { pathname } = parsedUrl

    handle(req, res, parsedUrl)
  }).listen(PORT, () => {
    log.success(`Ready on http://localhost:${PORT}`)
  })
})

let users = []
const io = new Server({
  cors: {
    origin: "*",
  },
})

io.on("connection", (socket) => {
  console.log("new connection :", socket.id)
  socket.on("stream::join", ({ stream }) => {
    socket.join(stream)
    console.log("stream joined:", stream)
  })
  socket.on("stream::message::send", ({ stream, message, time }) => {
    console.log("Message received", message, stream, time)
    if (stream && message) {
      io.to(stream).emit("stream::message::send", { stream, message, time })
    } else {
      console.log("Error no stream or message")
    }
  })
  socket.emit("ASK_PASSWORD")
  socket.on("private::message", (anotherSocketId, message, password) => {
    if (password) {
      console.log("Welcome to private stream", anotherSocketId, message)
    } else {
      console.log("password incorrect")
    }
  })
})

io.listen(3001)
console.log("server started at localhost:3001")
