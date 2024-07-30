import { StyleSheet, ImageBackground, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Headers from "../screen/Home/headers";
import Profile from "../screen/Home/profile";
import Footers from "../screen/Home/footer";

export default function HomeScreen() {
  return (
    <ImageBackground
      source={require("@/assets/images/background.jpg")}
      style={styles.countainerImageBg}
    >
      <SafeAreaProvider style={styles.countainerprov}>
        <Headers />
        <View style={styles.countainer2}>
          <Profile />
          <Footers />
        </View>
      </SafeAreaProvider>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  countainerImageBg: {
    height: "100%",
  },
  countainerprov: {
    display: "flex",
  },
  countainer2: {
    justifyContent: "space-between",
    marginTop: 20,
  },
});
