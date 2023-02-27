import styled,{css} from "styled-components";


export const H1 = styled.div`
        font-family: VT323;
        font-size: 42px;
        color: var(--g-text-color-light);
        display:inline-block;
        ${props => props.Red && 
        css`
            color: red
        `
        }
`
