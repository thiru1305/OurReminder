import React from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, Dimensions, Alert, TouchableOpacity } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import { Colors } from '../colors/Colors';
import { useFonts } from "expo-font";

import { Montserrat_400Regular } from "@expo-google-fonts/montserrat"
import { Poppins_400Regular } from "@expo-google-fonts/poppins"
import CustomButton from '../components/CustomButton';
import Screen from '../components/Screen';
import authService from '../authService';

const validationSchema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

const imgWidth = Dimensions.get('screen').width;

const LoginScreen = ({ navigation }) => {
    const [fontsLoaded] = useFonts({
        Montserrat_400Regular,
        Poppins_400Regular
    });
    if (!fontsLoaded) {
        return <Text>Loading...</Text>;
    }

    const handleLogin = async (values) => {
        const { email, password } = values;
        try {
          await authService.login(email, password);
          Alert.alert('Success', 'Login successful!');

          navigation.navigate("TaskManagementScreen");
     
        } catch (error) {
          Alert.alert('Error', error.message);
        }
      };

  return (
    <Screen>
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          // Handle form submission here
          handleLogin(values);
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <>
            <Image
                source={require("./../assets/img/Done.png")} // or use require('path/to/image.jpg')
                style={styles.image}
            />

            <Text style={{
                fontFamily: "Poppins_400Regular",
                fontSize: 14,
            }}>Welcome Back</Text>
              <Text style={{
                fontFamily: "Poppins_400Regular",
                fontSize: 14,
            }}>to</Text>

            <Text style={{
                fontFamily: "Poppins_400Regular",
                fontSize: 24,
                // marginTop: 10,
                marginBottom: 50,
            }}>OUR REMINDER</Text>
            

            <TextInput
              style={styles.input}
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
              placeholder="Enter your email"
              keyboardType="email-address"
            />
            {touched.email && errors.email && <Text style={styles.error}>{errors.email}</Text>}

            <TextInput
              style={styles.input}
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
              placeholder="Enter your password"
              secureTextEntry
            />
            {touched.password && errors.password && <Text style={styles.error}>{errors.password}</Text>}


            <View style={{
                marginTop: 20,
                width: "100%"
            }}>
            <CustomButton title="Sign In" onPress={handleSubmit}
              style={{
                width: 315,
                borderRadius: 20,
                justifyContent: "center",
                textAlign: "center",
                alignItems: "center"
              }}
            />

            </View>

            <View style={{
                flexDirection: "row",
                marginTop: 20
            }}
            >
                <Text style={{
                    fontFamily: "Poppins_400Regular"
                }}>Don't have an account? </Text> 

                <TouchableOpacity onPress={() => navigation.navigate("RegistrationScreen")}>

                  <Text style={{
                      fontFamily: "Poppins_400Regular",
                      // fontWeight: "bold",
                      color: Colors.buttonBg,
                  }}>Sign Up</Text>

                </TouchableOpacity>

            </View>

          </>
        )}
      </Formik>
    </Screen>
  );
};



const styles = StyleSheet.create({
  image: {
    width: imgWidth,
    height: 200,
    resizeMode: 'contain',
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 20,
    backgroundColor: Colors.white,
    borderRadius: 10,
    fontFamily: "Poppins_400Regular",
    fontSize: 12
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
});

export default LoginScreen;
