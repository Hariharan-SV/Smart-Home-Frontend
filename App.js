import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import AuthStackScreen from "./routes";

export default App = () => {

return (
    <NavigationContainer>
        <AuthStackScreen />
    </NavigationContainer>
  );
}