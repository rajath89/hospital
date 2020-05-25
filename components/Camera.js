

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

export default class CameraComponent extends React.Component {
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
   //this.uploadImage(this.state.image); 
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
  var ref = firebase.storage().ref().child("testUpload");
  return ref.put(blob);
  // var ref = firebase.storage().ref().child("my-image");
  // return ref.put(blob);
}


 uploadImage2 = async() => {
   console.log("up hit");
  const response = await fetch("file:/data/user/0/host.exp.exponent/cache/ExperienceData/%2540rajath89%252FjayHos/ImagePicker/e2ab5ebb-5925-40e6-93c8-64c881f9c79b.jpg");
  const blob = await response.blob();
  this.setState({ bl: blob });
  var ref = firebase.storage().ref().child("uuf");
  return ref.put(blob);
  // var ref = firebase.storage().ref().child("my-image");
  // return ref.put(blob);
}


  // renderFileUri() {
  //   if (this.state.image) {
  //     //console.log(this.state.image);
  //     return <Image source={{uri:this.state.image}} style={{width: 200, height: 200}}/>

  //   } 
  //  }


//  takePicture = async function() {
//   if (this.camera) {
//     let photo = await this.camera.takePictureAsync();
//   console.log(photo);
//   console.log("first");
//   await MediaLibrary.saveToLibraryAsync(photo);
// // await FileSystem.makeDirectoryAsync(FileSystem.documentDirectory + 'images/')
// // await FileSystem.moveAsync({
// //   from: photo,
// //   to: FileSystem.documentDirectory + 'images/imagename.jpg'
// // })

//   }

//   getPermissionAsync = async () => {
//     // Camera roll Permission 
//     if (Platform.OS === 'ios') {
//       const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
//       if (status !== 'granted') {
//         alert('Sorry, we need camera roll permissions to make this work!');
//       }
//     }
//     // Camera Permission
//     const { status } = await Permissions.askAsync(Permissions.CAMERA);
//     this.setState({ hasPermission: status === 'granted' });
//   }

//    }

//   async componentDidMount() {
// this.getPermissionAsync()
//   }




//   render() {
//     const { hasCameraPermission } = this.state;
//     if (hasCameraPermission === null) {
//       return <View />;
//     } else if (hasCameraPermission === false) {
//       return <Text>No access to camera</Text>;
//     } else {
//       return (
//         <View style={{ flex: 1 }}>
//           <Camera style={{ flex: 1 }} type={this.state.type}  ref={ref => {
//     this.camera = ref;
//   }}>
//             <View
//               style={{
//                 flex: 1,
//                 backgroundColor: 'transparent',
//                 flexDirection: 'row',
//               }}>

//            <TouchableOpacity
//             style={{
//              // flex: 0.1,
//               alignSelf: 'flex-end',
//               alignItems: 'center',
//             }}
//             onPress={()=>this.takePicture()}
//            >
//             <Text
//               style={{ fontSize: 18, marginBottom: 10, color: 'white' }}>
//               {' '}Take Picture{' '}
//             </Text>
//           </TouchableOpacity>
     
 
//             </View>
//           </Camera>
//         </View>
//       );
//     }
//   }
// }

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
       onPress={this._getPhotoLibrary.bind(this),() => this.uploadImage2()} 
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




