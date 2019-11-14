import firebase from 'firebase';
import { RESULTS_RETRIEVE, RESULTS_UPDATE } from '../actions/types';

export const search = (searchTerm) => {
    try {
        resultsArray = [];
        console.log('searchTerm: ' + searchTerm);

        return (dispatch) => {
            firebase.database().ref('/food').orderByChild('name').equalTo(searchTerm)
            .once('value', snapshot => {
                snapshot.forEach(function(childSnapshot) {
                firebase.database().ref('/food').orderByChild('groupUid').equalTo(childSnapshot.val().groupUid)
                    .once('value', snapshot => {
                    snapshot.forEach(function(childSnapshot) {
                        var item = childSnapshot.val();
                        item.key = childSnapshot.key;

                        // Don't add the item that was searched for.
                        if (item.name === searchTerm) { return false; }

                        resultsArray.push(item);
                    });

                    // Sort resultsArray by rating descending so the healthiest foods are at the top.
                    resultsArray.sort((a, b) => (a.rating > b.rating) ? -1 : 1);
                    dispatch({type: RESULTS_RETRIEVE, payload: resultsArray});
                    });
                });
            });
        }
    } catch (err) {
        console.log(err);
      //setErrorMessage('Something went wrong');
    }
  };

export const updateResult = (index, food) => {
    try {
        return (dispatch) => {
            console.log('food: ' + food.uid + ' ' + food.name + ' ' + food.imageUrl);
            firebase.database().ref('/food').child(food.uid).update({name: food.name, imageUrl: food.imageUrl, rating: food.rating});
            dispatch({type: RESULTS_UPDATE, payload: {index, food} });
        }
    } catch (err) {
        console.log(err);
    }
}