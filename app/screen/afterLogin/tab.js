import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeTabScreen  from './home';
import SettingTabScreen  from './settings';

const Tab = createBottomTabNavigator();

export default class BottomTab extends Component {

    render () {
        return (
            <Tab.Navigator>
                    <Tab.Screen name="Home" component={HomeTabScreen} />
                    <Tab.Screen name="Settings" component={SettingTabScreen} />
            </Tab.Navigator>
          )
    }
}
