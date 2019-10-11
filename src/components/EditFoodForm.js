import React, { useState } from 'react';
import { Text, StyleSheet, TextInput, Button, ScrollView } from 'react-native';
import PickImage from './PickImage';
import firebase from 'firebase';

const EditFoodForm = ({ food }) => {
  // TODO: figure out how to track this with an object. Couldn't get the set to work with the object...
  const [name, setName] = useState(food.name);
  const [imageUrl, setImageUrl] = useState(food.imageUrl);

  const onSubmitAsync = async() => {
    firebase.database().ref('/food').child(food.uid).update({name: name, imageUrl: imageUrl});

    // TODO: navigate back to ResultList
}

  return (
    <ScrollView scrollEnabled={true}>
      
      <Text style={styles.label}>Name:</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={text => setName(text)}
      />
      <PickImage 
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

export default EditFoodForm;