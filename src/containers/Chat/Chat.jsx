import React, { useState, useEffect, useRef } from 'react';
import { Send } from "react-bootstrap-icons"
import { IconButton } from 'ui-neumorphism';
import { StyledChat, StylesChatContainer, insetStyle, StyledChatInput } from './StyledChat'
import { useDispatch,useSelector } from 'react-redux';
import {emitSendMessage, updateRoomDataMessages} from '../../features/socket/socketSlice'

import {Input,Card,MessageBox} from '../../components/'
import {scrollToBottom } from '../../utils/'


const Chat = ({ playerName, changeFocused ,roomName}) => {
    const dispatch = useDispatch()
    const socket = useSelector((state) => state.socket).connection
    const roomData = useSelector((state) => state.socket).roomData
    const messagesEndRef = useRef(null)
    const [message, setMessage] = useState('')
    const [listMessages, setListMessages] = useState(roomData?.messages || [])

    const handleChange = (e) => {
        e.preventDefault()
        setMessage(e.target.value)
    }

    const handleSendMessage = (e) => {
        e.preventDefault()
        setMessage("")
        changeFocused()
        message.length &&
        socket.id &&
        dispatch(emitSendMessage({ playerName, socketId : socket.id,roomName, message}))
    }
    useEffect(() => {
        socket?.on("RECEIVE_MESSAGE", (messageReceived) => {
            dispatch(updateRoomDataMessages(messageReceived))
        })
        scrollToBottom(messagesEndRef)
        return () => {
            socket?.off("RECEIVE_MESSAGE")
        };
    // eslint-disable-next-line
    }, [listMessages, socket])

    useEffect(()=> {
        roomData?.messages && setListMessages(roomData.messages)
    },[roomData.messages])

    return (
        <StylesChatContainer>
            <Card inset style={insetStyle} contentData={
                <StyledChat>
                    {
                     listMessages.map((player, index) => {
                            const isCurrentPlayer = (player.playerName === playerName)
                            return (
                                <div key={index} className='animate__animated animate__headShake'>
                                    {
                                        (isCurrentPlayer
                                            &&
                                            <MessageBox Sender data={{ ...player, isCurrentPlayer }} />

                                        ) ||
                                        <MessageBox data={player} />
                                    }
                                    <div ref={messagesEndRef} />
                                </div>
                            )
                        })
                    }
                </StyledChat>
            } />
            <form style={StyledChatInput} onSubmit={handleSendMessage}>
                <div className='remove-flex flex-fill'>
                    <Input id="chat_input" name='message'  value={message} onChange={handleChange} />
                </div>
                <div style={{ width: 'fit-content',marginBottom:'5px', marginTop: 6 }} className='col-2 col-md-2'>
                    <IconButton onClick={handleSendMessage} text={false} color='var(--g-text-color-light)'>
                        <Send className='animate__animated animate__flipInX' />
                    </IconButton>
                </div>
            </form>
        </StylesChatContainer >
    )
};

export default Chat;