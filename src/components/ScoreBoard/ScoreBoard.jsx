import React from 'react';
import {Card} from '../'

import { StyledScoreBoard, StyledOverlay } from './StyledScoreBoard'
import { Table } from 'ui-neumorphism'
import { useEffect, useState } from 'react'
import {Button} from "../"
import { emitRestartGame } from '../../features/socket/socketSlice'
import { useDispatch, useSelector } from 'react-redux';


function createItem(name, score, lines) {
    return { name, score, lines }
}

const TableHeader = ({ field }) => (
    <b style={{ color: 'var(--color-8)', fontSize: 19, WebkitTextStroke: "0.08px var(--border-color)" }}>{field}</b>
)

const TableItem = ({ item, color = "inherit" }) => <span style={{ color, fontSize: 17 }}>{item}</span>


function createItemWinner(winner) {
    return createItem(
        <TableItem item={winner?.playerName} color={'var(--success)'} />,
        <TableItem item={winner?.gameState.score} color={'var(--success)'} />,
        <TableItem item={winner?.gameState.line} color={'var(--success)'} />,
    )
}


const headers = [
    { text: <TableHeader field={"Username"} />, align: 'left', value: 'name' },
    { text: <TableHeader field={"Score"} />, align: 'center', value: 'score' },
    { text: <TableHeader field={"Lines"} />, align: 'center', value: 'lines' },
]

/** ScoreBoard Component*/
function ScoreBoard({ winner, isOwner }) {
    const dispatch = useDispatch()
    const [scores, setScores] = useState([])
    const roomData = useSelector((state) => state.socket).roomData
    const socket = useSelector(state => state.socket)

    // console.log(winner);
    useEffect(() => {
        const players = roomData.players?.filter(player => { return player?.playerName !== winner?.playerName }) || []
        setScores(prev =>
            [
                createItemWinner(winner),
                ...(
                    players?.sort((a, b) => (a?.gameState?.score - b?.gameState?.score) * -1).map((player, index) => {
                        const playerInfo = [
                            <TableItem item={player?.playerName} />,
                            <TableItem item={player?.gameState.score} />,
                            <TableItem item={player?.gameState.line} />,
                        ]
                        return createItem(...playerInfo)
                    })
                )
            ])
    // eslint-disable-next-line
    }, [roomData])

    let handleRestartGame = () => {
        dispatch(emitRestartGame({ roomName: roomData.roomName }))
    };

    return (
        <>
            <StyledOverlay />
            <Card contentData={
                <StyledScoreBoard>
                    <h2 style={{ color: 'var(--color-7)' }}>Game Over</h2>
                    {winner &&
                        roomData.type !== 'solo' &&
                        (String(winner?.socketId) === String(socket?.connection?.id)
                            && <h3 style={{ fontSize: "large" }}><span style={{ color: 'var(--success)' }}>You Won !</span></h3>
                            || <h3 style={{ fontSize: "large" }}><span style={{ color: 'var(--success)' }}>{winner.playerName}</span> Has Won !</h3>

                        )}
                    <Table dense flat outlined style={{ marginTop: 30, padding: 10, marginBottom: 30 }} items={scores} headers={headers} />
                    <Button disabled={!isOwner} onClick={handleRestartGame} className="mt-1 p-3" ><span style={{  fontWeight: 800}}>Restart Game</span></Button>
                    <Button className="mt-1 p-3" style={{ marginLeft: 50,  }} onClick={() => { window.location.href = "" && window.location.reload() }}>
                        <span style={{ color: "var(--danger-color)", fontWeight: 800}}>Quit Room</span>
                    </Button>
                </StyledScoreBoard>
            }
            />
        </>
    );
}

export default ScoreBoard;