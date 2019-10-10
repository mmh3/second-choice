import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, Dimensions, ScrollView } from 'react-native';
import PickImage from './PickImage';
import firebase from 'firebase';
import uuid from 'uuid/v4';

const width = "100%";

const CreateAlternateForm = ({ initialValues }) => {
  // TODO: figure out how to track this with an object. Couldn't get the set to work with the object...
  const [original, setOriginal] = useState(initialValues.originalsetImageUrl);
  const [originalImageUrl, setOriginalImageUrl] = useState('');
  const [originalUid, setOriginalUid] = useState('');
  const [originalGroupUid, setOriginalGroupUid] = useState('');
  const [originalImageSource, setOriginalImageSource] = useState('');
  
  const [alternative, setAlternative] = useState(initialValues.alternative);
  const [alternateKey, setAlternateKey] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [imageSource, setImageSource] = useState('');

  const windowWidth = Dimensions.get('window').width;

  const retrieveOriginalAsync = async(isOriginal) => {
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

                const source = { uri: childSnapshot.val().imageUrl };
                setOriginalImageSource(source);
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

                const source = { uri: childSnapshot.val().imageUrl };
                setImageSource(source);
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
      firebase.database().ref('/food').push({uid: uuid(), name: original, groupUid: groupUid, imageUrl: originalImageUrl});
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
      firebase.database().ref('/food').push(alternateFood);
    }
    else {
      firebase.database().ref('/food').child(alternateKey).update({ groupUid: groupUid });
    }

    // Reset all state values
    setOriginal(null);
    setOriginalUid('');
    setOriginalGroupUid('');
    setOriginalImageUrl('');
    setOriginalImageSource('');
    setAlternative(null);
    setAlternateKey('');
    setImageUrl('');
    setImageSource('');

    // TODO: Clear the search results
}

  return (
    <ScrollView scrollEnabled={true}>
      
      <Text style={styles.label}>First Choice:</Text>
      <TextInput
        style={styles.input}
        value={original}
        onChangeText={text => setOriginal(text)}
        onEndEditing={() => retrieveOriginalAsync(true)}
      />
      <PickImage 
        imageSource={originalImageSource}
        setImageSource={(source) => setOriginalImageSource(source)} 
        setImageUrl={(url) => setOriginalImageUrl(url)} 
      />
      <Text style={styles.label}>Healthier Alternative:</Text>
      <TextInput
        style={styles.input}
        value={alternative}
        onChangeText={text => setAlternative(text)}
        onEndEditing={() => retrieveAlternateAsync()}
      />
      {/**
      <Text style={styles.label}>Image URL:</Text>
      <TextInput
        style={styles.input}
        value={imageUrl}
        onChangeText={text => setImageUrl(text)}
        autoCapitalize={'none'}
        autoCorrect={false}
      />
      <Text style={styles.label}>Notes:</Text>
      <TextInput
        multiline={true}
        numberOfLines={3}
        maxLength={200}
        style={[styles.input, {height: 150}]}
        value={notes}
        onChangeText={text => setNotes(text)}
      />*/}
      <PickImage 
        imageSource={imageSource}
        setImageSource={(source) => setImageSource(source)} 
        setImageUrl={(url) => setImageUrl(url)}
      />
      <Button title="Save" onPress={onSubmitAsync} />
    </ScrollView>
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
    borderColor: 'black',
    marginBottom: 15,
    padding: 5,
    margin: 5
  },
  label: {
    fontSize: 20,
    marginBottom: 5,
    marginLeft: 5
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    marginTop: 20,
    paddingLeft: 5,
    paddingRight: 5
  },
  btn: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 10,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgb(3, 154, 229)',
    marginTop: 20,
    alignItems: 'center'
  },
  disabledBtn: {
    backgroundColor: 'rgba(3,155,229,0.5)'
  },
  btnTxt: {
    color: '#fff'
  },
  image: {
    marginTop: 20,
    minWidth: 200,
    height: 200,
    resizeMode: 'contain',
    backgroundColor: '#ccc',
  },
  newimage: {
    width: '90%',
    height: 120,
    borderRadius: 4,
    marginBottom: 5
  },
  img: {
    flex: 1,
    height: 100,
    margin: 5,
    resizeMode: 'contain',
    borderWidth: 1,
    borderColor: '#eee',
    backgroundColor: '#ccc'
  },
  progressBar: {
    backgroundColor: 'rgb(3, 154, 229)',
    height: 3,
    shadowColor: '#000',
  }
});

export default CreateAlternateForm;