import React from 'react';
import { ToggleButtonGroup, ToggleButton } from 'ui-neumorphism'
import { Row } from 'react-bootstrap';

const Selection = (props) => {
    const ToggleButtons = 
    props.selections?.map((selection, index) => 
    (<ToggleButton value={selection} key={index} className="p-2 m-1 animate__animated animate__pulse">{selection}</ToggleButton>)
    )
    return (
        <div>
        <Row>
          <ToggleButtonGroup mandatory color='var(--primary)' value="solo" onChange={props.onChange}>
          {ToggleButtons}
          </ToggleButtonGroup>
          </Row>
        </div>
    );
};

export default Selection;