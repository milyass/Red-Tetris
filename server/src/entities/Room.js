let Manager = require('./Manager')
const { initialGameState } = require("../utils/index")
const Player = require('./Player')

let roomPieces = new Manager()
module.exports = class Room {
    constructor(roomName, Player, isCheated){
        this.shapes = roomPieces.generatePieces(isCheated)
        this.nextShape = this.shapes[0]
        this.gameStatus = "pending"
        this.winner = null
        this.players = [Player]
        this.pending_players = []
        this.roomName = roomName
        this.messages = []
        this.type = "solo"
        this.isCheated = isCheated
    }


    restart() {
        this.shapes = roomPieces.generatePieces(this.isCheated)
        this.nextShape = this.shapes[0]
        this.gameStatus = "pending"
        this.winner = null
        this.players = this.players.map(({ playerName, socketId }) => {
            return new Player({ 
                playerName, 
                socketId, 
                gameState: {...initialGameState, gameOver: false }})
        })
        this.players.push(...this.pending_players.map(({ playerName, socketId }) => {
            return new Player({ 
                playerName, 
                socketId, 
                gameState: {...initialGameState, gameOver: false }})
        }))
        this.pending_players = []
        this.messages = []
    }

    addPlayer(playerPayload){
        playerPayload.playerName = playerPayload.playerName
        console.log(`adding ${playerPayload.playerName} in room ${this.roomName}...`)
        this.players.push(playerPayload)
    }

    addPendingPlayer(playerPayload){
        playerPayload.playerName = playerPayload.playerName
        console.log(`adding ${playerPayload.playerName} in room ${this.roomName} as pending player...`)
        this.pending_players.push(playerPayload)
    }

    findPlayerByUsername(playerName){
       return this.players.find((player) => player.playerName === playerName)
    }

    findPlayerBySocketId(socketId) {
        return this.players.find((player) => player.socketId === socketId)
    }

    findPlayerBySocketIdAndDelete(socketId) {
        console.log(`deleting ${this.findPlayerBySocketId(socketId)?.playerName} from room...`)
        return this.players = this.players.filter((player) => player.socketId !== socketId)
    }

    findPlayerBySocketIdAndDeleteFromPendingPlayer(socketId) {
        console.log(`deleting ${this.findPlayerBySocketId(socketId)?.playerName} from room...`)
        return this.pending_players = this.pending_players.filter((player) => player.socketId !== socketId)
    }

    getRoomAdmin(){
        return this.players[0]
    }

    getRoomData() {
        return { shapes, nextShape, gameStatus, winner, players, roomName, messages } = this
    }


    setRoomData({ players,shapes, nextShape, gameStatus, messages, type } = {}) {
        this.players = players || this.players
        this.shapes = shapes || this.shapes
        this.nextShape = nextShape || this.nextShape
        this.gameStatus = gameStatus || this.gameStatus
        this.messages = messages || this.messages
        this.type = type || this.type
        return {
           players,
           shapes, 
           nextShape, 
           gameStatus, 
           messages,
           type
        }
    }
    getMoreShapes() {
        this.shapes = [...this.shapes, ...roomPieces.generatePieces(this.isCheated)]
        return this.shapes
    }
    setPlayerGameState(socketId, gameState){
        const player = this.findPlayerBySocketId(socketId)
        if(!player) return
        return player.setPlayerData({ gameState })
    }

    whoWon(){
        if(this.type === "solo" && this.gameStatus === "started" && this.players[0].gameState?.gameOver === true) {
            this.winner = this.players[0]
            return  this.players[0]
        }

        if( this.type === "tournament" && this.gameStatus === "started"  && this.players.length === 1)  {
            console.log("who won in case all players left and only one is remaining",this.players[0])
            this.type = "solo"
            this.players[0].gameState.gameOver = true
            this.winner = this.players[0]
            return  this.winner
        }

        if(this.type === "tournament" && this.gameStatus === "started") {
            // we find players with game over false
          const playersWithGameOverFalse = this.players.filter(player => player?.gameState?.gameOver === false)
            // if we have one player who has game over false means hes the winner 
           if(playersWithGameOverFalse.length === 1) {
            const [ winner ] = playersWithGameOverFalse
            if(winner instanceof Player){
                this.winner = winner
                return winner
            }
           }
        }
        return null
    }
}