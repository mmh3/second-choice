import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import IdeasScreen from '../screens/IdeasScreen';
import SearchScreen from '../screens/SearchScreen';
import ContributeScreen from '../screens/ContributeScreen';
import FoodEditScreen from '../screens/FoodEditScreen';

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

const IdeasStack = createStackNavigator(
  {
    Ideas: IdeasScreen,
  },
  {
    defaultNavigationOptions:
    {
      headerTintColor: '#FFFFFF',
      headerStyle: {
        backgroundColor: "rgb(76, 203, 255)"
      },
      headerTitleStyle: {
        fontFamily: "rellive",
        fontSize: 36,
        fontWeight: "500"
      }
    }
  },
  config
);

IdeasStack.navigationOptions = {
  tabBarLabel: 'Ideas',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={'lightbulb-on-outline'}
    />
  ),
};

IdeasStack.path = '';

const SearchStack = createStackNavigator(
  {
    Search: SearchScreen,
    FoodEdit: FoodEditScreen,
  },
  {
    defaultNavigationOptions:
    {
      headerTintColor: '#FFFFFF',
      headerStyle: {
        backgroundColor: "rgb(76, 203, 255)"
      },
      headerTitleStyle: {
        fontFamily: "rellive",
        fontSize: 36,
        fontWeight: "500"
      }
    }
  },
  config
);

SearchStack.navigationOptions = {
  tabBarLabel: 'Search',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-search' : 'md-search'} />
  ),
};

SearchStack.path = '';

const ContributeStack = createStackNavigator(
  {
    Contribute: ContributeScreen,
  },
  {
    defaultNavigationOptions:
    {
      headerTintColor: '#FFFFFF',
      headerStyle: {
        backgroundColor: "rgb(76, 203, 255)"
      },
      headerTitleStyle: {
        fontFamily: "rellive",
        fontSize: 36,
        fontWeight: "500"
      }
    }
  },
  config
);

ContributeStack.navigationOptions = {
  tabBarLabel: 'Contribute',
  
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={'comment-plus-outline'} />
  ),
};

ContributeStack.path = '';

const tabNavigator = createBottomTabNavigator({
  IdeasStack,
  SearchStack,
  ContributeStack,
}, {initialRouteName: 'ContributeStack'});

tabNavigator.path = '';

export default tabNavigator;