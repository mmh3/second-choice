import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

export default function IdeasScreen() {
  url = 'https://firebasestorage.googleapis.com/v0/b/secondchoice-82d44.appspot.com/o/ideas%2FiStock-1067777244.jpg?alt=media&token=c33ece08-3e15-4d80-8108-b44c1fc20cb2';
  return (
    <View>
      <Image source={{ uri: url }} style={styles.image} />
      <View style={styles.textBackground}>
        <Text style={styles.titleText}>Focus on High Fiber Foods </Text>
        <Text style={styles.bodyText}>These foods — notably vegetables, fruits, legumes, and whole grains slow the absorption of carbohydrates, so they have less effect on insulin and blood sugar. Aim for 14 grams of fiber for every 1,000 calories, as advised by the  Dietary Guidelines for Americans.</Text>
      </View>
    </View>
  );
}

IdeasScreen.navigationOptions = {
  title: 'Second Choice',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
  image: {
    //width: '90%',
    height: '95%',
    //resizeMode: 'stretch',
    borderRadius: 4,
    margin: 10,
    padding: 10
  },
  textBackground: {
    position: 'absolute',
    width: '90%',
    margin: 20,
    borderRadius: 5,
    top: 150,
    backgroundColor: 'rgba(52, 52, 52, 0.8)'
  },
  titleText: {
    position: 'relative',
    fontSize: 26,
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold',
    margin: 7,
    textDecorationLine: 'underline'
  },
  bodyText: {
    position: 'relative',
    textAlign: 'justify',
    fontSize: 18,
    color: '#fff',
    margin: 7
  }
});