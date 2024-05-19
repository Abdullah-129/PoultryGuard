import { View, Text } from "react-native";
import React, { useState, useMemo, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../Screens/Home";
import Login from "../Screens/Login";
import Signup from "../Screens/Signup";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AuthContext from "../Context/AuthContext";
import Scanner from "../Screens/Scanner";
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const Stack = createNativeStackNavigator();

export default function Nav() {
  function getRandomNumber() {
    const randomNumber = Math.floor(Math.random() * 1000) + 1;
    return randomNumber;
  }
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState(0);

  const authContext = useMemo(
    () => ({
      signIn: async () => {
        setIsLoading(false);
        const newToken = getRandomNumber();
        setUserToken(newToken);
        try {
          await AsyncStorage.setItem("userToken", newToken.toString());
        } catch (e) {
          console.log(`Error in saving userToken to storage: ${e}`);
        }
      },
      signOut: async () => {
        setIsLoading(false);
        setUserToken(null);
        try {
          await AsyncStorage.removeItem("userToken");
        } catch (e) {
          console.log(`Error in removing userToken from storage: ${e}`);
        }
      },
      signUp: async () => {
        setIsLoading(false);
        const newToken = getRandomNumber();
        setUserToken(newToken);
        try {
          await AsyncStorage.setItem("userToken", newToken.toString());
        } catch (e) {
          console.log(`Error in saving userToken to storage: ${e}`);
        }
      },
    }),
    [setIsLoading, setUserToken]
  );
  const isLoggedIn = async () => {
    try {
      const storedToken = await AsyncStorage.getItem("userToken");
      setUserToken(storedToken);
      setIsLoading(false);
      console.log("token", storedToken);
    } catch (e) {
      console.log(`Error in getting userToken from storage: ${e}`);
    }
  };

  useEffect(() => {
    isLoggedIn();
  }, []);

  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            color: "black",
            fontWeight: "bold",
            fontSize: 22,
          }}
        >
          Loading...
        </Text>
      </View>
    );
  }
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <Stack.Navigator>
          {userToken === null || userToken === 0 ? (
            <>
              <Stack.Screen
                name="Login"
                component={Login}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Signup"
                component={Signup}
                options={{ headerShown: false }}
              />
            </>
          ) : (
            <>
              <Stack.Screen
                name="Home"
                component={Home}
                options={{ headerShown: true }}
              />
              <Stack.Screen
                name="Scan"
                component={Scanner}
                options={{ headerShown: true, headerTitle: "Scan Poultry Desease" }}
              />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
    </GestureHandlerRootView>
  );
}
