import auth from '@react-native-firebase/auth';
// import {getAuth, onAuthStateChanged} from '@react-native-firebase/auth';

export const signIn = async (email, password) => {
  // 로그인
  return await auth().signInWithEmailAndPassword(email, password);
};

export const signUp = async (email, password, displayName) => {
  // 회원가입
  return await auth().createUserWithEmailAndPassword(email, password, displayName);
};

export const subscribeAuth = callback => {
  // 사용자정보변경
  return auth().onAuthStateChanged(callback);
};

export const signOut = () => {
  // 로그아웃
  return auth().signOut();
};

export const finduserEmail = async email => {
  // 이메일 찾기 (가입한 이메일로 새로운 비밀번호 전송)
  return await auth().sendPasswordResetEmail(email);
};

export const verifyUserEmail = async email => {
  // 이메일 인증
  return await auth().currentUser.sendEmailVerification(email);
};

export const getUser = () => {
  // 사용자 정보 가져오기 .uid, .email
  return auth().currentUser;
};
