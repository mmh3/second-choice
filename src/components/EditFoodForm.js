import React, { useState } from 'react';
import { Text, StyleSheet, Button, ScrollView } from 'react-native';
import { withNavigation } from 'react-navigation';
import TextInputWithImage from './TextInputWithImage';
import firebase from 'firebase';

const EditFoodForm = ({ food, navigation }) => {
  // TODO: figure out how to track this with an object. Couldn't get the set to work with the object...
  const [name, setName] = useState(food.name);
  const [imageUrl, setImageUrl] = useState(food.imageUrl);

  const onSubmitAsync = async() => {
    firebase.database().ref('/food').child(food.uid).update({name: name, imageUrl: imageUrl});

  navigation.goBack(null);
}

  return (
    <ScrollView scrollEnabled={true}>
      
      <Text style={styles.label}>Name:</Text>
      <TextInputWithImage
        value={name}
        onChangeText = {text => setName(text)}
        //onEndEditing={() => retrieveOriginalAsync()}
        imageUrl={imageUrl}
        setImageUrl={(url) => setImageUrl(url)}
      />
      <Button title="Save" onPress={onSubmitAsync} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  input: {
    fontSize: 18,
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 15,
    padding: 5,
    margin: 5
  },
  label: {
    fontSize: 20,
    marginBottom: 5,
    marginLeft: 5
  }
});

export default withNavigation(EditFoodForm);