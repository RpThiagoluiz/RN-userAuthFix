import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { SingIn } from "../components/Auth/SingIn";

const stackRoutes = createStackNavigator();

export const StackAuthRoutes = () => (
  <stackRoutes.Navigator>
    <stackRoutes.Screen name="Auth" component={SingIn} />
  </stackRoutes.Navigator>
);
