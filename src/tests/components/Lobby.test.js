import { fireEvent, render, screen } from '@testing-library/react';
import { Lobby } from '../../components/';
import { createItem } from '../../components/Lobby/Lobby'
import { renderWithProviders } from "../../utils/utils-for-tests";


describe("<Lobby />", () => {
    it('Lobby : ', () => {
        const lobbyComponent = renderWithProviders(<Lobby />);
        expect(lobbyComponent).toMatchSnapshot()
    })

    it('Lobby : ', () => {
        const lobbyComponent = renderWithProviders(<Lobby />);
        const startGameButton = screen.getByRole('button', { name: /Start Game/i })
        fireEvent.click(startGameButton)
        expect(lobbyComponent).toMatchSnapshot()
    })


    it('Lobby => CreateItem: ', () => {
        const mockItem = {
            name: "nameTest",
            role: "roleTest",
            status: "statusTest"
        }
       const item = createItem("nameTest","roleTest","statusTest")
       expect(item).toEqual(mockItem)
    })

    it("should show a toast message", () => {
       const lobbyComponent = renderWithProviders(<Lobby />, {
        preloadedState: {
            socket: {
                roomData: {
                    players: [
                        {
                            playerName: "test",
                            socketId: "<id>"
                        }
                    ]
                }
            }
        }
       });
       expect(lobbyComponent).toMatchSnapshot()
      });
})

