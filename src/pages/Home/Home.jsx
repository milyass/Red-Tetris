import React, { useState } from 'react';
import {Button,Input} from "../../components/"
import { useSelector, useDispatch } from 'react-redux'
import { emitCreateOrJoinRoom } from '../../features/socket/socketSlice'
import { Dialog, Divider, Fab, IconButton } from 'ui-neumorphism'
import { Row, Col } from 'react-bootstrap';
import { ArrowDownSquare, ArrowUpSquare, ArrowLeftSquare, ArrowRightSquare, DashSquare, QuestionCircle } from 'react-bootstrap-icons'


const Home = ({ setCurrentPath, socket, isCheated }) => {

  const [roomName, setRoomname] = useState("")
  const [playerName, setPlayerName] = useState("")
  const [error, setError] = useState(null)
  const [isVisibleHowToPlay, setisVisibleHowToPlay] = useState(false)
  const gameState = useSelector((state) => state.game)
  const dispatch = useDispatch()
  const TEXT_AREA_WIDTH = 350
  const handleStartgame = () => {
    setError(null)
    if (!(roomName && playerName && socket)) return
    window.location.hash = `#${roomName}[${playerName}]`
    const regexPath = /^\/\#\w+\[\w+\]/
    const isCorrectPathPattern = regexPath.test(window.location.hash)
    if(!isCorrectPathPattern) setError("room name or player name invalid, only letters and numbers are valid. should be shorter than 100 characters.")
    setCurrentPath(`#${roomName}[${playerName}]`)
    dispatch(emitCreateOrJoinRoom({ roomName, playerName, socketId: socket.id, gameState, isCheated }))
  }

  return (
    <div style={{
      position: "absolute",
      left: "50%",
      top: "42%",
      width: "90vw",
      maxWidth: "800px",
      transform: "translate(-50%, -50%)",
      padding: 20,
      borderRadius: 10
    }}>
      <Row className='justify-content-center'>
        <Col>
          <h2 className='text-center' style={{ color: 'var(--g-text-color-light)', padding: '5px' }}>
            what are you waiting for? Begin playing the game right away!
          </h2>
        </Col>
      </Row>
      <Row className='justify-content-center mt-5'> 
        <Col>
        <form onSubmit={(e) => {  
          e.preventDefault() 
          handleStartgame()
          }}>
        <Input className="mt-2 p-2" onChange={(e) => setRoomname(e?.target.value)} width={TEXT_AREA_WIDTH} placeholder={roomName || "Room"} />
          <Input className="mt-2 p-2" onChange={(e) => setPlayerName(e?.target.value)} width={TEXT_AREA_WIDTH} placeholder={playerName || "Username"} />
          <div style={{ display: "flex", justifyContent: "center", marginTop: 20}}>
            <Button style={{ margin: 10 }} onClick={handleStartgame}>Start Game</Button>
            <IconButton  text={false} rounded size="large" style={{ marginTop: 5, marginLeft: 10, color: "red" }} onClick={() => setisVisibleHowToPlay(true)}>
            <QuestionCircle color="var(--primary)" size={17}/>
            </IconButton>
          </div>
        </form>
        </Col>
        {error && (<span style={{ color: "red", margin: 50, textAlign: "center" }}>{error}</span>)}
      </Row>

      <Row>
        <Dialog
          minWidth={300}
          visible={isVisibleHowToPlay}
          onClose={() => setisVisibleHowToPlay(true)}
        >
          <div
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              width: "90vw",
              maxWidth: "800px",
              transform: "translate(-50%, -50%)",
              padding: 20,
              borderRadius: 10,
              border: "3px solid var(--primary)",
              boxShadow: "2px 2px 6px var(--light-bg-dark-shadow),  -2px -2px 6px var(--light-bg-light-shadow)"
            }}>
            <div style={{ padding: 5, margin: 0, display: "flex", justifyContent: "end" }}>
              <Fab onClick={() => setisVisibleHowToPlay(false)}>
                X
              </Fab>
            </div>
            <Row className='mt-4 mb-4'>
              <Col style={{ padding: 0, margin: 0, }}>
                <h2 className='text-center'>
                  Move
                </h2>
                <div style={{ padding: 0, margin: 0, display: "flex", justifyContent: "center" }}>
                  <ArrowLeftSquare size={42} style={{ margin: 10 }} />
                  <ArrowRightSquare size={42} style={{ margin: 10 }} />
                </div>
              </Col>
              <Col style={{ padding: 0, margin: 0, }}>
                <h2 className='text-center'>
                  Rotate
                </h2>
                <div style={{ padding: 0, margin: 0, display: "flex", justifyContent: "center" }}>
                  <ArrowUpSquare size={42} style={{ margin: 10 }} />
                </div>
              </Col>
              <Col style={{ padding: 0, margin: 0, }}>
                <h2 className='text-center'>
                  Drop
                </h2>
                <div style={{ padding: 0, margin: 0, display: "flex", justifyContent: "center" }}>
                  <ArrowDownSquare size={42} style={{ margin: 10 }} />
                  <DashSquare size={42} style={{ margin: 10 }} />
                </div>
              </Col>
            </Row>
            <Divider />
            <Row className='justify-content-start'>
              <Col md={6}>
                <h5 className=''>
                  {'->'} fill in the room name and player name to start.
                </h5>
                <h5 className=''>
                  {'->'} in tournament mode, only the room admin can start the game.
                </h5>
                <h5 className=''>
                  {'->'} speed will increase on each level you complete.
                </h5>
                <h5 className=''>
                  {'->'} you can chat with players in the room.
                </h5>
                <h5 className=''>
                  {'->'} last player remaining wins.
                </h5>
                <br />
              </Col>

            </Row>
          </div>
        </Dialog>
      </Row>
    </div>
  );
};

export default Home;