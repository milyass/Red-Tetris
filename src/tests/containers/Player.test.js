import { render, screen } from '@testing-library/react';
import {Player} from '../../containers/';
import { renderWithProviders } from "../../utils/utils-for-tests";

import {StyledPlayerInfo} from "../../containers/Player/StyledPlayer"

import 'jest-styled-components'
import { shallow } from 'enzyme';



describe("<Player />", () => {
    it('Player : ', () => {
        const playerConatainer = renderWithProviders(<Player/>);
        expect(playerConatainer).toMatchSnapshot()
    })

    it('StyledPlayerInfo : ', () => {
        const styledPlayerInfo = shallow(<StyledPlayerInfo/>);
        expect(styledPlayerInfo).toMatchSnapshot()
    })

})