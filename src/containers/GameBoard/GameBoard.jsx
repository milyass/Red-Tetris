import React, { useRef, useEffect } from 'react';
import { GridContainer } from './StyledGameBoard'
import { useSelector, useDispatch } from 'react-redux'
import {  moveRight, moveLeft, moveDown, rotate, hardDrop } from '../../features/game/gameSlice'
import {GridBoard,MessagePopup} from '../../components/'


const GameBoard = ({socket , innerRef}) => {
  const game = useSelector((state) => state.game)
  const { isRunning, gameOver, } = game
  const gridBoardRef = useRef(null)
  const dispatch = useDispatch()
  const roomData = useSelector((state) => state.socket).roomData
 socket?.id && socket?.emit("SHARE_OPPONENT_STATE_WITH_ROOM", {id : socket?.id, gameState: { ...game }, roomData } )

  const move = ({ keyCode, repeat }) => {
      if( gameOver || !isRunning)
        return
      if (keyCode === 37) {
        dispatch(moveLeft())
      } else if (keyCode === 39) {
        dispatch(moveRight())
      } else if (keyCode === 40) {
        dispatch(moveDown())
      } else if (keyCode === 38) { // prevent rotate when other keys are pressed
        dispatch(rotate())
      } else if(keyCode === 32) {
        dispatch(hardDrop())
      }
  };

  const changeFocused = () => {
    gridBoardRef?.current?.focus();
  };

  useEffect(()=> {
    changeFocused();
  }, [])
  
  

  

  return (


      <GridContainer
        tabIndex="0"
        onKeyDown={(e) => {        
          e.preventDefault() 
          move(e)
        }}
        ref={innerRef}
      >
      
        <GridBoard />
        <MessagePopup />
      </GridContainer>


  );
}

export default GameBoard;