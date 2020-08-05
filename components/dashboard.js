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
import { Text, View, StyleSheet, Image,Dimensions } from 'react-native';
import Constants from 'expo-constants';
import { Button } from 'react-native-elements';
import { Divider } from 'react-native-elements';
import firebase from '../database/firebase';
import CameraComponent from './Camera';
import { AsyncStorage } from 'react-native';
import pdfViewer from './pdfviewer';
import Settings from './settings';


import {connect} from 'react-redux';
import dashboardV2 from './dashboardV2';



//REDUX IMPORTS

import english from './actions/langActions';
import kannada from './actions/langActions2';
import RAN from './actions/ranNumber';


const profileImg ="https://reactnativemaster.com/wp-content/uploads/2019/11/React-native-master-logo-only.png"
const w = Dimensions.get('window');
 class Fire extends React.Component {

  // constructor(props) {
  //   super(props);
  //   this.state = { 
  //     uid: ''
     

  //   }
  // }]



  state = {
    isVisible: false,
    isVisible2:false,
    kannada:false,
    data:null,
    red:8,
    reduxState:1,
    decide:"eng",
    load:true
  }


  async _retrieveDataK() {
    try {
      const value = await AsyncStorage.getItem('kannadaLang');
      if (value !== null && value=="TRUE") {
        // We have data!!
        console.log(value);

        this.props.kannada();

        this.setState({
          kannada:true,
          decide:"kan"
        });
        //console.log("from state:",this.state.globName);

      }else if(value !== null && value=="FALSE"){
        this.props.english();
      }
    } catch (error) {
      // Error retrieving dat
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





setLoad=()=>{
  this.setState({load:false});
}


   lazyLoad=()=>{

    setTimeout(()=>{ this.setLoad() }, 3000);

   }





  componentDidMount() {

    this._retrieveDataK();
    console.log("update...........");
    this.lazyLoad();

    

  }


  componentDidUpdate(prevState) {
    if (this.state.red.test !== prevState.red.test) {
      console.log("props changed !!!!!!1");
      //this.setState({kannada:true});
      console.log(this.state.reduxState,this.state.kannada,this.props.red.test,this.props.red.dec);


      if(this.props.red.test=="kannada"&&this.props.red.dec=="1234"){
        
        this.props.RAN();
        
        this.setState({kannada:true});
       
      }else if(this.props.red.test=="english"&&this.props.red.dec=="5678"){
        this.props.RAN();
        this.setState({kannada:false});
      }



    }
  }

onScreenFocus = () => {
    console.log("focussed...............")
  }
  
 render() {

    // this.state = { 
    //   displayName: firebase.auth().currentUser.displayName,
    //   uid: firebase.auth().currentUser.uid


      
    // } 

    if(this.state.load){

return(

  <View style={styles.container}>
  <Image
    source={{ uri: `https://firebasestorage.googleapis.com/v0/b/hospitalusers-44f06.appspot.com/o/d.png?alt=media&token=aaec30d0-986a-4a48-84fc-be7567bcad82` }}
    style={{ width: w.width, height: w.width }}
    
  />
  </View>

);


    }






   console.log("##############",this.props.red.dec);
   console.log("ggg");
    return (
      <View style={styles.container}>

<View style={styles.card}>
 
 <Button

title={this.state.kannada == false ? 'Medical Risk factor' : 'ಹೃದಯ ರೋಗವನ್ನು ಹೆಚ್ಚಿಸುವ ಅಂಶಗಳು'} 
type="clear"
onPress={() => this.props.navigation.navigate('Medical Risk Factors')}
/>
 </View>
 <View style={styles.hairline} />

 <View style={styles.card}>
 
 <Button

title={this.state.kannada == false ? 'Medical History Symptoms' : 'ವೈದ್ಯಕೀಯ ಹಿನ್ನೆಲೆ ರೋಗ ಲಕ್ಷಣಗಳು'} 
type="clear"
onPress={() => this.props.navigation.navigate('Medical History Symptoms')}
/>
 </View>
 <View style={styles.hairline} />

 <View style={styles.card}>
 
 <Button

title={this.state.kannada == false ? 'Treatment Compliance' : 'ಚಿಕಿತ್ಸೆಯ ಅನುಸರಣೆ'} 
type="clear"
onPress={() => {this.props.navigation.navigate('Treatment Compliance'),this.getAllKeys()}}
/>
 </View>
 <View style={styles.hairline} />

        <View style={styles.card}>
 
        <Button
 
  title={this.state.kannada == false ? 'CAG & Discharge Report upload' : 'ವರದಿಗಳನ್ನು ಅಪ್ಲೋಡ್ ಮಾಡಿ (ಎಂಜಿಯೋಗ್ರಾಮ್ ಮತ್ತು ಡಿಸ್ಚಾರ್ಜ್ ವರದಿ)'} 
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

title={this.state.kannada == false ? 'Learning Materials' : 'ಕಲಿಕಾ ಸಾಮಗ್ರಿಗಳು'} 
type="clear"
onPress={() => {this.props.navigation.navigate('Learning Materials',{screen:'pdfViewer'}),this.propsTest()}}
/>
 </View>

 <View style={styles.hairline} />
 <View style={styles.card}>
 
 <Button
title="Logout"
title={this.state.kannada == false ? 'Logout' : 'ಲಾಗ್ ಔಟ್'} 
type="clear"
onPress={() => this.signOut()}
/>
<Text>{this.props.red.text}</Text>



{this.props.red.dec=="english" && <Text> dispached ENGLISH</Text>}
{this.props.red.dec=="kannada" && <Text> dispached KANNADA</Text>}
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


function mapStateToProps(state){
  return{
    red:state
  }
}


export default connect(mapStateToProps,{english,kannada,RAN})(Fire)



