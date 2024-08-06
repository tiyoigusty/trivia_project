import { api } from "@/libs/api";
import { Avatar } from "@rneui/themed";
import axios from "axios";
import { useEffect, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Dialog from "react-native-dialog";
import BuyAvatarDialog from "./buy-avatar";
import { User, UserAvatar } from "../types/type";
import { getToken } from "@/libs/storage";

export default function AvatarDialog({
  onClose,
  data,
}: {
  onClose: any;
  data: User;
}) {
  const [visible, setVisible] = useState(false);

  const showDialog = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const [selectedAvatar, setSelectedAvatar] = useState<UserAvatar>({
    id: "",
    is_active: false,
    Avatar: { id: "", coin: 0, diamond: 0, image: "" },
  });

  const queryClient = useQueryClient();

  const changeAvatar = useMutation({
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
      onClose();
    },
  });

  return (
    <View>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: 20,
        }}
      >
        <Text
          style={{
            color: "white",
            fontSize: 30,
          }}
        >
          My Avatar
        </Text>
        <TouchableOpacity
          style={{
            backgroundColor: "#5881ff",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderWidth: 1,
            borderColor: "white",
            borderRadius: 10,
          }}
          onPress={showDialog}
        >
          <Text style={{ fontSize: 20, padding: 5 }}>Buy Avatar</Text>
        </TouchableOpacity>
        <Dialog.Container
          contentStyle={{ backgroundColor: "black" }}
          visible={visible}
        >
          <BuyAvatarDialog onClose={handleCancel} data={data} />
        </Dialog.Container>
      </View>

      <View
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "row",
          gap: 20,
          flexWrap: "wrap",
        }}
      >
        {data.user_avatar.map((data: UserAvatar) => {
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
                    uri: data.Avatar.image,
                  }}
                />

                <Text style={{ color: "white", fontSize: 20 }}>Owned</Text>
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
                    uri: data.Avatar.image,
                  }}
                />

                <Text style={{ color: "white", fontSize: 20 }}>Owned</Text>
              </TouchableOpacity>
            );
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
          onPress={async () => {
            await changeAvatar.mutateAsync();
          }}
        >
          <Text style={{ alignSelf: "center" }}>Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
