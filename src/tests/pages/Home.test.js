import { render, screen } from '@testing-library/react';
import {Home} from '../../pages/';
import { renderWithProviders } from "../../utils/utils-for-tests";






describe("<Game />", () => {
    it('Game : ', () => {
        const home = renderWithProviders(<Home/>);
        expect(home).toMatchSnapshot()
    })



})