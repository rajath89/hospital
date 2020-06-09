

import React from 'react';
import { Text, View, TouchableOpacity, Image,Button,StyleSheet } from 'react-native';
import * as Permissions from 'expo-permissions';
import { Camera } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library'; //from 'expo-media-library';
//import  {MediaLibrary} from 'expo';
// import { Permissions, ImagePicker } from "expo";
import firebase from '../database/firebase';

import { AsyncStorage } from 'react-native';

import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';

export default class Afterques extends React.Component {
  // state = {
  //   hasCameraPermission: null,
  //   type: Camera.Constants.Type.back,
  // };
  state={
    image:null,
    bl:null,
    pdf:null
  }

 constructor(props) {
  super(props);
  this.state = {
   hasCameraPermission: null,
   image: null,
  }
 }

 async componentDidMount() {
  const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
  this.setState({ hasCameraPermission: status === "granted" });
 }


 _getPhotoLibrary = async () => {
  let result = await ImagePicker.launchImageLibraryAsync({
   allowsEditing: false
   //aspect: [4, 3]
  });
  if (!result.cancelled) {
   this.setState({ image: result.uri });
   this.uploadImage(this.state.image); 
   this.asySt(this.state.image);
   //console.log(this.state.image);
  }
 }

   asySt = async (ur) => {
     console.log("stored");
  try {
    await AsyncStorage.setItem('image2', ur);
    console.log("stored");
  } catch (error) {
    // Error saving data
    console.log("error");
  }
};



  _getPdfLibrary = async () => {
  let result = await DocumentPicker.getDocumentAsync();
  if (!result.cancelled) {
   this.setState({ pdf: result.uri });
   this.uploadImage(this.state.pdf); 
   //console.log(this.state.image);
  }
 }

 uploadImage = async(uri) => {
  const response = await fetch(uri);
  const blob = await response.blob();
  this.setState({ bl: blob });
  var ref = firebase.storage().ref().child("testUpload1/im");
  return ref.put(blob);
  // var ref = firebase.storage().ref().child("my-image");
  // return ref.put(blob);
}

render() {
  const { image, hasCameraPermission } = this.state;
  if (hasCameraPermission === null) {
   return <View />
  }
  //,() => this.uploadImage2()
  else if (hasCameraPermission === false) {
   return <Text>Access to camera has been denied.</Text>;
  }
  else {
   return (
    <View style={{ flex: 1 }}>



    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
     <Button 
       onPress={this._getPhotoLibrary.bind(this)} 
       title="Photo Picker Screen!"
     />
          <Button 
       onPress={this._getPdfLibrary.bind(this)} 
       title="uploadPDF"
     />
    </View>
   </View>
   );
  }
 }
}


