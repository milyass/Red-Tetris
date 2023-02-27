import styled from 'styled-components'


export const GridContainer = styled.div`
height: 100%;
padding: 1.5vmin 3.5vmin;
display: flex;
justify-content: center;
outline: none;
@media   (max-width: 768px) {
  height: 100%;
  
}
@media   (min-width: 769px) {
  height: 100%;
}

@media   (max-height: 550px) {
  height: 50%;
}
`