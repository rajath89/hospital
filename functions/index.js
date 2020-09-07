const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();
// const fetch = require('node-fetch');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", {structuredData: true});


        // const getDeviceTokensPromise = admin.database()
        //   .ref(`/tokens/{tokenID}/{tokenVal}`).once('value');


       // const getDeviceTokensPromise = admin.database().ref('/tokens').once('value');


       // return Promise.all([getDeviceTokensPromise]).then(results => {
       //   const tokensSnapshot = results[0];

       //   if (!tokensSnapshot.hasChildren()) {
       //     return console.log('There are no notification tokens to send to.');
       //   }

       //   const payload = {
       //     notification: {
       //       title: 'You have a new Message!',
       //       body: event.data.val().Message
       //     }
       //   };

       //   const tokens = Object.keys(tokensSnapshot.val());


      // const results = Promise.all([getDeviceTokensPromise]).then(result=>{
      // 	const tokensSnapshot = result[0];
      	
      // 	functions.logger.info("Hello tokens!", tokensSnapshot);
      // })
      // tokensSnapshot = results[0];
      // const tokens = Object.keys(tokensSnapshot.val());
       //functions.logger.info("Hello tokens!", results);

       var gloV="hi";


             (async () => {
const snapshott = await admin.database().ref('/tokens').once('value');



if(snapshott!=null){
	functions.logger.info("Hello tokens from async before json!", snapshott.toJSON());
	response.send(snapshott.toJSON());

}

functions.logger.info("Hello tokens from async after!", snapshott);
gloV=snapshott.toJSON();

})();


functions.logger.info("glov",gloV);



  

    // response.send("hi");
});


// Listens for new messages added to /messages/:pushId/original and creates an
// uppercase version of the message to /messages/:pushId/uppercase
exports.makeUppercase = functions.database.ref('/users/{userId}/time2')
    .onWrite((snapshot, context) => {
      // Grab the current value of what was written to the Realtime Database.
      const original = snapshot.val();
      console.log('Uppercasing', context.params.pushId, original);
      const uppercase = original.toUpperCase();



             (async () => {
const snapshott = await admin.database().ref('/tokens').once('value');



if(snapshott!=null){
	functions.logger.info("Hello tokens from async before json!", snapshott.toJSON());
	

}

functions.logger.info("Hello tokens from async after!", snapshott);
gloV=snapshott.toJSON();
snapshot.ref.parent.child('uppercase').set(gloV);

})();



      //return snapshot.ref.parent.child('uppercase').set(uppercase);
    });



 exports.getMessage = functions.https.onRequest(async (req, res) => {

    const snapshott = await admin.database().ref('/tokens').once('value');

    res.send(snapshott);

});





 exports.dbWrite = functions.database.ref('/users/{userId}/comments').onWrite((change, context) => {
 const beforeData = change.before.val(); // data before the write
 const afterData = change.after.val(); // data after the write

 functions.logger.info("before :", beforeData);
 functions.logger.info("after :", afterData);

 const userName = context.params.userId;


             (async () => {
const snapshott = await admin.database().ref('/tokens').once('value');



if(snapshott!=null){
	functions.logger.info("Hello tokens from async before json!", snapshott.toJSON());
	

}

functions.logger.info("Hello tokens from async after!", snapshott);
var gloV=snapshott.toJSON();

var g=JSON.parse(JSON.stringify(gloV));

var arr=new Array();

Object.keys(g).forEach(function(key) {
    arr.push(g[key]);
});

// Listing all tokens as an array.
functions.logger.info("array", arr);


//change.after.ref.parent.child('uppercase').set(gloV);

      // Notification details.
      const payload = {
        notification: {
          title: 'push notification',
          body: `user ${userName} commented \"${afterData}\"`
        }
      };

      //const tok="fj5UVQ2cS_GJkMvGiOU6ot:APA91bEPVimpz97Kzb5hF3TTeGBIGL5Ov4bIvVhb0jEdFqXWcLGz1SAtphE-WiotFRUtWczv5EEyoQx0bxaPhvPwbG7-QkWYim01bRGNqFi0-SRc5OXSEUSoS-V0VYjmXrJQGB5wuCKn"

      

      // Send notifications to all tokens.
      const response = await admin.messaging().sendToDevice(arr, payload);
      // For each message check if there was an error.
      
      response.results.forEach((result, index) => {
        const error = result.error;
        if (error) {
          console.error('Failure sending notification to', error);
          functions.logger.info("error", error);


        }
      });









})();



 return 0;
});