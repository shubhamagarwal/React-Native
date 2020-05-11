import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Toast, { DURATION } from 'react-native-easy-toast';


import BottomTab from './afterLogin/tab';

export default class dashboard extends Component {

    constructor(props) {
        super(props); 
    }

    render() {
        return (
             <NavigationContainer independent={true}>
                <BottomTab />
             </NavigationContainer>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});