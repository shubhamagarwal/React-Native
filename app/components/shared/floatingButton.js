import React from 'react'
import { StyleSheet, TouchableOpacity, Image } from 'react-native';

const FloatingButton = (props) => {
    const { onClick, icon } = props

    return (
        <TouchableOpacity
                activeOpacity={0.8}
                onPress={onClick}
                style={styles.container}>
                <Image
                    source={icon}
                    style={styles.floatingButton}
                />
       </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        right: 30,
        bottom: 30,
      },
    floatingButton: {
        resizeMode: 'contain',
        width: 50,
        height: 50,
        backgroundColor:'#183650',
        borderRadius: 50,
      },
});

export default FloatingButton