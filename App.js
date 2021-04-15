import React from 'react';
import { StyleSheet, Text,TextInput , View, Button, Vibration, Platform } from 'react-native';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import * as Linking from 'expo-linking';

  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
  });

export default class App extends React.Component {
  state = {
    expoPushToken: '',
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
    
    };
  
    _handleNotificationResponse = response => {
      console.log(response);
   
    };
  

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.message}>
        <TextInput >Token: {this.state.expoPushToken}</TextInput >

        </View>

      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  message: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
