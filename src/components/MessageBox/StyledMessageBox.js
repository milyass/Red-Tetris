import styled , {css} from "styled-components"


export const MessageContainer = styled.div`
    text-align : left;
    flex: 1;
    white-space: normal;
    padding-left: 10px;
    ${props =>
    props.isCurrentPlayer &&
    css`
        text-align : right;
        white-space: normal;
    `};

`

export const SenderUsername = styled.span`
    color: var(--text-color);
    ${props =>
        props.isCurrentPlayer &&
        css`
        color: red;
        `};
`

export const MessageText = styled.div`
    ${props => 
    props.isCurrentPlayer ?  
    css`
        color: grey;   
        box-shadow: inset 1px 1px 3px var(--light-bg-dark-shadow), inset -1px -1px 3px var(--light-bg-light-shadow)
    `
    :
    css`
        box-shadow:  1px 1px 3px var(--light-bg-dark-shadow),  -1px -1px 3px var(--light-bg-light-shadow)
    `
    };
    margin: 1vmin;
    border-radius: 5px;
    padding: 0.5vmin;
    background: var(--bs-body-bg);
`