import React, {useState} from 'react';
import {View, Text, Button, Image, Dimensions} from 'react-native';
import Mybutton from './Mybutton';

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

const Login = props => {
  return (
    <View
      style={{
        display: 'flex',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        width: deviceWidth,
        height: deviceHeight,
      }}>
      <Image
        style={{width: '100%', height: '75%'}}
        source={require('./components/Asset/images/mobsmsbot.png')}
      />
      <View style={{width: '100%', height: '25%'}}>
        <Mybutton title="Google   Sing In" customClick={() => props.signIn()} />
      </View>
    </View>
  );
};

export default Login;
