import { screen, renderHook,fireEvent } from '@testing-library/react';
import { Chat } from '../../containers/';
import { renderWithProviders } from "../../utils/utils-for-tests";

import {scrollToBottom} from '../../utils/'


describe("<Chat />", () => {
    it('Chat : ', () => {
        const chat = renderWithProviders(<Chat />);
        expect(chat).toMatchSnapshot()
    })

    it('handles change', () => {
        renderWithProviders(<Chat />)
        const input = screen.getByRole('textbox')

        expect(input).toBeInTheDocument()
        fireEvent.change(input, { target: { value: '123' } })
        
        expect(input.value).toBe('123'); // to test input value

    })
    it('should scroll', () => {
        renderWithProviders(<Chat />)
        const ref = {
          current: {
            scrollIntoView: jest.fn()
          }
        }
        renderHook(() => scrollToBottom(ref)) 
        expect(ref.current.scrollIntoView).toHaveBeenCalledTimes(1)
      })

      it('show messages', () => {
        window.HTMLElement.prototype.scrollIntoView = jest.fn()
        const chatComponent = renderWithProviders(<Chat />, {
          preloadedState: {
              socket: {
                  roomData: {
                      messages: [
                        { playerName: "test", 
                          socketId: "test",
                          roomName: "test", 
                          message: "test",
                          isCurrentPlayer: true 
                        }
                      ]
                  }
              }
          }
         })
         expect(chatComponent).toMatchSnapshot()
      })
})