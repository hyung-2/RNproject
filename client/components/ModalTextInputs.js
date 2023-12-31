import React from 'react'
import { View, Text, StyleSheet, TextInput } from 'react-native'

import DateTimePicker from 'react-native-modal-datetime-picker'

function ModalTextInputs({scheduleTitle, setScheduleTitle, scheduleContent, setScheduleContent, itemKey}){
 
  // console.log('itemkey',itemKey)

  //제목 입력
  const titleInput = (text) => {
    setScheduleTitle(text)
  }

  //내용 입력
  const contentInput = (text) => {
    setScheduleContent(text)
  }
  

  if(itemKey === ''){
    return(
      <>
        <View style={styles.horizontalView}>
          <Text style={[styles.title, styles.font]}>할일 제목 : </Text>
            <TextInput
              autoCorrect={false}
              style={[styles.textInput, styles.font]}
              selectionColor={'#E7BFFF'}
              onChangeText={titleInput}
              blurOnSubmit={false}
            />
        </View>
        <View style={styles.horizontalView}>
          <Text style={[styles.title, styles.font]}>할일 내용 : </Text>
            <TextInput
              autoCorrect={false}
              style={[styles.textInput, styles.font]}
              selectionColor={'#E7BFFF'}
              onChangeText={contentInput}
              blurOnSubmit={false}
            />
        </View>
      </>
    )
  }else{
    return(
      <>
        <View style={styles.horizontalView}>
          <Text style={[styles.title, styles.font]}>할일 제목 : </Text>
            <TextInput
              autoCorrect={false}
              style={[styles.textInput, styles.font]}
              selectionColor={'#E7BFFF'}
              onChangeText={titleInput}
              blurOnSubmit={false}
              defaultValue={scheduleTitle}
            />
        </View>
        <View style={styles.horizontalView}>
          <Text style={[styles.title, styles.font]}>할일 내용 : </Text>
            <TextInput
              autoCorrect={false}
              style={[styles.textInput, styles.font]}
              selectionColor={'#E7BFFF'}
              onChangeText={contentInput}
              blurOnSubmit={false}
              defaultValue={scheduleContent}
            />
        </View>
      </>
    )
  }
}

const styles = StyleSheet.create({
  horizontalView: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  textInput: {
    borderBottomWidth:1,
    borderBottomColor: '#BDEDD2',
    paddingLeft: 10,
    paddingBottom: 0,
    marginBottom: 10,
    width: 230,
  },
  dateInput: {
    borderBottomWidth:1,
    borderBottomColor: '#BDEDD2',
    paddingLeft: 10,
    paddingBottom: 0,
    marginBottom: 10,
    width: 50,
  },
  dateInput2:{
    width: 30,
  },
  title:{
    marginRight: 15
  },
  text: {
    marginLeft: 7,
    marginRight: 20
  },
  font: {
    fontFamily: 'IM_Hyemin-Bold'
  },

})

export default ModalTextInputs