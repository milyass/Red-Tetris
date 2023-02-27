import { render, screen } from '@testing-library/react';
import {Game} from '../../pages/';
import { renderWithProviders } from "../../utils/utils-for-tests";






describe("<Game />", () => {
    it('Game : ', () => {
        const game = renderWithProviders(<Game/>);
        expect(game).toMatchSnapshot()
    })



})