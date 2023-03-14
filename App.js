/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useState, useLayoutEffect} from 'react';
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
import {Loading} from './components/loader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';
import Mybutton from './Mybutton';
import {myShare} from './myShare';
import Login from './login';
import LandingScrn from './LandingScrn';
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
import AbtDev from './components/abtDev';

const App = () => {
  const [userInfo, setUserInfo] = useState();
  const [loading, setLoading] = useState();

  newUserToken = async () => {
    const token = await messaging().getToken();
    return token;
  };

  useLayoutEffect(() => {
    setLoading(true);
    SplashScreen.hide();
    this.initializeGoogleConfig();
    const getUsers = async () => {
      const data = await AsyncStorage.getItem('userInfo');
      const getDataParsed = JSON.parse(data);
      console.log(data);
      data ? setUserInfo(getDataParsed) : null;
    };
    getUsers();
    setLoading(false);
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
    setLoading(true);
    await this.deleteTokenfromDb({email: userInfo.user.email});
    setUserInfo(null);
    await GoogleSignin.signOut();
    await AsyncStorage.removeItem('userInfo');
    setLoading(false);
  };
  signIn = async () => {
    try {
      setLoading(true);
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
        Alert.alert(
          'Something went wrong',
          'Check your network connection and try again',
          [
            {
              text: 'OK',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
          ],
        );
      }
    }
    setLoading(false);
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
    console.log('deleteTokenfromDb of ', email);
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
    height: '100%',
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
        {console.log('*******', userInfo)}
        {userInfo?.user?.email ? (
          <>
            <LandingScrn signOut={this.signOut} userInfo={userInfo} />
          </>
        ) : (
          <Login signIn={this.signIn} />
        )}
        {loading && <Loading />}
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
