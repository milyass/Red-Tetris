import React from 'react';
import {Button} from '../../components/'
import { useSelector, 
    useDispatch 
} from 'react-redux'
import { pause, resume } from '../../features/game/gameSlice'
import { Alert } from 'ui-neumorphism'
import { X, InfoCircleFill } from "react-bootstrap-icons"
import { useState, useEffect } from 'react';

const GameAction = (props) => {
    const dispatch = useDispatch()
    const game = useSelector((state) => state.game)
    const socket = useSelector((state) => state.socket).connection
    const roomData = useSelector((state) => state.socket).roomData

    const [toast, setToast] = useState('')
   
    const { isRunning, gameOver } = game
    const disabled = gameOver


    useEffect(() => {
        socket?.on('INFO', (message) => {
            setToast(message)
        })
        return () => {
            socket?.off('INFO');
        }
    }, [])

    return (
        <div>
            {(toast.length !== 0 && props.isAlreadyStarted) && 
            <Alert
                rounded
                closable
                type='info'
                border='left'
                visible={toast.length}
                icon={
                    <InfoCircleFill size={25}/>
                }
                style={{ margin: "15px 0px", fontWeight: "bold" }}
                closeIcon={<X size={50} />}
                onClose={() => setToast('')}>{toast}</Alert>
            }
            {
                props.isOwner  && roomData.type === "solo" &&
                <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'row', gap: '2vmin', margin: '2vmin' }}>
                    <Button
                        disabled={disabled}
                        style={{ width: '100%'}}
                        onClick={(e) => {
                            e.target.blur();
                            if (gameOver) { return }
                            if (isRunning) {
                                dispatch(pause())
                            } else {
                                dispatch(resume())
                            }
                        }} >
                        {isRunning ? 'Pause' : 'Play'}
                    </Button>
                </div>

            }
        </div>
    );
};

export default GameAction;