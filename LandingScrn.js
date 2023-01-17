import React, {useState} from 'react';
import {
  View,
  Text,
  Linking,
  Pressable,
  Dimensions,
  ScrollView,
  Alert,
} from 'react-native';
import Mybutton from './Mybutton';

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

const Login = props => {
  const relogin = () => {
    Alert.alert(
      'Relogin ?',
      'On clicking OK you will be Logged out \n\nYou should Log In again to send sms from websmsbot.netlify.com',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'OK', onPress: () => props.signOut()},
      ],
    );
    //
  };

  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic">
      <View
        style={{
          display: 'flex',
          alignItems: 'center',
          width: deviceWidth,
          height: deviceHeight,
          margin: 10,
          marginTop: 50,
          color: 'white',
        }}>
        <View
          style={{
            width: '90%',
            alignItems: 'center',
            justifyContent: 'center',
            margin: 30,
          }}>
          <Text style={{color: 'white', fontSize: 20}}>
            Welcome to MOB SMS Bot{'  '} 🎉
          </Text>
          <Text style={{color: 'white'}}>
            {'\n'}
            {'\n'}
            To start sending sms from web, Login to{'  '}
            <Pressable
              onPress={() => Linking.openURL('https://websmsbot.netlify.app/')}>
              {({pressed}) => (
                <Text
                  style={{
                    textDecorationLine: 'underline',
                    color: pressed ? 'green' : 'hotpink',
                  }}>
                  websmsbot
                </Text>
              )}
            </Pressable>
            {'   '}
            with {props.userInfo.user.email}
            {'\n'}
          </Text>
        </View>
        <View
          style={{
            width: '70%',
            alignItems: 'center',
            justifyContent: 'center',
            margin: 30,
          }}>
          <Text style={{color: 'white', fontSize: 20}}>FAG</Text>

          <Text style={{color: 'white'}}>
            1. Should mobile app be maintained in open mode, while sending sms
            from website ? {'\n'}
            {'\n'}
            Ans : 😃{'  '}It is not compulsory to open mobile app while sending
            sms from website. it can be in quit mode.{'\n'}
          </Text>
          <Text style={{color: 'white'}}>
            2. Mobile data should be ON while sending sms from website ? {'\n'}
            {'\n'}
            Ans : 😃{'  '}Yes, mobile should have internet connection while
            sending sms from website
          </Text>
        </View>

        <View
          style={{
            width: '70%',
            alignItems: 'center',
            justifyContent: 'center',
            margin: 30,
          }}>
          <Text style={{color: 'white', fontSize: 20}}>Relogin</Text>

          <Text style={{color: 'white'}}>
            {'\n'}
            {'\n'}
            ReLogin here with different email id ? {'\n'}
            <Text style={{color: 'hotpink'}} onPress={relogin}>
              click here
            </Text>
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default Login;
