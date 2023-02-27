import { render, screen } from '@testing-library/react';
import {GameInfo} from '../../containers/';
import { renderWithProviders } from "../../utils/utils-for-tests";






describe("<GameInfo />", () => {
    it('GameInfo : ', () => {
        const gameInfo = renderWithProviders(<GameInfo/>);
        expect(gameInfo).toMatchSnapshot()
    })



})