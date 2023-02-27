import { render, screen } from '@testing-library/react';
import { ScoreBoard }  from '../../components/';
import { shallow } from "enzyme";
import { renderWithProviders } from "../../utils/utils-for-tests";







describe("<ScoreBoard />", () => {
    it('ScoreBoard : ', () => {
        const scoreBoardComponent = renderWithProviders(<ScoreBoard/>);
        expect(scoreBoardComponent).toMatchSnapshot()
    })
    it('ScoreBoard Should Show players ', () => {
        const scoreBoardComponent = renderWithProviders(<ScoreBoard/>,  {
            preloadedState: {
                socket: {
                    roomData: {
                        winner: {
                            playerName: "test1",
                            socketId: "<id>",
                            gameState: {
                                score: 0,
                                line: 0
                            }
       
                        },
                        players: [
                            {
                                playerName: "test",
                                socketId: "<id>",
                                gameState: {
                                    score: 0,
                                    line: 0
                                }
           
                            }
                        ]
                    }
                }
            }
           });
        expect(scoreBoardComponent).toMatchSnapshot()
    })


})