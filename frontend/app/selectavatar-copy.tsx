import { api } from "@/libs/api";
import { getToken } from "@/libs/storage";
import { loginTheme } from "@/theme/login-theme";
import { Avatar, Button, Input, ThemeProvider } from "@rneui/themed";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { UserAvatar } from "./types/type";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { StyleSheet } from "react-native";

type UserForm = {
  username: string;
};

const userSchema = z.object({
  username: z.string().min(1, "Username is required"),
});

export const useUserForm = () => {
  const form = useForm<UserForm>({
    mode: "onChange",
    resolver: zodResolver(userSchema),
  });

  return form;
};

export default function SelectAvatarCopy() {
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useUserForm();

  const [selectedAvatar, setSelectedAvatar] = useState<UserAvatar>({
    id: "",
    is_active: false,
    Avatar: { id: "", coin: 0, diamond: 0, image: "" },
  });

  const {
    data: userData,
    error,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["user"],
    queryFn: getDataUser,
  });

  async function getDataUser() {
    const token = await getToken();
    const response = await axios.get(`${api}/avatar/user`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  }

  useEffect(() => {
    refetch();
  }, [userData]);

  const queryClient = useQueryClient();

  const changeAvatarMutation = useMutation({
    mutationFn: async () => {
      const token = await getToken();
      return await axios({
        method: "patch",
        url: `${api}/avatar/change-avatar/${selectedAvatar.id}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      refetch();
    },
  });

  const updateUserMutation = useMutation({
    mutationFn: async (data: UserForm) => {
      const token = await getToken();
      return await axios({
        method: "patch",
        url: `${api}/avatar/user`,
        data,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
    },
  });

  async function onSubmit(data: UserForm) {
    try {
      await changeAvatarMutation.mutateAsync();
      await updateUserMutation.mutateAsync(data);
      router.navigate("/home");
    } catch (error) {
      console.log(error);
    }
  }

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

  const userAvatars = userData?.data?.user_avatar;

  return (
    <ThemeProvider theme={loginTheme}>
      <ImageBackground
        source={require("@/assets/images/background.jpg")}
        style={{
          height: "100%",
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          source={require("@/assets/images/logo.png")}
          style={{ width: 130, height: 80, marginBottom: 60 }}
        />
        <View
          style={{
            width: "90%",
            padding: 16,
            backgroundColor: "rgba(0, 0, 0, 0.6)",
            borderRadius: 10,
          }}
        >
          <Text
            style={{
              color: "#fff",
              textAlign: "center",
              marginBottom: 16,
              fontSize: 18,
              fontWeight: "bold",
            }}
          >
            CHOOSE YOUR AVATAR
          </Text>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: 10,
            }}
          >
            {userAvatars.map((data: UserAvatar) => (
              <TouchableOpacity
                key={data.id}
                style={[
                  styles.avatarTouchable,
                  selectedAvatar.id === data.id && styles.selectedAvatar,
                ]}
                onPress={() => setSelectedAvatar(data)}
              >
                <Avatar
                  size="large"
                  rounded
                  source={{ uri: data.Avatar.image }}
                />
              </TouchableOpacity>
            ))}
          </View>
          <Controller
            control={control}
            name="username"
            defaultValue=""
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                placeholder="Your Name"
                leftIcon={<Icon name="user" size={20} color="#fff" />}
                inputStyle={{ color: "#fff", paddingStart: 5 }}
                placeholderTextColor="#ddd"
                inputContainerStyle={{
                  borderBottomColor: "#fff",
                  marginTop: 10,
                }}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                errorMessage={errors.username ? errors.username.message : ""}
              />
            )}
          />
          <Button
            title="Continue"
            buttonStyle={{
              backgroundColor: "#28a745",
              padding: 10,
              marginTop: -10,
            }}
            onPress={handleSubmit(onSubmit)}
          />
        </View>
      </ImageBackground>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  selectedAvatar: {
    borderColor: "#ff0",
  },
  avatarTouchable: {
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 3,
    borderRadius: 50,
    borderColor: "white",
    backgroundColor: "rgba(255,255,255, .6)",
  },
});
