import React, { useState } from 'react';
import { View, Text, SafeAreaView, TextInput, Button, FlatList, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';

import { creatChatRoom, getChatRoomList } from '../apis/firebaseChat';

function ChatRoomList({ navigation, chatRoomList, setSelectRoomId }){
  const enterRoom = (roomId) => {
    console.log('enter room id : ',roomId);
    setSelectRoomId(roomId);
    navigation.navigate('ChatRoom');
  }
  
  // 채팅방 조회
  // console.log('rooms : ',chatRoomList); 

  return(
    <SafeAreaView style={{backgroundColor:'#fff'}}>
      <View style={styles.chatRoomListHeader}>
        <Text style={styles.chatRoomListHeaderText}>채팅</Text>
      </View>
      <FlatList 
        data={chatRoomList}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => enterRoom(item?.chatRoomUID)}
            style={styles.chatRoomListContainer}
          >
            <View>
              <Text style={styles.chatRoomListText}>{item?.title}</Text>
            </View>
            <View style={styles.chatRoomNumUsersContainer}>
              <Text style={{color : '#fff'}}>{`${item?.joinUser.length}명 참가중`}</Text>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item?.chatRoomUID}
      />
    </SafeAreaView>
    
  )
}

const styles = StyleSheet.create({
  chatRoomListHeader : {
    width : '100%',
    height : 40,
    marginTop : 20,
    marginBottom : 50,
  },
  chatRoomListHeaderText : {
    color : '#333',
    paddingLeft : 20,
    fontSize : 25,
    lineHeight : 40,
    fontWeight : 'bold',
  },
  chatRoomListContainer : {
    height : 50,
    borderColor : '#fff',
    backgroundColor : '#5160F5',
    borderBottomWidth : 2,
    flexDirection : 'row',
    justifyContent : 'space-between',
    marginHorizontal : 10,
    borderRadius : 5,
  },
  chatRoomListText : {
    fontSize : 20,
    lineHeight : 50,
    paddingLeft : 10,
    color : '#fff',
    fontWeight : 'bold',
  },
  chatRoomNumUsersContainer : {
    alignSelf : 'flex-end',
    paddingRight : 5,
    paddingBottom : 5,
  }
})

export default ChatRoomList;