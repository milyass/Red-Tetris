import styled from "styled-components"

export const StyledChat = styled.div`
    height: 25vh;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    overflow-x: hidden;
    @media (max-height:768px )  {
        height: 20vh;
    }

`

export const StylesChatContainer = styled.div`
    color: 'var(--secondary)';
    font-family: 'VT323';
`


export const insetStyle = {
    padding: '1vmin',
    marginBottom: '1vmin',
}

export const StyledChatInput = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
}