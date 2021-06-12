import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { useAuth } from "../../context/auth";

export const SingOut = () => {
  const { singOut } = useAuth();

  const handleSingOut = () => {
    singOut();
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handleSingOut}>
      <Text style={styles.textIn}>Sing Out</Text>
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
    color: "red",
  },
});
