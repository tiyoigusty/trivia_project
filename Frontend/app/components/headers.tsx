import { Button, Icon } from "@rneui/base";
import { useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import Dialog from "react-native-dialog";
import Diamond from "./diamond";

export default function Headers({ data }: { data: any }) {
  const [visible, setVisible] = useState(false);

  const showDialog = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  return (
    <View style={styles.container}>
      <Image source={require("@/assets/images/logo.png")} style={styles.logo} />

      <View style={styles.rightContainer}>
        <Image
          source={require("@/assets/images/diamondfree.png")}
          style={{ width: 25, height: 25, zIndex: 1 }}
        />
        <Text style={styles.diamondCountfree}>{data.coin}</Text>

        <Image
          source={require("@/assets/images/diamond.png")}
          style={{ width: 23, height: 23, zIndex: 1 }}
        />
        <Text style={styles.diamondCount}>{data.diamond}</Text>
        <Button
          icon={<Icon name="add" size={15} color="white" />}
          buttonStyle={styles.addButton}
          onPress={showDialog}
        />
        <Dialog.Container
          contentStyle={{ backgroundColor: "#rgba(0,0,0, .8)" }}
          visible={visible}
        >
          <Diamond onClose={handleCancel} data={data} />
        </Dialog.Container>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 30,
  },
  logo: {
    width: 70,
    height: 70,
  },
  rightContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  diamondCountfree: {
    color: "black",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: 5,
    fontSize: 18,
    marginRight: 10,
    marginLeft: -10,
    width: 60,
    textAlign: "center",
  },
  diamondCount: {
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: 5,
    color: "black",
    fontSize: 18,
    width: 70,
    textAlign: "center",
    marginHorizontal: -10,
  },
  addButton: {
    backgroundColor: "#e474ba",
    borderWidth: 1,
    borderColor: "white",
    padding: 5,
    borderRadius: 5,
  },
});
