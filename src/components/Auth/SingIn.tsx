import React from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";
import { useAuth } from "../../context/auth";

export const SingIn = () => {
  const { singIn, signed, user } = useAuth();

  const handleSingIn = async () => {
    await singIn();
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handleSingIn}>
      <Text style={styles.textIn}>Sing In</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  textIn: {
    color: "purple",
  },
});
