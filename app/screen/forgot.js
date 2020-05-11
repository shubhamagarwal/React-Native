import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions , TextInput ,Image , TouchableOpacity  } from 'react-native';
import Animated, { Easing } from 'react-native-reanimated';
import { forgot } from '../network/authentication/forgot';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Toast, { DURATION } from 'react-native-easy-toast';
const { width, height } = Dimensions.get('window');
import Loader from './loader';


export default class Forgot extends Component {
    constructor(props) {
        super(props);
        this.state = {email:'',visible: false};
    }

    forgotCb = (response)  => {

      if (response.success === false) {
        this.setState({visible:false});
        this.refs.toast.show(`${response.message}`, DURATION.LENGTH_LONG);
      } else {
        this.setState({visible:false});
        this.refs.toast.show(`${response.message}`, DURATION.LENGTH_LONG)
      }
    }

    handleSubmit = () => {

        const { email } = this.state;

        if (email === '') {
          this.refs.toast.show('Email is required.', DURATION.LENGTH_LONG)
        } else {
          this.setState({visible:true});
          forgot(email,this.forgotCb);
        }

      };

      
    render(){
        const { visible } = this.state;
        return (
            <KeyboardAwareScrollView>
            <Loader visible={visible} />
            <View style={styles.container}>
              {/* <View style={{
                    backgroundColor: '#EBECED',
                    justifyContent: 'center',
                    alignItems:'center',
                    height:40
                }}>
                <Text style={{color:'#183650',fontSize:20,fontWeight:'600'}}>Forgot Password</Text>
              </View> */}


              <View style={{height:height/1.3  , justifyContent:'center'}}>

                <Animated.View style={{ height:height/2, justifyContent:'center',alignItems: 'center',position:'relative'}}>
                    <Image resizeMode={'contain'} style={{ width:240,height:220, justifyContent:'center',alignItems: 'center'}} source={require('../../assets/flake.png')} />
                </Animated.View>

                <Animated.View >
                    <TextInput
                        onChangeText={email => this.setState({ email })}
                        value={this.state.email}
                        fontSize={15}
                        placeholderTextColor={'#C0BFBE'}
                        fontWeight={'300'}
                        style={styles.TextInput}   placeholder="EMAIL"/>
                </Animated.View>
                
                <TouchableOpacity onPress={this.handleSubmit} >
                    <Animated.View style={{...styles.button,backgroundColor:'#05213F'}}>
                        <Text style={styles.buttonText}  > RESET </Text>
                    </Animated.View>
                </TouchableOpacity>

                <Toast
                    ref="toast"
                    style={{
                        backgroundColor:'#05213F',
                        borderRadius: 5,
                        padding: 10,
                    }}
                    position='bottom'
                    positionValue={200}
                    fadeInDuration={200}
                    fadeOutDuration={5000}
                    opacity={0.8}
                    textStyle={{
                        color:'white',
                        fontSize:18,
                        fontWeight:'normal'
                    }}
                />
                

                </View>
         </View>
         </KeyboardAwareScrollView>
        );
    }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF'
  },
  // button: {
  //   height: 60,
  //   marginHorizontal: 20,
  //   borderRadius: 35,
  //   alignItems: 'center',
  //   justifyContent: 'center',
  //   marginVertical: 10,
  //   shadowOffset: { width: 2, height: 2 },
  //   shadowColor: 'black',
  //   shadowOpacity: 0.2
  // },
  button: {
    height: 60,
    width: 300,
    marginHorizontal: 55,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical:10,
    shadowOffset : {width:2,height:2},
    shadowColor:'black',
    shadowOpacity:0.2 
  },
  TextInput:{
      backgroundColor: '#FEFFFF',
      // borderColor:'#C4C5C6',
      // shadowOffset : {width:2,height:2},
      // shadowColor:'#C4C5C6',
      // shadowOpacity:1,
      // height:60,
      marginHorizontal: 55,
      // borderRadius:35,
      marginVertical: 10,
      paddingLeft:10,

      borderRadius: 5,
      height: 60,
      // width: 256,
      // margin: auto,
      marginVertical: 10,
      // box-shadow: none,
      borderColor: '#666666',
      borderWidth: 1
  },
  // TextInput: {
  //   backgroundColor: '#FEFFFF',
  //   borderColor: '#C4C5C6',
  //   shadowOffset: { width: 2, height: 2 },
  //   shadowColor: '#C4C5C6',
  //   shadowOpacity: 1,
  //   height: 50,
  //   marginHorizontal: 20,
  //   borderRadius: 35,
  //   marginVertical: 10,
  //   paddingLeft: 25
  // },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff'
  },
  forgotText: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20
  }

});