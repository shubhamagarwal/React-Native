import firebase from '../../auth/Firebase';

let responseObject = {
    success : false,
    message : '',
    body : []
}


export const forgot = (email,cb) => {
    firebase.auth()
    .sendPasswordResetEmail(email)
    .then((user) => {
        responseObject.success = true;
        responseObject.message = 'Please Check inbox we sent you the reset password link . !';
        cb(responseObject);
    })
    .catch((error) => {
        responseObject.message = error.message;
        cb(responseObject);
    });
};