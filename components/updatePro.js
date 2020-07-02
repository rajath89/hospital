import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert, ActivityIndicator,Vibration, Platform,Picker,TouchableOpacity,ScrollView} from 'react-native';
import firebase from '../database/firebase';
import Dashboard from './dashboard';
import { AsyncStorage } from 'react-native';
import { ToastAndroid } from 'react-native';


import { Notifications} from 'expo';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';
import DateTimePicker from '@react-native-community/datetimepicker';


import { Container, Header, Content, Form, Item, Icon } from 'native-base';

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
      expoPushToken:'',
      selected2:null,
      datebool:false,
      date: new Date(),
      procedure:''

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



    registerForPushNotificationsAsync = async () => {
    if (Constants.isDevice) {
      const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      console.log("hit expo token");
      try {
        token = await Notifications.getExpoPushTokenAsync();
        if (token){
          this.setState({ expoPushToken: token });
          console.log(token);
          console.log(this.state.globName);
          (async () => {
            const rawResponse = await fetch('https://flask-app47.herokuapp.com/expo', {//exp://192.168.0.104:19000
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({"username": this.state.globName,"expoToken":token})
            });
            const content = await rawResponse.json();
          
            console.log(this.state);
            if(content){
                this.setState({isLoading:false,obj:content})
            }
          })();
        }else{
             this.setState({ expoPushToken: "token not fetched" });
           }
    } catch (e) {
        console.error(e);
    }
    console.log("after hit expo token");


      
      
      //console.log("token:",token);

      // if(token){
      //   this.setState({ expoPushToken: token });
      // }else{
      //   this.setState({ expoPushToken: "token not fetched" });
      // }

      

      // if(this.state.expoPushToken){
      //   console.log(this.state.expoPushToken);
      // }

      





    } else {
      alert('Must use physical device for Push Notifications');
    }

    if (Platform.OS === 'android') {
      Notifications.createChannelAndroidAsync('default', {
        name: 'default',
        sound: true,
        priority: 'max',
        vibrate: [0, 250, 250, 250],
      });
    }
  };






  updateInputVal = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  }

  upprof = () => {


    // this.registerForPushNotificationsAsync();

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
  
    console.log(this.state);
    if(content){
        this.setState({isLoading:false,obj:content})
    }
  })();
  console.log(this.state);
  
  
    // example console.log output:
    // [ ['@MyApp_user', 'myUserValue'], ['@MyApp_key', 'myKeyValue'] ]
  }

  onValueChange2(value) {
    this.setState({
      selected2: value
    });
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
    this.setState({ 
      displayName: '',
      email: '', 
      Name:'',
      Gender:'',
      Age:'',
      MobNumber:'',
      globName:'',
      education:'',
      address:'',
      height:'',
      weight:'',
      diagnosis:'',
      dateOfProcedure:'',

      isLoading: false})
    //this.props.navigation.navigate('Cardio App');     
    }
  }


   datef=()=>{
    this.setState({datebool:true});
   }

   onChange=(ev,dat)=>{
      console.log(dat);
   }

  render() {
    // if(this.state.isLoading){
    //   return(
    //     <View style={styles.preloader}>
    //       <ActivityIndicator size="large" color="#9E9E9E"/>
    //     </View>
    //   )
    // }    
    const { date } = this.state;
    return (
      <ScrollView>
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

        <Text style={{color: "gray"}}>Education</Text>

<Picker
  placeholder="Mobile Number"
  selectedValue={this.state.selected2}
  // style={{ height: 50,left:240,width:100 }}
  style={ styles.inputStyle2 }
  onValueChange={(itemValue, itemIndex) => this.setState({ selected2: itemValue })}>
  <Picker.Item label="select education" value="" />
  <Picker.Item label="Not educated" value="Not educated" />
  <Picker.Item label="Primary" value="Primary" />
  <Picker.Item label="Secondary" value="Secondary" />
  <Picker.Item label="Graduate or higher" value="Graduate or higher" />
</Picker>

        <TextInput
          style={styles.inputStyle}
          placeholder="Mobile Number"
          value={this.state.MobNumber}
          onChangeText={(val) => this.updateInputVal(val, 'MobNumber')}
        />

        <TextInput
          style={styles.inputStyle}
          placeholder="Address"
          value={this.state.address}
          onChangeText={(val) => this.updateInputVal(val, 'address')}
        />

        <TextInput
          style={styles.inputStyle}
          placeholder="Height(cm)"
          value={this.state.height}
          onChangeText={(val) => this.updateInputVal(val, 'height')}
        />

        <TextInput
          style={styles.inputStyle}
          placeholder="Weight(kg)"
          value={this.state.weight}
          onChangeText={(val) => this.updateInputVal(val, 'weight')}
        />

          <TextInput
          style={styles.inputStyle}
          placeholder="Diagnosis"
          value={this.state.diagnosis}
          onChangeText={(val) => this.updateInputVal(val, 'diagnosis')}

          
        />




<TextInput
          style={styles.inputStyle}
          placeholder="Date of Procedure"
          value={this.state.procedure}
          onChangeText={(val) => this.updateInputVal(val, 'procedure')}

          
        />
{/* {this.state.datebool&&<DateTimePicker testID="dateTimePicker" value={date} mode='default' display="default" onChange={(event,date)=>this.onChange()}/>} */}
{/* <TouchableOpacity
          style={styles.button}
          onPress={this.datef}
        >
          <Text style={{color:"gray"}}>Date of Procedure</Text>
        </TouchableOpacity> */}


          
       


        <View style={styles.hairline} />



        

        <Button
          color="#3740FE"
          title="Update"
          onPress={() => {this.upprof()}}
        />






                                 
      </View>
      </ScrollView>
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
  
  inputStyle2: {
    width: '100%',
    marginBottom: 10,
    paddingBottom: 27,
    alignSelf: "center",
    borderColor: "#ccc",
    borderBottomWidth: 1,
    color:"gray"
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
    
    height: 18,
    width: 165
  }
});