import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";
import { useColorScheme } from "@/hooks/useColorScheme";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Register from "./register";
import SelectAvatar from "./selectavatar";
import Home from "./home";
import FindingMatch from "./finding-match";
import Question from "./question";
import Winner from "./winner";
import Looser from "./looser";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import SelectAvatarCopy from "./selectavatar-copy";

const queryClient = new QueryClient();

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const Stack = createNativeStackNavigator();

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
    <QueryClientProvider client={queryClient}>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="register" component={Register} />
          <Stack.Screen name="selectavatar-copy" component={SelectAvatarCopy} />
          {/* <Stack.Screen name="selectavatar" component={SelectAvatar} /> */}
          <Stack.Screen name="home" component={Home} />
          <Stack.Screen name="finding-match" component={FindingMatch} />
          <Stack.Screen name="question" component={Question} />
          <Stack.Screen name="winner" component={Winner} />
          <Stack.Screen name="looser" component={Looser} />
        </Stack.Navigator>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
