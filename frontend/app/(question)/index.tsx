import {
  Button,
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Question() {
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
            height: "100%",
            paddingHorizontal: 30,
            paddingVertical: 20,
          }}
        >
          <View
            style={{
              width: "100%",
              height: "100%",
              backgroundColor: "#rgba(250,250,250, .3)",
              borderRadius: 20,
              display: "flex",
              flexDirection: "row",
            }}
          >
            <View
              style={{
                flex: 1,
                alignItems: "center",
                alignSelf: "flex-end",
                marginBottom: 20,
                borderRightWidth: 2,
                borderStyle: "dashed",
                height: "70%",
              }}
            ></View>
            <View
              style={{
                flex: 1,
                alignItems: "center",
                alignSelf: "flex-end",
                marginBottom: 20,
              }}
            ></View>

            <View
              style={{
                position: "absolute",
                top: 0,
                left: "50%",
                transform: [{ translateX: -110 }],
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                marginTop: 20,
              }}
            >
              <View
                style={{
                  backgroundColor: "#e474ba",
                  width: 50,
                  height: 50,
                  padding: 5,
                  borderWidth: 2,
                  borderRadius: 50,
                  zIndex: 10,
                }}
              >
                <Text
                  style={{
                    fontSize: 30,
                    color: "#5881ff",
                    alignSelf: "center",
                    lineHeight: 45,
                  }}
                >
                  20
                </Text>
              </View>
              <View
                style={{
                  backgroundColor: "#e474ba",
                  padding: 5,
                  borderWidth: 2,
                  borderRadius: 5,
                  paddingLeft: 30,
                  marginLeft: -25,
                  zIndex: 9,
                }}
              >
                <Text style={{ fontSize: 20 }}>
                  Player Remaining :{" "}
                  <Text style={{ color: "#5881ff" }}>20</Text>
                </Text>
              </View>
            </View>

            <View
              style={{
                position: "absolute",
                top: 80,
                left: "50%",
                transform: [{ translateX: -125 }],
                marginTop: 10,
                padding: 20,
                width: 250,
                height: 100,
                alignSelf: "center",
                backgroundColor: "#rgba(250,250,250, .6)",
                borderWidth: 1,
                borderRadius: 10,
                zIndex: 9,
              }}
            >
              <Text style={{ fontSize: 20 }}>
                INI ADALAH PERTANYAAN UNTUK QUIZ?
              </Text>
            </View>

            <View
              style={{
                position: "absolute",
                bottom: 0,
                left: "50%",
                transform: [{ translateX: -140 }],
                marginBottom: 20,
                display: "flex",
                flexDirection: "row",
                gap: 80,
              }}
            >
              <Image
                source={require("@/assets/icons/delete.png")}
                style={{ width: 100, height: 100 }}
              />
              <Image
                source={require("@/assets/icons/check.png")}
                style={{ width: 100, height: 100 }}
              />
            </View>
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}
