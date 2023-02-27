import React, { useState } from 'react';
import { Button } from "../"
import { Card } from '../'
import { StyledLobby, StyledOverlay } from './StyledLobby'
import { Table } from 'ui-neumorphism'
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { emitStartGame } from '../../features/socket/socketSlice'
import { Alert } from 'ui-neumorphism'
import { InfoCircleFill } from "react-bootstrap-icons"


export const createItem = (name, role, status) => {
    return { name, role, status }
}


const headers = [
    { text: <b style={{ color: 'var(--color-8)', fontSize: 17, }}>Username</b>, align: 'left', value: 'name' },
    { text: <b style={{ color: 'var(--color-8)', fontSize: 17, }}>Role</b>, align: 'right', value: 'role' },

]


function Lobby({ isOwner }) {
    const [players, setPlayers] = useState([])
    const socket = useSelector(state => state.socket)
    const { roomData, connection } = socket
    const dispatch = useDispatch()
    const [toast, setToast] = useState('')

    useEffect(() => {
        connection?.on('INFO', (message) => {
            setToast(message)
        })
        return () => {
            connection?.off('INFO');
        }
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        if (roomData) {
            setPlayers(roomData?.players?.map((player, index) => {
                return createItem(
                    <span style={{ fontSize: 17, color: roomData.players[0].socketId === player.socketId ? 'var(--success)' : 'var(--warning)', }}>{player.playerName}</span>,
                    <span style={{ fontSize: 17 }}>{roomData.players[0].socketId === player.socketId ? 'owner' : 'player'}</span>,
                )

            }))
        }
    }, [roomData])


    let handleStartGame = () => {
        // console.log("starting game...");
        dispatch(emitStartGame(roomData))
    };

    return (
        <>
            <StyledOverlay />
            <Card contentData=
                {
                    toast.length === 0 &&
                    <StyledLobby>
                        <h2>Game Room: <span style={{ color: "var(--color-4)", }}>{roomData?.roomName}</span></h2>
                        <h4 style={{ fontSize: "large" }}> {isOwner && `wait for players or start the game `|| `wait for the owner to start the game `}</h4>
                        <Table noHeaders style={{ marginTop: 30, padding: 5, marginBottom: 30 }} dense items={players} headers={headers} />
                        <Button className="mt-1 p-3" disabled={!isOwner} onClick={handleStartGame}><span style={{ fontWeight: 800 }}>Start Game</span></Button>
                        <Button className="mt-1 p-3" style={{ marginLeft: 50 }} onClick={() => { window.location.href = "" && window.location.reload() }}>
                            <span style={{ color: "var(--danger-color)", fontWeight: 800 }}>Quit Room</span>
                        </Button>
                    </StyledLobby>
                    ||
                    <Alert
                        rounded
                        type='info'
                        border='left'
                        visible={toast.length}
                        icon={
                            <InfoCircleFill size={25} />
                        }
                        style={{
                            fontWeight: "bold",
                            padding: "2vmin",
                            zIndex: 9999,
                            position: "absolute",
                            width: "50%",
                            top: "25%",
                            left: "25%"
                        }}
                    >{toast}</Alert>


                }
            />


        </>
    );
}

export default Lobby;