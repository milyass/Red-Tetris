import React from 'react';
import { SunFill, MoonFill } from 'react-bootstrap-icons';
import { utils } from "../../utils"
import { useState } from "react"
import { useEffect } from 'react';
import {Switch} from '../../components/'

const ThemeSwitch = () => {
    const [theme, setTheme] = useState('light');
    utils.setCSSRootVariables(utils[theme])
    const onChange = (e) => {
        const theme = (e.target.checked) ?  'dark' :  'light'
        setTheme(theme)
        localStorage.setItem('theme', JSON.stringify(theme));
    }
    
    useEffect(() => {
        const themeValue = JSON.parse(localStorage.getItem('theme'))
        if(themeValue) setTheme(themeValue)
    },[])

    const iconAnimation = 'animate__animated animate__rotateIn'
    return (
        <div>
            <SunFill color='var(--g-text-color-light)' className={`mb-3 ${iconAnimation}`} size={24} />
            {theme === 'dark' && <Switch checked onChange={onChange} color='var(--g-text-color-light)'/>}  
            {theme === 'light' && <Switch onChange={onChange} color='var(--g-text-color-light)'/>}  
            <MoonFill color='var(--g-text-color-light)' className={`mb-3 ${iconAnimation}`} size={19} />
        </div>
    );
};

export default ThemeSwitch;