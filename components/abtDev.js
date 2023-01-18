import React from 'react';
import {View, Pressable, Text} from 'react-native';

const AbtDev = () => {
  return (
    <View
      style={{
        position: 'fixed',
        transform: 'rotate(-315deg)',
        top: '80px',
        right: '-100px',
        zIndex: '9',
        backgroundColor: '#ff980075',
        paddingRight: '100px',
        paddingLeft: '100px',
      }}
      data-locale="en_US"
      data-size="medium"
      data-theme="light"
      data-type="VERTICAL"
      data-vanity="syed-yaser-mohasin-197132174"
      data-version="v1"
      className="developerBtn">
      <Pressable
        style={{color: '#795548'}}
        className="badge-base__link LI-simple-link"
        onPress={() =>
          Linking.openURL(
            'https://in.linkedin.com/in/syed-yaser-mohasin-197132174?trk=profile-badge',
          )
        }>
        {({pressed}) => (
          <Text
            style={{
              textDecorationLine: 'underline',
              color: pressed ? 'green' : 'hotpink',
            }}>
            About Developer
          </Text>
        )}
      </Pressable>
    </View>
  );
};

export default AbtDev;
