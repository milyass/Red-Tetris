import styled from 'styled-components'


export const StyledInsetCardContainer = styled.div`
    font-family: 'VT323';
    font-size: 20px;
    width:100%;
    grid-area: ${props => props.text};

    @media (max-width:768px ) {
        width: 100%;
        padding: 0.5vmin;
        font-size: 15px;
    }

    @media (max-height:768px )  {
        font-size: 15px;
    }

`

export const StyledInsetCard = styled.div`
        padding : 1vmin;
        margin: 0px;
        border-radius: 5px;
        background: var(--bs-body-bg);
        box-shadow: inset 1px 1px 3px var(--light-bg-dark-shadow), inset -1px -1px 3px var(--light-bg-light-shadow);

        @media (max-height:768px )  {
            padding: '0.5vmin';
        }
`

export const Text = styled.span`
    text-align: center;
    color: var(--g-text-color-light);
`

export const Value = styled.span`
        color: var(--g-display-color);
        display: flex;
        justify-content: center;
        text-shadow: 0px 0px 2px var(--bs-body-bg), 0px 0px 2px var(--g-display-color)
`