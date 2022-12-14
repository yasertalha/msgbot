/**
 * @format
 */

import {AppRegistry, NativeModules} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import messaging from '@react-native-firebase/messaging';
var DirectSms = NativeModules.DirectSms;

messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('remoteMessage');
  console.log(remoteMessage);
  const {message, phone} = remoteMessage.data;
  if (message && phone) {
    DirectSms.sendDirectSms(phone, message);
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
