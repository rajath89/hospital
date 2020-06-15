import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert, ActivityIndicator } from 'react-native';
import firebase from '../database/firebase';

import {QuesList} from './QuesList';

import { AsyncStorage } from 'react-native';


export default class updatePro extends Component {
  
  constructor() {
    super();
    this.state = { 
      email: '', 
      password: '',
      isLoading: true,
      ob:{},
      obj:{},
      globName:''
    }
  }

  // async _retrieveData() {
  //   try {
  //     const value = await AsyncStorage.getItem('globalName');
  //     if (value !== null) {
  //       // We have data!!
  //       console.log(value);
  //       this.setState({
  //         globName:value
  //       });
  //       console.log("from state:",this.state.globName);
  //       // if(this.state.globName){
  //       //   //this.getMultiple();
  //       //   console.log("globNmae");
  //       //   //this.getMultiple();
  //       //   console.log("after getmultiple");
  //       // }
  //     }
  //   } catch (error) {
  //     // Error retrieving data
  //   }
  // }



    componentDidMount() {
        this._retrieveData();
    

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
        this.getprof();
        console.log("from state:",this.state.globName);
        // if(this.state.globName){
        //   //this.getMultiple();
        //   console.log("globNmae");
        //   //this.getMultiple();
        //   console.log("after getmultiple");
        // }
      }
    } catch (error) {
      // Error retrieving data
      console.log(error);
    }
  }


getprof = () => {

  (async () => {
  const rawResponse = await fetch('https://flask-app47.herokuapp.com/getProfile', {//exp://192.168.0.104:19000
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({"username": this.state.globName})
  });
  const content = await rawResponse.json();

  console.log(content);
  if(content){
      this.setState({isLoading:false,obj:content})
  }
})();


  // example console.log output:
  // [ ['@MyApp_user', 'myUserValue'], ['@MyApp_key', 'myKeyValue'] ]
}



  render() {
    if(this.state.isLoading){
      return(
        <View style={styles.preloader}>
          <ActivityIndicator size="large" color="#9E9E9E"/>
        </View>
      )
    }    
    return (
      <View style={styles.container}>  

      <Text>fetched proDetails from api</Text>
      {/* <Text>{this.state.obj.ProfileDet.Age}</Text> */}
                        
      </View>
    );
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
  }
});