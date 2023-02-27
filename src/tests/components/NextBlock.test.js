import { render, screen } from '@testing-library/react';
import { NextBlock }  from '../../components/';
import { shallow } from "enzyme";
import { renderWithProviders } from "../../utils/utils-for-tests";







describe("<NextBlock />", () => {
    it('NextBlock : ', () => {
        const nextBlockComponent = renderWithProviders(<NextBlock/>);
        expect(nextBlockComponent).toMatchSnapshot()
    })



})