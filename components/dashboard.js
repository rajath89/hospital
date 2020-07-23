// import React, { Component } from 'react';

// import { StyleSheet, View ,Button,Text} from 'react-native';
// import firebase from '../database/firebase';

// import { Container, Header, Content, Footer, FooterTab } from 'native-base';

// //import Ques from components/dashBComp/Ques;
// import {Upload} from './Upload' ;
// import {Ques} from './Ques';
// import { firestore } from 'firebase';
// import QuesList from './QuesList';
// import BotTab from './BotTab';
// import NewQues from './NewQues';
// import Afterques from './afterques';
// import pdfViewer from './pdfviewer';

// //queslist
// // import {quizData} from './Questions/quizData';
// // import console = require('console');


// export default class Dashboard extends Component {


    
//   constructor(props) {
//     super(props);
//     this.state = { 
//       uid: '',

//     }

    
//     //this.state = {index: 0} // default screen index



//   }
  









 

//   signOut = () => {
//     firebase.auth().signOut().then(() => {
//       this.props.navigation.navigate('Login')
//     })
//     .catch(error => this.setState({ errorMessage: error.message }))
    
//   }  

//   render() {
//     this.state = { 
//       displayName: firebase.auth().currentUser.displayName,
//       uid: firebase.auth().currentUser.uid


      
//     } 
    
    


//     return (
      
//       <View style={styles.container}>
//         <Text style = {styles.textStyle}>
//           Hello, {this.state.displayName}
//         </Text>

        
        



//                        <Button 
//         title="View Profile"
//           //style={styles.loginText}
//           onPress={() => this.props.navigation.navigate('View Profile',{screen:'viewPro'})}
//           />

//                           <Button 
//         title="Update Profile"
//           //style={styles.loginText}
//           onPress={() => this.props.navigation.navigate('Update Profile',{screen:'updatePro'})}
//           />

//                           <Button 
//         title="FAQ"
//           //style={styles.loginText}
//           onPress={() => this.props.navigation.navigate('AfterQuestions',{screen:'Afterques'})}
//           />

//                                     <Button 
//         title="Learning Materials"
//           //style={styles.loginText}
//           onPress={() => this.props.navigation.navigate('Learning Materials',{screen:'pdfViewer'})}
//           />

//                                     <Button 
//         title=" GoTo afQues scren"
//           //style={styles.loginText}
//           onPress={() => this.props.navigation.navigate('AfterQuestions',{screen:'Afterques'})}
//           />


//         <Button 
//         title=" GoTo Ques scren"
//           //style={styles.loginText}
//           onPress={() => this.props.navigation.navigate('Questions',{screen:'NewQues'})}
//           />



//                   <Button
//           color="#3740FE"
//           title="Logout"
//           onPress={() => this.signOut()}
//         />
         
        
//     {/* <QuesList /> */}
//     {/* <BotTab /> */}
//       </View>
      
      
//     );


    


//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     display: "flex",
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 35,
//     backgroundColor: '#fff'
//   },
//   textStyle: {
//     fontSize: 15,
//     marginBottom: 20
//   }
// });





import * as React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import Constants from 'expo-constants';
import { Button } from 'react-native-elements';
import { Divider } from 'react-native-elements';
import firebase from '../database/firebase';
import CameraComponent from './Camera';
const profileImg ="https://reactnativemaster.com/wp-content/uploads/2019/11/React-native-master-logo-only.png"

export default class Fire extends React.Component {

  constructor(props) {
    super(props);
    this.state = { 
      uid: '',

    }
  }


  signOut = () => {
    firebase.auth().signOut().then(() => {
      this.props.navigation.navigate('Login')
    })
    .catch(error => this.setState({ errorMessage: error.message }))
    
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


  clearAll = async () => {
    console.log("cleared");
    try {
      await AsyncStorage.clear()
    } catch(e) {
      // clear error
    }
  
  };
  




  render() {

    this.state = { 
      displayName: firebase.auth().currentUser.displayName,
      uid: firebase.auth().currentUser.uid


      
    } 


    return (
      <View style={styles.container}>

<View style={styles.card}>
 
 <Button
title="Medical Risk factors"
type="clear"
onPress={() => this.props.navigation.navigate('Medical Risk Factors')}
/>
 </View>
 <View style={styles.hairline} />

 <View style={styles.card}>
 
 <Button
title="Medical History Symptoms"
type="clear"
onPress={() => this.props.navigation.navigate('Medical History Symptoms')}
/>
 </View>
 <View style={styles.hairline} />

 <View style={styles.card}>
 
 <Button
title="Treatment Compliance"
type="clear"
onPress={() => {this.props.navigation.navigate('Treatment Compliance'),this.getAllKeys()}}
/>
 </View>
 <View style={styles.hairline} />

        <View style={styles.card}>
 
        <Button
  title="CAG & Discharge Report upload"
  type="clear"
  onPress={() => this.props.navigation.navigate('CAG & Discharge')}
/>
        </View>
        {/* <View style={styles.hairline} />
        
        <View style={styles.card}>
 
 <Button
title="Questions"
type="clear"
onPress={() => this.props.navigation.navigate('Questions',{screen:'NewQues'})}
/>
 </View> */}

 <View style={styles.hairline} />
 {/* <View style={styles.card}>
 
 <Button
title="FAQs"
type="clear"
onPress={() => this.props.navigation.navigate('FAQ page',{screen:'Faqpage'})}
/>
 </View>

 <View style={styles.hairline} /> */}
 <View style={styles.card}>
 
 <Button
title="Learning Materials"
type="clear"
onPress={() => {this.props.navigation.navigate('Learning Materials',{screen:'pdfViewer'})}}
/>
 </View>

 <View style={styles.hairline} />
 <View style={styles.card}>
 
 <Button
title="Logout"
type="clear"
onPress={() => this.signOut()}
/>
 </View>


 
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
  },
  card:{
    height:70,
    width:"94%",
    backgroundColor:"white",
    borderRadius:15,
    borderWidth: 1,
    borderColor: '#3740FE',
    elevation:10,
    padding:10,
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
