import React, { Component } from 'react';
import { View, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Loading from '../screen/loading';
import Main from '../screen/main';
import Login from '../screen/login';
import Register from '../screen/register';
import Forgot from '../screen/forgot';
import privacyPolicies from '../screen/privacyPolicies';
import termAndConditions from '../screen/termAndConditions';
import Tabs from './tabs';
import cameraPage from '../screen/afterLogin/cameraPage';
import AddEvent from '../screen/afterLogin/addEvent';
import AddEventContactList from '../screen/afterLogin/addEventContactList'
const Stack = createStackNavigator();

class Navi extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    {
      return (
        <NavigationContainer>

          <Stack.Navigator initialRouteName='Loading' >

            <Stack.Screen name="Loading" component={Loading} options={{
              headerMode: 'none',
              headerShown: false
            }} />

            <Stack.Screen name="Main" component={Main} options={{
              headerMode: 'none',
              headerShown: false
            }} />

            <Stack.Screen name="Login" component={Login}
              options={{

                headerTitleStyle: {
                  justifyContent: 'center',
                  alignSelf: 'center',
                  alignItems: 'center',
                  textAlign: "center"
                },
                headerTitleAlign: 'center',
                headerTintColor: 'white',
                headerTitle: () => (
                  <View >
                    {/* <Image resizeMode={'cover'} style={{ width:180,height:60}} source={require('../../assets/header.png')} /> */}
                  </View>
                ),
                headerStyle: {
                  backgroundColor: '#183650'
                }
              }} />
            <Stack.Screen name="Register" component={Register} options={{
              headerTitleStyle: {
                justifyContent: 'center',
                alignSelf: 'center',
                alignItems: 'center',
                textAlign: "center"
              },
              headerTitleAlign: 'center',
              headerTintColor: 'white',
              headerTitle: () => (
                <View >
                  {/* <Image resizeMode={'cover'} style={{ width:180,height:60}} source={require('../../assets/header.png')} /> */}
                </View>
              ),
              headerStyle: {
                backgroundColor: '#183650'
              }
            }} />
            <Stack.Screen name="addEvent" component={AddEvent} options={{
              headerLeft: null,
              headerTitle: () => (
                <View >
                  <Image resizeMode={'cover'} style={{ width: 180, height: 60 }} source={require('../../assets/header.png')} />
                </View>
              ),
              headerStyle: {
                backgroundColor: '#183650'
              }
            }} />
            <Stack.Screen name="addEventContactList" component={AddEventContactList} options={{

              headerLeft: null,
              headerTitle: () => (
                <View >
                  <Image resizeMode={'cover'} style={{ width: 180, height: 60 }} source={require('../../assets/header.png')} />
                </View>
              ),
              headerStyle: {
                backgroundColor: '#183650'
              }
            }} />
            <Stack.Screen name="Forgot" component={Forgot} options={{
              headerTitleStyle: {
                justifyContent: 'center',
                alignSelf: 'center',
                alignItems: 'center',
                textAlign: "center"
              },
              headerTitleAlign: 'center',
              headerTintColor: 'white',
              headerTitle: () => (
                <View >
                  {/* <Image resizeMode={'cover'} style={{ width:180,height:60}} source={require('../../assets/header.png')} /> */}
                </View>
              ),
              headerStyle: {
                backgroundColor: '#183650'
              }
            }} />

            <Stack.Screen name="dashboard" component={Tabs} options={{
              headerTitleStyle: {
                justifyContent: 'center',
                alignSelf: 'center',
                alignItems: 'center',
                textAlign: "center",
                headerMode: 'none',
                headerShown: false
              },
              headerLeft: null,
              headerTitle: () => (
                <View >
                  <Image resizeMode={'cover'} style={{ width: 180, height: 60 }} source={require('../../assets/header.png')} />
                </View>
              ),
              headerStyle: {
                backgroundColor: '#183650'
              }
            }} />
            <Stack.Screen name="privacyPolicies" component={privacyPolicies} options={{
              headerTitleStyle: {
                justifyContent: 'center',
                alignSelf: 'center',
                alignItems: 'center',
                textAlign: "center",
                headerMode: 'none',
                headerShown: false
              },
              headerTitleAlign: 'center',
              headerTintColor: 'white',
              headerTitle: () => (
                <View >
                  <Image resizeMode={'cover'} style={{ width: 180, height: 60 }} source={require('../../assets/header.png')} />
                </View>
              ),
              headerStyle: {
                backgroundColor: '#183650'
              }
            }} />
            <Stack.Screen name="termAndConditions" component={termAndConditions} options={{
              headerTitleStyle: {
                justifyContent: 'center',
                alignSelf: 'center',
                alignItems: 'center',
                textAlign: "center",
                headerMode: 'none',
                headerShown: false
              },
              headerTitleAlign: 'center',
              headerTintColor: 'white',
              headerTitle: () => (
                <View >
                  <Image resizeMode={'cover'} style={{ width: 180, height: 60 }} source={require('../../assets/header.png')} />
                </View>
              ),
              headerStyle: {
                backgroundColor: '#183650'
              }
            }} />
            <Stack.Screen name="cameraPage" component={cameraPage} options={{
              headerTitleStyle: {
                justifyContent: 'center',
                alignSelf: 'center',
                alignItems: 'center',
                textAlign: "center"
              },
              headerTitleAlign: 'center',
              headerTintColor: 'white',
              headerTitle: () => (
                <View >
                  {/* <Image resizeMode={'cover'} style={{ width:180,height:60}} source={require('../../assets/header.png')} /> */}
                </View>
              ),
              headerStyle: {
                backgroundColor: '#183650'
              }
            }} />
          </Stack.Navigator>

        </NavigationContainer>
      );
    }
  }

}

export default Navi;