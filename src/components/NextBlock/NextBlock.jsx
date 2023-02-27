import React from 'react';
import GridSquare from '../GridSquare/GridSquare';
import { StyledNextBlock } from './StyledNextBlock';
import { useSelector } from 'react-redux';
import {shapes} from '../../utils'

const NextBlock = (props) => {
    const nextShape = useSelector((state) => state.game.nextShape)

    //get the first rotation and map it to nextBlock array
    const box = nextShape && shapes[nextShape][0]
    // Map the block to the grid
    const grid = box && box.map((rowArray, row) => {
        return rowArray.map((square, col) => {
            return <GridSquare key={`${row}${col}`} color={square === 0 ? 0 : nextShape}  borderRadius='4px' />
        })
    })


    return (
        <div  style={{ 'fontFamily': 'VT323', 'fontSize': '25px', marginRight: '10px', 'color': 'var(--g-text-color-light)', 'gridArea' : 'Next' }}>
            <StyledNextBlock>
                {grid}
            </StyledNextBlock>

        </div>
    );
};

export default NextBlock;