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
  socket.emit("ASK_NICKNAME")
  socket.emit("hello", "world")
  console.log("new connection :", socket.id)
  socket.on("room::join", ({ room }) => {
    socket.join(room)
    console.log("room joined:", room)
  })
  socket.on("room::message::send", ({ room, message, time }) => {
    console.log("Message received", message, room, time)
    if (room && message) {
      io.to(room).emit("room::message::send", { room, message, time })
    } else {
      console.log("Error no room or message")
    }
  })
  socket.emit("ASK_PASSWORD")
  socket.on("private::message", (anotherSocketId, message, password) => {
    if (password) {
      console.log("Welcome to private room", anotherSocketId, message)
    } else {
      console.log("password incorrect")
    }
  })
})

io.listen(3001)
console.log("server started at localhost:3001")
