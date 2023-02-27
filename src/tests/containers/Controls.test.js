import { render, screen } from '@testing-library/react';
import {Controls} from '../../containers/';
import { renderWithProviders } from "../../utils/utils-for-tests";






describe("<Controls />", () => {
    it('Controls : ', () => {
        const controls = renderWithProviders(<Controls/>);
        expect(controls).toMatchSnapshot()
    })



})