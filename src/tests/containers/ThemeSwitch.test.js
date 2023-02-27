import { render, screen } from '@testing-library/react';
import {ThemeSwitch} from '../../containers/';
import { renderWithProviders } from "../../utils/utils-for-tests";
import { shallow } from "enzyme";






describe("<ThemeSwitch />", () => {
    it('ThemeSwitch : ', () => {
        const themeSwitchConatainer = shallow(<ThemeSwitch/>);
        expect(themeSwitchConatainer).toMatchSnapshot()
    })



})