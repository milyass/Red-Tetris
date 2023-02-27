import React, { useEffect, useRef } from 'react';
import GridSquare from '../GridSquare/GridSquare';
import { StyledGridBoard } from './StyledGridBoard';
import { shapes } from '../../utils';
import { useSelector, useDispatch } from 'react-redux'
import { moveDown } from '../../features/game/gameSlice'




const GridBoard = ({ player }) => {


    const game = useSelector((state) => state.game)
    const { grid, shape = 0, rotation, x, y, isRunning, speed,gameOver } = game
    // reference to the request animation frame
    const requestRef = useRef()
    // reference for the last time the window was umpdateds
    const lastUpdateTimeRef = useRef(0)
    // reference to the time whwn the moveDown action was dispatched
    const progressTimeRef = useRef(0)
    const dispatch = useDispatch()


    let block = shapes[shape][rotation]
    const blockColor = shape

    const update = (time) => {
        requestRef.current = requestAnimationFrame(update)
        if (!isRunning || gameOver) {
            return
        }
        // lastUpdateTimeRef = useRef(1) => lastUpdateTimeRef
        if (!lastUpdateTimeRef.current) {
            lastUpdateTimeRef.current = time
        }
        const deltaTime = time - lastUpdateTimeRef.current
        progressTimeRef.current += deltaTime
        if (progressTimeRef.current > speed) {
            if(shape !== 0)
            dispatch(moveDown())
            progressTimeRef.current = 0
        }
        lastUpdateTimeRef.current = time
    }

    useEffect(() => {
        
        requestRef.current = requestAnimationFrame(update)
        return () => cancelAnimationFrame(requestRef.current)
    }, [isRunning,gameOver,speed])


    // map rows
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
        <StyledGridBoard
            player={player}
        >
            {gridSquares}
        </StyledGridBoard>
    );
};

export default GridBoard;