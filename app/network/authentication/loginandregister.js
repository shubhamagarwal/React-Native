import firebase from '../../auth/Firebase';

let responseObject = {
    success : false,
    message : '',
    body : []
}



export const login = (userDetails,cb) => {
        firebase.auth()
        .signInWithEmailAndPassword(userDetails.email, userDetails.password)
        .then((user) => {
            responseObject.success = true;
            responseObject.message = 'User has been login successfully';
            responseObject.body = {...user,  userDetails: userDetails}; 
            cb(responseObject);
        })
        .catch((error) => {
            responseObject.message = error.message;
            cb(responseObject);
        });
  };

export const createProfile = async (userDetails,cb) => {

     const user = userDetails.user;
     const details = userDetails.userDetails;
    console.log("test firebase");
    firebase.firestore().
     collection('users').doc(user.uid).set({
        firstName: details.firstName,
        lastName: details.lastName,
        email: details.email,
        uid: user.uid,
        deviceId: "",
        profileImage:""
      }).then(() => {

        responseObject.success = true;
        responseObject.message = 'User profile has been create successfully';
        responseObject.body = userDetails;
        cb(responseObject);
      }).catch( (error) => {
        console.log(`here is the error ${error}`);
        responseObject.message = error.message;
        cb(responseObject);
      });
      
}  

export const createAccount = (userDetails,cb) => {
  // alert("hiiii")
     firebase.auth()
    .createUserWithEmailAndPassword(userDetails.email, userDetails.password)
    .then((user) => {
        // alert("hi2")
        responseObject.success = true;
        responseObject.message = 'User has been create successfully';
        responseObject.body = {...user,  userDetails: userDetails};
        cb(responseObject)
        
    })
    .catch((error) => {
      // alert("hello")
      responseObject.message = error.message;
      cb(responseObject)
    });
}  

