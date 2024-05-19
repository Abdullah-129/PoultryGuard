import React, { useContext, useState } from "react";
import {
    View,
    Text,
    Image,
    TextInput,
    TouchableOpacity,
    Alert,
    StyleSheet,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";
import AuthContext from "../Context/AuthContext";

export default function Login() {
    const { signIn } = useContext(AuthContext); // Destructure Signin from the context
    const navigation = useNavigation();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        try {
            // Replace with your actual API endpoint
            const apiUrl = `https://poultry124421.000webhostapp.com/login.php?username=${email}&password=${password}`;

            const response = await fetch(apiUrl, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
                // body: JSON.stringify({
                //   email: email,
                //   password: password,
                // }),
            });

            const data = await response.json();
            console.log(data);

            if (response.ok) {
                if (data.success === true) {
                    signIn();
                } else {
                    Alert.alert("Login Failed", data.message);
                }
            } else {
                Alert.alert("Login Failed", data.message);
            }
        } catch (error) {
            console.error("Error during login:", error);
            Alert.alert("Error", "An error occurred during login. Please try again.");
        }
    };

    return (
        <View style={styles.container}>
        <StatusBar style="dark" />
        <Image
          source={require("../assets/bg.png")}
          style={styles.backgroundImage}
        />
        <Text style={styles.title}>Log In</Text>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Email Address"
            placeholderTextColor="#7FC7D9"
            autoCapitalize="none"
            value={email}
            onChangeText={(text) => setEmail(text)}
            style={styles.input}
          />
          <TextInput
            placeholder="Password"
            autoCapitalize="none"
            placeholderTextColor="#7FC7D9"
            secureTextEntry
            value={password}
            onChangeText={(text) => setPassword(text)}
            style={[styles.input, { marginTop: 10 }]}
          />
          <TouchableOpacity onPress={handleLogin} style={styles.button}>
            <Text style={styles.buttonText}>LOGIN</Text>
          </TouchableOpacity>
          <View style={{ flexDirection: "row", justifyContent: "center" ,  marginTop:10, }}>
          <Text style={{ color: "black" }}>Don't have an account? </Text>
          <TouchableOpacity onPress={() => navigation.push("Signup")}>
            <Text style={{ color: "#7FC7D9"}}>Signup here</Text>
          </TouchableOpacity>
        </View>
        </View>
      </View>
       )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "white",
      justifyContent: "center",
      alignItems: "center",
    },
    backgroundImage: {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      zIndex: -1,
    },
    title: {
      fontSize: 40,
      fontWeight: "bold",
      color: "#7FC7D9",
      marginBottom: 20,
    },
    inputContainer: {
      width: "80%",
    },
    input: {
      backgroundColor: "white",
      padding: 15,
      borderRadius: 20,
      borderWidth: 1,
      borderColor: "black",
    },
    button: {
        backgroundColor: "white",
        padding: 10,
        borderRadius: 20,
        marginTop: 20,
        width: 250,
        color: "#7FC7D9", // Text color
        borderColor: "black", // Border color
        borderWidth: 1,
        alignSelf: "center", // Center the button horizontally
        alignItems: "center", // Center the text inside the button
      },
    buttonText: {
      fontSize: 20,
      fontWeight: "bold",
      color: "#7FC7D9",
      textAlign: "center",
    },
    signupLink: {
      marginTop: 10,
      alignSelf: "center",
    },
    signupText: {
      color: "#7FC7D9",
      fontSize: 16,
    },
  });
  
