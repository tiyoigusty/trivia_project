import AsyncStorage from "@react-native-async-storage/async-storage";
import { Avatar } from "@rneui/themed";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { User, UserAvatar } from "./types/type";
import { socket } from "./utils/socket";

type Players = {
  avatar: string;
  username: string;
};

export default function FindingMatch() {
  const router = useRouter();
  const [playersCount, setPlayersCount] = useState<number>(0);
  const [players, setPlayers] = useState<Players[]>([]);
  const [timeElapsed, setTimeElapsed] = useState<number>(0);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userDataString = await AsyncStorage.getItem("userData");
        if (userDataString) {
          const userData = JSON.parse(userDataString);

          // Emit joinRoom setelah userId didapatkan
          if (socket && userData.id) {
            socket.emit("joinRoom", { id: userData.id });
          }
        }
      } catch (e) {
        console.error("Failed to load user data", e);
      }
    };

    fetchUserData();

    socket.on("connect", () => {
      console.log("Connected to socket server");
    });

    socket.on("updatePlayers", (players) => {
      console.log("Received updatePlayers event with data:", players);
      setPlayers(players);
      setPlayersCount(players.length);
    });

    socket.on("startMatch", async (data) => {
      console.log("Match started with data:", data);
      await AsyncStorage.setItem("players", JSON.stringify(data.players));
      router.push({
        pathname: "/question",
        params: { players: JSON.stringify(players) },
      });
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from socket server");
    });

    const interval = setInterval(() => {
      setTimeElapsed((prev) => prev + 1);
    }, 1000);

    return () => {
      clearInterval(interval);
      socket.off("updatePlayers");
      socket.off("startMatch");
      socket.off("disconnect");
    };
  }, []);

  const handleBack = () => {
    router.navigate("/home");
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(
      remainingSeconds
    ).padStart(2, "0")}`;
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
            {formatTime(timeElapsed)}
          </Text>
          <Text style={{ color: "white", fontSize: 40, alignSelf: "center" }}>
            Finding Opponent
          </Text>
          <Text style={{ color: "white", fontSize: 40, alignSelf: "center" }}>
            <Text style={{ color: "#5881ff" }}>{playersCount}</Text>/3
          </Text>
        </View>

        <View style={{ marginTop: 30, display: "flex", gap: 20 }}>
          {players.map((player, index) => (
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
                  uri: player.avatar,
                }}
              />

              <View>
                <Text style={{ color: "white", fontSize: 28 }}>
                  {player.username}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}
