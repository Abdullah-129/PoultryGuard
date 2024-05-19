import React, { useContext, useState } from "react";
import { View, Text, Image, TextInput, TouchableOpacity } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";
import AuthContext from "../Context/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Signup() {
  const navigation = useNavigation();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signUp } = useContext(AuthContext);


  async function performPostRequest(url) {
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          // Add any additional headers if needed
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Error performing POST request:', error.message);
      throw error;
    }
  }

  const setname = async () => {
    try{
      await AsyncStorage.setItem('name', fullName);
    } catch {
      console.log(`Error in saving userToken to storage: ${e}`);
    }
  }

  const handleSignUp = async () => {
    // Basic email and password validation, you may want to improve this
    if (!fullName.trim() || !email.trim() || !password.trim()) {
      alert("Please enter all required fields.");
      return;
    }

    // Replace 'http://localhost/api/Register.php' with your actual signup API endpoint
    const apiEndpoint = `https://poultry124421.000webhostapp.com/signup.php?username=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`;

    try {
      const response = await performPostRequest(apiEndpoint);

      // Check the response and handle accordingly
      if (response.success) {
        // Successful signup, navigate to "ehome" screen or perform other actions
        // navigation.push("ehome");
        setname();
        signUp();
      } else {
        alert('Signup failed. Please check your information.');
      }
    } catch (error) {
      console.error('Error during signup:', error.message);
      console.log('Constructed API Endpoint:', apiEndpoint);
    console.log('Error Details:', error);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "white", justifyContent: "center" }}>
      <StatusBar style="dark" />
      <Image
        source={require("../assets/bg.png")}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
      />
      <View style={{ alignItems: "center" }}>
        <Text
          style={{
            fontSize: 40,
            fontWeight: "bold",
            color: "#7FC7D9",
            marginBottom: 10,
          }}
        >
          Sign Up
        </Text>
        <View
          style={{
            backgroundColor: "white",
            padding: 15,
            borderRadius: 20,
            width: "80%",
            marginBottom: 10,
            marginTop: 30,
            borderWidth: 1,
            borderColor: "black",
          }}
        >
          <TextInput
            placeholder="Full Name"
            placeholderTextColor="#7FC7D9"
            value={fullName}
            onChangeText={(text) => setFullName(text)}
          />
        </View>
        <View
          style={{
            backgroundColor: "white",
            padding: 15,
            borderRadius: 20,
            width: "80%",
            marginBottom: 10,
            borderWidth: 1,
            borderColor: "black",
          }}
        >
          <TextInput
            placeholder="Email"
            placeholderTextColor="#7FC7D9"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
        </View>

        <View
          style={{
            backgroundColor: "white",
            padding: 15,
            borderRadius: 20,
            width: "80%",
            marginBottom: 10,
            borderWidth: 1,
            borderColor: "black",
          }}
        >
          <TextInput
            placeholder="Password"
            placeholderTextColor="#7FC7D9"
            secureTextEntry
            value={password}
            onChangeText={(text) => setPassword(text)}
          />
        </View>

        <TouchableOpacity
          onPress={handleSignUp}
          style={{
            backgroundColor: "white",
            padding: 10,
            borderRadius: 20,
            marginBottom: 10,
            width: 250,
            borderColor: "black",
            borderWidth: 1,
          }}
        >
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              color: "#7FC7D9",
              textAlign: "center",
            }}
          >
            Sign Up
          </Text>
        </TouchableOpacity>
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <Text style={{ color: "black" }}>Have an account? </Text>
          <TouchableOpacity onPress={() => navigation.push("Login")}>
            <Text style={{ color: "#7FC7D9" }}>Login here</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}