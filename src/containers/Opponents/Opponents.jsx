import React, { useEffect, useState } from 'react';
import { StyledOpponentsContainer, insetStyle, StyledPlayerInfo } from './StyledOpponents';
import { useSelector } from 'react-redux'

import {Card,OpponentGridBoard,Display} from '../../components/'


const Opponents = () => {
    const socket = useSelector((state) => state.socket).connection
    const [opponents, setOpponents] = useState([])
    useEffect(() => {
        socket?.on("UPDATED_PLAYERS", (players) => {
            setOpponents(players)
        })
        return () => {
            socket?.off('UPDATED_PLAYERS');
        };
    }, []);
    // map rows
    const displayData = ({ score = 0, line = 0, role = 0, playerName, id, gameOver }) => {
        return [
            {
                text: undefined,
                value: playerName || id
            },
            {
                text: 'Score',
                value: score
            },
            {
                text: 'Line',
                value: line
            },
            {
                text: 'Role',
                value: role || 'player'
            },
            gameOver && {
                text: 'Game is Over',
                value: undefined
            }
        ]
    }
    return (
        <Card inset style={insetStyle} contentData={(
            <StyledOpponentsContainer>
                {
                    opponents?.map((opponent = {}, index) => {
                        if(opponent.socketId === socket.id) return
                        const displayParams = {
                            ...opponent.gameState,
                            playerName: opponent.playerName,
                        }
                       return <div key={index} className="d-flex mb-4  align-items-start justify-content-between">
                        <>
                            <StyledPlayerInfo >
                                {displayData(displayParams)?.map(({ text, value }, i) => <Display text={text} value={value} key={i} />)}
                            </StyledPlayerInfo>
                            <div className='d-flex flex-end'>
                                <OpponentGridBoard player game={opponent.gameState} />
                            </div>
                        </>
                    </div>
                    }
                    )
                }
            </StyledOpponentsContainer>
        )} />
    );
};

export default Opponents;