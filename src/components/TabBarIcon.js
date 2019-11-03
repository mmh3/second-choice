import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import Colors from '../constants/Colors';

export default function TabBarIcon(props) {
  switch (props.name){
    case 'lightbulb-on-outline':
    case 'comment-plus-outline':
      return (
        <MaterialCommunityIcons
          name={props.name}
          size={26}
          style={{ marginBottom: -3 }}
          color={props.focused ? 'rgb(76, 203, 255)' : Colors.tabIconDefault}
        />
      );
    default:
      return (
        <Ionicons
          name={props.name}
          size={26}
          style={{ marginBottom: -3 }}
          color={props.focused ? 'rgb(76, 203, 255)' : Colors.tabIconDefault}
        />
      );
  }
}
