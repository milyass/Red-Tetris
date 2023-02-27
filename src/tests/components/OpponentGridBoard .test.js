import { render, screen } from '@testing-library/react';
import { OpponentGridBoard }  from '../../components/';
import { shallow } from "enzyme";
import { renderWithProviders } from "../../utils/utils-for-tests";







describe("<OpponentGridBoard />", () => {
    it('OpponentGridBoard : ', () => {
        const opponentGridBoardComponent = shallow(<OpponentGridBoard/>);
        expect(opponentGridBoardComponent).toMatchSnapshot()
    })



})