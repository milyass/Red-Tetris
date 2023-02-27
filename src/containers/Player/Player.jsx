import React from 'react';

import {GridBoard} from '../../components/'


const Player = () => {
    return (
        <div className='mb-2'>
                <div className="d-flex justify-content-between">
                
                    <div className='d-flex flex-end'>
                        <GridBoard />
                    </div>
                </div>
        </div>
    )
};

export default Player;