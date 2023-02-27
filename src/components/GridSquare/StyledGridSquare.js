import styled, { css } from 'styled-components'

export const StyledGridSquare = styled.div`
        border-radius: 4px;
        border : 1px solid;
       ${props => props.color ?
                css`
                background: var(--color-${props.color});
                `
                :
                css`
                background :var(--bs-body-bg);
                `
        } 
        
        width:  var(--block-size-next-block);
        height: var(--block-size-next-block);
        border-right-color: var(--light-bg-dark-shadow);
        border-bottom-color: var(--light-bg-dark-shadow);
        border-top-color: var(--light-bg-light-shadow);
        border-left-color: var(--light-bg-light-shadow);

        ${props => props.color ?
                css`
                box-shadow:  inset 0.5px 0.8px 5px var(--tetrimino-shadow-color);
                `
                :
                css`
                box-shadow:  none;
                `
        } 

        
        transition: background-color .05s ease-in-out;
        ${props =>
                props.board &&
                css`
                width:  var(--block-size);
                height: var(--block-size);
                border-radius: 8px;
                @media (max-width:600px ) {
                border-radius: 4px;
        }
        `};

        ${props =>
                props.player &&
                css`
                width:  var(--block-size-player);
                height: var(--block-size-player);
                border-radius: 3px;


        `};


        @media (max-height:1000px ) {
                --block-size : 4vmin;
                border-radius: 3px;
        }


        @media (max-width:600px ) {
                --block-size : 6vmin;
                border-radius: 5px;
        }


`