import { render, screen } from '@testing-library/react';
import {Logo} from '../../components/';
import { shallow } from "enzyme";
import { renderWithProviders } from "../../utils/utils-for-tests";







describe("<Logo />", () => {
    it('Logo : ', () => {
        const logoComponent = shallow(<Logo />);
        expect(logoComponent).toMatchSnapshot()
    })



})