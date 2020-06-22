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
    isVisible3:false,
    isVisible4:'',
    isVisible5:null,
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
            <Icon name="window-close-o" size={35} color="black" style={{position: 'absolute',left: 300,right: 0,top: 120,bottom: 0}}  onPress = {() => 
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
            visible = {this.state.isVisible3}
            onRequestClose = {() =>{ console.log("Modal has been closed.") } }>
            {/*All views of Modal*/}
            {/*Animation can be slide, slide, none*/}
            <View style = {styles.modal}>
            <Icon name="window-close-o" size={35} color="black" style={{position: 'absolute',left: 300,right: 0,top: 120,bottom: 0}}  onPress = {() => 
                  this.setState({ isVisible3:!this.state.isVisible3})}/>
                
              <Text style={styles.paragraph}>
              Diabetes is a major risk factor for stroke and heart
disease.It can also affect the kidneys, retina, nerves in the
long run, especially if it remains uncontrolled.
Other major risk factors are smoking, high
cholesterol, high blood pressure, physical
inactivity or obesity.If you have diabetes, it’s very important to have
regular check-ups.Work closely with your healthcare provider to
manage your diabetes and reduce any other risk
factors
              </Text>
              
{/* 
              <Button title="Click To Close Modal" onPress = {() => 
                  this.setState({ isVisible:!this.state.isVisible})}/> */}
                 

                  

              

</View>
</Modal>
 
 <Button
title="Why should I control my diabetes"
type="clear"
onPress = {() => {this.setState({ isVisible3: true})}}

/>
 </View>

 <View style={styles.hairline} />
 <View style={styles.card}>

 <Modal animationType = {"slide"} transparent = {false}
            visible = {this.state.isVisible4}
            onRequestClose = {() =>{ console.log("Modal has been closed.") } }>
            {/*All views of Modal*/}
            {/*Animation can be slide, slide, none*/}
            <View style = {styles.modal}>
            <Icon name="window-close-o" size={35} color="black" style={{position: 'absolute',left: 300,right: 0,top: 120,bottom: 0}}  onPress = {() => 
                  this.setState({ isVisible4:!this.state.isVisible4})}/>
                
              <Text style={styles.paragraph}>
• Manage your weight, blood pressure and cholesterol with a heart-healthy eating
plan that is low in saturated fat, trans fat, salt (sodium) and added sugars.
• Be physically active. Aim for at least 150 minutes of moderate-intensity
physical activity, such as brisk walking, or 75 minutes of vigorous-intensity
aerobic activity each week.
• Lower your blood pressure, if it’s too high. Aim for a normal blood pressure
which is less than 120 mm Hg for the systolic (upper) number and less than
80 mm Hg for the diastolic (lower) number.
• Don’t smoke, and avoid second-hand smoke.
• If you take medications, take them exactly as directed. If you have questions
about the dosage or side effects, ask your healthcare provider or pharmacist.
• Limit your alcohol intake.
              </Text>
              
{/* 
              <Button title="Click To Close Modal" onPress = {() => 
                  this.setState({ isVisible:!this.state.isVisible})}/> */}
                 

                  

              

</View>
</Modal>
 
 <Button
title="How should I control my diabetes"
type="clear"
onPress = {() => {this.setState({ isVisible4: true})}}

/>
 </View>

 <View style={styles.hairline} />
 <View style={styles.card}>

 <Modal animationType = {"slide"} transparent = {false}
            visible = {this.state.isVisible5}
            onRequestClose = {() =>{ console.log("Modal has been closed.") } }>
            {/*All views of Modal*/}
            {/*Animation can be slide, slide, none*/}
            <View style = {styles.modal}>
            <Icon name="window-close-o" size={35} color="black" style={{position: 'absolute',left: 300,right: 0,top: 120,bottom: 0}}  onPress = {() => 
                  this.setState({ isVisible5:!this.state.isVisible5})}/>
                
              <Text style={styles.paragraph}>
USE MORE
vegetables, fruits, whole grains, beans,
rajma, turmeric, chia seeds, oats, legumes,
nuts, plant-based proteins, lean animal
proteins, skinless poultry, fish, low
glycemic foods like apples, almonds.
AVOID
sweetened drinks, salt, red meat, refined
 carbohydrates like added sugars and full-fat dairy
products, highly processed foods, tropical oils like
coconut and palm oil.
              </Text>
              
{/* 
              <Button title="Click To Close Modal" onPress = {() => 
                  this.setState({ isVisible:!this.state.isVisible})}/> */}
                 

                  

              

</View>
</Modal>
 
 <Button
title="Diabetes and diet"
type="clear"
onPress = {() => {this.setState({ isVisible5: true})}}

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