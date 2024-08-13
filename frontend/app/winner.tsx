import { Avatar } from "@rneui/themed";
import { useRouter } from "expo-router";
import {
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Winner() {
  const router = useRouter();

  const handleBack = () => {
    router.navigate("/looser");
  };

  const handleHome = () => {
    router.navigate("/home");
  };

  return (
    <ImageBackground
      style={{
        height: "100%",
        width: "100%",
      }}
      source={require("@/assets/images/background.jpg")}
    >
      <SafeAreaView>
        <View
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: 50,
          }}
        >
          <Text style={{ color: "white", fontSize: 40 }}>Congrats,</Text>
          <Text style={{ color: "white", fontSize: 40 }}>
            you got <Text style={{ color: "orange" }}>1 diamond</Text>
          </Text>
        </View>

        <View style={{ display: "flex", alignItems: "center", marginTop: 100 }}>
          <Image
            source={require("@/assets/icons/crown.png")}
            style={{ width: 100, height: 100, marginBottom: -25, zIndex: 1 }}
          />

          <Avatar
            size={"xlarge"}
            rounded
            source={{
              uri: "https://img.freepik.com/free-psd/3d-render-avatar-character_23-2150611716.jpg?ga=GA1.1.1613538227.1710145113&semt=ais_user",
            }}
          />

          <Text style={{ color: "white", fontSize: 35, marginTop: 40 }}>
            Agik Gigih Sulistyo
          </Text>
        </View>

        <View
          style={{
            marginTop: 150,
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            gap: 20,
          }}
        >
          <TouchableOpacity
            style={{
              backgroundColor: "red",
              padding: 8,
              borderRadius: 5,
              width: 150,
            }}
            onPress={handleHome}
          >
            <Text style={{ alignSelf: "center" }}>Return to Home</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: "cyan",
              padding: 8,
              borderRadius: 5,
              width: 150,
            }}
            onPress={handleBack}
          >
            <Text style={{ alignSelf: "center" }}>Play Again</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}
