import React from 'react';
import { StyledGameInfo } from './StyledGameInfo'
import { useSelector } from 'react-redux'

import {InsetCard,NextBlock} from '../../components'


const GameInfo = (props) => {

    const game = useSelector((state) => state.game)
    const { score,level,line } = game


    const displayData = [{
        text: 'Score',
        value: score
    },
    {
        text: 'Level',
        value: level
    },
    {
        text: 'Line',
        value: line
    }
    ]

    return (
        <StyledGameInfo>
            {displayData.map(({ text, value }, index) => <InsetCard key={index} text={text} value={value} width={'100%'} height={'3vmin'} />)}
            <NextBlock />
        </StyledGameInfo>

    );
};

export default GameInfo;