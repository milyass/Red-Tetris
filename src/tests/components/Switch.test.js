import { render, screen } from '@testing-library/react';
import { Switch }  from '../../components/';
import { shallow } from "enzyme";
import { renderWithProviders } from "../../utils/utils-for-tests";







describe("<Switch />", () => {
    it('Switch : ', () => {
        const switchComponent = shallow(<Switch/>);
        expect(switchComponent).toMatchSnapshot()
    })



})