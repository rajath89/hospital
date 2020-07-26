import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert, ActivityIndicator } from 'react-native';
import firebase from '../database/firebase';

import {QuesList} from './QuesList';
import { Font } from "expo";

import { AsyncStorage } from 'react-native';
import Constants from 'expo-constants';


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
        
 
<Text style={styles.textViewContainer}>Name  :  {this.state.obj.Name}</Text>
        
        <View style={styles.hairline} />

        
 
 <Text style={styles.textViewContainer}>Age  :  {this.state.obj.Age}</Text>
         
         <View style={styles.hairline} />

         
 
 <Text style={styles.textViewContainer}>Gender  :  {this.state.obj.Gender}</Text>
         
         <View style={styles.hairline} />

       
 
 <Text style={styles.textViewContainer}>Mobile Number  :  {this.state.obj.MobNumber}</Text>
         
         <View style={styles.hairline} />

         
 
 <Text style={styles.textViewContainer}>Address  :  {this.state.obj.address}</Text>
         
         <View style={styles.hairline} />



         <Text style={styles.textViewContainer}>Email  :  {this.state.obj.email}</Text>
         
         <View style={styles.hairline} />




         <Text style={styles.textViewContainer}>Education  :  {this.state.obj.selected2}</Text>
         
         <View style={styles.hairline} />


         <Text style={styles.textViewContainer}>Diagnosis  :  {this.state.obj.diagnosis}</Text>
         
         <View style={styles.hairline} />


         <Text style={styles.textViewContainer}>Height  :  {this.state.obj.height}</Text>
         
         <View style={styles.hairline} />


         <Text style={styles.textViewContainer}>Weight  :  {this.state.obj.weight}</Text>
         
         <View style={styles.hairline} />

        {/* <View style={styles.card}>
 
        <Button
  title="Update profile"
  type="clear"
  onPress={() => this.props.navigation.navigate('Update Profile',{screen:'updatePro'})}
/>
        </View>
        <View style={styles.hairline} /> */}
        </View>

      
     );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
    alignItems:"center"
  },textViewContainer: {
    textAlignVertical:'center', 
    fontSize: 18,
    fontWeight:"900",
    color: '#1c1c1c'
    },
  card:{
    height:40,
    width:"80%",
    backgroundColor:"white",
    borderRadius:15,
    borderWidth: 1,
    borderColor: '#3740FE',
    elevation:10,
    padding:7,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5
  },
  profileImg:{
    width:30,
    height:30,
    borderRadius:50,
    marginRight:10,
  },
  header: {
    flexDirection:"row",
  },
  hairline: {
    
    height: 8,
    width: 165
  }
});
