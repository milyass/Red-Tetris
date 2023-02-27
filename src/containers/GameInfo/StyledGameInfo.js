import styled from 'styled-components'


export const StyledGameInfo = styled.div`   
    display: flex;
    grid-template-areas: "Next Score Level Line";
    grid-gap: 1vmin;
    flex-direction: column;
    margin-bottom: 1vmin;
    width: 100%;
    align-items: center;
    @media   (max-width: 768px) {
        justify-content: center !important;
        flex-direction : row ;
        align-items: flex-end;
        width : 100%
        
    }
`