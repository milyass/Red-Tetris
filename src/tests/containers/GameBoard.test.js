import { render, screen } from '@testing-library/react';
import {GameBoard} from '../../containers/';
import { renderWithProviders } from "../../utils/utils-for-tests";






describe("<GameBoard />", () => {
    it('GameBoard : ', () => {
        const gameBoard = renderWithProviders(<GameBoard/>);
        expect(gameBoard).toMatchSnapshot()
    })



})