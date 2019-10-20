import { AppLoading } from 'expo';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';
import React, { useState } from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import { Ionicons } from '@expo/vector-icons';
import firebase from 'firebase';
import AppNavigator from './src/navigation/AppNavigator';
import reducers from './src/reducers';

export default function App(props) {
  const [isLoadingComplete, setLoadingComplete] = useState(false);
  const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));

  if (!isLoadingComplete && !props.skipLoadingScreen) {
    return (
      <AppLoading
        startAsync={loadResourcesAsync}
        onError={handleLoadingError}
        onFinish={() => handleFinishLoading(setLoadingComplete)}
      />
    );
  } else {
    return (
      <Provider store={store}>
      <View style={styles.container}>
        {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
        <AppNavigator />
      </View>
      </Provider>
    );
  }
}

async function loadResourcesAsync() {
  await Promise.all([
    Asset.loadAsync([
      require('./assets/images/robot-dev.png'),
      require('./assets/images/robot-prod.png'),
    ]),
    Font.loadAsync({
      // This is the font that we are using for our tab bar
      ...Ionicons.font,
      // We include SpaceMono because we use it in HomeScreen.js. Feel free to
      // remove this if you are not using it in your app
      'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
    }),
  ]);
}

function handleLoadingError(error) {
  // In this case, you might want to report the error to your error reporting
  // service, for example Sentry
  console.warn(error);
}

function handleFinishLoading(setLoadingComplete) {
  const firebaseConfig = {
    apiKey: "AIzaSyDsr0aFmiArErXD5SDb8QXqg39Oqt_vHTU",
    authDomain: "secondchoice-82d44.firebaseapp.com",
    databaseURL: "https://secondchoice-82d44.firebaseio.com",
    projectId: "secondchoice-82d44",
    storageBucket: "secondchoice-82d44.appspot.com",
    messagingSenderId: "742097787144",
    appId: "1:742097787144:web:6eb4d102fee4e5e1"
  };

  firebase.initializeApp(firebaseConfig);
  setLoadingComplete(true);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
