import React from 'react';
import {H1} from './StyledLogo'

const Logo = () => {

    return (
        <div>
        <H1 Red={'Red'}>Red</H1>
        <H1 className='animate__animated animate__slideInLeft'>Tetris</H1>
        </div>
    );
};

export default Logo;