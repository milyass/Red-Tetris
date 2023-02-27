import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { NavBar } from './components/'
import 'ui-neumorphism/dist/index.css'
import 'animate.css'
import { useState, useEffect, useRef } from 'react'
import { Game, Home } from './pages/'
import { useSelector, useDispatch } from 'react-redux'
import { attemptConnection } from './features/socket/socketSlice'
import cheet from 'cheet.js'

function App () {
  const [currentPath, setCurrentPath] = useState(window.location.hash)
  const [isCheated, setIsCheated] = useState(false)
  const regexPath = /^\/\#\w+\[\w+\]/
  const isCorrectPathRegex = 
  regexPath.test(window.location.href.split(window.location.origin)[1]) && 
  window.location.href.split(window.location.origin)[1].length <= 100
  const pathElement = currentPath
    .replace('#', '')
    .replace('[', '%')
    .replace(']', '%')
    .split('%')
  const room = pathElement[0] || undefined
  const player = pathElement[1]
  const socket = useSelector(state => state.socket)?.connection
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(attemptConnection())
    cheet('↑ ↑ ↓ ↓ ← → ← → b a', () => {
      setIsCheated(prev => !prev)
    })
  }, [])
  return (
    <div className='container'>
      <div>
        {isCheated && (
          <div
            className='animate__animated animate__backOutUp animate__delay-2s'
            style={{
              color: 'var(--color-7)',
              position: 'absolute',
              left: '42%'
            }}
          >
            Cheat Activated
          </div>
        )}
        <NavBar setCurrentPath={setCurrentPath} player={player} />
        {room && player && isCorrectPathRegex && socket ? (
          <Game
            isCheated={isCheated}
            setCurrentPath={setCurrentPath}
            roomName={String(room).toLowerCase()}
            playerName={String(player).toLowerCase()}
            socket={socket}
          />
        ) : (
          <Home
            className='App'
            setCurrentPath={setCurrentPath}
            socket={socket}
            isCheated={isCheated}
          />
        )}
      </div>
    </div>
  )
}

export default App
