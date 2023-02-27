let Piece = require('./Piece')

class Manager {

    constructor() {
        this.pieces = new Set()
        this.globalShapes = []
    }

    generatePieces(isCheated) {
        if(isCheated) return this.globalShapes.concat([1, 1, 1, 1, 1, 1, 1])
        let i = 0
        this.pieces = new Set()
        while (i < 7) {
            const piece = new Piece()
            const randomPiece = piece.randomShape()
            if (this.pieces.has(randomPiece)) {
                continue
            }
            this.pieces.add(randomPiece)
            i++
        }
        return this.globalShapes.concat(...this.pieces)
    }

}

module.exports = Manager