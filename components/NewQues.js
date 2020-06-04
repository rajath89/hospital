
import React, { Component } from 'react';

import { Text, View, Button } from 'react-native';
import { quizData } from "./Questions/quizData";
import Icon from 'react-native-vector-icons/FontAwesome';
// import console = require('console');

import update from 'immutability-helper';

import { AsyncStorage } from 'react-native';


export default class NewQues extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {  }
    // }

    state = {
        currentQuestion: 0,
        myAnswer: null,
        options: [],
        score: 0,
        disabled: true,
        isEnd: false,
        op:null,
        ans:[]
      };


//   getMultiple = async () => {

//   let values
//   try {
//     values = await AsyncStorage.multiGet(['expoToken', 'expoToken1','\" Do you have hypertension ?\"'])
//   } catch(e) {
//     // read error
//   }
//   if(values){
//   //console.log(values.length);
//   //console.log(JSON.stringify(values));

//   var object = Object.fromEntries(values);
//   console.log(object);
//   this.setState({ob:object});
//   console.log(this.state.ob);
//   console.log(JSON.stringify(this.state.ob));

//   var myArray = new Array();
//   myArray.push(this.state.ob);
// //alert(JSON.stringify(myArray));
// console.log(myArray);

  

//   (async () => {
//   const rawResponse = await fetch('https://flask-app47.herokuapp.com/questions', {//exp://192.168.0.104:19000
//     method: 'POST',
//     headers: {
//       'Accept': 'application/json',
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({"username": "jason", "questionDetails":myArray[0]})
//   });
//   const content = await rawResponse.json();

//   console.log(content);
//   //console.log(object);
// })();

 




// }
 
// }




      loadQuizData = () => {
        // console.log(quizData[0].question)
        this.setState(() => {
          return {
            questions: quizData[this.state.currentQuestion].question,
            answer: quizData[this.state.currentQuestion].answer,
            options: quizData[this.state.currentQuestion].options
          };
        });

        console.log("from load",this.state.options,this.state.answer,this.state.answer);
        
      };
    
      componentDidMount() {
        this.loadQuizData();
      }



      nextQuestionHandler = () => {
        // console.log('test')
        const { myAnswer, answer, score } = this.state;
    
        if (myAnswer === answer) {
          this.setState({
            score: score + 1
            //op:null
           // quizData[this.state.currentQuestion].id
          });
        }
    
        this.setState({
          currentQuestion: this.state.currentQuestion + 1
          //,
          //op:null
        });
        console.log(this.state.currentQuestion);
      };

        _storeData = async () => {
        try {
          await AsyncStorage.setItem(quizData[this.state.currentQuestion].id, this.state.op);
          console.log("stored");
          
        } catch (error) {
          // Error saving data
        }
      };

      vv = async (an) =>{
        //console.log(typeof JSON.stringify(this.state.op));
        var g=JSON.stringify(this.state.op);
        try {
          await AsyncStorage.setItem(this.state.questions, an);
          console.log("stored");
          
        } catch (error) {
          // Error saving data
          console.log("err");
        }
      }


      componentDidUpdate(prevProps, prevState) {
        if (this.state.currentQuestion !== prevState.currentQuestion) {
          this.setState(() => {
            return {
              disabled: true,
              questions: quizData[this.state.currentQuestion].question,
              options: quizData[this.state.currentQuestion].options
            };
          });
        }
      }
      //check answer
      checkAnswer = answer => {
        var arr=[]
        var arr2=[]

        arr.push(answer);
        arr=[...this.state.ans]
        var t=[];
        var state1 = [];
        
         var ques1=this.state.questions;
         var ans=this.state.myAnswer;
         var ans2=answer;
         var mystate={
          ques1,
          ans,
          ans2
        };

        //AsyncStorage.setItem("keyQ", this.state.op).then(console.log("stored"));
          

        //this._storeData().then(console.log);

        const clone = JSON.parse(JSON.stringify(mystate));
        state1.push(clone);
        //console.log(state1);



        //console.log("not state",arr2);
        this.setState({ myAnswer: answer, disabled: false,op:answer, ans:[mystate,...this.state.ans]});
        console.log("after",this.state.ans);
      };





//flush all keys

        clearAll = async () => {
  try {
    await AsyncStorage.clear()
  } catch(e) {
    // clear error
  }

  console.log('cleared')
}


removeFew = async () => {
  console.log('cleared all ques keys before');
  const keys = ['@MyApp_USER_1', '@MyApp_USER_2']
  try {

    arr1=this.getQues();
    await AsyncStorage.multiRemove(arr1);
    
  } catch(e) {
    // remove error
  }

  console.log('cleared all ques keys after');

}


//get all keys
getAllKeys = async () => {
  let keys = [];
  console.log("get keys");
  try {
    keys = await AsyncStorage.getAllKeys()
  } catch(e) {
    // read key error
  }

  console.log(keys);
  //this.clearAll();
  // example console.log result:
  // ['@MyApp_user', '@MyApp_key']
}

getQues = () => {
  var myarray= new Array();
  for(var i=0;i<quizData.length;i++){
    myarray.push(quizData[i].question);
  }

  return myarray;
}

getMultiple = async () => {

  let values
  try {
    arr=this.getQues();
    values = await AsyncStorage.multiGet(arr);
  } catch(e) {
    // read error
  }
  console.log(values);
  if(values){
      var object = Object.fromEntries(values);
      console.log(object);

        var quesA = new Array();
        quesA.push(object);
//alert(JSON.stringify(myArray));
        console.log(quesA);

        //sending to backend
          (async () => {
  const rawResponse = await fetch('https://flask-app47.herokuapp.com/questions', {//exp://192.168.0.104:19000
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({"username": "jason", "questionDetails":quesA[0]})
  });
  const content = await rawResponse.json();

  if(content){
    console.log("before");
    console.log(content);
    console.log("after");
    
  }


  
  //console.log(object);
})();


  }

  console.log("outside");
//console.log(content);
this.removeFew();




  // example console.log output:
  // [ ['@MyApp_user', 'myUserValue'], ['@MyApp_key', 'myKeyValue'] ]
}



      finishHandler = () => {
        console.log("finished");
        if (this.state.currentQuestion === quizData.length - 1) {
          this.setState({
            isEnd: true
          });

                  //if(this.state.isEnd){
          this.props.navigation.navigate('AfterQuestions',{screen:'Afterques'});
        //}
        }
        //this.getAllKeys();
        //console.log(this.getQues());

//#################uncomment getmultiple####
        //this.getMultiple();





};
    

    render() { 
        const { options, myAnswer, currentQuestion, isEnd } = this.state;
        return (
                    <View>
          <Text>{this.state.questions} </Text>

          {options.map(option => (          //,this.vv(option)
            <Button title={option} key={this.state.questions.id} onPress={() => {this.checkAnswer(option)}}/>
              
            
             
          ))}

           {currentQuestion < quizData.length - 1 && (<Button title="next" onPress={this.nextQuestionHandler} disabled={this.state.disabled}/>)}
           <Text>option clicked : {this.state.op} </Text>


            {currentQuestion === quizData.length - 1 && (
            <Button title="Finish" className="ui inverted button" onPress={this.finishHandler}/>
              
            
          )}

                        {currentQuestion === quizData.length - 1 && (
            <Button title="Finish2" className="ui inverted button" onPress={()=>this.getAllKeys()}/>
              
            
          )}
           <Text>Ques id :{quizData[this.state.currentQuestion].id}</Text>
           
        </View>
         )
            

           
}
 
}

