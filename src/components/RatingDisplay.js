import React from 'react';
import { View, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const RatingDisplay = ({ rating }) => {
    return (
      <View style={styles.rating}>
        <MaterialCommunityIcons name="food-apple" style={[(rating >= 1) ? styles.iconSelected : styles.iconDeselected]} />
        <MaterialCommunityIcons name="food-apple" style={[(rating >= 2) ? styles.iconSelected : styles.iconDeselected]} />
        <MaterialCommunityIcons name="food-apple" style={[(rating >= 3) ? styles.iconSelected : styles.iconDeselected]} />
        <MaterialCommunityIcons name="food-apple" style={[(rating >= 4) ? styles.iconSelected : styles.iconDeselected]} />
        <MaterialCommunityIcons name="food-apple" style={[(rating >= 5) ? styles.iconSelected : styles.iconDeselected]} />
      </View>
    );
};

const styles = StyleSheet.create({
    rating: {
        margin: 5,
        flexDirection: "row"
      },
      iconDeselected: {
        fontSize: 18,
        color: "#CCCCCC"
      },
      iconSelected: {
        fontSize: 18,
        color: "rgb(76, 203, 255)"
      }
});

export default RatingDisplay;
