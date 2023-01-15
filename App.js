/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  NativeModules,
  PermissionsAndroid,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';
import Mybutton from './Mybutton';
import {myShare} from './myShare';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {baseUrl, webClientId} from './config';
import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import {scheduledSms, _directSms} from './components/sms';

import SplashScreen from 'react-native-splash-screen';

const App = () => {
  const [userInfo, setUserInfo] = useState();
  newUserToken = async () => {
    const token = await messaging().getToken();
    return token;
  };

  useEffect(() => {
    SplashScreen.hide();
    this.initializeGoogleConfig();
    const getUsers = async () => {
      const data = await AsyncStorage.getItem('userInfo');
      data ? setUserInfo(data) : null;
    };
    getUsers();
  }, []);

  useEffect(() => {
    this.smsPermission();
  }, [userInfo]);
  smsPermission = async () => {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.SEND_SMS,
      {
        title: 'Tadiwanashe App Sms Permission',
        message:
          'Tadiwanashe App needs access to your inbox ' +
          'so you can send messages in background.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    console.log('smsPermission : ' + granted);
    console.log('PermissionsAndroid  : ' + PermissionsAndroid.RESULTS.GRANTED);
    granted ? await AsyncStorage.setItem('smsPermission', granted) : null;
  };
  sendSms = async () => {
    try {
      const granted = await AsyncStorage.getItem('smsPermission');
      console.log('smsPermission : ' + granted);
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        _directSms('8015665499', 'This is a direct message from your app.');
        console.log('SMS send ');
      } else {
        console.log('SMS permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  sendWhats = () => {
    myShare({
      message: 'HI',
      social: 'sms',
      whatsAppNumber: '8015665499', // country code + phone number
    });
  };

  initializeGoogleConfig = () => {
    // initialize the Google SDK
    GoogleSignin.configure({
      webClientId: webClientId,
    });
  };
  signOut = async () => {
    GoogleSignin.signOut();
    console.log(userInfo);
    await AsyncStorage.removeItem('userInfo');
    await this.deleteTokenfromDb({email: userInfo.user.email});
    setUserInfo(null);
  };
  signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      await GoogleSignin.signOut();
      const data = await GoogleSignin.signIn();
      await AsyncStorage.setItem('userInfo', JSON.stringify(data));

      const newToken = await this.newUserToken();
      await this.updateSignedUserToDb(data);
      await this.updateTokenToDb({email: data.user.email, newToken});

      setUserInfo(data);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log(error.code);
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log(error.code);
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log(error.code);
      } else {
        console.log('error', error);
      }
    }
  };

  updateSignedUserToDb = async data => {
    // signIn update DB - start
    await fetch(`${baseUrl}/user/signIn`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        email: data.user.email,
        name: data.user.name,
      }),
    })
      .then(res => {
        console.log(`${baseUrl}/user/signIn **** safe *******`);
        console.log(res.json());
      })
      .catch(err => {
        console.log(`${baseUrl}/user/signIn ****** err ********`);
        err && console.log(err);
      });
    // signIn update DB - end
  };

  updateTokenToDb = async ({email, newToken}) => {
    await fetch(`${baseUrl}/user/updateToken`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        email: email,
        token: newToken,
      }),
    })
      .then(res => {
        console.log(`${baseUrl}/user/updateToken **** safe *******`);
        console.log(newToken);
      })
      .catch(err => {
        console.log(`${baseUrl}/user/updateToken ****** err ********`);
        err && console.log(err);
      });
  };

  deleteTokenfromDb = async ({email}) => {
    await fetch(`${baseUrl}/user/deleteToken`, {
      method: 'DELETE',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        email: email,
      }),
    })
      .then(res => {
        console.log(`${baseUrl}/user/deleteToken **** safe *******`);
      })
      .catch(err => {
        console.log(`${baseUrl}/user/deleteToken ****** err ********`);
        err && console.log(err);
      });
  };

  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Header />

        {userInfo ? (
          <>
            <Mybutton title="Send SMS" customClick={() => this.sendSms()} />
            <Mybutton title="Send WHATS" customClick={() => this.sendWhats()} />
            <Mybutton title="Sing Out" customClick={() => this.signOut()} />
          </>
        ) : (
          <Mybutton title="Sing In" customClick={() => this.signIn()} />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
