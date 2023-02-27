import styled from 'styled-components';

export const insetStyle = {
    padding: '0.5vmin',
    marginBottom: '1vmin',
}



export const StyledOpponentsContainer = styled.div`
    height: 30vmin;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    overflow-x: hidden;

`


export const StyledPlayerInfo = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 50%;
    padding: 5px;
    @media   (max-width: 1100px) {
      width: 50%;
    }


`