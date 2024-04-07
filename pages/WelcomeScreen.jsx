import React from "react";
import Screen from "../components/Screen";
import { StyleSheet, Image, Button, View, Dimensions, Text } from "react-native";
import CustomButton from "../components/CustomButton";
import { useFonts } from "expo-font";

import { Montserrat_400Regular } from "@expo-google-fonts/montserrat"
import { Poppins_400Regular } from "@expo-google-fonts/poppins"

const imgWidth = Dimensions.get('screen').width;

const WelcomeScreen = ({ navigation }) => {

    const [fontsLoaded] = useFonts({
        Montserrat_400Regular,
        Poppins_400Regular
    });
    if (!fontsLoaded) {
        return <Text>Loading...</Text>;
    }

    return (
        <Screen>
        <Image
            source={require("./../assets/img/Done.png")} // or use require('path/to/image.jpg')
            style={styles.image}
        />

        <Text style={{
            fontFamily: "Poppins_400Regular",
        }}>Welcome to</Text>
        <Text style={{
            fontFamily: "Poppins_400Regular",
            fontSize: 24,
        }}>OUR REMINDER</Text>

        
        <Text style={{
            fontFamily: "Poppins_400Regular",
            fontSize: 12,
        }}>
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
        </Text>
        
        
        <View style={{
            top: 10,
            marginTop: 20
        }}>
            <CustomButton 
                title={"Get Start"} 
                // iconName={"arrow-right-alt"} 
                onPress={() => navigation.navigate("RegistrationScreen")} 
                style={{
                    width: 200,
                    borderRadius: 20,
                    justifyContent: "center",
                    textAlign: "center",
                    alignItems: "center",
                    fontFamily: "Poppins_400Regular"
                }}
            />

        </View>
    
        </Screen>
        
    )

}

const styles = StyleSheet.create({
    image: {
        width: imgWidth,
        height: 200,
        resizeMode: 'contain', // Adjust the image to fit within the specified dimensions while maintaining aspect ratio
    },
})

export default WelcomeScreen;