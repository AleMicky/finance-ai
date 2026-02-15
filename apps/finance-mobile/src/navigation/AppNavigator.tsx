import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { getToken } from "../auth/tokenStore";
import { setUnauthorizedHandler } from "../api/client";

import { LoginScreen } from "../screens/LoginScreen";
import { HomeScreen } from "../screens/HomeScreen";
import { DashboardScreen } from "../screens/DashboardScreen";
import { SignUpScreen } from "../screens/SignUpScreen";
import { ForgotPasswordScreen } from "../screens/ForgotPasswordScreen";

export type RootStackParamList = {
  Login: undefined;
  SignUp: undefined;
  ForgotPassword: undefined;
  Home: undefined;
  Dashboard: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export function AppNavigator() {
  const [ready, setReady] = useState(false);
  const [authed, setAuthed] = useState(false);

  useEffect(() => {
    setUnauthorizedHandler(() => setAuthed(false));

    (async () => {
      const token = await getToken();
      setAuthed(!!token);
      setReady(true);
    })();
  }, []);

  if (!ready) return null;

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!authed ? (
          <>
            <Stack.Screen name="Login" options={{ headerShown: false }}>
              {(props) => <LoginScreen {...props} onAuthed={() => setAuthed(true)} />}
            </Stack.Screen>
            <Stack.Screen name="SignUp" options={{ headerShown: false }} >
              {(props) => <SignUpScreen {...props} onAuthed={() => setAuthed(true)} />}
            </Stack.Screen>
            <Stack.Screen name="ForgotPassword" options={{ headerShown: false }} component={ForgotPasswordScreen} />
          </>
        ) : (
          <>
            <Stack.Screen name="Home" options={{ title: "Finance AI" }}>
              {(props) => <HomeScreen {...props} onLogout={() => setAuthed(false)} />}
            </Stack.Screen>
            <Stack.Screen name="Dashboard" options={{ title: "Dashboard" }} component={DashboardScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}