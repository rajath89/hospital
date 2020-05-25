import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert, ActivityIndicator } from 'react-native';
import firebase from '../database/firebase';

import {QuesList} from './QuesList';

import { AsyncStorage } from 'react-native';


export default class Login extends Component {
  
  constructor() {
    super();
    this.state = { 
      email: '', 
      password: '',
      isLoading: false,
      ob:{}
    }
  }



    componentDidMount() {
    this.getMultiple();

  }



  updateInputVal = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  }


  _storeData = async () => {
  try {
    await AsyncStorage.setItem('email/username', this.state.email);
    
  } catch (error) {
    // Error saving data
  }
};

// async _retrieveData() {
//   try {
//     const value = await AsyncStorage.getItem('key1');
//     if (value !== null) {
//       // We have data!!
//       console.log(value);
//     }
//   } catch (error) {
//     // Error retrieving data
//   }
// }

_retrieveData = async () => {
  console.log("hit");
  try {
    const value = await AsyncStorage.getItem('expoToken1');
    if (value !== null) {
      // We have data!!
      console.log("stored token",value);
    }
  } catch (error) {
    // Error retrieving data
  }
};


getDateTime = () => {

  // let values
  // try {
  //   values = await AsyncStorage.multiGet(["\" Do you have hypertension ?\"","0","image2"])
  // } catch(e) {
  //   // read error
  // }
  // console.log(values);
  console.log("hit");
  var today = new Date();
  var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
  var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  var dateTime = date+' '+time;
  (async () => {
  const rawResponse = await fetch('https://flask-app47.herokuapp.com/login', {//exp://192.168.0.104:19000
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({"username": this.state.email, "time": dateTime})
  });
  const content = await rawResponse.json();

  console.log(content);
})();


  // example console.log output:
  // [ ['@MyApp_user', 'myUserValue'], ['@MyApp_key', 'myKeyValue'] ]
}


getAllKeys = async () => {
  let keys = []
  try {
    keys = await AsyncStorage.getAllKeys()
  } catch(e) {
    // read key error
  }

  console.log(keys)
  // example console.log result:
  // ['@MyApp_user', '@MyApp_key']
}


getMultiple = async () => {

  let values
  try {
    values = await AsyncStorage.multiGet(['expoToken', 'expoToken1','\" Do you have hypertension ?\"'])
  } catch(e) {
    // read error
  }
  if(values){
  //console.log(values.length);
  //console.log(JSON.stringify(values));

  var object = Object.fromEntries(values);
  console.log(object);
  this.setState({ob:object});
  console.log(this.state.ob);
  console.log(JSON.stringify(this.state.ob));

  var myArray = new Array();
  myArray.push(this.state.ob);
//alert(JSON.stringify(myArray));
console.log(myArray);

  

  (async () => {
  const rawResponse = await fetch('https://flask-app47.herokuapp.com/questions', {//exp://192.168.0.104:19000
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({"username": "jason", "questionDetails":myArray[0]})
  });
  const content = await rawResponse.json();

  console.log(content);
  //console.log(object);
})();

 




}
  // example console.log output:
  // [ ['@MyApp_user', 'myUserValue'], ['@MyApp_key', 'myKeyValue'] ]
}



  userLogin = () => {
    if(this.state.email === '' && this.state.password === '') {
      Alert.alert('Enter details to signin!')
    } else {
      this.setState({
        isLoading: true,
      })

      //console.log(this.state.email,this.state.password);
      firebase
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then((res) => {
        console.log(res)
        console.log('User logged-in successfully!')
        this.setState({
          isLoading: false,
          email: '', 
          password: ''
        })
        this.props.navigation.navigate('Dashboard')
      })
      .catch(error => this.setState({ errorMessage: error.message }))
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
          placeholder="Email"
          value={this.state.email}
          onChangeText={(val) => this.updateInputVal(val, 'email')}
        />
        <TextInput
          style={styles.inputStyle}
          placeholder="Password"
          value={this.state.password}
          onChangeText={(val) => this.updateInputVal(val, 'password')}
          maxLength={15}
          secureTextEntry={true}
        />   
        <Button
          color="#3740FE"
          title="Signin"
          onPress={() => {this.userLogin(),this.getDateTime(),this._retrieveData();}}
        />   
        {/* <QuesList /> */}

        <Text 
          style={styles.loginText}
          onPress={() => {this.props.navigation.navigate('Signup'),this.getAllKeys()}}>
          Don't have account? Click here to signup
        </Text>                          
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