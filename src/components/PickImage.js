import React, { useState } from 'react';
import { Image, ImageEditor, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import uuid from 'uuid/v4';
import firebase from 'firebase';

const PickImage = ({ imageSource, setImageSource, setImageUrl }) => {
    const [uploading, setUploading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [image, setImage] = useState('');

    const disabledStyle = uploading ? styles.disabledBtn : {};
    const actionBtnStyles = [styles.btn, disabledStyle];

    const options = {
        title: 'Select Image',
        storageOptions: {
          skipBackup: true,
          path: 'images'
        }
    };

    askPermissionsAsync = async () => {
        //await Permissions.askAsync(Permissions.CAMERA);
        await Permissions.askAsync(Permissions.CAMERA_ROLL);
        // you would probably do something to verify that permissions
        // are actually granted, but I'm skipping that for brevity
    };
    
    const _pickImage = async () => {
        await askPermissionsAsync();
    
        let result = await ImagePicker.launchImageLibraryAsync({
          allowsEditing: true,
          aspect: [4, 3],
        });
        
        if (result.cancelled) {
          return;
        }
    
        let resizedUri = await new Promise((resolve, reject) => {
          ImageEditor.cropImage(result.uri,
            {
              offset: { x: 0, y: 0 },
              size: { width: result.width, height: result.height },
              displaySize: { width: 50, height: 50 },
              resizeMode: 'contain',
            },
            (uri) => resolve(uri),
            () => reject(),
          );
        });

        setImage(result.uri);
        const source = { uri: result.uri };
        setImageSource(source);

        _uploadImageAsync(result.uri);
    };
    
    const _uploadImageAsync = async(imageUri) => {
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
            <TouchableOpacity
                style={actionBtnStyles}
                onPress={_pickImage}
                disabled={uploading}
            >
                <View>
                    <Text style={styles.btnTxt}>Pick image</Text>
                </View>
            </TouchableOpacity>
            {/** Display selected image */}
            {/** {imageSource.length > 0 && ( */}
            {imageSource !== '' && (
            
                <View>
                    <Image source={imageSource} style={styles.newimage} />
                    {uploading && (
                        <View
                        style={[styles.progressBar, { width: `${progress}%` }]}
                        />
                    )}
                    {/**
                    <TouchableOpacity
                        style={actionBtnStyles}
                        onPress={_uploadImageAsync}
                        disabled={uploading}
                    >
                        <View>
                        {uploading ? (
                            <Text style={styles.btnTxt}>Uploading ...</Text>
                        ) : (
                            <Text style={styles.btnTxt}>Upload image</Text>
                        )}
                        </View>
                    </TouchableOpacity>
                    */}
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
      disabledBtn: {
        backgroundColor: 'rgba(3,155,229,0.5)'
      },
      newimage: {
        width: '90%',
        height: 120,
        borderRadius: 4,
        marginBottom: 5
      },
      progressBar: {
        backgroundColor: 'rgb(3, 154, 229)',
        height: 3,
        shadowColor: '#000',
      }
});

export default PickImage;