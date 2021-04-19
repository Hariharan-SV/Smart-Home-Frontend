import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Text,Switch } from 'galio-framework'
import { View, StyleSheet } from 'react-native';

const App = () => {
  const [status, setStatus] = useState(false);

  const getIcon = () => {
    if(status == false)
        return "lightbulb-off"
    return "lightbulb-on"
  };

  return (
    <View style={styles.container}>
        <Text h1 style={{"color":"#fff","alignItems":"flex-start"}}>Smart Home</Text>
        <Icon name={getIcon()} color={'#FFF'} size={50} />
        <View style={{"alignItems":"center"}}>
            <Text h5 style={{"color":"#fafafa","alignItems":"flex-start"}}>Toggle Device status</Text>
            <Switch
                value={status}
                onChange={() => setStatus(!status)}
                trackColor={{true: 'orange', false: 'grey'}}
                thumbColor="#FFF"
            />
        </View>
    </View>
  );
};

// React Native Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: '#000'
  }
});

export default App;