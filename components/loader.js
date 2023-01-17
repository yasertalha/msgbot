import React from 'react';
import {View, ActivityIndicator, StyleSheet} from 'react-native';

export const Loading = ({theme = 'white', size = 'large'}) => {
  const color = theme === 'white' ? '#00bdcd' : '#fff';
  return (
    <View
      style={{
        ...StyleSheet.absoluteFill,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.6)',
      }}>
      <ActivityIndicator size={size} color={color} />
    </View>
  );
};
