import Diamond from "@/app/(question)/diamond";
import { Button, Icon } from "@rneui/base";
import { useState } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import Dialog from "react-native-dialog";


export default function Headers() {
  const [visible, setVisible] = useState(false);

  const showDialog = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  return (
    <View style={styles.container}>
      <Image source={require('@/assets/images/logo.png')} style={styles.logo} />
      <View style={styles.rightContainer}>
        <View style={styles.containerfree}>
          <Text style={styles.diamondCountfree}>21</Text>
        </View>
        <Image
          source={require("@/assets/images/diamondfree.png")}
          style={styles.diamondIconfree}
        />
        <View style={styles.containerdiamon}>
          <Text style={styles.diamondCount}>21</Text>
        </View>
        <Image
          source={require("@/assets/images/diamond.png")}
          style={styles.diamondIcon}
        />
        <Button
          icon={<Icon name="add" size={15} color="white" />}
          buttonStyle={styles.addButton}
          onPress={showDialog}
        />
        <Dialog.Container
          contentStyle={{ backgroundColor: "#rgba(0,0,0, .8)" }}
          visible={visible}
        >
          <Diamond onClose={handleCancel} />
        </Dialog.Container>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    marginTop: 30,
  },
  logo: {
    width: 70,
    height: 70,
  },
  rightContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  containerfree: {
    flexDirection: "row",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    marginRight: 20,
    borderRadius: 5,
  },
  diamondIconfree: {
    position: "absolute",
    width: 20,
    height: 20,
  },
  diamondCountfree: {
    color: "white",
    fontSize: 18,
    paddingLeft: 30,
  },
  containerdiamon: {
    flexDirection: "row",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
  },
  diamondIcon: {
    position: "absolute",
    left: 70,
    width: 20,
    height: 20,
  },
  diamondCount: {
    color: "white",
    fontSize: 18,
    paddingLeft: 30,
  },
  addButton: {
    backgroundColor: "#00ff00",
    padding: 5,
    borderRadius: 5,
  },
});
