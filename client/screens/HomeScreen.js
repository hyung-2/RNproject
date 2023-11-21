import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  Text,
  StatusBar,
  TextInput,
  TouchableOpacity,
  Alert,
  FlatList,
} from 'react-native';
import Logout from '../components/Logout';

import {getUser} from '../apis/auth';
import {
  searchUserByEmail,
  addFriend,
  getFriendsRealtimeChange,
} from '../apis/firebase';

function HomeScreen({
  props,
  navigation,
  loginInfo,
  isKakaoLogin,
  setIsKakaoLogin,
  isNaverLogin,
  setIsNaverLogin,
  userInfo,
  setUserInfo,
}) {
  const [friendList, setFriendList] = useState([]);
  const [searchUserText, setSearchUserText] = useState('');
  const [searchUser, setSearchUser] = useState({
    email: '',
    name: '',
    UID: '',
  });

  const searchUserToFirebaseDB = async () => {
    if (searchUserText.trim() === getUser().email) {
      Alert.alert('자신의 이메일은 검색 할 수 없습니다.');
      setSearchUserText('');
      return;
    }
    const user = await searchUserByEmail(searchUserText);
    if (!user) {
      Alert.alert('유저가 없습니다.');
      setSearchUser({
        email: '',
        name: '',
        UID: '',
      });
    } else {
      const userEmail = user.data().email;
      const userName = user.data().name;
      const userUID = user.ref._documentPath._parts[1];
      // console.log('user : ',user);
      // console.log('user uid : ', user.ref._documentPath._parts[1]);
      setSearchUser({
        email: userEmail,
        name: userName,
        UID: userUID,
      });
    }
  };

  const addFriendToFirebaseDB = async () => {
    const result = await addFriend(searchUser);
    if (!result) {
      Alert.alert('이미 등록된 친구입니다.');
    }
    setSearchUser({
      email: '',
      name: '',
      UID: '',
    });
  };

  useEffect(() => {
    function onResult(querySnapshot) {
      // console.log(querySnapshot.data()?.friends)

      setFriendList(querySnapshot.data()?.friends);
    }

    function onError(error) {
      console.log(error);
    }
    if (getUser() !== null) return getFriendsRealtimeChange(onResult, onError);
  }, []);

  // console.log(friendList)

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar hidden></StatusBar>
      <View style={styles.nocontent}></View>
      <Logout 
       navigation={navigation}
       loginInfo={loginInfo}
       isKakaoLogin={isKakaoLogin}
       setIsKakaoLogin={setIsKakaoLogin}
       isNaverLogin={isNaverLogin}
       setIsNaverLogin={setIsNaverLogin}
       props={props}
       userInfo={userInfo}
       setUserInfo={setUserInfo}
      />
      <View style={styles.box}>
        <View>
          <Text style={styles.appName}>약속해줘</Text>
        </View>
        <View style={styles.searchUserContainer}>
          <TextInput
            style={[styles.searchUserInput, styles.font]}
            onChangeText={setSearchUserText}
            placeholder="찾고 싶은 친구의 이메일을 입력하세요!"
            value={searchUserText}
          />
          <TouchableOpacity
            style={styles.searchUserBtnContainer}
            onPress={searchUserToFirebaseDB}>
            <Text style={[styles.searchUserBtnText, styles.font]}>검색</Text>
          </TouchableOpacity>
        </View>
        {searchUser.UID && (
          <View style={styles.searchUserListContainer}>
            <View>
              <Text style={styles.font}>이름 : {searchUser.name}</Text>
              <Text style={styles.font}>이메일 : {searchUser.email}</Text>
            </View>
            <TouchableOpacity
              style={styles.addFriendBtnContainer}
              onPress={addFriendToFirebaseDB}>
              <Text style={[styles.addFriendBtnText, styles.font]}>친구 추가</Text>
            </TouchableOpacity>
          </View>
        )}

        <Text style={[styles.friendList, styles.font]}>나의 친구목록</Text>
        {friendList && friendList.length !== 0 && (
          <>
            <FlatList
              style={styles.flatListStyle}
              data={friendList}
              keyExtractor={item => item.UID}
              renderItem={({item}) => (
                <View style={styles.friendsListContainer}>
                  <Text style={styles.font}>이름 : {item.name}</Text>
                  <Text style={styles.font}>이메일 : {item.email}</Text>
                </View>
              )}
            />
          </>
        )}
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  nocontent:{
    height: 70,
  },
  box: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-start ',
    // paddingLeft: 10,
    marginTop: 80,
  },
  appName: {
    fontSize: 35,
    top: 0,
    paddingLeft: 20,
    fontFamily: 'ulsanjunggu',
    color: '#FAA6AA'
  },
  searchUserContainer: {
    marginTop: 30,
    flexDirection: 'row',
  },
  searchUserInput: {
    backgroundColor: '#fff',
    flex: 1,
    paddingLeft: 10,
    marginLeft: 20,
    height: 40,
    fontSize: 15,
    paddingVertical: 0,
    borderColor: '#CDDAC3',
    borderWidth: 1,
  },
  searchUserBtnContainer: {
    width: 50,
    height: 40,
    marginRight: 20,
    marginBottom: 7,
  },
  addFriendBtnContainer: {
    width: 80,
    alignContent: 'center',
  },
  addFriendBtnText: {
    fontSize: 15,
    lineHeight: 35,
    // fontWeight: 'bold',
  },
  searchUserBtnText: {
    lineHeight: 40,
    textAlign: 'center',
    fontSize: 18,
    backgroundColor: '#CDDAC3',
    borderWidth: 1,
    borderColor: '#CDDAC3',
  },
  searchUserListContainer: {
    flexDirection: 'row',
    width: '100%',
    paddingHorizontal: 30,
    justifyContent: 'space-between',
    backgroundColor: '#F7CAC9',
    paddingVertical: 5,
  },
  flatListStyle: {
    width: '100%',
    // marginTop: 30,
    backgroundColor: '#fff',
  },
  friendsListContainer: {
    paddingVertical: 5,
    paddingLeft: 30,
    width: '100%',
    paddingBottom: 5,
    backgroundColor: '#F7CAC9',
    borderBottomWidth: 2,
    borderBottomColor: '#D4A7AC',
  },
  friendList: {
    fontSize: 20,
    paddingVertical: 10,
    textAlign: 'left',
    width: '100%',
    paddingLeft: 20,
    // backgroundColor: '#F7CAC9',
    // borderBottomWidth: 2,
    // borderBottomColor: '#EBCBB9',
  },
  font: {
    fontFamily: 'IM_Hyemin-Bold'
  }
});

export default HomeScreen;
