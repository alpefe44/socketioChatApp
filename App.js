import { View, Text } from 'react-native'
import React from 'react'
import Room from './src/Room'
import Chat from './src/Chat'
import { io } from 'socket.io-client'

const socket = io('http://192.168.1.105:3000')


const App = () => {
  const [username, setUsername] = React.useState();
  const [room, setRoom] = React.useState();
  const [chatScreen, setChatScreen] = React.useState(false)

  return (
    <>
      {
        !chatScreen ? <Room username={username} room={room} setUsername={setUsername} setRoom={setRoom} socket={socket} setChatScreen={setChatScreen}></Room> : <Chat socket={socket} username={username} room={room}></Chat>
      }
    </>
  )
}

export default App