import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Modal, Pressable,FlatList } from 'react-native'
import CheckBox from '@react-native-community/checkbox'

import { getFriendsRealtimeChange } from '../apis/firebase'

import AddMembersItem from './AddMembersItem'

function AddMembers({pickFriends, setPickFriends, itemKey, showSchedule}){

  const [open, setOpen] = useState(false) //모달 open
  const [friendLists, setFriendLists] = useState() //친구목록 전체 저장
  const [selectedId, setSelectedId] = useState('')

  // console.log('show', showSchedule)


  const openModal = () => {
    setOpen(true)
  }

  const closeModal = () => {
    setPickFriends('')
    setOpen(false)
  }

  const addMember = () => {
    // console.log(selectedId)
    // console.log('frilist',friendLists)
    const list = []
    friendLists.map(fList => {
      // console.log(fList)
      // console.log(fList.name)
      if(selectedId && selectedId.indexOf(fList.name) !== -1 ){
        list.push(fList)
      }
    })
    console.log('하',list)
    setPickFriends(list)
    setOpen(false)
  }

  useEffect(() => {
    //친구목록 데이터 불러오기
    getFriendsRealtimeChange(function onResult(querySnapshot){
      // console.log('데이터불러오기',querySnapshot.data().friends)
      setFriendLists(querySnapshot.data().friends)
    }, 
    function onError(err){
      console.log('err', err)
    })
  },[])

  //스케쥴에 이미 있는 친구 자동으로 데이터 넣기
  useEffect(() => {
    showSchedule.map(schedule => {
        if(schedule.id === itemKey){
          const list = []
          schedule.members && schedule.members.map(member => {
            list.push(member.name)
          })
          setSelectedId(list)
        }
    })
  },[])

  return(
    <View style={styles.horizontalView}>
      {/* <Text>함께하는 멤버 : {pickFriends !== '' ? pickFriends.map(friend => friend.name.split(', ')) : '없음'}</Text> */}
      <Text style={styles.memberContainer}>함께하는 멤버 : {selectedId ? selectedId.join(', ') : '없음'} </Text>
      <TouchableOpacity style={styles.modalBtn} onPress={openModal}>
        <Text style={styles.btnText}>추가</Text>
      </TouchableOpacity>
      <Modal
        animationType='slide'
        transparent={true}
        visible={open}
        onRequestClose={() => {
          setOpen(!open)  
        }}
        onShow={() => {
            console.log('친구리스트', friendLists)
        }}
      >
        <View style={[styles.centerView, styles.modal]}>
          <FlatList
            data={friendLists}
            keyExtractor={(item) => item.UID}
            renderItem={({item}) => (
              <AddMembersItem item={item} pickFriends={pickFriends} setPickFriends={setPickFriends} showSchedule={showSchedule} selectedId={selectedId} setSelectedId={setSelectedId}/>
            )}
            style={styles.lists}
          />
          <View style={styles.horizontalView}>
            <Pressable style={styles.modalBtn} onPress={addMember}><Text>등록</Text></Pressable>
            <Pressable style={[styles.modalBtn, styles.closeBtn]} onPress={closeModal}><Text>닫기</Text></Pressable>
          </View>
        </View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  horizontalView: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  modalBtn: {
    padding: 8,
    width: 50,
    marginHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: 'lightgreen',
  },
  btnText: {
    fontSize: 12,
    textAlign: 'center',
  },
  centerView: {
    flex: 0.9,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 70,
  },
  modal: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'lightgreen',
    justifyContent: 'center',
    alignItems:'center',
    elevation: 2,
  },
  lists: {
    marginBottom: 10,
  },
  closeBtn: {
    backgroundColor: '#ddd'
  },
  memberContainer: {
    width: 220,
  }
})

export default AddMembers