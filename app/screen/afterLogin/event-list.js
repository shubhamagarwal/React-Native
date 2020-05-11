import React from 'react'
import { View, Text, StyleSheet  } from 'react-native';

const EventList = () => {

    return (
    <View style={styles.container}>
        <Text style={styles.titleText}> Events </Text>
    </View>    
        
    )
}

export default EventList

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center'
    },
    titleText: {
       fontSize:20,
       fontWeight:'bold',
       color:'#183650'
    } 
  });