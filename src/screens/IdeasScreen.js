import React from 'react';
import { Text, StyleSheet } from 'react-native';

export default function IdeasScreen() {
  return (
    <Text>Placeholder - put idea component here...</Text>
  );
}

IdeasScreen.navigationOptions = {
  title: 'Ideas',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});