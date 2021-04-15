
import React from 'react';
import { StyleSheet, Text, View, Button, Vibration, Platform } from 'react-native';

const home = ({ navigation }) => {
    
    return (
<View style={styles.container}>
<View style={styles.message}>
    
<Text>Hello</Text>
<Text>Token: </Text>
  <Button
            onPress={() => navigation.navigate('second')}
            title="Go to Second Page"
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
export default home;