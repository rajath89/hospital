// import firebase from '../database/firebase';
// import { divide } from "react-native-reanimated";
// import React, { Component } from 'react';
// import { StyleSheet, Text, View, TextInput, Alert, ActivityIndicator,TouchableOpacity } from 'react-native';
// import NewQues from './NewQues';

// import SingleCardView from 'react-native-simple-card';

// import { Card,Divider,Button, Overlay} from 'react-native-elements';











// const items = [
//   { name: 'Me', background: '#3498db', icon: 'user' },
//   { name: 'Family', background: '#ef0202', icon: 'gratipay' },
//   { name: 'Lovely', background: '#efcf02', icon: 'heart' },
//   { name: 'Team', background: '#02ef1d', icon: 'users' },
//   // { name: 'Friends', background: '#02cbef', icon: 'group' },
//   // { name: 'Calendars', background: '#ef5802', icon: 'calendar' },
// ];

// class Fire extends Component {
//     // constructor(props) {
//     //     super(props);
//     //     this.state = {  }
//     // }

//  // state = {
    
//  //    name: ""
    
//  //  };

//   // state = {
//   //   loading: true,
//   //   person: null
//   // };

//   // async componentDidMount() {
//   //   const url = "http://localhost:5000/test";
//   //   const response = await fetch(url);
//   //   const data = await response.json();
//   //   console.log(data);
//   //   this.setState({ person: data, loading: false });
//   // }
//   //componentDidMount(){
//   	   //  firebase
//       // .database()
//       // .ref("users")
//       // .child("01")
//       // .set({
//       //   name: "ali haider"
//       // });

//   //     const db = firebase.firestore();
//   //     var alovelaceDocumentRef = db.doc('users/alovelace');

//   // //   db.collection("users").doc("test").add({
//   // //     	name:"naga"
//   // // });  
//   // alovelaceDocumentRef.add({
//   // 	name:"naga"
//   // });

//    //const [currentTime, setCurrentTime] = useState(0);




//   //}


//   //   constructor(props) {
//   //   super(props);
//   //   this.state = {
//   //     error: null,
//   //     isLoaded: false,
//   //     items: []
//   //   };
//   // }

//   // componentDidMount() {
//   //   fetch("https://api.example.com/items")
//   //     .then(res => res.json())
//   //     .then(
//   //       (result) => {
//   //         this.setState({
//   //           isLoaded: true,
//   //           items: result.items
//   //         });
//   //       },
//   //       // Note: it's important to handle errors here
//   //       // instead of a catch() block so that we don't swallow
//   //       // exceptions from actual bugs in components.
//   //       (error) => {
//   //         this.setState({
//   //           isLoaded: true,
//   //           error
//   //         });
//   //       }
//   //     )
//   // }

//   on1 =  () =>{
//     console.log("clicked");
//   }


//   render() {
//     return (
//       <View style={styles.container}>
//         <Text style={styles.headerText}>Set Button Color In React Native.</Text>

//         <View style={[{ width: "90%", margin: 10, height:120,backgroundColor: "#3740FE" }]}>
//           <TouchableOpacity style={{ height: 50, marginTop: 10 }} onPress={this.on1}>
//     <Text>My button</Text>
// </TouchableOpacity>
//         </View>

//       <View style={[{ width: "90%", margin: 10, height:120,backgroundColor: "#3740FE" }]}>

//       <TouchableOpacity
//         style={styles.button}
//         onPress={this.on1}
//       >
//         <Text>Press Here</Text>
//       </TouchableOpacity>
//     </View>

//     </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#F5FCFF"
//   },
//   headerText: {
//     fontSize: 20,
//     textAlign: "center",
//     margin: 10,
//     fontWeight: "bold"
//   },
//   button: {
//     padding: 20,
//     fontSize: 15,
//     fontFamily: "arial",
//     width: 400,
//     height: 100,
//     textAlign: "center"
//   }
// });

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     paddingHorizontal: 10
//   },
//   button: {
//     alignItems: "center",
//     backgroundColor: "#DDDDDD",
//     padding: 10
//   },
//   countContainer: {
//     alignItems: "center",
//     padding: 10
//   }
// });


// export default Fire;


import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Dashboard from 'react-native-dashboard';
//import { ImageBrowser } from 'expo-multiple-media-imagepicker';
 
const items = [
  { name: 'Me',icon: 'user' },
  { name: 'Family',icon: 'gratipay' },
  { name: 'Lovely',icon: 'heart' },
  { name: 'Team', icon: 'users' },
  { name: 'Friends', icon: 'group' },
  { name: 'Friends', icon: 'group' }
];
 
export default class Fire extends Component {
  _card = el => {
    console.log('Card: ' + el.name)
  };
  render() {
    return (
      <View style={styles.container}>
        <Dashboard items={items} background={true} card={this._card} column={2} />
      </View>
    );
  }
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ecf0f1',
  },
});




