import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { getToken } from "../auth/tokenStore";
import { setUnauthorizedHandler } from "../api/client";

import { LoginScreen } from "../screens/LoginScreen";
import { SignUpScreen } from "../screens/SignUpScreen";
import { ForgotPasswordScreen } from "../screens/ForgotPasswordScreen";
import MainTabs from "./MainTabs";

export type RootStackParamList = {
  Login: undefined;
  SignUp: undefined;
  ForgotPassword: undefined;
  App: undefined;
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
            <Stack.Screen
              name="ForgotPassword"
              options={{ headerShown: false }}
              component={ForgotPasswordScreen}
            />
          </>
        ) : (
          <Stack.Screen name="App" options={{ headerShown: false }}>
            {() => <MainTabs onLogout={() => setAuthed(false)} />}
          </Stack.Screen>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}