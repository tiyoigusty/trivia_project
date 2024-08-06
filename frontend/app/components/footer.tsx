import { Button } from "@rneui/base";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { View, Alert, StyleSheet } from "react-native";
import io, { Socket } from "socket.io-client";

const socket: Socket = io(
  "https://44b6-2404-8000-1005-37ac-2816-cc52-9a6-fedb.ngrok-free.app"
);

export default function StartMatch() {
  const [roomId, setRoomId] = useState("");
  const [messages, setMessages] = useState<string[]>([]);
  const router = useRouter();

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to socket server");
    });

    socket.on("matchFound", (data) => {
      Alert.alert(
        `Match found: Room ID: ${data.roomId}, User ID: ${data.userId}`
      );
      setRoomId(data.roomId);
      setMessages((prevMessages) => [
        ...prevMessages,
        `Match found in room ${data.roomId}`,
      ]);
    });

    socket.on("roomFull", (roomId) => {
      Alert.alert(`Room ${roomId} is full.`);
      setMessages((prevMessages) => [
        ...prevMessages,
        `Room ${roomId} is full`,
      ]);
    });

    socket.on("userLeft", (userId) => {
      console.log(`User ${userId} left the room.`);
      setMessages((prevMessages) => [
        ...prevMessages,
        `User ${userId} left the room`,
      ]);
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from socket server");
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const joinRoom = () => {
    socket.emit("joinRoom");
    router.push("/finding-match");
  };

  return (
    <View style={styles.container}>
      <Button
        title="Start Game"
        buttonStyle={styles.button}
        onPress={joinRoom}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  button: {
    borderRadius: 10,
    backgroundColor: "#0ACF83",
    color: "#FFFFFF",
  },
});
