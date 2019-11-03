import React, { useState } from 'react';
import { Text, StyleSheet, Button, ScrollView } from 'react-native';
import { withNavigation } from 'react-navigation';
import TextInputWithImage from './TextInputWithImage';
import { connect } from 'react-redux';
import { updateResult } from '../actions/ResultsActions';
import RatingPicker from './RatingPicker';

const EditFoodForm = (props) => {
  // TODO: figure out how to track this with an object. Couldn't get the set to work with the object...
  const [name, setName] = useState(props.food.name);
  const [imageUrl, setImageUrl] = useState(props.food.imageUrl);
  const [rating, setRating] = useState(props.food.rating);

  const onSubmitAsync = async() => {
    var food = props.food;
    food.name = name;
    food.imageUrl = imageUrl;
    food.rating = rating;
    props.updateResult(props.resultIndex, food);

    props.navigation.goBack(null);
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
      <RatingPicker rating={ rating } setRating={ rating => setRating(rating) } />
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

const mapStateToProps = (state) => {
  const { results } = state.results;

  return { results };
};

export default connect(mapStateToProps, {updateResult})(withNavigation(EditFoodForm));