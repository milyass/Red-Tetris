import styled  from 'styled-components'

export const StyledOpponentGridBoard = styled.div`
        display: grid;
        gap: 0px;
        align-self: flex-start;
        grid-template-columns: repeat(10, var(--block-size-player));
        grid-gap: 0px;

        @media (max-height:1000px ) {
                --block-size : 4vmin;
                border-radius: 0px;
        }

        @media (max-width:600px ) {
                --block-size : 6vmin;
                border-radius: 2px;
        }


`