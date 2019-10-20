import firebase from 'firebase';
import { RESULTS_RETRIEVE } from '../actions/types';

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

                        console.log(childSnapshot.val().name);
                        resultsArray.push(item);
                    });

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