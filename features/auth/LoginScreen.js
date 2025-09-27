import React, { useState } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { TextInput, Button, Text } from "react-native-paper";
import { useDispatch } from "react-redux";
import { loginUser } from "./authSlice";
import { useLoginUserMutation } from "./authApi"; // RTK Query API

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const [login, { isLoading }] = useLoginUserMutation();

  const handleLogin = async () => {
    try {
      const res = await login({ email, password }).unwrap();

      if (res.length === 0) {
        Alert.alert("Login Failed", "Invalid credentials");
        return;
      }

      const user = res[0];            // JSON Server returns an array
      const token = "mock-token-123"; // mock token for demo

      dispatch(loginUser({ user, token }));
      // optionally navigate to main app
    } catch (err) {
      console.log(err);
      Alert.alert("Error", "Something went wrong");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
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
      <Button mode="contained" onPress={handleLogin} loading={isLoading} style={styles.button}>
        Login
      </Button>
      <Button onPress={() => navigation.navigate("Register")}>
        Don't have an account? Register
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
