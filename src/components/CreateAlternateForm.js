import React, { useState } from 'react';
import { KeyboardAvoidingView, Text, StyleSheet, Button, ScrollView} from 'react-native';
import TextInputWithImage from './TextInputWithImage';
import firebase from 'firebase';
import uuid from 'uuid/v4';
import RatingPicker from './RatingPicker';

const CreateAlternateForm = ({ initialValues }) => {
  // TODO: figure out how to track this with an object. Couldn't get the set to work with the object...
  const [original, setOriginal] = useState(initialValues.originalsetImageUrl);
  const [originalImageUrl, setOriginalImageUrl] = useState('');
  const [originalUid, setOriginalUid] = useState('');
  const [originalGroupUid, setOriginalGroupUid] = useState('');
  const [originalRating, setOriginalRating] = useState(0);
  
  const [alternative, setAlternative] = useState(initialValues.alternative);
  const [alternateKey, setAlternateKey] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [alternateRating, setAlternateRating] = useState(0);

  const retrieveOriginalAsync = async() => {
    try {
      firebase.database().ref('/food').orderByChild('name').equalTo(original)
        .once('value', snapshot => {
          if (snapshot.hasChild)
          {
            // TODO: figure out how to do this without a foreach...
            snapshot.forEach(function(childSnapshot) {
                setOriginalUid(childSnapshot.val().uid);
                setOriginalImageUrl(childSnapshot.val().imageUrl);
                setOriginalGroupUid(childSnapshot.val().groupUid);
                setOriginalRating(childSnapshot.val().rating);
            })
          }
        });
    } catch (err) {
      //setErrorMessage('Something went wrong');
      console.log(err);
    }
  };

  const retrieveAlternateAsync = async() => {
    try {
      firebase.database().ref('/food').orderByChild('name').equalTo(alternative)
        .once('value', snapshot => {
          if (snapshot.hasChild)
          {
            // TODO: figure out how to do this without a foreach...
            snapshot.forEach(function(childSnapshot) {
                setAlternateKey(childSnapshot.key);
                setImageUrl(childSnapshot.val().imageUrl);
                setAlternateRating(childSnapshot.val().rating);
            })
          }
        });
    } catch (err) {
      //setErrorMessage('Something went wrong');
      console.log(err);
    }
  };

  const onSubmitAsync = async() => {
    // Create / Update the original
    if (!originalUid) { //originalUid!== undefined && originalUid !== null && originalUid !== '')
      groupUid = uuid();
      foodUid = uuid();
      firebase.database().ref('/food/' + foodUid).set({ uid: foodUid, name: original, groupUid: groupUid, imageUrl: originalImageUrl, rating: originalRating });
    }
    else {
      groupUid = originalGroupUid;
    }

    // Create / Update the alternate
    if (!alternateKey) {
      alternateFood = {};
      alternateFood.uid = uuid();
      alternateFood.name = alternative;
      alternateFood.imageUrl = imageUrl;
      alternateFood.groupUid = groupUid;
      alternateFood.rating = alternateRating;
      firebase.database().ref('/food/' + alternateFood.uid).set(alternateFood);
    }
    else {
      firebase.database().ref('/food').child(alternateKey).update({ groupUid: groupUid });
    }

    // Reset all state values
    setOriginal(null);
    setOriginalUid('');
    setOriginalGroupUid('');
    setOriginalImageUrl('');
    setOriginalRating(0);

    setAlternative(null);
    setAlternateKey('');
    setImageUrl('');
    setAlternateRating(0);

    // TODO: Clear the search results
}

  return (
    <KeyboardAvoidingView behavior="position" enabled>
      <ScrollView>
      
      <Text style={styles.label}>First Choice:</Text>
      <TextInputWithImage
        value = {original}
        onChangeText = {text => setOriginal(text)}
        onEndEditing={() => retrieveOriginalAsync()}
        imageUrl={originalImageUrl}
        setImageUrl={(url) => setOriginalImageUrl(url)}
      />
      <RatingPicker rating={ originalRating } setRating={ rating => setOriginalRating(rating) } />
      <Text style={styles.label}>Healthier Alternative:</Text>
      <TextInputWithImage
        value = {alternative}
        onChangeText = {text => setAlternative(text)}
        onEndEditing={() => retrieveAlternateAsync()}
        imageUrl={imageUrl}
        setImageUrl={(url) => setImageUrl(url)}
      />
      <RatingPicker rating={ alternateRating } setRating={ rating => setAlternateRating(rating) } />
      <Button title="Save" onPress={onSubmitAsync} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

CreateAlternateForm.defaultProps = {
  initialValues: {
    original: '',
    alternative: '',
    imageUrl: '',
    notes: ''
  }
};

const styles = StyleSheet.create({
  input: {
    fontSize: 18,
    borderWidth: 1,
    borderColor: 'rgb(76, 203, 255)',
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    padding: 5,
    margin: 5,
    marginBottom: 0
  },
  label: {
    fontSize: 18,
    margin: 5,
    marginBottom: 10,
    marginTop: 15
  },
  btn: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 10,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgb(76, 203, 255)',
    marginTop: 20,
    alignItems: 'center'
  }
});

export default CreateAlternateForm;