import { render, screen } from '@testing-library/react';
import {GameAction} from '../../containers/';
import { renderWithProviders } from "../../utils/utils-for-tests";






describe("<GameAction />", () => {
    it('GameAction : ', () => {
        const gameAction = renderWithProviders(<GameAction/>);
        expect(gameAction).toMatchSnapshot()
    })



})