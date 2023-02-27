const Room = require("../entities/Room")
const Player = require("../entities/Player")
const { isValidCreationRoom } = require("../utils")

module.exports = (io, rooms) => {

    const disconnectEvent = function () {
        const socket = this
        for (const room of rooms) {
            room.findPlayerBySocketIdAndDeleteFromPendingPlayer(socket.id)
            const remainingPlayers = room.findPlayerBySocketIdAndDelete(socket.id)
            for (const player of remainingPlayers) {
                console.log("emitting to " + player.socketId)
                io.to(player.socketId).emit("roomData", room)
            }
            const numOfPlayerInRoom = room.players.length
            const roomName = room.roomName
            if (numOfPlayerInRoom === 0) {
                console.log(`0 players remaining in room, deleting ${roomName}...`);
                rooms = rooms.filter((room) => room.roomName !== roomName)
                io.socketsLeave(roomName);
            }
        }
    }

    const sendMessageEvent = function (payload) {
        const socket = this
        const { playerName, socketId, roomName, message } = payload
        if (!roomName) return
        const roomData = rooms.find((room) => room.roomName === roomName)
        if (!roomData) return
        roomData.messages.push({ playerName, socketId, roomName, message })
        console.log("sending message to players in room: " + roomData.roomName + " " + "from player: " + playerName)
        io.sockets.in(roomData.roomName).emit("RECEIVE_MESSAGE", payload)
    }

    const createOrJoinRoomEvent = function (payload = {}) {
        const socket = this
        const { playerName, roomName, socketId, gameState, isCheated } = payload
        if (!playerName || !roomName || !socketId || !gameState || !isValidCreationRoom(`/#${roomName}[${playerName}]`)) return
        const roomData = rooms.find((room) => room.roomName === roomName)
        // we check if room already exists
        if (roomData) {
            // we join the player to the room 
            socket.join(roomData.roomName)
            // if we find player by his socket id we add it to player array inside room
            if (roomData.findPlayerByUsername(playerName)) {
                console.log('emiting diffrent name message...');
                socket.emit('INFO', "Please choose diffrent player name and try again.")
                return
            }
            if (roomData.gameStatus === 'started') {
                console.log("game status is already started, emiting...");
                socket.emit('GAME_IS_ALREADY_STARTED')
                socket.emit('INFO', "the game is already started, you can watch players and chat with them.")
                roomData.addPendingPlayer(new Player({ playerName, socketId, gameState }))
                io.sockets.in(roomData.roomName).emit("roomData", roomData);
                return
            }
            if (!roomData.findPlayerBySocketId(socketId))
                roomData.addPlayer(new Player({ playerName, socketId, gameState: { ...gameState, gameOver: false } }))

            roomData.setRoomData({ type: "tournament" })
            console.log(`room ${roomData.roomName} is now type: ${roomData.type}`);
            // we emit room data to client
            io.sockets.in(roomData.roomName).emit("roomData", roomData);
            // logs
            console.log(`${playerName} joined ${roomName}`)
            return
        }
        // we add new Room with new Player
        const newRoom = new Room(roomName,(new Player({ playerName, socketId, gameState })), isCheated)
        // we add room to the rooms array
        rooms.push(newRoom);
        // create room in socket io instance
        socket.join(newRoom.roomName)
        // we emit room data to client
        io.sockets.in(newRoom.roomName).emit("roomData", newRoom);
        // logs
        console.log(`${playerName} created ${newRoom.roomName} ${newRoom.type} for now !`)
        return
    }

    const startGameEvent = function (payload = {}) {
        const socket = this
        const { roomName } = payload
        if (!roomName) return
        const roomData = rooms.find((room) => room.roomName === roomName)
        if (!roomData) return
        roomData.setRoomData({ gameStatus: 'started', winner: null })
        if (roomData.players.length > 1)
            roomData.setRoomData({ type: "tournament" })
        else
            roomData.setRoomData({ type: "solo" })
        console.log("room: " + roomData.roomName + " game started...")
        io.sockets.in(roomData.roomName).emit("roomData", roomData)
    }

    const restartGameEvent = function (payload = {}) {
        const socket = this
        const { roomName } = payload
        console.log("restarted game room name", roomName)
        if (!roomName) return
        const roomData = rooms.find((room) => room.roomName === roomName)
        if (!roomData) return
        roomData.restart()
        if (roomData.players.length > 1)
            roomData.setRoomData({ type: "tournament" })
        else
            roomData.setRoomData({ type: "solo" })
        console.log("room: " + roomData.roomName + " game Restarted", roomData.type, "mode...")
        io.sockets.in(roomData.roomName).emit("roomData", roomData)
    }

    const getNewShapesEvent = function (payload = {}) {
        const socket = this
        const { roomName } = payload
        if (!roomName) return
        const roomData = rooms.find((room) => room.roomName === roomName)
        if (!roomData) return
        roomData.getMoreShapes()
        console.log("emitting new shapes to " + roomData.roomName)
        io.sockets.in(roomData.roomName).emit("NEW_SHAPES", roomData)
    }

    const addCompletedLinesEvent = function (payload = {}) {
        const socket = this
        const { roomName, adderSocketId, completedLines } = payload
        if (!roomName) return
        const roomData = rooms.find((room) => room.roomName === roomName)
        if (!roomData) return
        for (const player of roomData.players) {
            console.log("emitting new lines to " + player.socketId + " in room except: " + adderSocketId)
            if (player.socketId !== adderSocketId)
                io.to(player.socketId).emit("OPNT_COMPLETED_LINES", completedLines)
        }
    }

    const shareOpponentStateWithRoom = function (payload = {}) {
        const socket = this
        const { id: playerSocketId, gameState, roomData: { roomName } } = payload
        if (!roomName) return
        const roomData = rooms.find((room) => room.roomName === roomName)
        if (!roomData) return
        roomData.setPlayerGameState(playerSocketId, gameState)
        const winner = roomData.whoWon() // ?
        if (winner) {
            console.log("player:", winner.playerName, "in", roomData.roomName, "won !");
            roomData.setRoomData({ gameStatus: 'finished' })
            
            io.sockets.in(roomData?.roomName).emit("roomData", roomData)
        }
        // console.log("updated player " + playerSocketId + " game state in room data");
        io.sockets.in(roomData?.roomName).emit("UPDATED_PLAYERS", roomData?.players)
    }

    return {
        disconnectEvent, sendMessageEvent, createOrJoinRoomEvent, startGameEvent,
        restartGameEvent, getNewShapesEvent, addCompletedLinesEvent, shareOpponentStateWithRoom
    }
}