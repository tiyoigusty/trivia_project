import { api } from "@/libs/api";
import { Avatar } from "@rneui/themed";
import axios from "axios";
import { useEffect, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { useMutation, useQuery } from "@tanstack/react-query";

interface Avatar {
  id: string;
  image: string;
  diamond: number;
  coin: number;
}

interface UserAvatar {
  Avatar: Avatar;
}

interface User {
  id: string;
  name: string;
  coin: number;
  diamond: number;
  user_avatar: UserAvatar[];
}

export default function BuyAvatarDialog({
  onClose,
  data,
}: {
  onClose: any;
  data: User;
}) {
  const [selectedAvatar, setSelectedAvatar] = useState<Avatar>({
    id: "",
    coin: 0,
    diamond: 0,
    image: "",
  });

  const {
    data: avatarData,
    error,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["buyAvatar"],
    queryFn: getAvatar,
  });

  async function getAvatar() {
    try {
      const response = await axios({
        method: "get",
        url: `${api}/avatar`,
        headers: {
          "Content-Type": "application/json",
        },
      });
      // console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getAvatar();
  }, [data]);

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
    <View>
      <Text
        style={{
          color: "white",
          fontSize: 30,
          marginVertical: 10,
          alignSelf: "center",
        }}
      >
        Buy Avatar
      </Text>
      <View
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "row",
          gap: 20,
          flexWrap: "wrap",
        }}
      >
        {avatarData.map((data: Avatar) => {
          if (data.coin !== 0 && data.diamond === 0) {
            if (selectedAvatar == data) {
              return (
                <TouchableOpacity
                  key={data.id}
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                    borderWidth: 3,
                    borderRadius: 10,
                    borderColor: "yellow",
                    padding: 8,
                    backgroundColor: "rgba(255,255,255, .6)",
                  }}
                  onPress={() => {
                    setSelectedAvatar(data);
                  }}
                >
                  <Avatar
                    size={"large"}
                    rounded
                    source={{
                      uri: data.image,
                    }}
                  />

                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 3,
                      marginTop: 5,
                    }}
                  >
                    <Image
                      source={require("@/assets/images/diamondfree.png")}
                      style={{ width: 20, height: 20 }}
                    />
                    <Text style={{ color: "white", fontSize: 20 }}>
                      {data.coin}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            } else {
              return (
                <TouchableOpacity
                  key={data.id}
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                    borderWidth: 3,
                    borderRadius: 10,
                    borderColor: "white",
                    padding: 8,
                    backgroundColor: "rgba(255,255,255, .6)",
                  }}
                  onPress={() => {
                    setSelectedAvatar(data);
                  }}
                >
                  <Avatar
                    size={"large"}
                    rounded
                    source={{
                      uri: data.image,
                    }}
                  />

                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 3,
                      marginTop: 5,
                    }}
                  >
                    <Image
                      source={require("@/assets/images/diamondfree.png")}
                      style={{ width: 20, height: 20 }}
                    />
                    <Text style={{ color: "white", fontSize: 20 }}>
                      {data.coin}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            }
          }

          if (data.coin === 0 && data.diamond !== 0) {
            if (selectedAvatar == data) {
              return (
                <TouchableOpacity
                  key={data.id}
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                    borderWidth: 3,
                    borderRadius: 10,
                    borderColor: "yellow",
                    padding: 8,
                    backgroundColor: "rgba(255,255,255, .6)",
                  }}
                  onPress={() => {
                    setSelectedAvatar(data);
                  }}
                >
                  <Avatar
                    size={"large"}
                    rounded
                    source={{
                      uri: data.image,
                    }}
                  />

                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 3,
                      marginTop: 5,
                    }}
                  >
                    <Image
                      source={require("@/assets/images/diamond.png")}
                      style={{ width: 20, height: 20 }}
                    />
                    <Text style={{ color: "white", fontSize: 20 }}>
                      {data.diamond}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            } else {
              return (
                <TouchableOpacity
                  key={data.id}
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                    borderWidth: 3,
                    borderRadius: 10,
                    borderColor: "white",
                    padding: 8,
                    backgroundColor: "rgba(255,255,255, .6)",
                  }}
                  onPress={() => {
                    setSelectedAvatar(data);
                  }}
                >
                  <Avatar
                    size={"large"}
                    rounded
                    source={{
                      uri: data.image,
                    }}
                  />

                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 3,
                      marginTop: 5,
                    }}
                  >
                    <Image
                      source={require("@/assets/images/diamond.png")}
                      style={{ width: 20, height: 20 }}
                    />
                    <Text style={{ color: "white", fontSize: 20 }}>
                      {data.diamond}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            }
          }
        })}
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
          <Text style={{ alignSelf: "center" }}>Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
