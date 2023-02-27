import React from 'react';
import { MessageContainer, SenderUsername, MessageText } from './StyledMessageBox'


const MessageBox = (props) => {
    const { playerName , message, isCurrentPlayer } = props.data
    return (
        <div>
            <MessageContainer isCurrentPlayer={isCurrentPlayer}>
            <SenderUsername isCurrentPlayer={isCurrentPlayer}>[{playerName}]</SenderUsername>
                {/* {(isCurrentPlayer && <SenderUsername>[{playerName}]</SenderUsername> )|| <span>{`[${playerName}]`}</span>} */}
                <MessageText isCurrentPlayer={isCurrentPlayer}>
                    {message}
                </MessageText>
            </MessageContainer>
        </div>


    );
};

export default MessageBox;