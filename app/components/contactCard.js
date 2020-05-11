import React from 'react'
import { Text, View, StyleSheet, TouchableOpacity  , Image ,  Dimensions} from 'react-native';

const ContactCard = ({user}) => {
    const { name, email, image, type } = user
    return (
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image  style={styles.profileImage} resizeMode={'contain'} source={{ uri:'https://s3.amazonaws.com/uifaces/faces/twitter/hebertialmeida/128.jpg'}} />
        </View>
        <View style={styles.detailsContainer}>
        <Text style={styles.titleText}>{name}</Text>
              <Text style={styles.email}>{email}</Text>
        </View>

      </View>
    )
}

export default ContactCard


const styles = StyleSheet.create({
    container: {
      display: 'flex',
      flex: 1,
      flexDirection: 'row',
      backgroundColor: '#fff',
      marginTop: 5,
    },
    imageContainer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      flex: 0.3,
      backgroundColor: '#ECECEC',
      marginRight: 5,
      padding: 15,
    },
    detailsContainer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      flex: 0.7,
      padding: 20,
      flexDirection: 'column',
      justifyContent: 'center',
      backgroundColor: '#ECECEC',
    },
    titleText: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#000'
    },
    profileImage: {
      width: 70, 
      height: 70, 
      borderRadius: 50, 
      justifyContent: 'center', 
      alignItems: 'center'
    },
  });