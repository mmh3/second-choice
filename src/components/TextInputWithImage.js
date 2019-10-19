import React from 'react';
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import uuid from 'uuid/v4';
import firebase from 'firebase';
import { Feather } from '@expo/vector-icons';

const TextInputWithImage = ({ value, onChangeText, onEndEditing, imageUrl, setImageUrl }) => {
  console.log(imageUrl);
    askPermissionsAsync = async () => {
        //await Permissions.askAsync(Permissions.CAMERA);
        await Permissions.askAsync(Permissions.CAMERA_ROLL);
        // you would probably do something to verify that permissions
        // are actually granted, but I'm skipping that for brevity
    };
    
    const pickImage = async () => {
        await askPermissionsAsync();
    
        let result = await ImagePicker.launchImageLibraryAsync({
          allowsEditing: true,
          aspect: [4, 3],
        });
        
        if (result.cancelled) {
          return;
        }

        uploadImageAsync(result.uri);
    };
    
    const uploadImageAsync = async(imageUri) => {
        // Why are we using XMLHttpRequest? See:
        // https://github.com/expo/expo/issues/2402#issuecomment-443726662
        const blob = await new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.onload = function() {
                resolve(xhr.response);
            };
            xhr.onerror = function(e) {
                reject(new TypeError('Network request failed'));
            };
            xhr.responseType = 'blob';
            xhr.open('GET', imageUri, true);
            xhr.send(null);
        });
        
        const ext = imageUri.split('.').pop();
        const ref = firebase
            .storage()
            .ref(`food/images`)
            .child(`${uuid()}.${ext}`/*uuid.v4()*/);
        const snapshot = await ref.put(blob);
        
        // We're done with the blob, close and release it
        blob.close();
        var url = await snapshot.ref.getDownloadURL();
        setImageUrl(url);
    };

    return (
        <View style={styles.container}>
            <View style={styles.inputButtonWrapper}> 
                <TextInput
                    style={styles.input}
                    value={value}
                    onChangeText={text => onChangeText(text)}
                    onEndEditing={() => onEndEditing()}
                />
                <TouchableOpacity style={styles.btn} onPress={pickImage}>
                    <View>
                        <Feather name="camera" style={styles.btnTxt} />
                    </View>
                </TouchableOpacity>
            </View>
            {imageUrl !== '' && (
                <View>
                    <Image source={{ uri: imageUrl }} style={styles.image} />
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ffffff',
        marginTop: 0,
        padding: 5
      },
    inputButtonWrapper: {
        flexDirection: 'row',
        backgroundColor: '#ffffff',
        marginTop: 0,
        paddingBottom: 3
      },
      input: {
        flex: 8.5,
        fontSize: 18,
        borderWidth: 1,
        borderColor: 'rgb(76, 203, 255)',
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5,
        padding: 5,
        marginBottom: 0
      },
      btn: {
        flex: 1.5,
        padding: 5,
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5,
        backgroundColor: 'rgb(76, 203, 255)',
        //marginTop: 0,
        alignItems: 'center'
      },
      btnTxt: {
        fontSize: 22,
        color: '#fff'
      },
      image: {
        //width: '100%',
        height: 200,
        borderRadius: 4,
        marginBottom: 5,
        padding: 10
      }
});

export default TextInputWithImage;