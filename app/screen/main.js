import React, { Component } from 'react';
import { Button, View, Text, StyleSheet, Dimensions , TextInput ,Image  , TouchableOpacity } from 'react-native';

import Animated, { Easing } from 'react-native-reanimated';
import { TapGestureHandler, State } from 'react-native-gesture-handler';

const { width, height } = Dimensions.get('window');

export default class Main extends Component {

    render() {
        return( 
            
            <View style={{
                flex: 1,
                backgroundColor: 'white',
                justifyContent: 'flex-end'
              }}>

             <View style={{height:height/1.1 , justifyContent:'center'}}>
              
                 <Animated.View style={{  height:height/2,marginVertical:5, justifyContent:'center',alignItems: 'center',position:'relative'}}>
                     <Image resizeMode={'contain'} style={{ width:240,height:220, justifyContent:'center',alignItems: 'center'}} source={require('../../assets/Flake-Logo.png')} />
                 </Animated.View>

                 <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')}>
                  <Animated.View style={{...styles.button,backgroundColor:'#05213F'}}>
                    <Text style={styles.buttonText}  > LOG IN </Text>
                  </Animated.View>
                </TouchableOpacity>


                <TouchableOpacity onPress={() => this.props.navigation.navigate('Register')}>
                  <Animated.View style={{...styles.button,backgroundColor:'#656667'}}>
                    <Text style={styles.buttonText} > CREATE AN ACCOUNT </Text>
                  </Animated.View>
                </TouchableOpacity>
              
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Forgot')}>
                  <Animated.View style={styles.forgotText}>
                     
                     <Text style={{
                     textAlign:'center',
                     fontSize:20,
                     color: '#05213F',
                     fontWeight:'normal',
                     textDecorationLine:'underline',
                     letterSpacing:2
                     }}>Forgot Password</Text>
                 
                  </Animated.View>
                </TouchableOpacity>
                  
            </View>


            </View>

           
        );
    }
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center'
    },
    button: {
      height: 60,
      marginHorizontal: 50,
      borderRadius: 35,
      alignItems: 'center',
      justifyContent: 'center',
      marginVertical: 8,
      shadowOffset : {width:2,height:2},
      shadowColor:'black',
      shadowOpacity:0.2 
    },
    buttonText: {
       fontSize:20,
       fontWeight:'bold',
       color:'#fff'
    },
    forgotText: {
      alignItems: 'center',
      justifyContent: 'center',
      marginVertical:20
    }
    
  });