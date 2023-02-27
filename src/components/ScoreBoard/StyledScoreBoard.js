import styled from 'styled-components'

export const StyledScoreBoard = styled.div`
    position: absolute;
    width: 90vw;
    max-width: 800px;
    z-index: 1040;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: var(--bs-body-bg);
    border-radius: 10px;
    opacity: 1;
    padding: 30px;
    text-align: center;
    /* font-family: 'VT323'; */
    box-shadow:   2px 2px 4px var(--light-bg-dark-shadow),  -2px -2px 4px var(--light-bg-light-shadow) ;
`

export const StyledOverlay = styled.div`
    position: fixed;
    z-index: 1040;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color:var(--bs-body-bg);
`