import React from 'react';
import {StyledDisplay,Text,Value} from './styledDisplay'

const Display = (props) => {
    const { text, value } = props
    return (
        <StyledDisplay>
            <Text>{text}</Text>
            <Value text={text}>{value}</Value>
        </StyledDisplay>
    );
};

export default Display;