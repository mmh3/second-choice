import React from 'react';
import { View } from 'react-native';
import EditFoodForm from '../components/EditFoodForm';

export default function FoodEditScreen({navigation}) {
  return (
    <View>
    <EditFoodForm food={navigation.getParam('food')} resultsIndex={navigation.getParam('resultsIndex')}/>
    </View>
  );
}

FoodEditScreen.navigationOptions = {
  title: 'Edit',
};