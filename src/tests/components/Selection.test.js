import { render, screen } from '@testing-library/react';
import { Selection }  from '../../components/';
import { shallow } from "enzyme";
import { renderWithProviders } from "../../utils/utils-for-tests";







describe("<Selection />", () => {
    it('Selection : ', () => {
        const selectionComponent = shallow(<Selection/>);
        expect(selectionComponent).toMatchSnapshot()
    })



})