import { render, screen } from '@testing-library/react';
import { MessageBox }  from '../../components/';
import { shallow } from "enzyme";

import 'jest-styled-components'

import {MessageContainer,MessageText,SenderUsername} from '../../components/MessageBox/StyledMessageBox'




describe("<MessageBox />", () => {
    it('MessageBox with props: ', () => {
        const player = {
            playerName : 'Han',
            message : 'Kiwalo',
        }

        const messageBoxComponent = shallow( <MessageBox Sender={true} data={{ ...player, isCurrentPlayer : true  }} />        );
        expect(messageBoxComponent).toMatchSnapshot()
    })

    it('MessageBox with props: ', () => {
        const data = {
            playerName : 'Amal',
            message : 'Hello', 
            isCurrentPlayer : false
        }
        const messageBoxComponent = shallow(<MessageBox data={data} />);
        expect(messageBoxComponent).toMatchSnapshot()
    })


    it('MessageText : ', () => {
        const messageText = shallow(<MessageText/>);
        expect(messageText).toMatchSnapshot()
    })

    it('MessageText with props : ', () => {
        const messageText = shallow(<MessageText isCurrentPlayer={true} />);
        expect(messageText).toMatchSnapshot()
    })

    it('MessageContainer : ', () => {
        const messageContainer = shallow(<MessageContainer/>);
        expect(messageContainer).toMatchSnapshot()
    })

    it('MessageContainer with props : ', () => {
        const messageContainer = shallow(<MessageContainer isCurrentPlayer={true} />);
        expect(messageContainer).toMatchSnapshot()
    })

    it('SenderUsername : ', () => {
        const senderUsername = shallow(<SenderUsername isCurrentPlayer={false} />);
        expect(senderUsername).toMatchSnapshot()
    })


    it('SenderUsername : ', () => {
        const senderUsername = shallow(<SenderUsername isCurrentPlayer={true} />);
        expect(senderUsername).toMatchSnapshot()
    })
})