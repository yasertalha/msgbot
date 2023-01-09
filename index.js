/**
 * @format
 */

import {AppRegistry, NativeModules} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import messaging from '@react-native-firebase/messaging';
import {myShare} from './myShare';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {baseUrl} from './config';
var DirectSms = NativeModules.DirectSms;

messaging().onTokenRefresh(() => {
  messaging()
    .getToken()
    .then(async refreshedToken => {
      const userInfo = await AsyncStorage.getItem('userInfo');
      console.log(userInfo);
      if (!userInfo) return;
      //update token of exsisting user to DB - start
      await fetch(`${baseUrl}/user/updateToken`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: {
          email: userInfo.user.email,
          token: refreshedToken,
        },
      })
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          err && console.log(err);
        });

      //update token of exsisting user to DB - end
    });
});

messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('remoteMessage');
  console.log(remoteMessage);
  const {message, phone} = remoteMessage.data;
  if (message && phone) {
    DirectSms.sendDirectSms(phone, message);
    // myShare({
    //   message: 'HI',
    //   social: NativeModules.RNShare.WHATSAPP || 'whatsapp',
    //   whatsAppNumber: '8015665499', // country code + phone number
    // });
    // myShare({
    //   message: 'HI',
    //   social: 'whatsapp',
    //   whatsAppNumber: '8015665499', // country code + phone number
    // });
    console.log(message);
    console.log(phone);
  }
});

function HeadlessCheck({isHeadless}) {
  if (isHeadless) {
    // App has been launched in the background by iOS, ignore
    return null;
  }
  return <App />;
}

AppRegistry.registerComponent(appName, () => HeadlessCheck);
