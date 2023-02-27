const express = require('express')
const app = express()
const http = require('http')
const server = http.createServer(app)
const { Server } = require('socket.io')
require('dotenv').config("../.env")
const cors = require("cors")
const path = require("path")
const REACT_APP_SERVER_PORT = process.env.REACT_APP_SERVER_PORT || 5000 
const REACT_APP_REACT_APP_URL = process.env.REACT_APP_REACT_APP_URL || "http://localhost"
const REACT_APP_CLIENT_PORT = process.env.REACT_APP_CLIENT_PORT || 3000
const REACT_APP_SECRET = process.env.REACT_APP_SECRET
const origin = `${REACT_APP_REACT_APP_URL}:${REACT_APP_CLIENT_PORT}`

app.use(cors())
const io = new Server(server, {
  cors: {
    origin,
    methods: ["GET", "POST"],
    allowedHeaders: ["X-Red-Tetris-Client"],
  },
  path: '/socket'
})

let rooms = []

const Events = require("./src/events")(io, rooms)
const { CONSTANTS } = require("./src/utils")

io.on('connection', (socket) => {
  const clientRequestHeader = socket?.request?.headers['x-red-tetris-client'] === REACT_APP_SECRET
  if(!clientRequestHeader) return
  socket.on(CONSTANTS.DISCONNECT, Events.disconnectEvent)
  socket.on(CONSTANTS.SEND_MESSAGE, Events.sendMessageEvent)
  socket.on(CONSTANTS.CREATE_OR_JOIN_ROOM, Events.createOrJoinRoomEvent)
  socket.on(CONSTANTS.START_GAME, Events.startGameEvent)
  socket.on(CONSTANTS.RESTART_GAME, Events.restartGameEvent)
  socket.on( CONSTANTS.GET_NEW_SHAPES, Events.getNewShapesEvent)
  socket.on(CONSTANTS.ADD_COMPLETED_LINES, Events.addCompletedLinesEvent)
  socket.on( CONSTANTS.SHARE_OPPONENT_STATE_WITH_ROOM, Events.shareOpponentStateWithRoom)
})

app.use(express.static(path.join(__dirname, "dist")))
app.get('*', (req, res) => res.sendFile(path.join(__dirname, "dist", "index.html")))

server.listen(REACT_APP_SERVER_PORT, () => 
console.log(`app started: \n--> access app on ${REACT_APP_REACT_APP_URL}:${REACT_APP_SERVER_PORT}`)
)