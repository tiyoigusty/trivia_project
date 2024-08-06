import { Avatar } from "@rneui/themed";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  Alert,
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { io, Socket } from "socket.io-client";

const socket: Socket = io(
  "https://44b6-2404-8000-1005-37ac-2816-cc52-9a6-fedb.ngrok-free.app"
);

export default function FindingMatch() {
  const router = useRouter();
  const handleBack = () => {
    router.navigate("/home");
  };

  const [playersCount, setPlayersCount] = useState<number>(0);
  const [elapsedTime, setElapsedTime] = useState<number>(0);

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to socket server");
    });

    socket.on("updatePlayers", (count: number) => {
      setPlayersCount(count);
    });

    socket.on("timerUpdate", (time: number) => {
      console.log("Timer update:", time); // Debug log
      setElapsedTime(time);
    });

    socket.on("matchTimeout", (roomId: string) => {
      Alert.alert("Time Out", `Matchmaking timed out for room ${roomId}`);
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from socket server");
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins < 10 ? "0" : ""}${mins}:${secs < 10 ? "0" : ""}${secs}`;
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

          <TouchableOpacity onPress={handleBack}>
            <Image
              source={require("@/assets/icons/close.png")}
              style={{ width: 20, height: 20 }}
            />
          </TouchableOpacity>
        </View>

        <View style={{ marginTop: 50 }}>
          <Text style={{ color: "#e474ba", fontSize: 80, alignSelf: "center" }}>
            {formatTime(elapsedTime)}
          </Text>
          <Text style={{ color: "white", fontSize: 40, alignSelf: "center" }}>
            Finding Opponent
          </Text>
          <Text style={{ color: "white", fontSize: 40, alignSelf: "center" }}>
            <Text style={{ color: "#5881ff" }}>{playersCount}</Text>/5
          </Text>
        </View>

        <View style={{ marginTop: 30, display: "flex", gap: 20 }}>
          {Array.from({ length: playersCount }, (_, index) => (
            <View
              key={index}
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
                  Player {index + 1}
                </Text>
              </View>
            </View>
          ))}

          {/* <Link href={"/question"} style={{ fontSize: 50 }}>
            NEXT
          </Link> */}
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}
