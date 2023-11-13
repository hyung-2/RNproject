import React, { useState } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { FindPassword, Login, RegisterUser } from '../components';

function LandingScreen({ navigation, setNaverLoginLink, naverLoginLink, isSnsLogin, setIsSnsLogin  }) {
  const [loginInfo, setLoginInfo] = useState({
    email: '',
    password: '',
  });
  const [isFindPassword, setIsFindPassword] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const { email, password } = loginInfo;

  const handleUserInfoChange = (name, value) => {
    setLoginInfo(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const findEmail = async () => {
    setIsFindPassword(!isFindPassword);
    setLoginInfo({ email: '', password: '' })
  };

  return (
    <SafeAreaView style={styles.container}>
      {isFindPassword ? (
        <FindPassword
          email={email}
          handleUserInfoChange={handleUserInfoChange}
          navigation={navigation}
          setIsFindPassword={setIsFindPassword}
          isRegister={isRegister}
          setIsRegister={setIsRegister}
          setLoginInfo={setLoginInfo}
        />
      ) : isRegister ? (
        <RegisterUser
          isFindPassword={isFindPassword}
          setIsFindPassword={setIsFindPassword}
          findEmail={findEmail}
          navigation={navigation}
          isRegister={isRegister}
          setIsRegister={setIsRegister}
          setLoginInfo={setLoginInfo}
        />
      ) : (
        <Login
          email={email}
          password={password}
          handleUserInfoChange={handleUserInfoChange}
          findEmail={findEmail}
          navigation={navigation}
          setLoginInfo={setLoginInfo}
          setIsFindPassword={setIsFindPassword}
          setIsRegister={setIsRegister}
          setNaverLoginLink={setNaverLoginLink}
          naverLoginLink={naverLoginLink}
          isSnsLogin={isSnsLogin}
          setIsSnsLogin={setIsSnsLogin}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 600,
  },
});

export default LandingScreen;
