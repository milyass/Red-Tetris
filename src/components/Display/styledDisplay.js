import styled , {css} from 'styled-components'

export const StyledDisplay = styled.div`
    font-family: VT323;
    font-size: 20px;
    display: flex;

    @media (max-width:1024px ) {
        font-size: 15px;
  
    }

    @media (max-height:768px )  {
        font-size: 15px;
    }
`



export const Text = styled.span`
    color : var(--g-display-color);
`

export const Value =styled.span`
    ${props => props.text ?
    css`
        text-align : right;
    ` :
    css`
        text-align : center;
    `
    } 
      
    flex: 1;
    white-space: nowrap;
    padding-left: 10px;
`