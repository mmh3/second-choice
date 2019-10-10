import React from 'react';
import { StyleSheet } from 'react-native';
import CreateAlternateForm from '../components/CreateAlternateForm';

export default function ContributeScreen() {
  return (
    <CreateAlternateForm />
  );
}

ContributeScreen.navigationOptions = {
  title: 'Contribute',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});