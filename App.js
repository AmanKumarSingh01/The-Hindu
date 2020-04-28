import * as React from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Provider, connect } from 'react-redux';
import store from './Redux_Store/store';
import { NavigationContainer } from '@react-navigation/native';
import National from './Screens/National';
import International from './Screens/International';
import Editorial from './Screens/Editorial';

const Tab = createMaterialBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName="National"
      activeColor="#e91e63"
      style={{ backgroundColor: 'tomato' }}
    >
      <Tab.Screen
        name="National"
        component={National}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="International"
        component={International}
        options={{
          tabBarLabel: 'International',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="bell" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Editorial"
        component={Editorial}
        options={{
          tabBarLabel: 'Editorial',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}





class App extends React.Component{
  render(){
    return (
      <Provider store = {store}>
        <NavigationContainer>
          <MyTabs/>
        </NavigationContainer>
      </Provider>
    );
  }
}


export default App;
