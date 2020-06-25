// import * as React from 'react'
// import { View } from 'react-native'
// import PDFReader from 'rn-pdf-reader-js';
// import { WebView } from 'react-native-webview';
 
// export default class Diabetes extends React.Component {
//   render() {
//     return (
//       <PDFReader
//         source={{
//           uri: 'https://firebasestorage.googleapis.com/v0/b/hospitalusers-44f06.appspot.com/o/mobile_app-_final_pdf.pdf?alt=media&token=a66ce6ff-a2e3-4dd9-93b8-9c8447c61304',
//         }}
//         useGoogleReader={true}
//       />

//     );

//   }
// }

// import React, { Component } from 'react';
// import { Text, View, StyleSheet } from 'react-native';
// import Dashboard from 'react-native-dashboard';
// //import { ImageBrowser } from 'expo-multiple-media-imagepicker';
 
// const items = [
//   { name: 'Diabetes',icon: 'user' },
//   { name: 'Cholestrol',icon: 'gratipay' },
//   { name: 'Blood pressure',icon: 'heart' },
//   { name: 'Smoking', icon: 'users' },
//   { name: 'Physical Activity', icon: 'group' },
//   { name: 'Heart Attact or MI OR Myocardial infraction', icon: 'heart' },
//   { name: 'Angioplasty and life after angioplasty', icon: 'group' }
// ];
 
// export default class Fire extends Component {
//   _card = el => {
//     console.log('Card: ' + el.name);
//     if(el.name=="Diabetes"){
//       console.log("hit");
//       this.props.navigation.navigate('Diabetes')
//     }
//   };
//   render() {
//     return (
//       <View style={styles.container}>
//         <Dashboard items={items} background={true} card={this._card} column={2} />
//       </View>
//     );
//   }
// }


// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#ecf0f1',
//   },
// });







import React, { Component } from 'react';
import { Button } from 'react-native-elements';
//import react in our code. 

import { Modal, View,Text, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
import { CheckBox } from 'react-native-elements'


 

export default class Diabetes extends Component {
  state = {
    isVisible: false,
    isVisible2:false,
    kannada:false
  }




  render() {
    return (


<View style={styles.container}>

{/* <CheckBox
  title="check"
  checked={false}
  onPress={() => this.setState({kannada: !this.state.kannada})}
/> */}


        <View style={styles.card}>

        
 
        <Button
  title={this.state.kannada == false ? 'Diabetes' : 'ಮಧುಮೇಹ (ಸಕ್ಕರೆ ರೋಗ)'} 
  type="clear"
  
  onPress={() => this.props.navigation.navigate('Diabetes')}


/>



        </View>
        <View style={styles.hairline} />

        <View style={styles.card}>
 
        <Button
  title="Cholestrol"
  type="clear"

  onPress={() => this.props.navigation.navigate('Cholestrol')}
  
/>
        </View>
        <View style={styles.hairline} />
        
        <View style={styles.card}>
 
 <Button
title="Blood Pressure"
type="clear"
onPress={() => this.props.navigation.navigate('Blood Pressure')}
/>
 </View>

 <View style={styles.hairline} />
 <View style={styles.card}>
 
 <Button
title="Smoking"
type="clear"

onPress={() => this.props.navigation.navigate('Smoking')}

/>
 </View>

 <View style={styles.hairline} />
 <View style={styles.card}>
 
 <Button
title="Physical Activity"
type="clear"
onPress={() => this.props.navigation.navigate('Physical Activity')}
/>
 </View>
 <View style={styles.hairline} />

 <View style={styles.card}>
 
 <Button
title="Heart Attack or Myocardial infraction"
type="clear"
onPress={() => this.props.navigation.navigate('Heart Attack')}
/>
 </View>

 <View style={styles.hairline} />

 <View style={styles.card}>
 
 <Button
title="Angioplasty and life after angioplasty"
type="clear"
onPress={() => this.props.navigation.navigate('Angioplasty')}
/>
 </View>

 
 






 
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    marginTop:30
  },
   modal: {
      flex: 1,
      alignItems: 'center',
      
      padding: 70
   },
   text: {
      color: '#3f2949',
      marginTop: 10
   },
   card:{
     height:70,
     width:"80%",
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






// import React, { Component } from 'react';
// //import react in our code. 

// import { Modal, Button, View,Text, StyleSheet } from 'react-native';
// //import all the components we are going to use. 

// export default class App extends Component {
//   state = {
//     isVisible: false,
//     isVisible2:false
//   }
//   render() {
//     return (
//       <View style = {styles.container}>
//         <Modal animationType = {"slide"} transparent = {false}
//             visible = {this.state.isVisible}
//             onRequestClose = {() =>{ console.log("Modal has been closed.") } }>
//             {/*All views of Modal*/}
//             {/*Animation can be slide, slide, none*/}
//             <View style = {styles.modal}>
//               <Text style = {styles.text}>Modal is open!</Text>
//               <Button title="Click To Close Modal" onPress = {() => {
//                   this.setState({ isVisible:!this.state.isVisible})}}/>
//             </View>
//         </Modal>

//         <Modal animationType = {"slide"} transparent = {false}
//             visible = {this.state.isVisible2}
//             onRequestClose = {() =>{ console.log("Modal has been closed.") } }>
//             {/*All views of Modal*/}
//             {/*Animation can be slide, slide, none*/}
//             <View style = {styles.modal}>
//               <Text style = {styles.text}>
//               The food we eat contains carbohydrates which are broken
// down into glucose by digestion and is released into the
// blood.
// Insulin is a hormone naturally released by the pancreas
// which helps the cells to take up glucose.
// Diabetes can result from

// • the ineffectiveness of the action of insulin - because
// body develops resistance to its action.
// • or insufficient release from pancreas.
//               </Text>
//               <Button title="Click To Close Modal" onPress = {() => {
//                   this.setState({ isVisible2:!this.state.isVisible2})}}/>
//             </View>
//         </Modal>
        
//         <Button 
//            title="Click To Open Modal" 
//            onPress = {() => {this.setState({ isVisible: true})}}
//         />

// <Button 
//            title="Click To Open Modal" 
//            onPress = {() => {this.setState({ isVisible2: true})}}
//         />
//       </View>
//     );
//   }
// }
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: '#ecf0f1',
//     marginTop:30
//   },
//    modal: {
//       flex: 1,
//       alignItems: 'center',
      
//       padding: 70
//    },
//    text: {
//       color: '#3f2949',
//       marginTop: 10
//    }
// });