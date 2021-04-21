import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import LightStatus from "../screens/light";
import LocationStatus from "../screens/location";

const AuthStack = () => {
  const AuthStack = createStackNavigator();

  return (
    <AuthStack.Navigator>
      <AuthStack.Screen
        name="Light Bulb"
        component={LightStatus}
        options={{
          headerTitle: "",
          headerTransparent: true
        }}
      />

      <AuthStack.Screen
        name="Location"
        component={LocationStatus}
        options={{
          headerTitle: "",
          headerTransparent: true
        }}
      />
    </AuthStack.Navigator>
  );
};

export default AuthStack;