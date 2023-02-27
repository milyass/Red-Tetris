
module.exports = class Player {
    constructor({ playerName, socketId, gameState , shapes } = {}){
        this.playerName = playerName
        this.socketId = socketId
        this.gameState = gameState
        this.index = 0
    }

    getPlayerData() {
        return {
            playerName: this.playerName,
            socketId: this.socketId,
            gameState : this.gameState,
            shape : this.shape,
            nextShape : this.nextShape
        }
    }

    setPlayerData({ playerName, socketId, gameState } = {}) {
        this.playerName = playerName || this.playerName
        this.socketId = socketId || this.socketId
        this.gameState = gameState || this.gameState
        return {
            playerName: this.playerName,
            socketId: this.socketId,
            gameState : this.gameState
        }
    }
}