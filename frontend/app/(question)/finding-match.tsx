import { Avatar } from "@rneui/themed";
import { Image, ImageBackground, Text, View } from "react-native";
import { red } from "react-native-reanimated/lib/typescript/reanimated2/Colors";
import { SafeAreaView } from "react-native-safe-area-context";

export default function FindingMatch() {
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
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginHorizontal: 30,
          }}
        >
          <Image
            source={require("@/assets/images/logo.png")}
            style={{ width: 80, height: 80 }}
          />
          <Image
            source={require("@/assets/icons/close.png")}
            style={{ width: 20, height: 20 }}
          />
        </View>

        <View style={{ marginTop: 50 }}>
          <Text style={{ color: "#e474ba", fontSize: 80, alignSelf: "center" }}>
            01:00
          </Text>
          <Text style={{ color: "white", fontSize: 40, alignSelf: "center" }}>
            Finding Opponent
          </Text>
          <Text style={{ color: "white", fontSize: 40, alignSelf: "center" }}>
            <Text style={{ color: "#5881ff" }}>4</Text>/10
          </Text>
        </View>

        <View style={{ marginTop: 30, display: "flex", gap: 20 }}>
          <View
            style={{
              width: "75%",
              display: "flex",
              flexDirection: "row",
              gap: 15,
              alignItems: "center",
              alignSelf: "center",
              borderWidth: 2,
              borderColor: "white",
              borderRadius: 20,
              backgroundColor: "#rgba(250,250,250, .3)",
              padding: 10,
            }}
          >
            <Avatar
              size={"medium"}
              rounded
              source={{
                uri: "https://img.freepik.com/free-psd/3d-render-avatar-character_23-2150611716.jpg?ga=GA1.1.1613538227.1710145113&semt=ais_user",
              }}
            />
            <View>
              <Text style={{ color: "white", fontSize: 28 }}>
                Agik Gigih Sulistyo
              </Text>
            </View>
          </View>
          <View
            style={{
              width: "75%",
              display: "flex",
              flexDirection: "row",
              gap: 15,
              alignItems: "center",
              alignSelf: "center",
              borderWidth: 2,
              borderColor: "white",
              borderRadius: 20,
              backgroundColor: "#rgba(250,250,250, .3)",
              padding: 10,
            }}
          >
            <Avatar
              size={"medium"}
              rounded
              source={{
                uri: "https://img.freepik.com/free-psd/3d-render-avatar-character_23-2150611716.jpg?ga=GA1.1.1613538227.1710145113&semt=ais_user",
              }}
            />
            <View>
              <Text style={{ color: "white", fontSize: 28 }}>
                Agik Gigih Sulistyo
              </Text>
            </View>
          </View>
          <View
            style={{
              width: "75%",
              display: "flex",
              flexDirection: "row",
              gap: 15,
              alignItems: "center",
              alignSelf: "center",
              borderWidth: 2,
              borderColor: "white",
              borderRadius: 20,
              backgroundColor: "#rgba(250,250,250, .3)",
              padding: 10,
            }}
          >
            <Avatar
              size={"medium"}
              rounded
              source={{
                uri: "https://img.freepik.com/free-psd/3d-render-avatar-character_23-2150611716.jpg?ga=GA1.1.1613538227.1710145113&semt=ais_user",
              }}
            />
            <View>
              <Text style={{ color: "white", fontSize: 28 }}>
                Agik Gigih Sulistyo
              </Text>
            </View>
          </View>
          <View
            style={{
              width: "75%",
              display: "flex",
              flexDirection: "row",
              gap: 15,
              alignItems: "center",
              alignSelf: "center",
              borderWidth: 2,
              borderColor: "white",
              borderRadius: 20,
              backgroundColor: "#rgba(250,250,250, .3)",
              padding: 10,
            }}
          >
            <Avatar
              size={"medium"}
              rounded
              source={{
                uri: "https://img.freepik.com/free-psd/3d-render-avatar-character_23-2150611716.jpg?ga=GA1.1.1613538227.1710145113&semt=ais_user",
              }}
            />
            <View>
              <Text style={{ color: "white", fontSize: 28 }}>
                Agik Gigih Sulistyo
              </Text>
            </View>
          </View>
          <View
            style={{
              width: "75%",
              display: "flex",
              flexDirection: "row",
              gap: 15,
              alignItems: "center",
              alignSelf: "center",
              borderWidth: 2,
              borderColor: "white",
              borderRadius: 20,
              backgroundColor: "#rgba(250,250,250, .3)",
              padding: 10,
            }}
          >
            <Avatar
              size={"medium"}
              rounded
              source={{
                uri: "https://img.freepik.com/free-psd/3d-render-avatar-character_23-2150611716.jpg?ga=GA1.1.1613538227.1710145113&semt=ais_user",
              }}
            />
            <View>
              <Text style={{ color: "white", fontSize: 28 }}>
                Agik Gigih Sulistyo
              </Text>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}
