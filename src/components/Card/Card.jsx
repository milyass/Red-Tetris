import React from 'react';
import { Card as NeuCard, CardContent, CardAction } from 'ui-neumorphism'

const Card = (props) => {
    const Props = {
        contentData: '',
        actionData: '',
        ...props,
    }
    return (
        <div>
            <NeuCard {...Props}>
                <CardContent>
                    {Props.contentData}
                </CardContent>
                {
                    Props.actionData && <CardAction>
                        {Props.actionData}
                    </CardAction>
                }

            </NeuCard>
        </div>
    );
};

export default Card;