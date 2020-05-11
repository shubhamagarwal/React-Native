import React, { Component } from 'react';
import { Text, View, StyleSheet , AsyncStorage } from 'react-native';

export default class Loading extends Component { 

    async componentDidMount() {

      const data = await AsyncStorage.getItem('userInfo');
      // console.log(data);
      if (data) {
        this.props.navigation.navigate('dashboard');
      } else {
        this.props.navigation.navigate('Main');
      }
     
    }

    render() {
        return (
          <View style={styles.viewStyles}>
            <Text style={styles.textStyles}>
              Flake Loading ........
            </Text>
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
    viewStyles: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#183650'
      },
      textStyles: {
        color: 'white',
        fontSize: 40,
        fontWeight: 'bold'
      }
  });
