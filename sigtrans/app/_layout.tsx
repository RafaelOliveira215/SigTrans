import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";
import { AppProvider, RealmProvider, UserProvider } from "@realm/react";
import LoginScreen from "./index";
import { ActivityIndicator, View } from "react-native";
import AitsScreen from "./(tabs)";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <AppProvider id="application-0-vmuencj">
      <UserProvider fallback={LoginScreen}>
        <>
          <RealmProvider
            sync={{
              flexible: true,
              onError: (_, error) => {
                console.error(error);
              },
            }}
            fallback={
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <ActivityIndicator size="large" color="#0000ff" />
              </View>
            }
          >
            <AitsScreen />
            <ThemeProvider
              value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
            >
              <Stack>
                <Stack.Screen name="index" options={{ headerShown: false }} />
                <Stack.Screen
                  name="signUp/index"
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="(tabs)"
                  options={{ headerShown: true, title: "teste" }}
                />
              </Stack>
            </ThemeProvider>
          </RealmProvider>
        </>
      </UserProvider>
    </AppProvider>
  );
}
