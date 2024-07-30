import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Dialog, Button } from "@rneui/themed";
import { Avatar } from "./type";

interface AvatarSelectionDialogProps {
  visible: boolean;
  onClose: () => void;
  onSave: (selectedAvatar: Avatar) => void;
  avatars: Avatar[];
}

const AvatarSelectionDialog: React.FC<AvatarSelectionDialogProps> = ({
  visible,
  onClose,
  onSave,
  avatars,
}) => {
  const [selectedAvatar, setSelectedAvatar] = React.useState<Avatar | null>(
    null
  );

  const handleSave = () => {
    if (selectedAvatar) {
      onSave(selectedAvatar);
      onClose();
    }
  };

  const getDiamondImage = (price: number | string) => {
    const numericPrice = typeof price === "string" ? parseFloat(price) : price;
    if (numericPrice >= 100) {
      return require("@/assets/images/diamondfree.png");
    } else if (numericPrice <= 99) {
      return require("@/assets/images/diamond.png");
    } else {
      return null;
    }
  };

  return (
    <Dialog isVisible={visible} onBackdropPress={onClose}>
      <View style={styles.container}>
        <View style={styles.avatarGrid}>
          {avatars.map((avatar) => (
            <TouchableOpacity
              key={avatar.id}
              style={[
                styles.avatarContainer,
                selectedAvatar &&
                  selectedAvatar.id === avatar.id &&
                  styles.selectedAvatarContainer,
              ]}
              onPress={() => setSelectedAvatar(avatar)}
            >
              <Image source={{ uri: avatar.uri }} style={styles.avatar} />
              <View style={styles.priceContainer}>
                {avatar.price !== "FREE" && (
                  <Image
                    source={getDiamondImage(avatar.price)}
                    style={styles.diamondIcon}
                  />
                )}
                <Text style={styles.price}>{avatar.price}</Text>
              </View>
              {selectedAvatar && selectedAvatar.id === avatar.id && (
                <Text style={styles.selected}>Selected</Text>
              )}
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.buttonContainer}>
          <Button
            title="Cancel"
            onPress={onClose}
            buttonStyle={styles.cancelButton}
          />
          <Button
            title="Save"
            onPress={handleSave}
            buttonStyle={styles.saveButton}
          />
        </View>
      </View>
    </Dialog>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#b0c4de",
    padding: 5,
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
  selectedAvatarContainer: {
    borderWidth: 2,
    borderColor: "blue",
  },
  selected: {
    color: "blue",
    fontSize: 12,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 5,
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  diamondIcon: {
    width: 20,
    height: 20,
    marginRight: 5,
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
});

export default AvatarSelectionDialog;
