import { loginTheme } from "@/theme/login-theme";
import { Button, ThemeProvider } from "@rneui/themed";
import { useRouter } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import { Image, ImageBackground, StyleSheet, Text, View } from "react-native";

WebBrowser.maybeCompleteAuthSession();

export default function Register() {
  const router = useRouter();
  const handleGoogleSignIn = () => {
    WebBrowser.openAuthSessionAsync(
      `https://8c92-2404-8000-1005-37ac-90d8-5f15-ae1-89d3.ngrok-free.app/google/redirect`
    );
    router.navigate("/selectavatar");
  };

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
