import { render, screen } from '@testing-library/react';
import {Input} from '../../components/';
import { shallow } from "enzyme";







describe("<Input />", () => {
    it('Input : ', () => {
        const inputComponent = shallow(<Input/>);
        expect(inputComponent).toMatchSnapshot()
    })



})