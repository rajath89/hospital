import React, { Component } from 'react';

import { StyleSheet, View ,Button,Text} from 'react-native';
import firebase from '../database/firebase';

import { Container, Header, Content, Footer, FooterTab } from 'native-base';

//import Ques from components/dashBComp/Ques;
import {Upload} from './Upload' ;
import {Ques} from './Ques';
import { firestore } from 'firebase';
import QuesList from './QuesList';
import BotTab from './BotTab';
import NewQues from './NewQues';
import Afterques from './afterques';

//queslist
// import {quizData} from './Questions/quizData';
// import console = require('console');


export default class Dashboard extends Component {


    
  constructor(props) {
    super(props);
    this.state = { 
      uid: '',

    }

    
    //this.state = {index: 0} // default screen index



  }
  









 

  signOut = () => {
    firebase.auth().signOut().then(() => {
      this.props.navigation.navigate('Login')
    })
    .catch(error => this.setState({ errorMessage: error.message }))
    
  }  

  render() {
    this.state = { 
      displayName: firebase.auth().currentUser.displayName,
      uid: firebase.auth().currentUser.uid


      
    } 
    
    


    return (
      
      <View style={styles.container}>
        <Text style = {styles.textStyle}>
          Hello, {this.state.displayName}
        </Text>

        
        



                       <Button 
        title="View Profile"
          //style={styles.loginText}
          onPress={() => this.props.navigation.navigate('View Profile',{screen:'viewPro'})}
          />

                          <Button 
        title="Update Profile"
          //style={styles.loginText}
          onPress={() => this.props.navigation.navigate('Update Profile',{screen:'updatePro'})}
          />

                          <Button 
        title="FAQ"
          //style={styles.loginText}
          onPress={() => this.props.navigation.navigate('AfterQuestions',{screen:'Afterques'})}
          />

                                    <Button 
        title="Learning Materials"
          //style={styles.loginText}
          onPress={() => this.props.navigation.navigate('AfterQuestions',{screen:'Afterques'})}
          />

                                    <Button 
        title=" GoTo afQues scren"
          //style={styles.loginText}
          onPress={() => this.props.navigation.navigate('AfterQuestions',{screen:'Afterques'})}
          />


        <Button 
        title=" GoTo Ques scren"
          //style={styles.loginText}
          onPress={() => this.props.navigation.navigate('Questions',{screen:'NewQues'})}
          />



                  <Button
          color="#3740FE"
          title="Logout"
          onPress={() => this.signOut()}
        />
         
        
    {/* <QuesList /> */}
    {/* <BotTab /> */}
      </View>
      
      
    );


    


  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    justifyContent: 'center',
    alignItems: 'center',
    padding: 35,
    backgroundColor: '#fff'
  },
  textStyle: {
    fontSize: 15,
    marginBottom: 20
  }
});