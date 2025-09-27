import React, { useState } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { TextInput, Button, Text } from "react-native-paper";
import { useDispatch } from "react-redux";
import { useRegisterUserMutation } from "./authApi"; // RTK Query mutation
import { loginUser } from "./authSlice";

export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [register, { isLoading }] = useRegisterUserMutation();
  const dispatch = useDispatch();

  const handleRegister = async () => {
  if (!name || !email || !password) {
    Alert.alert("Error", "Please fill all fields");
    return;
  }

  try {
  console.log("Sending user:", { name, email, password });
  const user = await register({ name, email, password }).unwrap();
  console.log("User created:", user);
  const token = "mock-token";
  dispatch(loginUser({ user, token }));
  navigation.replace("RootNavigator");
} catch (err) {
  console.log("Registration error:", err);
  Alert.alert("Error", "Registration failed");
}

};


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>
      <TextInput label="Name" value={name} onChangeText={setName} style={styles.input} />
      <TextInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        label="Password"
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        secureTextEntry
      />
      <Button
        mode="contained"
        onPress={handleRegister}
        loading={isLoading}
        style={styles.button}
      >
        Register
      </Button>
      <Button onPress={() => navigation.navigate("Login")}>
        Already have an account? Login
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  input: { marginBottom: 15 },
  button: { marginTop: 10 },
  title: { fontSize: 24, marginBottom: 20, textAlign: "center" },
});
