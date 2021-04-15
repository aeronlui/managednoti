
import React from 'react';
import { StyleSheet, Text, View, Button, Vibration, Platform } from 'react-native';


const second = ({ navigation }) => {
    return (
<View style={styles.container}>
<View style={styles.message}>
<Text>Win: </Text>
<Button
            onPress={() => navigation.navigate('home')}
            title="Go to Main Page"
          />

</View>

</View>
    );
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

export default second;