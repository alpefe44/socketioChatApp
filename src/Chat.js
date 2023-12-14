import { View, Text, Dimensions, ScrollView, TextInput, Button } from 'react-native'
import React from 'react'

const { width, height } = Dimensions.get('window');

const Chat = ({ socket, username, room }) => {

  const [message, setMessage] = React.useState('');
  const [messageList, setMessageList] = React.useState([])


  React.useEffect(() => {
    socket.on('messageReturn', (data) => {
      //console.log(data, "data")
      setMessageList((prev) => [...prev, data])
    })
  }, [socket])

  const sendMessage = async () => {
    const messageContent = {
      username: username,
      message: message,
      room: room,
      date: (new Date(Date.now())).getHours() + ':' + (new Date(Date.now())).getMinutes()
    }
    await socket.emit('message',
      messageContent
    )
    //setMessageList((prev) => [...prev, messageContent])
    setMessage('');
  }



  console.log(messageList, "messagelist")
  return (

    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <View style={{ height: height * .4, width: width * .9, backgroundColor: 'lightblue', gap: 10 }}>
        <ScrollView>
          <View style={{ height: 50, backgroundColor: 'gray', justifyContent: 'flex-start', padding: 5 , flexDirection:'row', alignItems:'center' , gap:15 }}>
            <View style={{ width: 40, height: 40, borderRadius: 40, backgroundColor: 'white' }}></View>
            <Text style = {{fontWeight:'bold'}}>{username.toUpperCase()}</Text>
          </View>

          {
            messageList && messageList.map((item , key) => {
              return (
                <View key={key} style={{ alignSelf: username === item.username ? 'flex-end' : 'flex-start', width: width * .5, height: 45, backgroundColor: username === item.username ? 'green' : 'gray', borderTopLeftRadius: 15, borderTopEndRadius: 15, borderBottomStartRadius: 15, marginLeft: 10, marginTop: 10, alignItems: 'baseline', justifyContent: 'center', paddingHorizontal: 10 }}>
                  <Text style={{ fontSize: 12, color: 'white' }}>{item.message}</Text>
                  <Text style={{ fontSize: 12, alignSelf: 'flex-end', color: 'white' }}>{item.username}- {item.date}</Text>
                </View>

              )
            })
          }
        </ScrollView>
      </View>
      <View style={{ flexDirection: 'row', width: width * .9 , marginTop:2 }}>
        <TextInput value={message} onChangeText={(text) => setMessage(text)} placeholder='Bir şeyler yazın...' style={{ height: 40, borderColor: 'gray', borderWidth: 1, paddingHorizontal: 10, flex: 1 }} />
        <Button title='Gönder' onPress={() => sendMessage()}></Button>
      </View>
    </View >
  )
}

export default Chat