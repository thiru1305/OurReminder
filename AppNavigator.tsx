import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import WelcomeScreen from './pages/WelcomeScreen';
import RegistrationScreen from './pages/RegistrationScreen';
import LoginScreen from './pages/LoginScreen';
import TaskManagementScreen from './pages/TaskManagementScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator>

      <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
      <Stack.Screen name="RegistrationScreen" component={RegistrationScreen} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="TaskManagementScreen" component={TaskManagementScreen} />
    
    </Stack.Navigator>
  );
};

export default AppNavigator;
