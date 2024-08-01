import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    background: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    container: {
      width: "90%",
      padding: 16,
      backgroundColor: "rgba(0, 0, 0, 0.6)",
      borderRadius: 8,
    },
    title: {
      color: "#fff",
      textAlign: "center",
      marginBottom: 16,
      fontSize: 18,
      fontWeight: "bold",
    },
    avatarList: {
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 12,
    },
    avatar: {
      width: 50,
      height: 50,
      borderRadius: 35,
      margin: 10,
      borderWidth: 3,
      borderColor: "transparent",
    },
    selectedAvatar: {
      borderColor: "#ff0",
    },
    inputContainer: {
      borderBottomColor: "#fff",
    },
    continueButton: {
      backgroundColor: "#28a745",
      padding: 10,
      marginTop:-10
    },
  });