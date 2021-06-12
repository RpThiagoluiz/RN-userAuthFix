import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { View, ActivityIndicator } from "react-native";
import { StackAppRoutes } from "./stackApp.routes";
import { StackAuthRoutes } from "./stackAuth.routes";
import { useAuth } from "../context/auth";

export const Routes = () => {
  const { signed, loading } = useAuth();

  if (loading) {
    //lottie ou a splash screens
    //Tem a splash screen tbm

    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="purple" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {signed ? <StackAppRoutes /> : <StackAuthRoutes />}
    </NavigationContainer>
  );
};
