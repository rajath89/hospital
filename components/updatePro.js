import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert, ActivityIndicator,Vibration, Platform} from 'react-native';
import firebase from '../database/firebase';
import Dashboard from './dashboard';
import { AsyncStorage } from 'react-native';
import { ToastAndroid } from 'react-native';

export default class updatePro extends Component {
  
  constructor() {
    super();
    this.state = { 
      displayName: '',
      email: '', 
      Name:'',
      Gender:'',
      Age:'',
      MobNumber:'',
      globName:'',

      isLoading: false,

    }
  }


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
    }
  }


  updateInputVal = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  }

  upprof = () => {

    (async () => {
    const rawResponse = await fetch('https://flask-app47.herokuapp.com/updatePro', {//exp://192.168.0.104:19000
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({"username": this.state.globName,"ProfileDet":this.state})
    });
    const content = await rawResponse.json();
  
    console.log(content);
    // if(content){
    //     this.setState({isLoading:false,obj:content})
    // }
  })();
  
  
    // example console.log output:
    // [ ['@MyApp_user', 'myUserValue'], ['@MyApp_key', 'myKeyValue'] ]
  }



  upPro = () => {
    if(this.state.email === '' && this.state.Name === '') {
      Alert.alert('Enter details to signup!')
    } else {
      console.log(this.state);
      this.setState({
        isLoading: true,
      });
      this.upprof();
    //   firebase
    //   .auth()
    //   .createUserWithEmailAndPassword(this.state.email, this.state.password)
    //   .then((res) => {
    //     res.user.updateProfile({
    //       displayName: this.state.displayName
    //     })
    //     console.log('User registered successfully!')


    //     this.props.navigation.navigate('Login');
        
    //   })
    //   .catch(error => this.setState({ errorMessage: error.message })) 
    ToastAndroid.show('Profile details are updated', ToastAndroid.SHORT);
    this.props.navigation.navigate('Cardio App');     
    }
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
        <TextInput
          style={styles.inputStyle}
          placeholder="Name"
          value={this.state.Name}
          onChangeText={(val) => this.updateInputVal(val, 'Name')}
        />      
        <TextInput
          style={styles.inputStyle}
          placeholder="Email"
          value={this.state.email}
          onChangeText={(val) => this.updateInputVal(val, 'email')}
        />
        <TextInput
          style={styles.inputStyle}
          placeholder="Gender"
          value={this.state.Gender}
          onChangeText={(val) => this.updateInputVal(val, 'Gender')}
          maxLength={15}
          
        />  

        <TextInput
          style={styles.inputStyle}
          placeholder="Age"
          value={this.state.Age}
          onChangeText={(val) => this.updateInputVal(val, 'Age')}
        />

        <TextInput
          style={styles.inputStyle}
          placeholder="Mobile Number"
          value={this.state.MobNumber}
          onChangeText={(val) => this.updateInputVal(val, 'MobNumber')}
        />

        <Button
          color="#3740FE"
          title="Update"
          onPress={() => {this.upPro()}}
        />


                                 
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