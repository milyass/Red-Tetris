import { render, screen } from '@testing-library/react';
import {Opponents} from '../../containers/';
import { renderWithProviders } from "../../utils/utils-for-tests";






describe("<Opponents />", () => {
    it('Opponents : ', () => {
        const opponentsConatainer = renderWithProviders(<Opponents/>);
        expect(opponentsConatainer).toMatchSnapshot()
    })



})