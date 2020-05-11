import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image } from 'react-native'

import HomeTabScreen  from '../screen/afterLogin/home';
import EventList  from '../screen/afterLogin/event-list';
import ContactList from '../screen/afterLogin/contactList'
import Profile from '../screen/afterLogin/profile'
import AddEvent from '../screen/afterLogin/addEvent';


const Tabs = (props) => {
    const Tab = createBottomTabNavigator();
    const tabBarDefaultOptions = {
        activeTintColor: '#fff',
        activeBackgroundColor: '#0c1b29',
        showLabel: false,
        style: {
            backgroundColor: '#183650',
          }
      }
    return (
        <Tab.Navigator initialRouteName="Feed" tabBarOptions={tabBarDefaultOptions}>
                <Tab.Screen 
                    name="Home" 
                    component={HomeTabScreen} 
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <Image style={{ width: 30, height: 30, tintColor:color }}  
                                source={require('../../assets/flake-icon.png')}/>
                        )
                    }}
                />
                <Tab.Screen 
                    name="Events" 
                    component={EventList} 
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <Image style={{ width: 30, height: 30, tintColor:color }}  
                                source={require('../../assets/event-icon.png')}/>
                        )
                    }}
                />
                <Tab.Screen 
                    name="Contacts" 
                    component={ContactList} 
                    options={{
                        tabBarIcon: ({ color, size }) => (
                        <Image style={{ width: 30, height: 30, tintColor:color }}  
                            source={require('../../assets/add-icon.png')}/>
                        )
                    }}
                />
                <Tab.Screen 
                    name="Profile" 
                    component={Profile} 
                    options={{
                        tabBarIcon: ({ color, size }) => (
                        <Image style={{ width: 30, height: 30, tintColor:color }}  
                            source={require('../../assets/profile-icon.png')}/>
                        )
                    }}
                />
        </Tab.Navigator>
      )

}
export default Tabs
