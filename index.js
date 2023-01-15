/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import messaging from '@react-native-firebase/messaging';
import {myShare} from './myShare';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {baseUrl} from './config';
import {scheduledSms, _directSms} from './components/sms';

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

messaging().onMessage(async remoteMessage => {
  const {message, phone, scheduledAt} = remoteMessage.data;
  if (scheduledAt) return scheduledSms(message, phone, scheduledAt);
  if (message && phone) return _directSms(phone, message);
});

messaging().setBackgroundMessageHandler(async remoteMessage => {
  const {message, phone, scheduledAt} = remoteMessage.data;
  if (scheduledAt) return scheduledSms(message, phone, scheduledAt);
  if (message && phone) return _directSms(phone, message);
});

function HeadlessCheck({isHeadless}) {
  if (isHeadless) {
    // App has been launched in the background by iOS, ignore
    return null;
  }
  return <App />;
}

AppRegistry.registerComponent(appName, () => HeadlessCheck);
