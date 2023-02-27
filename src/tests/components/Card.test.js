import { render, screen } from '@testing-library/react';
import Card from '../../components/Card/Card';
import { shallow } from "enzyme";





describe("<Card />", () => {
    it('Card Component opponents &&  chat : ', () => {
        const cardComponents = shallow(<Card inset style={{}} contentData={() => {}} actionData={()=> {}} />);
        expect(cardComponents).toMatchSnapshot()
    })

    it('Card Component ScoreBoard : ', () => {
        const cardComponents = shallow(<Card  contentData={() => {}} actionData={()=> {}} />);
        expect(cardComponents).toMatchSnapshot()
    })

})
