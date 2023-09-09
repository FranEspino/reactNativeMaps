import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Fab = ({iconName,iconColor,style={}, onPress}) => {
  return (
    <View>
      <TouchableOpacity
        onPress={onPress }
        style={{
          width: 55,
          height: 55,
          borderRadius: 30,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 6,
          ...style
        }}>
        <View
          style={{
            top: 16,
            left: 16,
          }}>
          <Icon name={iconName} size={24} color={iconColor} />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Fab;
