import { Button } from "@rneui/base";
import { useEffect, useState } from "react";
import { View, Image, StyleSheet } from "react-native";
import io, { Socket } from "socket.io-client";

const LogoDefault = {
  uri: "https://static.vecteezy.com/system/resources/thumbnails/027/951/137/small_2x/stylish-spectacles-guy-3d-avatar-character-illustrations-png.png",
};

const newSocket = io(
  "https://a86e-2404-8000-1005-a6b5-c88c-d203-3e06-6e41.ngrok-free.app/"
);

export default function Footers() {
  //   const [socket, setSocket] = useState<Socket | null>(null);
  const [roomId, setRoomId] = useState("");
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    newSocket.on("connect", () => {
      console.log("Connected to socket server");
    });

    newSocket.on("matchFound", (data) => {
      console.log(
        `Match found: Room ID: ${data.roomId}, User ID: ${data.userId}`
      );
      setRoomId(data.roomId);
      setMessages((prevMessages) => [
        ...prevMessages,
        `Match found in room ${data.roomId}`,
      ]);
    });

    newSocket.on("roomFull", (roomId) => {
      console.log(`Room ${roomId} is full.`);
      setMessages((prevMessages) => [
        ...prevMessages,
        `Room ${roomId} is full`,
      ]);
    });

    newSocket.on("userLeft", (userId) => {
      console.log(`User ${userId} left the room.`);
      setMessages((prevMessages) => [
        ...prevMessages,
        `User ${userId} left the room`,
      ]);
    });

    newSocket.on("disconnect", () => {
      console.log("Disconnected from socket server");
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);

  const joinRoom = () => {
    if (newSocket) {
      newSocket.emit("joinRoom");
    }
  };

  const leaveRoom = () => {
    if (newSocket) {
      newSocket.emit("leaveRoom");
      setRoomId("");
    }
  };

  return (
    <View style={styles.countainer4}>
      <Image source={LogoDefault} style={styles.countainerImage}></Image>
      <Button
        title="Log in"
        loading={false}
        titleStyle={styles.tittleButton}
        loadingProps={{ size: "small", color: "white" }}
        buttonStyle={styles.buttonColor}
        onPress={joinRoom}
      >
        Start Game
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  countainer4: {
    alignItems: "center",
  },
  countainerImage: {
    width: 180,
    height: 180,
    justifyContent: "center",
  },
  buttonColor: {
    borderRadius: 10,
    backgroundColor: "#0ACF83",
    color: "#FFFFFF",
  },
  tittleButton: {
    fontSize: 30,
  },
  bgInput: {
    backgroundColor: "#FFFFFF",
  },
});
