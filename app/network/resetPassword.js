import React, { Component } from 'react';
import { db, auth } from '../auth/Firebase';

export class resetPassword extends Component {

    constructor(props) {
        super(props);
    }


    forgotPassword = async (email) => {

        if (email === '') {
            const value = 0;
            return value;
        } else {
            let value = "";
            return value = auth
                .sendPasswordResetEmail(email)
                .then(() => {
                    console.log("Please check your email to reset your password")
                    return 1;
                })
                .catch((error) => {
                    console.log(error.message);
                    return error.message;
                })
        }

    }
}
