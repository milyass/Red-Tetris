import React from 'react';
import { StyledGridSquare } from './StyledGridSquare';

/* border and player props are to specify the width and the height for the gridSquare for every type (GridBoard, PlayerBoard) */
const GridSquare = (props) => {

    return (
        <StyledGridSquare color={props.color} board={props.board}  player={props.player}>
            {props.children}
        </StyledGridSquare>
    );
};

export default GridSquare;