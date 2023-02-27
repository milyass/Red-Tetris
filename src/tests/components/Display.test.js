import { render, screen } from '@testing-library/react';
import Display from '../../components/Display/Display';
import StyledDisplay from '../../components/Display/styledDisplay';
import { Value, Text } from '../../components/Display/styledDisplay';
import 'jest-styled-components'

import { shallow } from "enzyme";

describe("<Display />", () => {

    it('Display Component  : ', () => {
        const displayComponent = shallow(<Display text={"test"} value={"42"}/>);
        expect(displayComponent).toMatchSnapshot()
    })

    it('Text Component  : ', () => {
        const textComponent = shallow(<Text />);
        expect(textComponent).toMatchSnapshot()
    })

    it('Value Component with props text  : ', () => {
        const valueComponent = shallow(<Value text={"42"}  />);
        expect(valueComponent).toMatchSnapshot()
    })

    it('Value Component  without props : ', () => {
        const valueComponent = shallow(<Value   />);
        expect(valueComponent).toMatchSnapshot()
    })

})
