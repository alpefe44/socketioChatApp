import { View, Text, TextInput, Dimensions, Button } from 'react-native'
import React from 'react'

const { width, height } = Dimensions.get('window');

const Room = ({ username, room, setUsername, setRoom, socket, setChatScreen }) => {

  const sendRoom = () => {
    socket.emit('room', room)
    setChatScreen(true)
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <View style={{ width: width * .9, height: height * .3, backgroundColor: 'lightblue', padding: 10, gap: 10, borderRadius: 15 }}>
        <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 24 }}>Welcome the Chat</Text>
        <TextInput value={username} onChangeText={(text) => setUsername(text)} placeholder='Username' style={{ borderWidth: 2, borderRadius: 15, paddingHorizontal: 5 }}></TextInput>
        <TextInput value={room} onChangeText={(text) => setRoom(text)} placeholder='Room' style={{ borderWidth: 2, borderRadius: 15, paddingHorizontal: 5 }}></TextInput>
        <Button title='CHAT !' onPress={() => sendRoom()}></Button>
      </View>
    </View>
  )
}

export default Room