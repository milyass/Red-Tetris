import React from 'react';
import { StyledInsetCardContainer,StyledInsetCard,Text,Value } from './StyledInsetcard';

const InsetCard = (props) => {
    const { text, value } = props

    return (
        <StyledInsetCardContainer>
            <Text>{text}</Text>
            <StyledInsetCard>
                <Value className="animate__animated animate__flipInX">
                    {value}
                </Value>
            </StyledInsetCard>
        </StyledInsetCardContainer>
    )
}

export default InsetCard;