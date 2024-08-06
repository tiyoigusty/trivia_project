import AvatarSelectionDialog from "@/components/home/AvatarSelectionDialog";
import { Icon } from "@rneui/base";
import { Button } from "@rneui/themed";
import { useEffect, useState } from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import Dialog from "react-native-dialog";
import AvatarDialog from "./avatar";
import { Avatar, User } from "../types/type";

export default function Profile({ data }: { data: User }) {
  const [visible, setVisible] = useState(false);
  const [useAvatar, setUseAvatar] = useState<Avatar | null>();

  useEffect(() => {
    data?.user_avatar.forEach((value) => {
      if (value.is_active == true) {
        setUseAvatar(value.Avatar);
      }
    });
  }, [data]);

  const showDialog = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  return (
    <View style={styles.countainer3}>
      <View style={styles.avatarContainer1}>
        <Image
          source={{
            uri: useAvatar?.image,
          }}
          style={styles.selectedAvatar}
        />
        <TouchableOpacity
          style={{
            position: "absolute",
            right: 10,
            bottom: 10,
            width: 40,
            height: 40,
            borderRadius: 100,
            backgroundColor: "#5881ff",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderWidth: 1,
            borderColor: "white",
          }}
          onPress={showDialog}
        >
          <Image
            source={require("@/assets/icons/edit.png")}
            style={{ width: 20, height: 20 }}
          />
        </TouchableOpacity>
        <Dialog.Container
          contentStyle={{ backgroundColor: "#rgba(0,0,0, .8)" }}
          visible={visible}
        >
          <AvatarDialog onClose={handleCancel} data={data} />
        </Dialog.Container>
      </View>
      <Text style={styles.username}>{data?.username}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  countainer3: {
    marginTop: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  avatarContainer1: {
    position: "relative",
  },
  avatar1: {
    width: 80,
    height: 80,
    borderRadius: 50,
  },
  username: {
    marginTop: 10,
    fontSize: 35,
    color: "white",
    fontWeight: "bold",
    marginBottom: 100,
  },
  container: {
    backgroundColor: "#b0c4de",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  avatarGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  avatarContainer: {
    flexDirection: "column",
    alignItems: "center",
    margin: 10,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 5,
  },
  price: {
    color: "black",
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: 20,
  },
  cancelButton: {
    backgroundColor: "red",
    marginRight: 10,
  },
  saveButton: {
    backgroundColor: "green",
  },
  selectedAvatarContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  selectedAvatar: {
    width: 150,
    height: 150,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: "white",
    marginBottom: 10,
  },
});
