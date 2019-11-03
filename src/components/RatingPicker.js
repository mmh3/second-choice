import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const RatingPicker = ({ rating, setRating }) => {
    return (
      <View style={styles.rating}>
        <TouchableOpacity onPress={ () => setRating(1) } >
          <MaterialCommunityIcons name="food-apple" style={[(rating >= 1) ? styles.iconSelected : styles.iconDeselected]} />
        </TouchableOpacity>
        <TouchableOpacity onPress={ () => setRating(2) } >
          <MaterialCommunityIcons name="food-apple" style={[(rating >= 2) ? styles.iconSelected : styles.iconDeselected]} />
        </TouchableOpacity>
        <TouchableOpacity onPress={ () => setRating(3) } >
          <MaterialCommunityIcons name="food-apple" style={[(rating >= 3) ? styles.iconSelected : styles.iconDeselected]} />
        </TouchableOpacity>
        <TouchableOpacity onPress={ () => setRating(4) } >
          <MaterialCommunityIcons name="food-apple" style={[(rating >= 4) ? styles.iconSelected : styles.iconDeselected]} />
        </TouchableOpacity>
        <TouchableOpacity onPress={ () => setRating(5) } >
          <MaterialCommunityIcons name="food-apple" style={[(rating >= 5) ? styles.iconSelected : styles.iconDeselected]} />
        </TouchableOpacity>
      </View>
    );
};

const styles = StyleSheet.create({
    rating: {
        margin: 5,
        flexDirection: "row"
      },
      iconDeselected: {
        fontSize: 30,
        color: "#CCCCCC"
      },
      iconSelected: {
        fontSize: 30,
        color: "rgb(76, 203, 255)"
      }
});

export default RatingPicker;
