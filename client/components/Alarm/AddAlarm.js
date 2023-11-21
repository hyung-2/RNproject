import React, { useState } from 'react'
import {
  View, Modal, Text,
  StyleSheet, TextInput,
  TouchableOpacity,
  Alert
} from 'react-native'

function AddAlarm({ visible, onClose, onAddAlarm }){  
  const [customTime, setCustomTime] = useState('')
  const [title, setTitle] = useState('')  
  const [selectTime, setSelectTime] = useState(null)

  const handleAddAlarm = () => {
    if ((!selectTime && !customTime) || !title){
      Alert.alert('제목과 알람 시간을 모두 설정해야 합니다.')
    }else{
      const alarmTime = customTime ? parseInt(customTime) : selectTime
      onAddAlarm(alarmTime, title)
      setSelectTime(null)
      setTitle('')
      setCustomTime('')
      onClose()
    }
  }

  const cancel = () => {
    setSelectTime(null)
    setTitle('')
    setCustomTime('')
    onClose()
  }

  const handleSelectTime = (time) => {
    setCustomTime('')
    setSelectTime(time)
  }

  return (
    <Modal transparent={true} visible={visible}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>알람 추가하기</Text>
          <Text style={styles.modalLabel}>알람 Title :</Text>          
          <TextInput
            style={styles.input}
            onChangeText={text => setTitle(text)}
            placeholder="Title을 입력하세요."
            maxLength={15}
          />
          <Text style={styles.modalLabel}>직접 설정 :</Text>
          <TextInput
            style={styles.input}
            onChangeText={(text) => setCustomTime(text)}
            placeholder="시간을 입력하세요. (min 단위)"
            keyboardType="numeric"
          />
          <Text style={styles.modalLabel}>시간을 선택하세요 :</Text>
          <View style={styles.timeOptions}>
            {[5, 10, 30, 60].map((timeOption) => (
              <TouchableOpacity
                key={timeOption}
                style={[
                  styles.timeOption,
                  selectTime === timeOption ? styles.select : null,
                ]}
                onPress={() => handleSelectTime(timeOption)}
              >
                <Text style={selectTime === timeOption ? styles.minText : null}>
                  {timeOption === 60 ? '1hour' : `${timeOption}min`}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.closeButton} onPress={cancel}>
              <Text style={styles.closeText}>취소</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.addButton} onPress={handleAddAlarm}>
              <Text style={styles.addText}>추가</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    width: 300,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center'
  },
  modalLabel: {
    fontSize: 16,
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 5,
    marginTop: 5,
  },
  timeOptions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  timeOption: {
    padding: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  select: {
    backgroundColor: '#a8c8ffff',    
  },
  minText: {
    fontWeight: 'bold',
    color: '#fff',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  addButton: {
    backgroundColor: '#a8c8ffff',
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
    alignItems: 'center',
    width: 100,
  },
  addText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  closeButton: {
    backgroundColor: 'red',
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
    alignItems: 'center',
    width: 100,
  },
  closeText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold'
  },
})

export default AddAlarm