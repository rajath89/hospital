// import * as React from 'react'
// import { View } from 'react-native'
// import PDFReader from 'rn-pdf-reader-js';
// import { WebView } from 'react-native-webview';
 
// export default class pdfViewer extends React.Component {
//   render() {
//     return (
//       <PDFReader
//         source={{
//           uri: 'https://firebasestorage.googleapis.com/v0/b/hospitalusers-44f06.appspot.com/o/mobile_app-_final_pdf.pdf?alt=media&token=a66ce6ff-a2e3-4dd9-93b8-9c8447c61304',
//         }}
//       />

//     );

//   }
// }

import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Dashboard from 'react-native-dashboard';
//import { ImageBrowser } from 'expo-multiple-media-imagepicker';
 
const items = [
  { name: 'Diabetes',icon: 'user' },
  { name: 'Cholestrol',icon: 'gratipay' },
  { name: 'Blood pressure',icon: 'heart' },
  { name: 'Smoking', icon: 'users' },
  { name: 'Physical Activity', icon: 'group' },
  { name: 'Heart Attact or MI OR Myocardial infraction', icon: 'group' },
  { name: 'Angioplasty and life after angioplasty', icon: 'group' }
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