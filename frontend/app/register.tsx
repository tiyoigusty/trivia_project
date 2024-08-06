import { loginTheme } from "@/theme/login-theme";
import useStore from "@/zustand/zustand";
import { Button, ThemeProvider } from "@rneui/themed";
import { useRouter } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import * as Linking from "expo-linking";
import { Image, ImageBackground, StyleSheet, Text, View } from "react-native";
import { storeToken } from "@/libs/storage";

type SuccessResponse = {
  type: string;
  url: string;
};

WebBrowser.maybeCompleteAuthSession();

export default function Register() {
  const setUser = useStore((state) => state.SET_USER);

  const router = useRouter();
  const handleGoogleSignIn = async () => {
    const redirectUrl = Linking.createURL("/");
    const response = (await WebBrowser.openAuthSessionAsync(
      `https://491b-2404-8000-1005-37ac-7935-582-f5f2-5aba.ngrok-free.app/google/redirect?redirectTo=${redirectUrl}`,
      redirectUrl
    )) as SuccessResponse;

    // console.log("ini response", response);

    const token: string = response.url.split("=")[1].split("&")[0];
    console.log("ini token", token);

    await storeToken(token);

    WebBrowser.dismissBrowser();
    router.navigate("/selectavatar-copy");
  };

  return (
    <ThemeProvider theme={loginTheme}>
      <ImageBackground
        source={require("@/assets/images/background.jpg")}
        style={styles.background}
      >
        <Image
          source={require("@/assets/images/logo.png")}
          style={{ width: 200, height: 150, marginTop: 300 }}
        />
        <View style={styles.container}>
          <Button
            title="Continue With Google"
            buttonStyle={styles.googleButton}
            titleStyle={styles.googleButtonText}
            icon={{
              name: "google",
              type: "font-awesome",
              size: 20,
              color: "white",
            }}
            onPress={handleGoogleSignIn}
          />
          <Text style={styles.footerText}>
            by continue, you agree to the Terms and Privacy
          </Text>
        </View>
      </ImageBackground>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    width: "80%",
    borderRadius: 8,
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-end",
  },
  googleButton: {
    backgroundColor: "#db4a39",
    borderRadius: 8,
    paddingHorizontal: 40,
    paddingVertical: 10,
  },
  googleButtonText: {
    marginLeft: 10,
  },
  orText: {
    color: "#fff",
    textAlign: "center",
    marginVertical: 16,
    fontSize: 20,
  },
  inputContainer: {
    borderBottomColor: "#fff",
    marginTop: -10,
    marginBottom: 1,
  },
  inputPasswordContainer: {
    borderBottomColor: "#fff",
    marginTop: -20,
    marginBottom: 1,
  },
  signInButton: {
    backgroundColor: "#28a745",
    borderRadius: 8,
    paddingVertical: 10,
  },
  footerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 16,
  },
  footerText: {
    color: "#fff",
    fontSize: 13,
    marginTop: 100,
    marginBottom: 40,
  },
  signUpText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
