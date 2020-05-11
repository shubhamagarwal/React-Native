import React, { Component } from 'react';
import {
  CheckBox,
  View,
  Text,
  StyleSheet,
  Dimensions,
  TextInput,
  Image,
  TouchableOpacity
} from 'react-native';
import Animated, { Easing } from 'react-native-reanimated';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Toast, { DURATION } from 'react-native-easy-toast';

import { createAccount , createProfile } from '../network/authentication/loginandregister';
import deviceStorage  from '../services/deviceStorage';
import Loader from './loader';
const { width, height } = Dimensions.get('window');


export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = { firstName: '', lastName: '', email: '', password: '', confirmpassword: '', errorMessage: '',visible: false };
  }


  didCreateAccount = (response) => {

    if (response.success === false) {
      this.setState({visible:false});
      this.refs.toast.show(`${response.message}`, DURATION.LENGTH_LONG);
    } else {

      // this.props.navigation.navigate('dashboard');
      this.setState({visible:false});
      createProfile(response.body,this.didCreateProfile);
      this.props.navigation.navigate('dashboard');
      // const userInfo = { uid:response.body.user.uid , userToken: response.body.user.uid , userEmail : response.body.userDetails.email  };
      // deviceStorage._storeData('userInfo', JSON.stringify(userInfo) ,this.didSaveData);
    }
  }


  didSaveData = (response) => {
    if (response.success === true) {
      this.setState({visible:false});
      // this.props.navigation.navigate('dashboard');
    } else {
      this.setState({visible:false});
      this.refs.toast.show(`${response.errorMessage}`, DURATION.LENGTH_LONG)
    }
  }

  didCreateProfile = (response)  => {
     // console.log(response);
    if (response.success === false) {
      this.setState({visible:false});
      this.refs.toast.show(response.message, DURATION.LENGTH_LONG)
      
    } else {
      this.setState({visible:false});
      const userInfo = { uid:response.body.user.uid , userToken: response.body.user.uid , userEmail : response.body.userDetails.email  };
      deviceStorage._storeData('userInfo', JSON.stringify(userInfo) ,this.didSaveData);
      // this.props.navigation.navigate('dashboard');
   }
  }

  

  handleSubmit = () => {

    const { firstName, lastName, email, password, confirmpassword } = this.state;
    if (firstName === '') 
    {
      this.refs.toast.show('First Name Is Required field .', DURATION.LENGTH_LONG)
    } else if (lastName === '') {
      this.refs.toast.show('Last Name Is Required field! ', DURATION.LENGTH_LONG)
    } else if (email === '') {
      this.refs.toast.show('Email Is Required field! ', DURATION.LENGTH_LONG)
    } else if (password === '') {
      this.refs.toast.show('Password Is Required field! ', DURATION.LENGTH_LONG)
    } else if (password !== confirmpassword) {
      this.refs.toast.show('Passwords don’t match', DURATION.LENGTH_LONG)
    } else {
      this.setState({visible:true});
      createAccount(this.state,this.didCreateAccount);
    }
  };

  didTapTermsAndCondition = () => {
    this.props.navigation.navigate('termAndConditions');
  }

  didTapPrivacyPolicy = () => {
    this.props.navigation.navigate('privacyPolicies');
  }


  render() {
    const { visible } = this.state;
    return (
      <KeyboardAwareScrollView>
        {/* <Loader visible={visible} /> */}
        <View style={styles.container}>

          {/* <View style={{
            backgroundColor: '#EBECED',
            justifyContent: 'center',
            alignItems: 'center',
            height: 40
          }}>
            <Text style={{ color: '#183650', fontSize: 20, fontWeight: '600' }}>Create an Account</Text>
          </View> */}

          <View style={{ height: height / 1.2, justifyContent: 'center' }}>

            <Animated.View style={{ height: height / 10, justifyContent: 'center', alignItems: 'center' }}>
              <Image resizeMode={'contain'} style={{ width: 120, height: 120, justifyContent: 'center', alignItems: 'center' }} source={require('../../assets/icon.png')} />
            </Animated.View>

            <Animated.View style={{marginTop: 20}}>
              <TextInput
                onChangeText={firstName => this.setState({ firstName })}
                value={this.state.firstName}
                style={styles.TextInput}
                fontSize={15}
                placeholderTextColor={'#C0BFBE'}
                fontWeight={'300'}
                placeholder="FIRST NAME"
              />
            </Animated.View>

            <Animated.View >
              <TextInput
                onChangeText={lastName => this.setState({ lastName })}
                value={this.state.lastName}
                style={styles.TextInput}
                fontSize={15}
                placeholderTextColor={'#C0BFBE'}
                fontWeight={'300'}
                placeholder="LAST NAME"
              />
            </Animated.View>

            <Animated.View >
              <TextInput
                onChangeText={email => this.setState({ email })}
                value={this.state.email}
                style={styles.TextInput}
                fontSize={15}
                placeholderTextColor={'#C0BFBE'}
                fontWeight={'300'} placeholder="EMAIL" />
            </Animated.View>


            <Animated.View >
              <TextInput
                secureTextEntry={true}
                onChangeText={password => this.setState({ password })}
                value={this.state.password}
                style={styles.TextInput}
                fontSize={15}
                placeholderTextColor={'#C0BFBE'}
                fontWeight={'300'}
                placeholder="PASSWORD" />
            </Animated.View>

            <Animated.View >
              <TextInput
                onChangeText={confirmpassword => this.setState({ confirmpassword })}
                value={this.state.confirmpassword}
                secureTextEntry={true}
                style={styles.TextInput}
                fontSize={15}
                placeholderTextColor={'#C0BFBE'}
                fontWeight={'300'}
                placeholder="CONFIRM PASSWORD" />
            </Animated.View>

            <TouchableOpacity onPress={this.handleSubmit} >
              <Animated.View style={{ ...styles.button, backgroundColor: '#05213F' }}>
                  <Text style={styles.buttonText}  > CREATE ACCOUNT </Text>
              </Animated.View>
            </TouchableOpacity>


            <Toast
              ref="toast"
              style={{
                backgroundColor: '#05213F',
                borderRadius: 5,
                padding: 10,
              }}
              position='bottom'
              positionValue={200}
              fadeInDuration={200}
              fadeOutDuration={5000}
              opacity={0.8}
              textStyle={{
                color: 'white',
                fontSize: 18,
                fontWeight: 'normal'
              }}
            />

            <Animated.View style={styles.policyItems}>

              <TouchableOpacity onPress={this.didTapTermsAndCondition} >
                <Text style={{ ...styles.policyItemsContent, textDecorationLine: 'underline' }} >
                  Terms & Condition
                  </Text>
              </TouchableOpacity>

              <Text style={styles.policyItemsContent} >
                and
                </Text>

              <TouchableOpacity onPress={this.didTapPrivacyPolicy} >
                <Text style={{ ...styles.policyItemsContent, textDecorationLine: 'underline' }} >
                  Privacy Policy
                  </Text>
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
    backgroundColor: '#FFFFFF',
    height: height
  },
  // button: {
  //   height: 50,
  //   marginHorizontal: 20,
  //   borderRadius: 35,
  //   alignItems: 'center',
  //   justifyContent: 'center',
  //   marginVertical: 9,
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
  buttonText: {
    fontSize: 18,
    // fontWeight: 'bold',
    color: '#fff'
  },
  policyItems: {
    alignContent: 'center',
    alignItems: 'center',
    position: 'relative',
    justifyContent: 'center',
    marginHorizontal: 50,
    flexDirection: 'column',
    flexWrap: 'wrap',
    paddingTop: 20
  },
  policyItemsContent: {
    fontSize: 18,
    color: '#05213F',
    fontWeight: 'normal',
  },
});