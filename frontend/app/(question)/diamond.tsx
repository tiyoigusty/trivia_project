import { LinearGradient } from "expo-linear-gradient";
import { Image, Text, TouchableOpacity, View } from "react-native";

export default function Diamond({ onClose }: { onClose: any }) {
  return (
    <View>
      <View
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "row",
          gap: 20,
          flexWrap: "wrap",
        }}
      >
        <LinearGradient
          colors={["#e474ba", "#5881ff"]}
          start={{ x: 1, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{ width: 100, height: 120, borderRadius: 10 }}
        >
          <View
            style={{
              height: "100%",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={{ fontSize: 20 }}>100</Text>
            <Image
              source={require("@/assets/icons/diamond1.png")}
              style={{ marginVertical: 10 }}
            />
            <Text style={{ fontSize: 20 }}>Rp 100.000</Text>
          </View>
        </LinearGradient>
        <LinearGradient
          colors={["#e474ba", "#5881ff"]}
          start={{ x: 1, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{ width: 100, height: 120, borderRadius: 10 }}
        >
          <View
            style={{
              height: "100%",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={{ fontSize: 20 }}>250</Text>
            <Image
              source={require("@/assets/icons/diamond2.png")}
              style={{ marginVertical: 10 }}
            />
            <Text style={{ fontSize: 20 }}>Rp 37.000</Text>
          </View>
        </LinearGradient>
        <LinearGradient
          colors={["#e474ba", "#5881ff"]}
          start={{ x: 1, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{ width: 100, height: 120, borderRadius: 10 }}
        >
          <View
            style={{
              height: "100%",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={{ fontSize: 20 }}>500</Text>
            <Image
              source={require("@/assets/icons/diamond3.png")}
              style={{ marginVertical: 10 }}
            />
            <Text style={{ fontSize: 20 }}>Rp 69.000</Text>
          </View>
        </LinearGradient>
        <LinearGradient
          colors={["#e474ba", "#5881ff"]}
          start={{ x: 1, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{ width: 100, height: 120, borderRadius: 10 }}
        >
          <View
            style={{
              height: "100%",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={{ fontSize: 20 }}>1.000</Text>
            <Image
              source={require("@/assets/icons/diamond4.png")}
              style={{ marginVertical: 10 }}
            />
            <Text style={{ fontSize: 20 }}>Rp 135.000</Text>
          </View>
        </LinearGradient>
        <LinearGradient
          colors={["#e474ba", "#5881ff"]}
          start={{ x: 1, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{ width: 100, height: 120, borderRadius: 10 }}
        >
          <View
            style={{
              height: "100%",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={{ fontSize: 20 }}>5.000</Text>
            <Image
              source={require("@/assets/icons/diamond5.png")}
              style={{ marginVertical: 10 }}
            />
            <Text style={{ fontSize: 20 }}>Rp 250.000</Text>
          </View>
        </LinearGradient>
        <LinearGradient
          colors={["#e474ba", "#5881ff"]}
          start={{ x: 1, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{ width: 100, height: 120, borderRadius: 10 }}
        >
          <View
            style={{
              height: "100%",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={{ fontSize: 20 }}>10.000</Text>
            <Image
              source={require("@/assets/icons/diamond6.png")}
              style={{ marginVertical: 10 }}
            />
            <Text style={{ fontSize: 20 }}>Rp 516.000</Text>
          </View>
        </LinearGradient>
      </View>

      <View
        style={{
          marginTop: 50,
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
          onPress={onClose}
        >
          <Text style={{ alignSelf: "center" }}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: "cyan",
            padding: 8,
            borderRadius: 5,
            width: 150,
          }}
        >
          <Text style={{ alignSelf: "center" }}>Purchase</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
