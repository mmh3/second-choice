import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import SearchBar from '../components/SearchBar';
import ResultsList from '../components/ResultsList';
import { search } from '../actions/ResultsActions';
import { connect } from 'react-redux';

function SearchScreen(props) {
  const [term, setTerm] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  return (
    <>
      <SearchBar
        term={term}
        onTermChange={setTerm}
        onTermSubmit={() => {console.log('test: ' + term); props.search(term);}} //searchApi(term)}
      />
      {errorMessage ? <Text>{errorMessage}</Text> : null}
      {props.retrieved && props.results.length <= 0 ? <Text style={styles.text}>I'm sorry, I couldn't find any healthier alternatives...</Text> : null}
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
  title: 'Second Choice',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
  text: {
    padding: 20
  }
});

const mapStateToProps = (state) => {
  const { results, retrieved } = state.results;

  return { results, retrieved };
};

export default connect(mapStateToProps, { search })(SearchScreen);
