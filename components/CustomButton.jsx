import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';
import { Colors } from '../colors/Colors';
import { useFonts } from "expo-font";

import { Montserrat_400Regular } from "@expo-google-fonts/montserrat"
import { Poppins_400Regular } from "@expo-google-fonts/poppins"


const CustomButton = ({ title, iconName, onPress, style }) => {

  const [fontsLoaded] = useFonts({
    Montserrat_400Regular,
    Poppins_400Regular
  });
  if (!fontsLoaded) {
    return <Text>Loading...</Text>;
  }
  return (
    <TouchableOpacity onPress={onPress} style={[styles.button, style]}>
      <Text style={[styles.buttonText, style]}>{title}</Text>
      {iconName && <Icon name={iconName} type="material" color={Colors.white}/>}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    backgroundColor: Colors.buttonBg, // Default background color
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white', // Default text color
    fontSize: 16,
    textAlign: "center"
  },
});

export default CustomButton;


