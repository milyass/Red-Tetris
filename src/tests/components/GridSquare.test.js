import { render, screen } from '@testing-library/react';
import {GridSquare} from '../../components/';
import { shallow } from "enzyme";
import { renderWithProviders } from "../../utils/utils-for-tests";






describe("<GridSquare />", () => {
    it('GridSquare : ', () => {
        const gridSquare = shallow(<GridSquare/>);
        expect(gridSquare).toMatchSnapshot()
    })



})