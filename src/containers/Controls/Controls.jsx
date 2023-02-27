import React, { useState } from 'react';
import { IconButton } from 'ui-neumorphism'
import { ArrowRepeat, CaretDown, CaretLeft, CaretRight, BoxArrowRight, VolumeMuteFill, VolumeUpFill } from "react-bootstrap-icons"

const Controls = () => {

    const [ mute, setMute] = useState(true)
    const handleMute = () => setMute((prevValue) => !prevValue)


    return (
        <div className='row justify-content-center' >
            <div >
                <div style={{ width: '150px', height: '150px' ,marginLeft:'130px'}} className="container mt-3">
                    <div className="row justify-content-center">
                        <div className='row ' style={{ width: "fit-content", }}>
                            <IconButton rounded text={false} color='var(--g-text-color-light)'>
                                <ArrowRepeat className='animate__animated animate__flipInX'/>
                            </IconButton>
                        </div>
                    </div>
                    <div className='row justify-content-evenly' >
                        <div className='row'>
                            <div className='col  ' style={{ width: "fit-content", }}>
                                <IconButton rounded text={false} color='var(--g-text-color-light)'>
                                    <CaretLeft className='animate__animated animate__flipInY'/>
                                </IconButton>
                            </div>
                            <div className='col  justify-content-end ' style={{ width: "fit-content", }}>

                                <IconButton rounded text={false} color='var(--g-text-color-light)'>
                                    <CaretRight className='animate__animated animate__flipInX'/>
                                </IconButton>
                            </div>
                        </div>
                    </div>
                    <div className='row justify-content-center' >
                        <div className='row' style={{ width: "fit-content", }}>
                            <IconButton rounded text={false} color='var(--g-text-color-light)'>
                                <CaretDown className='animate__animated animate__flipInY'/>
                            </IconButton>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-4 mt-3">
                <div style={{ width: '150px', height: '50px' }} className="container">
                    <div className='row justify-content-evenly' >
                        <div className='row'>
                            <div className='col  ' style={{ width: "fit-content", }}>
                                <IconButton onClick={handleMute} rounded text={false} color='var(--g-text-color-light)'>
                                    { (mute && <VolumeUpFill className='animate__animated animate__flipInX'/>) || <VolumeMuteFill className='animate__animated animate__flipInX'/>}
                                </IconButton>
                            </div>
                            <div className='col justify-content-end' style={{ width: "fit-content", }}>
                                <IconButton rounded text={false} color='var(--g-text-color-light)'>
                                    <BoxArrowRight className='animate__animated animate__flipInY'/>
                                </IconButton>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>


    );
};

export default Controls;