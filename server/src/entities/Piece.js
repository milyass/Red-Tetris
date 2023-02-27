const { shapes } = require('../utils')


module.exports = class Piece {
    constructor(shape){
        this.shape = shape || 0
    }

    randomShape ()  {
        return this.random(1, shapes.length - 1)
    }

    random(min, max)  {
        return Math.floor(Math.random() * (max - min + 1)) + min
    }

}