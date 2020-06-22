import React, { Component } from 'react';
import { Button } from 'react-native-elements';
//import react in our code. 

import { Modal, View, StyleSheet ,Image} from 'react-native';
import { Text } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { WebView } from 'react-native-webview';
import * as WebBrowser from 'expo-web-browser';


 

export default class Diabetes extends Component {



  state = {
    isVisible: false,
    isVisible2:false,
    result: null
  }

  _handlePressButtonAsync = async () => {
    let result = await WebBrowser.openBrowserAsync('https://drive.google.com/file/d/1-LgNpdUk4B_umXIKK88FOcbAhtJTkRPE/view?usp=sharing');
    this.setState({ result });
  }




  render() {
    return (
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

<View style={styles.container}>
        <View style={styles.card}>

        <Modal animationType = {"slide"} transparent = {false}
            visible = {this.state.isVisible}
            onRequestClose = {() =>{ console.log("Modal has been closed.") } }>
            {/*All views of Modal*/}
            {/*Animation can be slide, slide, none*/}
            <View style = {styles.modal}>
            <Icon name="window-close-o" size={35} color="black" style={{position: 'absolute',left: 300,right: 0,top: 20,bottom: 0}}  onPress = {() => 
                  this.setState({ isVisible:!this.state.isVisible})}/>
                
              <Text style={styles.paragraph}>
              The food we eat contains carbohydrates which are broken
down into glucose by digestion and is released into the
blood.
Insulin is a hormone naturally released by the pancreas
which helps the cells to take up glucose.
Diabetes can result from the ineffectiveness of the action of insulin - because
body develops resistance to its action or insufficient release from pancreas.
              </Text>
              
{/* 
              <Button title="Click To Close Modal" onPress = {() => 
                  this.setState({ isVisible:!this.state.isVisible})}/> */}
                 

                  

              

</View>
</Modal>
 
        <Button
  title="Understanding Diabetes"
  type="clear"
  
  onPress = {() => {this.setState({ isVisible: true})}}


/>



        </View>
        <View style={styles.hairline} />

        <View style={styles.card}>

        <Modal animationType = {"slide"} transparent = {false}
            visible = {this.state.isVisible2}
            onRequestClose = {() =>{ console.log("Modal has been closed.") } }>
            {/*All views of Modal*/}
            {/*Animation can be slide, slide, none*/}
            <View style = {styles.modal}>
            {/* <WebView
        source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/hospitalusers-44f06.appspot.com/o/mobile_app-_final_pdf.pdf?alt=media&token=a66ce6ff-a2e3-4dd9-93b8-9c8447c61304' }}
        style={{ marginTop: 20,maxHeight: 500,width: 320,flex: 1 }}
      /> */}
              <Button title="Open WebBrowser" onPress={this._handlePressButtonAsync} />
            <Text>{this.state.result && JSON.stringify(this.state.result)}</Text>
            <Button title="Click To Close Modal" onPress = {() =>this.setState({ isVisible2:!this.state.isVisible2})}/>
            </View>
            </Modal>
 
        <Button
  title="Know your normal levels"
  type="clear"
  onPress = {() => {this.setState({ isVisible2: true})}}
/>
        </View>
        <View style={styles.hairline} />
        
        <View style={styles.card}>
 
 <Button
title="Why should I control my diabetes"
type="clear"
onPress={() => this.props.navigation.navigate('Questions',{screen:'NewQues'})}
/>
 </View>

 <View style={styles.hairline} />
 <View style={styles.card}>
 
 <Button
title="How should I control my diabetes"
type="clear"
onPress={() => this.props.navigation.navigate('FAQ page',{screen:'Faqpage'})}
/>
 </View>

 <View style={styles.hairline} />
 <View style={styles.card}>
 
 <Button
title="Diabetes and diet"
type="clear"
onPress={() => this.props.navigation.navigate('Learning Materials',{screen:'pdfViewer'})}
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
      justifyContent: 'center',
      
      padding: 30
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
   },
   paragraph: {
     margin: 24,
     fontSize: 16,
     fontWeight: 'bold',
     textAlign: 'center',
   },
   modalClose: {
    marginTop: 20,
    marginBottom: 0,
  }
});