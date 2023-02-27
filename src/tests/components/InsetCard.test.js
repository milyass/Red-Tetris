import { render, screen } from '@testing-library/react';
import {InsetCard} from '../../components/';
import { shallow } from "enzyme";







describe("<InsetCard />", () => {
    it('InsetCard : ', () => {
        const insetCardComponent = shallow(<InsetCard/>);
        expect(insetCardComponent).toMatchSnapshot()
    })



})