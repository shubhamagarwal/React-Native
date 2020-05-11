import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity , Dimensions , Image } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Animated, { Easing } from 'react-native-reanimated';

import SignOut from './signout';

const { width, height } = Dimensions.get('window');

export default class SettingTabScreen extends Component {

    constructor(props) {
        super(props);
        }

    render () {
        return (
            <KeyboardAwareScrollView>
                <View>
                    <View style={{
                        backgroundColor: '#EBECED',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: 40,
                    }}>
    
                        <Text style={{ color: '#183650', fontSize: 20, fontWeight: '600' }}>Settings</Text>
                    </View>
    
                    <View style={{ height: height / 1.2, justifyContent: 'center' }}>
    
                        <Animated.View style={{ height: height / 3, marginVertical: 5, justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
                            <Image resizeMode={'contain'} style={{ width: 240, height: 190, justifyContent: 'center', alignItems: 'center' }} source={require('../../../assets/Flake-Logo.png')} />
                            
                            <SignOut navigation={this.props.navigation} />
    
                        </Animated.View>
    
                    </View>
                    
                </View>
    
            </KeyboardAwareScrollView>
        );
    }
}
