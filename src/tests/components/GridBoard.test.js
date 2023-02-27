import { GridBoard } from '../../components/';
import { renderWithProviders } from "../../utils/utils-for-tests";
import { moveDown } from '../../features/game/gameSlice';
import { act } from 'react-test-renderer';



describe("<GridBoard />", () => {
    it('Grid Board : ', () => {
        const gb = renderWithProviders(<GridBoard />);
        expect(gb).toMatchSnapshot()
    })

})

describe('<GridBoard/>', () => {
    it('dispatch move down ', () => {
        // Invoke our global time travel function
        global.withAnimatedTimeTravelEnabled(() => { 
          const wrapper = renderWithProviders(<GridBoard />);
          act(()=> {
             wrapper.store.dispatch(moveDown())
          })          
          // Simulate time travel to trigger callbacks and effects
          global.timeTravel(500);
          expect(wrapper.store.getState().game.y).toBe(-3)
        });
      });

      
    });