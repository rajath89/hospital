

import React from 'react';
import { Text, View, TouchableOpacity, Image,Button,StyleSheet,TextInput } from 'react-native';
import * as Permissions from 'expo-permissions';
import { Camera } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library'; //from 'expo-media-library';
//import  {MediaLibrary} from 'expo';
// import { Permissions, ImagePicker } from "expo";
import firebase from '../database/firebase';

import { AsyncStorage } from 'react-native';

import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';
import { ToastAndroid } from 'react-native';



export default class Comments extends React.Component {
  // state = {
  //   hasCameraPermission: null,
  //   type: Camera.Constants.Type.back,
  // };
  state={
    image:null,
    bl:null,
    pdf:null,
    globName:'',
    pd:false,
    comments: '', 
    
    isLoading: false,
    
  }

 constructor(props) {
  super(props);
  this.state = {
   hasCameraPermission: null,
   image: null,
   ind:0,
   par:null
  }
 }


 async _retrieveData() {
  try {
    const value = await AsyncStorage.getItem('globalName');
    if (value !== null) {
      // We have data!!
      console.log(value);
      this.setState({
        globName:value
      });
      console.log("from state:",this.state.globName);
    }
  } catch (error) {
    // Error retrieving data
  }
}

 async componentDidMount() {
  const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
  this.setState({ hasCameraPermission: status === "granted" });

  this._retrieveData();

  
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
   this.setState({ pdf: result.uri,pd:true });
   this.uploadImage(this.state.pdf); 
   //console.log(this.state.image);
   //console.log(st);
  }
 }



 uploadImage = async(uri) => {
  const response = await fetch(uri);
  const blob = await response.blob();
  this.setState({ bl: blob });
  var today = new Date();
  var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
  var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  var dateTime = date+time;


  var ref = firebase.storage().ref().child(this.state.globName.split("@")[0]+"/BP_LAB_reports/"+this.state.par+"("+dateTime+")");
  
  
  //console.log(this.state.ind);
  //this.setState({ ind:1 });
  console.log("par",this.state.par);
  return ref.put(blob);
  // var ref = firebase.storage().ref().child("my-image");
  // return ref.put(blob);
}

parameter=(para)=>{
  console.log(para);
  this.setState({ par:para });
  console.log(this.state.par);
  

}

updateInputVal = (val, prop) => {
  const state = this.state;
  state[prop] = val;
  this.setState(state);
}

subMit=()=>{
  //console.log(this.state);
  const df=this.state.comments;


  (async () => {
    const rawResponse = await fetch('https://flask-app47.herokuapp.com/comments', {//exp://192.168.0.104:19000
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({"username": this.state.globName,"comments":df})
    });
    const content = await rawResponse.json();
  
    console.log(content);
    if(content){
        //this.setState({isLoading:false,obj:content})
        ToastAndroid.show('Report and details are updated', ToastAndroid.SHORT);
        this.props.navigation.navigate('Cardio App');
    }
  })();
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
    <View style={styles.container}>


    <TextInput
          style={styles.inputStyle}
          placeholder="Comments"
          value={this.state.comments}
          onChangeText={(val) => this.updateInputVal(val, 'comments')}
        />

<View style={styles.hairline} />
<View style={styles.hairline} />

 

    <Button
          color="#3740FE"
          title="Submit"
          onPress={() =>this.subMit()}
        />  
   </View>
   );
  }
 }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: 35,
    backgroundColor: '#fff'
  },
  inputStyle: {
    width: '100%',
    marginBottom: 15,
    paddingBottom: 15,
    alignSelf: "center",
    borderColor: "#ccc",
    borderBottomWidth: 1
  },
  loginText: {
    color: '#3740FE',
    marginTop: 25,
    textAlign: 'center'
  },
  preloader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff'
  },
  hairline: {
    
    height: 15,
    width: 165
  }
});