import 'animate.css';
import './NavBar.css'
import { Navbar, Nav, Container } from "react-bootstrap";
import React from 'react';
import {ThemeSwitch} from '../../containers/';
import {Logo} from '../'
import { useDispatch, useSelector } from 'react-redux'
import { restart } from '../../features/game/gameSlice';
import { Chip } from 'ui-neumorphism';


const setPath = (to, setCurrentPath) => {
  window.location.hash = to
  setCurrentPath(to)

}

const NavBar = ({ setCurrentPath, player }) => {

  const dispatch = useDispatch()
  const roomData = useSelector((state) => state.socket).roomData

  const handleLeaveRoom = () => {
    setPath("", setCurrentPath)
    dispatch(restart())
    window.location.reload()
  }

  const navBarBrand = { 'textDecoration': 'none' }

  return (
    <Navbar expand="md" className="scrolled" style={{ zIndex: 999999 }}>
      <Container>
        <Navbar.Brand style={navBarBrand}>
          <a href="/" style={{ cursor: "pointer" }} onClick={handleLeaveRoom}>
            <Logo />
          </a>
        </Navbar.Brand>
        <Nav className="ms-auto">
          {roomData?.roomName ? <Chip size='large' active style={{ padding: 20}}>
            player <span style={{ color: "var(--color-7)", marginRight: 5, marginLeft: 5 }}>{player}</span>In room<span style={{ color: "var(--color-4)", marginLeft: 5}}>{roomData.roomName}</span>
          </Chip> : <ThemeSwitch />}
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavBar;