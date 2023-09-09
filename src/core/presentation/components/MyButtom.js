import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {colorSecondary} from '../assets/colors';

const MyButtom = ({name, onPress}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: colorSecondary,
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 24,
        width: '90%',
      }}>
      <Text
        style={{
          color: 'white',
          textAlign: 'center',
          fontSize: 18,
          fontWeight: 'bold',
        }}>
        {name}
      </Text>
    </TouchableOpacity>
  );
};

export default MyButtom;
