import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CustomerListScreen from "../features/customers/CustomerListScreen";
import CustomerDetailsScreen from "../features/customers/CustomerDetailsScreen";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Customers" component={CustomerListScreen} />
      <Stack.Screen name="CustomerDetails" component={CustomerDetailsScreen} />
    </Stack.Navigator>
  );
}
