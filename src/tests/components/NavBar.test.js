import { render, screen } from '@testing-library/react';
import { NavBar }  from '../../components/';
import { shallow } from "enzyme";
import { renderWithProviders } from "../../utils/utils-for-tests";







describe("<NavBar />", () => {
    it('NavBar : ', () => {
        const navBarComponent = renderWithProviders(<NavBar />);
        expect(navBarComponent).toMatchSnapshot()
    })



})