import React from 'react';
import { TextField } from 'ui-neumorphism'
import { inputStyle } from './StyledInput'

const Input = (props) => {
    return (
            <input
              style={inputStyle}
              {...props} 
              type="text"   
              autoComplete="off"
            />

    )
};

export default Input;