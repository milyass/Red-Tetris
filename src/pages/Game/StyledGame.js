import styled from 'styled-components'

export const StyledGame = styled.div`
    display: flex;
    justify-content: space-evenly;
    flex-direction: row;
    @media   (max-width: 768px) {
        align-items: center;
        justify-content: center !important;
        flex-direction : column ;
    }

    @media (max-height:768px )  {
        justify-content: center ;
    }

`

export const RightSide = styled.div`
    display: flex;
    flex-direction: column;
    width: 40%;
    justify-content: center ;


    @media  (max-width:768px) {
        width: 100%;
    }

    @media (max-height:768px )  {
        width: 60%;
    }
`

export const LeftSide = styled.div`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-evenly;

    @media  (max-width:768px) {
        flex-direction: column;
    }

`

