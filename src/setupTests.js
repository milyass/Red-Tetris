// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });


function setupTimeTravelForRNAnimated() {
    const MockDate = require('mockdate');
    const frameTime = 500;
    global.withAnimatedTimeTravelEnabled = (func) => {
        MockDate.set(Date.now());
        jest.useFakeTimers();
        func();
        MockDate.reset();
        jest.useRealTimers();
    }
    global.requestAnimationFrame = (callback) => {
        setTimeout(callback, frameTime);
    }
    global.timeTravel = (time = frameTime) => {
        const tickTravel = () => {
            const now = Date.now();
            MockDate.set(new Date(now + frameTime));
            // Run the timers forward
            jest.advanceTimersByTime(frameTime);
        }
        // Step through each of the frames
        const frames = time / frameTime;
        for (let i = 0; i < frames; i++) {
            tickTravel();
        }
    }
}
setupTimeTravelForRNAnimated();
