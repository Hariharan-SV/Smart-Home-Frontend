import React, {useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Text, Switch, Button, Block} from 'galio-framework';
import {View, StyleSheet} from 'react-native';

const HTTP_PROXY_BASE_URL = 'http://54.83.145.237:3000';


const LightStatus = ({navigation}) => {
  const [status, setStatus] = useState(false);
  const [message, setMessage] = useState('');

  const getIcon = () => {
    if (status === false) {
      return {name: 'lightbulb-off', color: '#CCC'};
    }
    return {name: 'lightbulb-on', color: '#FFB347'};
  };

  const handleLightToggle = () => {
    const payload = {
      type: 'USER_COMMAND',
      light: !status ? 1 : 0,
    };
    fetch(`${HTTP_PROXY_BASE_URL}/light-status`, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    })
      .then(function (response) {
        response.status;
        response.statusText;
        response.headers;
        response.url;
        if (response.status === 404) {
          setMessage('Device is currently offline');
          return;
        }
        if (response.ok) {
          setStatus(!status);
        }
        console.log(response);
      })
      .catch(function (error) {
        console.log(error.message);
      });
  };

  
  return (
    <View style={styles.container}>
      <Block middle={true} column space="between">
        <Text
          h2
          style={{color: '#FFF', alignItems: 'flex-start', fontWeight: 'bold'}}>
          {'Smart Home\n'}
        </Text>
        <Icon name={getIcon().name} color={getIcon().color} size={100} />
      </Block>
      <Block style={{alignItems: 'center'}}>
        <Text h5 style={{color: '#fafafa', alignItems: 'flex-start'}}>
          Toggle Device status
        </Text>
        <Text h5 style={{color: '#fafafa', alignItems: 'flex-start'}}>
          {message}
        </Text>
        <Switch
          value={status}
          onChange={handleLightToggle}
          trackColor={{true: 'orange', false: 'grey'}}
          thumbColor="#FFF"
        />
      </Block>
      <Block>
        <Button
          color="#FFB347"
          shadowless
          size="large"
          onPress={() => navigation.navigate('Location')}>
          <Block row space="between">
            <Icon name="location-enter" size={20} />
            <Text> SET HOME LOCATION</Text>
          </Block>
        </Button>
      </Block>
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
    backgroundColor: '#000',
  },
});

export default LightStatus;
