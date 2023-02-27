import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from "../../utils/utils-for-tests";
import Button from '../../components/Button/Button';
import ScoreBoard from '../../components/ScoreBoard/ScoreBoard';
import renderer from 'react-test-renderer';


import { shallow } from "enzyme";



describe("Button Component", () => {
    const mockOnclickFunction = jest.fn()
    //Start Button
    it('Start Game Button Activated: ', () => {

        const startGameBtn = shallow(<Button disabled={false} className="mt-1 p-3" onClick={mockOnclickFunction}>Start Game</Button>);
        expect(startGameBtn).toMatchSnapshot()
        startGameBtn.simulate('click')
        expect(mockOnclickFunction).toBeCalled()

    })

    it('Start Game Button Desactivated: ', () => {

        const startGameBtn = shallow(<Button disabled={true} className="mt-1 p-3" onClick={mockOnclickFunction}>Start Game</Button>);
        expect(startGameBtn).toMatchSnapshot()
        expect(startGameBtn.props().disabled).toBe(true)
        expect(startGameBtn.props().onClick).toHaveBeenCalledTimes(0)
    })

    //Restart Game Buttton

    it('Restart Game Button Activated: ', () => {

        const startGameBtn = shallow(<Button disabled={false} className="mt-1 p-3" onClick={mockOnclickFunction}>Restart Game</Button>);
        expect(startGameBtn).toMatchSnapshot()
        startGameBtn.simulate('click')
        expect(mockOnclickFunction).toBeCalled()

    })

    it('Restart Game Button Desactivated: ', () => {

        const startGameBtn = shallow(<Button disabled={true} className="mt-1 p-3" onClick={mockOnclickFunction}></Button>);
        expect(startGameBtn).toMatchSnapshot()
        expect(startGameBtn.props().disabled).toBe(true)
        expect(startGameBtn.props().onClick).toHaveBeenCalledTimes(0)
    })


    //Start Button Home Page
    it('Start Game Button Activated: ', () => {

        const startGameBtn = shallow(<Button className="mt-3" onClick={mockOnclickFunction}>Start Game</Button>);
        expect(startGameBtn).toMatchSnapshot()
        startGameBtn.simulate('click')
        expect(mockOnclickFunction).toBeCalled()
    })


    //Pause Button Game Action
    it('Pause Game Button Activated: ', () => {

        const startGameBtn = shallow(<Button disabled={false} onClick={mockOnclickFunction}>Pause</Button>);
        expect(startGameBtn).toMatchSnapshot()
        startGameBtn.simulate('click')
        expect(mockOnclickFunction).toBeCalled()

    })

    it('Pause Game Button Desactivated: ', () => {
        const startGameBtn = shallow(<Button disabled={true} onClick={mockOnclickFunction}>Pause</Button>);
        expect(startGameBtn).toMatchSnapshot()
        expect(startGameBtn.props().disabled).toBe(true)
        expect(startGameBtn.props().onClick).toHaveBeenCalledTimes(0)
    })



    //Pause Button Game Action
    it('Pause Game Button Activated: ', () => {

        const startGameBtn = shallow(<Button disabled={false} onClick={mockOnclickFunction}>Pause</Button>);
        expect(startGameBtn).toMatchSnapshot()
        startGameBtn.simulate('click')
        expect(mockOnclickFunction).toBeCalled()

    })

    it('Pause Game Button Desactivated: ', () => {
        const startGameBtn = shallow(<Button disabled={true} onClick={mockOnclickFunction}>Pause</Button>);
        expect(startGameBtn).toMatchSnapshot()
        expect(startGameBtn.props().disabled).toBe(true)
        expect(startGameBtn.props().onClick).toHaveBeenCalledTimes(0)
    })



    //Play Button Game Action
    it('Play Game Button Activated: ', () => {

        const startGameBtn = shallow(<Button disabled={false} onClick={mockOnclickFunction}>Play</Button>);
        expect(startGameBtn).toMatchSnapshot()
        startGameBtn.simulate('click')
        expect(mockOnclickFunction).toBeCalled()

    })

    it('Play Game Button Desactivated: ', () => {
        const startGameBtn = shallow(<Button disabled={true} onClick={mockOnclickFunction}>Play</Button>);
        expect(startGameBtn).toMatchSnapshot()
        expect(startGameBtn.props().disabled).toBe(true)
        expect(startGameBtn.props().onClick).toHaveBeenCalledTimes(0)
    })


})
