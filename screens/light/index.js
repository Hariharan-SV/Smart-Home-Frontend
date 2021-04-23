import React, { useState, useEffect } from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Text,Switch,Button,Block } from 'galio-framework';
import { View, StyleSheet } from 'react-native';
import Geolocation from '@react-native-community/geolocation';

const HTTP_PROXY_BASE_URL = 'http://54.83.145.237:3000';


const LightStatus = ({navigation}) => {
  const [status, setStatus] = useState(false);
  const [location, setLocation] = useState({});
  var RNFS = require('react-native-fs');

  useEffect( () => {
      async function file_exists() {
        if (await RNFS.exists(RNFS.DocumentDirectoryPath +"/location.json")){
            console.log("FILE EXISTS");
            RNFS.readFile(RNFS.DocumentDirectoryPath +"/location.json", 'utf8').then((contents) => {
                Geolocation.getCurrentPosition(
                    //Will give you the current location
                    (position) => {
                      console.log("Position",position);
                      const currentLongitude = JSON.stringify(position.coords.longitude);
                      //getting the Longitude from the location json
                      const currentLatitude = JSON.stringify(position.coords.latitude);
                      contents = JSON.parse(contents);
                      console.log("LOCATION ",contents["latitude"],currentLatitude,contents["longtitude"],currentLongitude);
                      if(contents["latitude"] === currentLatitude && contents["longtitude"] === currentLongitude){
                          console.log("LOCATION ",(contents["latitude"] === currentLatitude && contents["longtitude"] === currentLongitude));
                          setLocation(contents);
                      }
                    }
                );
                
            })
            .catch((err) => {
                console.log(err.message, err.code);
            });
        } else {
            console.log("FILE DOES NOT EXIST");
        }
      }
      file_exists();
  },[]);

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

  const getLocationIcon = () => {
    console.log("hook",location);
    if(JSON.stringify(location) === '{}')
        return {"name":"home-remove","color":"#FFB347"}
    return {"name":"home","color":"#FFB347"}
  };

  return (
    <View style={styles.container}>
        <Block middle={true} row>
            <Text h4 style={{"color":"#FFF","alignItems":"flex-start"}}>{"User location - "}</Text>
            <Icon name={getLocationIcon()["name"]} color={getLocationIcon()["color"]} size={35} />
        </Block>
        <Block middle={true} column space="between">
            <Icon name={getIcon()["name"]} color={getIcon()["color"]} size={100} />
        </Block>
        <Block style={{"alignItems":"center"}}>
            <Text h5 style={{"color":"#fafafa","alignItems":"flex-start"}}>Toggle Device status</Text>
            <Switch
                value={status}
                onChange={() => {
                    handleLightToggle();
                    setStatus(!status);
                }}
                trackColor={{true: 'orange', false: 'grey'}}
                thumbColor="#FFF"
            />
        </Block>
        <Block >
            <Button
             color="#FFB347"
             shadowless 
             size="large"
             onPress={() =>
                navigation.navigate('Location')
              }
            >
                <Block row space="between">
                    <Icon name="location-enter" size ={20} />
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
