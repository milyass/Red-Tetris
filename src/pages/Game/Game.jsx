import React, { useRef, useEffect,useState } from 'react';
import { StyledGame, RightSide, LeftSide } from './StyledGame';
import {Chat,Opponents,GameInfo,GameBoard,GameAction} from '../../containers/'
import { useSelector, useDispatch } from 'react-redux'
import { emitCreateOrJoinRoom, updateRoomData, emitAddCompletedLines, updateOpponnets,emitAddPendingPlayers } from '../../features/socket/socketSlice'
import {Lobby,ScoreBoard}  from '../../components/'
import { startGame, updateShapes, initializeShapes, addCompletedLines, gameOver,initializeCompletedLines } from '../../features/game/gameSlice'
import { restart, updateGame } from '../../features/game/gameSlice'


// messages should be cleard from redux

const Game = ({ roomName, playerName, isCheated }) => {
    const gridBoardRef = useRef(null)
    const socket = useSelector((state) => state.socket).connection
    const roomData = useSelector((state) => state.socket).roomData
    const gameState = useSelector((state) => state.game)
    const { completedLines } = gameState
    const dispatch = useDispatch()
    const [isOwner, setIsOwner] = useState(false)
    const [isAlreadyStarted, setIsAlreadyStarted] = useState(false)

    // useEffect(() => console.log(`Game speed is: ${gameState.speed}`), [gameState.speed])
    const changeFocused = () => {
        gridBoardRef?.current?.focus();
    };

    useEffect(() => {
        socket?.on("connect", () => {
            // console.log("emitCreateOrJoinRoom")
            dispatch(emitCreateOrJoinRoom({ socketId: socket.id, roomName, playerName, gameState, isCheated }))
        })

        socket?.on("roomData", (data) => {
            if(!isOwner) setIsOwner(data.players[0].socketId === socket.id)
            // console.log("game status => ", data.gameStatus);
            // case game is pending
            if (data.gameStatus === 'pending') {
                // console.log("pending");
                dispatch(updateRoomData(data))
                dispatch(initializeShapes(data.shapes))
                dispatch(updateGame({ isRunning: false, gameOver: false }))
            }

            // case game is started
            if(data.gameStatus === 'started') {
                if(!roomData.isRunning && !gameState.isRunning) {
                    changeFocused();
                    dispatch(startGame())
                }
                // console.log("started");
                dispatch(updateRoomData(data))
                dispatch(updateGame({ isRunning: true, gameOver: false }))
            }

            // case game is finished
            if(data.gameStatus === 'finished') {
                // console.log("finished game");
                dispatch(updateRoomData(data))
                dispatch(gameOver())
                setIsAlreadyStarted(false)
            }

        })

        socket?.on("GAME_IS_ALREADY_STARTED", () => {
            setIsAlreadyStarted(true)
        })

        return () => {
            socket?.off('connect')
            socket?.off('roomData');
            socket?.off("GAME_IS_ALREADY_STARTED")
        }

    }, [roomData])


    useEffect(() => {
        socket?.on("NEW_SHAPES", (data) => {
            dispatch(updateShapes(data.shapes.slice(data.shapes.length - 7)))
            dispatch(updateRoomData(data))
        })
        socket?.on("OPNT_COMPLETED_LINES", data => {
            // console.log("OPNT_COMPLETED_LINES: " + data)
            dispatch(addCompletedLines(data))
        })

        return () => {
            socket?.off('NEW_SHAPES');
            socket?.off('OPNT_COMPLETED_LINES')
        }
    }, [false])

    useEffect(() => {
        // console.log(`emitting ${completedLines} lines to players...`);
        if (socket?.id){
            dispatch(emitAddCompletedLines({ ...roomData, completedLines, adderSocketId: socket?.id }))
            dispatch(initializeCompletedLines())
        }       
    }, [completedLines])


    return (
        <div>
            <StyledGame>
                { roomData.gameStatus === 'finished' && <ScoreBoard winner={roomData.winner} isOwner={isOwner} /> }
                { (Object.entries(roomData).length === 0 || roomData.gameStatus === 'pending')  && <Lobby isOwner={isOwner} />}
                { !isAlreadyStarted && 
                <LeftSide>
                    <GameInfo />
                    <GameBoard innerRef={gridBoardRef} socket={socket} />
                </LeftSide>
                }
                <RightSide>
                    <GameAction isAlreadyStarted={isAlreadyStarted} isOwner={isOwner} />
                    <Opponents socket={socket} />
                    <Chat isAlreadyStarted={isAlreadyStarted} socket={socket} roomName={roomName} playerName={playerName} changeFocused={changeFocused}  />
                </RightSide>
            </StyledGame>
        </div>


    );
}

export default Game;