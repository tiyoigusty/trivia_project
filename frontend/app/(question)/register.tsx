import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Alert,
} from "react-native";
import { Button, ThemeProvider } from "@rneui/themed";
import { loginTheme } from "@/theme/login-theme";

export default function HomeScreen() {
  const handleGoogleSignIn = () => {
    Alert.alert("Google Sign In");
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
          source={require("@/assets/images/triviagame.png")}
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
