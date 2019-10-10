import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CreateAlternateForm from '../components/CreateAlternateForm';

export default function FoodEditScreen({navigation}) {
  console.log(navigation.getParam('food'));//props.navigation.getParam('food', 'blahdefault'));
  return (
    <View>
    <Text>FOOD EDIT {navigation.getParam('food').name}</Text>
    <CreateAlternateForm />
    </View>
  );
}

FoodEditScreen.navigationOptions = {
  title: 'Edit',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});