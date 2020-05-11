import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions , TextInput ,Image , TouchableOpacity , AsyncStorage  } from 'react-native';
import Animated, { Easing } from 'react-native-reanimated';
import Toast, {DURATION} from 'react-native-easy-toast';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { login } from '../network/authentication/loginandregister';

import deviceStorage  from '../services/deviceStorage';
import Loader from '../components/shared/loader';

const { width, height } = Dimensions.get('window');

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email:'',
            password:'',
            errorMessage: '',
            loading: false,
            };
    }

    loginCheck = (response)  => {

      if (response.success === false) {
        this.setState({loading:false});
        this.refs.toast.show(`${response.message}`, DURATION.LENGTH_LONG)
      } else {
        const userInfo = { uid:response.body.user.uid , userToken: response.body.user.uid , userEmail : response.body.userDetails.email  };
        deviceStorage._storeData('userInfo', JSON.stringify(userInfo) ,this.didSaveData);
      }
    }

    didSaveData = (response) => {
      if (response.success === true) {
        this.setState({loading:false});
        this.props.navigation.navigate('dashboard');
      } else {
        this.setState({loading:false});
        this.refs.toast.show(`${response.errorMessage}`, DURATION.LENGTH_LONG)
      }
    }

    handleSubmit = () => {

        const { email, password } = this.state

        if (email === '') {
            console.log("email");
            this.refs.toast.show('Email is required.', DURATION.LENGTH_LONG)
          } else if (password === '') {
            this.refs.toast.show('Password is required.', DURATION.LENGTH_LONG)
          } else {
            this.setState({loading:true});
            login(this.state,this.loginCheck);
          }
      };

    //   _handleDrawer = () => {
    //     this.state.isOpen ? this.props.navigation.ngoBack() : this.props.navigation.goBack();
    //     this.setState({isOpen: !this.state.isOpen});
    // }
   
 render(){
     const { loading } = this.state;
     return (
        <KeyboardAwareScrollView >
          <Loader
              loading={loading} />
         <View style={styles.container}> 


              {/* <View style={{
                    backgroundColor: '#EBECED',
                    justifyContent: 'center',
                    alignItems:'center',
                    height:40,
                }}>

                <Text style={{color:'#183650',fontSize:20,fontWeight:'600'}}>Login</Text>
              </View> */}
             <View style={{height:height/1.2 , justifyContent:'center'}}>
                     
                 <Animated.View style={{  height:height/3,marginVertical:5, justifyContent:'center',alignItems: 'center',position:'relative'}}>
                 {/* <TouchableOpacity
                         onPress={this._handleDrawer} >
                         <Image resizeMode={'contain'} style={{  width:50,height:50, justifyContent:'center',alignItems: 'center'}} source={require('../../assets/back.png')} />
                     </TouchableOpacity> */}
                     
                     <Image resizeMode={'contain'} style={{ width:240,height:190, justifyContent:'center',alignItems: 'center'}} source={require('../../assets/icon.png')} />
                 </Animated.View>


                 <Animated.View >
                    <TextInput
                       onChangeText={email => this.setState({ email })}
                       value={this.state.email}
                       fontSize={15}
                       placeholderTextColor={'#C0BFBE'}
                       fontWeight={'300'}
                       style={styles.TextInput}   
                       placeholder="Email"
                       />
                       
                </Animated.View>

                <Animated.View >
                    <TextInput 
                        secureTextEntry={true}
                        onChangeText={password => this.setState({ password })}
                        value={this.state.password}
                        fontSize={15}
                        placeholderTextColor={'#C0BFBE'}
                        fontWeight={'300'}
                        style={styles.TextInput}   placeholder="Password"/>
                </Animated.View>

                <TouchableOpacity onPress={this.handleSubmit} >
                  <Animated.View style={{...styles.button,backgroundColor:'#05213F'}}>
                      <Text style={styles.buttonText}  > Log In </Text>
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

                


                <Animated.View style={styles.forgotText}>
                     {/* <TouchableOpacity onPress={() => this.props.navigation.navigate('Forgot')}>
                        <Text style={{
                        textAlign:'center',
                        fontSize:20,
                        color: '#05213F',
                        fontWeight:'normal',
                        textDecorationLine:'underline',
                        letterSpacing:2
                        }} >Forgot Password</Text>
                     </TouchableOpacity> */}

                     <TouchableOpacity onPress={() => this.props.navigation.navigate('Forgot')} >
                  <Animated.View style={{...styles.button,backgroundColor:'#666666'}}>
                      <Text style={styles.buttonText}  > Forgot Password? </Text>
                  </Animated.View>
                </TouchableOpacity>
                  </Animated.View>

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
    buttonText: {
       fontSize:18,
    //    fontWeight:'bold',
       color:'#fff'
    },
    forgotText: {
      alignItems: 'center',
      justifyContent: 'center',
    }
    
  });