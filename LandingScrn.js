import React, {useState} from 'react';
import {
  View,
  Text,
  Linking,
  Pressable,
  Dimensions,
  ScrollView,
  Alert,
  TouchableOpacity,
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
            Welcome to iconnect{'  '} 🎉
          </Text>
          <Text style={{color: 'white'}}>
            {'\n'}
            {'\n'}
            To start sending sms from web, Login to{'  '}
            <Pressable
              hitSlop={{top: 20, bottom: 20, left: 50, right: 50}}
              onPress={() => Linking.openURL('https://websmsbot.netlify.app/')}>
              {({pressed}) => (
                <Text
                  style={{
                    textDecorationLine: 'underline',
                    color: pressed ? 'green' : 'hotpink',
                  }}>
                  web sms bot
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
          <Text style={{color: 'white', fontSize: 20}}>FAG 🤔</Text>

          <Text style={{color: 'white'}}>
            {'\n'}
            {'\n'}
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
            sending sms from website{'\n'}
          </Text>
          <Text style={{color: 'white'}}>
            3. What if Mobile does not have internet connection while sending
            sms from web ? {'\n'}
            {'\n'}
            Ans : 😃{'  '}Sms will be send later once mobile gets active
            internet connection.
          </Text>
        </View>

        <View
          style={{
            width: '70%',
            alignItems: 'center',
            justifyContent: 'center',
            margin: 30,
          }}>
          <Text style={{color: 'white', fontSize: 20}}>Relogin 🔒</Text>

          <Text style={{color: 'white'}}>
            {'\n'}
            {'\n'}
            ReLogin here with different email id ? {'\n'}
            <TouchableOpacity
              onPress={relogin}
              hitSlop={{top: 20, bottom: 20, left: 50, right: 50}}>
              <Text style={{color: 'hotpink'}}>click here</Text>
            </TouchableOpacity>
          </Text>
        </View>
        {/* 
        <View
          style={{
            width: '70%',
            alignItems: 'center',
            justifyContent: 'center',
            margin: 30,
          }}>
          <Text style={{color: 'white', fontSize: 20}}>Developer 👑</Text>

          <Text style={{color: 'white'}}>
            {'\n'}
            {'\n'}
            <TouchableOpacity
              onPress={() =>
                Linking.openURL(
                  'https://in.linkedin.com/in/syed-yaser-mohasin-197132174?trk=profile-badge',
                )
              }
              hitSlop={{top: 20, bottom: 20, left: 50, right: 50}}>
              <Text style={{color: 'hotpink'}}>click here</Text>
            </TouchableOpacity>{' '}
            to Know who made this possible ! {'\n'}
          </Text>
        </View> */}
      </View>
    </ScrollView>
  );
};

export default Login;
