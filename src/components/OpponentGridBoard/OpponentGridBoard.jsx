import React from 'react';
import GridSquare from '../GridSquare/GridSquare';
import { StyledOpponentGridBoard } from './StyledOpponentGridBoard';
import { shapes , defaultState } from '../../utils';



const OpponentGridBoard = ({ player,  game = defaultState() }) => {
  
    const { grid, shape = 0, rotation, x = 0, y = 0 } = game

    let block = shapes[shape][rotation]
    const blockColor = shape

    const gridSquares = grid.map((rowArray, row) => {
        // map columns
        return rowArray.map((square, col) => {
            // Find the block x and y on the shape grid
            // By subtracting the x and y from the col and the row we get the position of the upper left corner of the block array as if it was superimposed over the main grid
            const blockX = col - x
            const blockY = row - y
            let color = square

            // Map current falling block to grid.
            // For any squares that fall on the grid we need to look at the block array and see if there is a 1 in this case we use the block color.
            if (blockX >= 0 && blockX < block.length && blockY >= 0 && blockY < block.length) {
                color = block[blockY][blockX] === 0 ? color : blockColor
            }

            // Generate a unique key for every block
            const k = row * grid[0].length + col;
            // Generate a grid square

            return <GridSquare
                key={k}
                color={color}
                board
                player={player} />
        })
    })



    return (
        <StyledOpponentGridBoard
            player={player}
        >
            {gridSquares}
        </StyledOpponentGridBoard>
    );
};

export default OpponentGridBoard;