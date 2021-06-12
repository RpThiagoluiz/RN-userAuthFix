import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { SingOut } from "../components/App/SingOut";

const stackRoutes = createStackNavigator();

export const StackAppRoutes = () => (
  <stackRoutes.Navigator>
    <stackRoutes.Screen name="DashBoard" component={SingOut} />
  </stackRoutes.Navigator>
);
