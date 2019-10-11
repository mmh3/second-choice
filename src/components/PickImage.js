import React, { useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import uuid from 'uuid/v4';
import firebase from 'firebase';

const PickImage = ({ imageUrl, setImageUrl }) => {
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
            <TouchableOpacity style={styles.btn} onPress={pickImage}>
                <View>
                    <Text style={styles.btnTxt}>Pick image</Text>
                </View>
            </TouchableOpacity>
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
        //flex: 1,
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
      btnTxt: {
        color: '#fff'
      },
      image: {
        width: '90%',
        height: 120,
        borderRadius: 4,
        marginBottom: 5
      }
});

export default PickImage;