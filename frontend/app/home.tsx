import { api } from "@/libs/api";
import { getToken } from "@/libs/storage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Button } from "@rneui/base";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { ImageBackground, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Headers from "./components/headers";
import Profile from "./components/profile";

export default function Home() {
  const {
    data: userData,
    error,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["user"],
    queryFn: getDataUser,
  });

  const DataUser = userData?.data;

  async function getDataUser() {
    const token = await getToken();
    const response = await axios({
      method: "get",
      url: `${api}/avatar/user`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  }

  useEffect(() => {
    getDataUser();
    refetch();
  }, [userData]);

  const router = useRouter();

  const joinRoom = async () => {
    try {
      await AsyncStorage.setItem("userData", JSON.stringify(DataUser));
      router.push("/finding-match");
    } catch (e) {
      console.error("Failed to save user data", e);
    }
  };

  // Adding this effect to refetch user data when the component mounts
  useEffect(() => {
    getDataUser();
    refetch();
  }, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Error loading data...</Text>
      </View>
    );
  }

  return (
    <ImageBackground
      source={require("@/assets/images/background.jpg")}
      style={{
        height: "100%",
        width: "100%",
      }}
    >
      <SafeAreaView>
        <Headers data={DataUser} />
        <View style={{ justifyContent: "space-between", marginTop: 20 }}>
          <Profile data={DataUser} />

          <View style={{ alignItems: "center" }}>
            <Button
              title="Start Game"
              buttonStyle={{
                borderRadius: 10,
                backgroundColor: "#0ACF83",
              }}
              onPress={joinRoom}
            />
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}
