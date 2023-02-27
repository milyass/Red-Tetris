import styled from 'styled-components'



export const StyledNextBlock = styled.div`

        display: grid;        
        grid-template-columns: repeat(4, var(--block-size-next-block));
        margin: 2vmin;

        @media (max-width:600px ) {
                --block-size-next-block: 3vmin;
         }

         @media (max-height:768px )  {
                --block-size-next-block: 2.5vmin;
        }

`