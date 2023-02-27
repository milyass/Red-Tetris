import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { resume } from '../../features/game/gameSlice'
import { Dialog, Fab, Table, } from 'ui-neumorphism'
import { Row } from 'react-bootstrap';
// Displays a message
const MessagePopup = (props) => {

    const [message, setMessage] = useState("")
    const dispatch = useDispatch()
    // connect Message Popup to redux
    const { isRunning, gameOver, score, line, level } = useSelector((state) => state.game)
    const { roomData } = useSelector((state) => state.socket)
    const [visible, setVisible] = useState(false)
    // eslint-disable-next-line
    const [ type, setType] = useState('info')

    useEffect(() => {
        if (gameOver) {
            // console.log("Pause Button: case GameOver")
            setMessage("Game Over")
            setVisible(true)
            setType('error')
        }
        else if (!isRunning && roomData?.gameStatus === "started") {
            // console.log("Pause Button: !isRunning && roomData?.gameStatus !== started")
            setMessage("Game Paused")
            setVisible(true)
        } else {
            // console.log("Pause Button: else")
            setVisible(false)
        }
        // eslint-disable-next-line
    }, [gameOver, isRunning])


    function createItem(level, score, line, room) {
        return { level, score, line, room }
    }

    const TableHeader = ({ field }) => (
        <b style={{ color: 'var(--color-8)', fontSize: 21, WebkitTextStroke: "0.08px var(--border-color)" }}>{field}</b>
    )

    const TableItem = ({ item, color = "inherit" }) => <span style={{ color, fontSize: 19, }}>{item}</span>

    const headers = [
        { text: <TableHeader field={"Level"} />, align: 'center', value: 'level' },
        { text: <TableHeader field={"Score"} />, align: 'center', value: 'score' },
        { text: <TableHeader field={"Line"} />, align: 'center', value: 'line' },
        { text: <TableHeader field={"Room"} />, align: 'center', value: 'room' },
    ]

    const items = ({ level, score, line, room }) => [
        createItem(
            <TableItem item={level} />,
            <TableItem item={score} />,
            <TableItem item={line} />,
            <TableItem item={room} />,)
    ]



    return (
        <Row>
            <Dialog
                minWidth={300}
                visible={visible}
                onClose={() => () => {
                    setVisible(false)
                    if (!gameOver) {
                        dispatch(resume())
                    }
                }}
            >
                <div
                    style={{
                        position: "absolute",
                        left: "50%",
                        top: "50%",
                        width: "90vw",
                        maxWidth: "600px",
                        transform: "translate(-50%, -50%)",
                        padding: 20,
                        borderRadius: 10,
                        border: "3px solid var(--info-color)",
                        boxShadow: "2px 2px 6px var(--light-bg-dark-shadow),  -2px -2px 6px var(--light-bg-light-shadow)"

                    }}>
                    <div style={{ padding: 5, margin: 0, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <h1 style={{ color: "var(--info-color)", marginTop: 15 }}>{message}</h1>
                        <Fab style={{
                            backgroundColor: "var(--info-color)",
                            boxShadow: "inset 2px 2px 10px var(--info-color), inset -2px -2px 10px var(--info-color)",
                            borderRadius: 100,
                        }} onClick={() => {
                            setVisible(false)
                            if (!gameOver) {
                                dispatch(resume())
                            }
                        }
                        }>
                            X
                        </Fab>
                    </div>
                    <Row className='justify-content-start'>
                        <Table dense flat style={{ marginTop: 30, padding: 10, marginBottom: 30 }} items={items({
                            score, line, level, room: roomData?.roomName
                        })} headers={headers} />
                        <div style={{ padding: 5, margin: 0, display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <Fab style={{
                                backgroundColor: "var(--info-color)",
                                boxShadow: "inset 2px 2px 10px var(--info-color), inset -2px -2px 10px var(--info-color)",
                                borderRadius: 100,
                            }} onClick={() => {window.location.href = "" && window.location.reload()}
                            }>
                            Quit Room
                            </Fab>
                        </div>

                    </Row>
                </div>
            </Dialog>
        </Row>
    )

}

export default MessagePopup