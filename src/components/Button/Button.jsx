import React from 'react';
import { Button as NeuButton } from 'ui-neumorphism'


const Button = (props) => {
    const Props = {
        color: 'var(--primary)',
        ...props,
        depressed: true,

    }
    return (<NeuButton  size='small' {...Props}>{props.children}</NeuButton>);
};

export default Button;