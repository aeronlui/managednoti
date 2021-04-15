
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, Text, Alert, View, Button, Vibration, Platform } from 'react-native';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';
import * as Linking from 'expo-linking';
import home from './home';
import second from './second';

  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
  });

  const Stack = createStackNavigator();


export default class App extends React.Component {
  state = {
    expoPushToken:'',
    notification: {},
  };

  

    
registerForPushNotificationsAsync = async () => {
  if (Constants.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    const token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
    this.setState({ expoPushToken: token });
  } else {
    alert('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }
  };
  
    
    componentDidMount() {

      this.registerForPushNotificationsAsync();
  
      Notifications.addNotificationReceivedListener(this._handleNotification);
      
      Notifications.addNotificationResponseReceivedListener(this._handleNotificationResponse);

    }

    
  
    _handleNotification = notification => {
      this.setState({ notification: notification });
     // Linking.makeUrl("myapp:///second/");
     // Alert.alert('myapp://second/');

     ({ navigation }) => {
    
      return (
   navigation.navigate('second')
   
      );
  }

    };
  
    _handleNotificationResponse = response => {
      console.log(response);
     // Linking.makeUrl("myapp:///second/");
     //Alert.alert('myapp://second/');
   // Linking.openURL('myapp://./second/')

   ({ navigation }) => {
    
    return (
 navigation.navigate('second')
 
    );
}

    };
  

  render() {
    return (
    

      <NavigationContainer >
      <Stack.Navigator initialRouteName="home">
        <Stack.Screen
          name="home"
          component={home}
          options={{
            title: 'home Page', //Set Header Title
            headerStyle: {
              backgroundColor: '#f4511e', //Set Header color
            },
            headerTintColor: '#fff', //Set Header text color
            headerTitleStyle: {
              fontWeight: 'bold', //Set Header text style
            },
          }}
        />

        <Stack.Screen
          name="second"
          component={second}
          options={{
            title: 'Second Page', //Set Header Title
            headerStyle: {
              backgroundColor: '#f4511e', //Set Header color
            },
            headerTintColor: '#fff', //Set Header text color
            headerTitleStyle: {
              fontWeight: 'bold', //Set Header text style
            },
          }}
        />
         </Stack.Navigator>
    </NavigationContainer>
    );
  }



}



