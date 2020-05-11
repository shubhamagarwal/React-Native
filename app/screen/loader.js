import React, { Component } from 'react';
import { StyleSheet,Dimensions } from 'react-native';
import AnimatedLoader from "react-native-animated-loader";
const { width, height } = Dimensions.get('window');
import LottieView from 'lottie-react-native';

export default function Loader(props) {
    return (
          <AnimatedLoader
          visible={props.visible}
          overlayColor="rgba(5,33,63,0.4)"
          source={require("../../assets/loader-animation.json")}
          animationStyle={styles.lottie}
          speed={1}
        />
    );
}

const styles = StyleSheet.create({
    lottie: {
    // flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width:400,
    height:400
    }
  });