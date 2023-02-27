import { render, screen } from '@testing-library/react';
import { MessagePopup }  from '../../components/';
import { shallow } from "enzyme";
import { renderWithProviders } from "../../utils/utils-for-tests";







describe("<MessagePopup />", () => {
    it('MessagePopup : ', () => {
        const messagePopupComponent = renderWithProviders(<MessagePopup/>);
        expect(messagePopupComponent).toMatchSnapshot()
    })
    it("should show a Message Popup", () => {
        const messagePopupComponent = renderWithProviders(<MessagePopup />, {
         preloadedState: {
            socket: {
                roomData: {
                    gameStatus: "started"
                }
            },
             game: {
                isRunning: true, 
                gameOver: true,  
                score: 42, 
                line: 42, 
                level: 42
             }
         }
        });
        expect(messagePopupComponent).toMatchSnapshot()
       });

       it("should show a Message Popup: Pause", () => {
        const messagePopupComponent = renderWithProviders(<MessagePopup />, {
         preloadedState: {
            socket: {
                roomData: {
                    gameStatus: "started"
                }
            },
             game: {
                isRunning: false, 
             }
         }
        });
        expect(messagePopupComponent).toMatchSnapshot()
       });


})