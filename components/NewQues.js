
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


  getMultiple = async () => {

  let values
  try {
    values = await AsyncStorage.multiGet(['expoToken', 'expoToken1','\" Do you have hypertension ?\"'])
  } catch(e) {
    // read error
  }
  if(values){
  //console.log(values.length);
  //console.log(JSON.stringify(values));

  var object = Object.fromEntries(values);
  console.log(object);
  this.setState({ob:object});
  console.log(this.state.ob);
  console.log(JSON.stringify(this.state.ob));

  var myArray = new Array();
  myArray.push(this.state.ob);
//alert(JSON.stringify(myArray));
console.log(myArray);

  

  (async () => {
  const rawResponse = await fetch('https://flask-app47.herokuapp.com/questions', {//exp://192.168.0.104:19000
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({"username": "jason", "questionDetails":myArray[0]})
  });
  const content = await rawResponse.json();

  console.log(content);
  //console.log(object);
})();

 




}
 
}




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
        console.log(typeof JSON.stringify(this.state.op));
        var g=JSON.stringify(this.state.op);
        try {
          await AsyncStorage.setItem(JSON.stringify(this.state.questions), JSON.stringify(an));
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
      finishHandler = () => {
        console.log("finished");
        if (this.state.currentQuestion === quizData.length - 1) {
          this.setState({
            isEnd: true
          });
        }
      };
    render() { 
        const { options, myAnswer, currentQuestion, isEnd } = this.state;
        return (
                    <View>
          <Text>{this.state.questions} </Text>

          {options.map(option => (
            <Button title={option} key={this.state.questions.id} onPress={() => {this.checkAnswer(option),this.vv(option)}}/>
              
            
             
          ))}

           {currentQuestion < quizData.length - 1 && (<Button title="next" onPress={this.nextQuestionHandler} disabled={this.state.disabled}/>)}
           <Text>option clicked : {this.state.op} </Text>


            {currentQuestion === quizData.length - 1 && (
            <Button title="Finish" className="ui inverted button" onPress={this.finishHandler}/>
              
            
          )}
           <Text>Ques id :{quizData[this.state.currentQuestion].id}</Text>
           
        </View>
         )
            

           
}
 
}

