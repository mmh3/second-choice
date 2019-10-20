import React, { useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import SearchBar from '../components/SearchBar';
import firebase from 'firebase';
import ResultsList from '../components/ResultsList';
import { search } from '../actions/ResultsActions';
import { connect } from 'react-redux';

function SearchScreen(props) {
  const [term, setTerm] = useState('');
  const [results, setResults] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  const searchApi = async searchTerm => {
    try {
        resultsArray = [];

        firebase.database().ref('/food').orderByChild('name').equalTo(term)
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
                  setResults(resultsArray);
                });
            });
          });
    } catch (err) {
      setErrorMessage('Something went wrong');
    }
  };

  console.log('results: ' + props.results);
  return (
    <>
      <SearchBar
        term={term}
        onTermChange={setTerm}
        onTermSubmit={() => {console.log('test: ' + term); props.search(term);}} //searchApi(term)}
      />
      {errorMessage ? <Text>{errorMessage}</Text> : null}
      <ScrollView style={styles.container}>
        <ResultsList
          results={props.results}
          title="Second Choices"
        />
      </ScrollView>
    </>
  );
}

SearchScreen.navigationOptions = {
  title: 'Search',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});

const mapStateToProps = (state) => {
  const { results } = state.results;

  return { results };
};

export default connect(mapStateToProps, { search })(SearchScreen);
