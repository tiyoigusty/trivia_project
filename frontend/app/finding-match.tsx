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
  const [userId, setUserId] = useState<User | null>(null);
  const [playersCount, setPlayersCount] = useState<number>(0);
  const [players, setPlayers] = useState<Players[]>([]);

  // console.log("ini player", players);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userDataString = await AsyncStorage.getItem("userData");
        if (userDataString) {
          const userData = JSON.parse(userDataString);
          setUserId(userData.id);
        }
      } catch (e) {
        console.error("Failed to load user data", e);
      }
    };

    fetchUserData();

    if (socket && userId) socket.emit("joinRoom", { id: userId });

    socket.on("connect", () => {
      console.log("Connected to socket server");
    });

    socket.on("updatePlayers", (players) => {
      console.log("Received updatePlayers event with data:", players);
      setPlayers(players);
      setPlayersCount(players.length);
    });

    socket.on("startMatch", (data) => {
      console.log("Match started with data:", data);
      router.push("/question");
    });

    // socket.on("test", (data) => {
    //   console.log(data);
    // });

    socket.on("disconnect", () => {
      console.log("Disconnected from socket server");
    });
  }, [socket, userId]);

  const handleBack = () => {
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
            01:00
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
