import { StyleSheet, ImageBackground, View, Text } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import Headers from "./components/headers";
import Profile from "./components/profile";
import Footers from "./components/footer";
import { useEffect, useState } from "react";
import axios from "axios";
import { api } from "@/libs/api";
import { useQuery } from "@tanstack/react-query";
import { getToken } from "@/libs/storage";

interface Avatar {
  id: string;
  image: string;
  diamond: number;
  coin: number;
}

interface UserAvatar {
  id: string;
  is_active: boolean;
  Avatar: Avatar;
}

interface User {
  id: string;
  name: string;
  coin: number;
  diamond: number;
  user_avatar: UserAvatar[];
}

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

  // console.log("data user dari home", userData);
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
        <View style={styles.countainer2}>
          <Profile data={DataUser} />

          <Footers />
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  countainerprov: {
    display: "flex",
  },
  countainer2: {
    justifyContent: "space-between",
    marginTop: 20,
  },
});
