import * as firebase from 'firebase';

let responseObject = {
    success : false,
    message : '',
    body : []
}

export const getLoggedInUserId = (cb) => {
    firebase.auth().onAuthStateChanged(userDetails => {
        if(userDetails) {
            responseObject.success = true;
            responseObject.body = {'userId': userDetails.uid};
            cb(responseObject);
        } else {    
            cb(responseObject);
        }
    })
} 


export const getProfileDetails = async (userId, cb) => {
    await firebase.firestore().
        collection('users').doc(userId).get(
        ).then((details) => {
            responseObject.success = true;
            responseObject.body = details.data();
            cb(responseObject);
        }).catch((error) => {
            responseObject.success = false;
            responseObject.message = error.message;
            cb(responseObject);
    });
}

export const saveEditProfile = async (userDetails,cb) => {
    const {
        firstName,
        lastName,
        uid
    } = userDetails
   firebase.firestore().
    collection('users').doc(uid).update({
       firstName: firstName,
       lastName: lastName
     }).then(() => {
       responseObject.success = true;
       responseObject.message = 'User profile has been updated successfully';
       responseObject.body = userDetails;
       cb(responseObject);
     }).catch( (error) => {
       responseObject.success = false;
       responseObject.message = error.message;
       cb(responseObject);
     });
     
} 