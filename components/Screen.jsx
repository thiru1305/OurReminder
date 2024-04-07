import React from 'react';
import { View, StyleSheet, Platform, Dimensions } from 'react-native';
import { Colors } from '../colors/Colors';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

if(Platform.OS === "android") {

}
else if(Platform.OS === "ios") {

}

const Screen = ({
  children,
  width = screenWidth,
  height = screenHeight,
  backgroundColor = 'white',
  padding = 20,
}) => {
  return (
    <View style={[styles.container, { width, height, backgroundColor }]}>
      <View style={[styles.contentContainer, { padding }]}>
        {children}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.screenBg,
  },
  contentContainer: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.screenBg,
  },
});

export default Screen;
