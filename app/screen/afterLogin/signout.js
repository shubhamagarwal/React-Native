import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity  } from 'react-native';
import deviceStorage  from '../../services/deviceStorage';

export default class SignOut extends Component {

    constructor(props) {
        super(props);
        }
    
    signOut = () => {
           
           deviceStorage._removeData('userInfo',this.didRemoveData);
          
        }  

      didRemoveData = (response) => {
            if (response.success === true) {
                this.props.navigation.navigate('Main')
            } else {
                console.log(`${response.errorMessage}`);
            }
        }

    render () {
        return (
                       <TouchableOpacity onPress={this.signOut} style={{ marginTop : 25 , borderRadius : 20 , backgroundColor : '#183650' , padding : 10 }}>
                             <Text style={{ fontSize : 20 , fontWeight : 'bold', color : '#FFF' }}> Logout </Text>
                        </TouchableOpacity>
          )
    }
}
