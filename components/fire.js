import firebase from '../database/firebase';
import { divide } from "react-native-reanimated";
import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert, ActivityIndicator } from 'react-native';
import NewQues from './NewQues';

class Fire extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {  }
    // }

 // state = {
    
 //    name: ""
    
 //  };

  // state = {
  //   loading: true,
  //   person: null
  // };

  // async componentDidMount() {
  //   const url = "http://localhost:5000/test";
  //   const response = await fetch(url);
  //   const data = await response.json();
  //   console.log(data);
  //   this.setState({ person: data, loading: false });
  // }
  //componentDidMount(){
  	   //  firebase
      // .database()
      // .ref("users")
      // .child("01")
      // .set({
      //   name: "ali haider"
      // });

  //     const db = firebase.firestore();
  //     var alovelaceDocumentRef = db.doc('users/alovelace');

  // //   db.collection("users").doc("test").add({
  // //     	name:"naga"
  // // });  
  // alovelaceDocumentRef.add({
  // 	name:"naga"
  // });

   //const [currentTime, setCurrentTime] = useState(0);




  //}


  //   constructor(props) {
  //   super(props);
  //   this.state = {
  //     error: null,
  //     isLoaded: false,
  //     items: []
  //   };
  // }

  // componentDidMount() {
  //   fetch("https://api.example.com/items")
  //     .then(res => res.json())
  //     .then(
  //       (result) => {
  //         this.setState({
  //           isLoaded: true,
  //           items: result.items
  //         });
  //       },
  //       // Note: it's important to handle errors here
  //       // instead of a catch() block so that we don't swallow
  //       // exceptions from actual bugs in components.
  //       (error) => {
  //         this.setState({
  //           isLoaded: true,
  //           error
  //         });
  //       }
  //     )
  // }

    render() { 
        return ( 
            <View>
                <Text>firejs</Text>    
            </View>
            
            
         );
    }
}
 
export default Fire;