import React, { useState } from "react";
import {
  FlatList,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
  Image,
  ListRenderItem,
} from "react-native";

import { Input, Button, ThemeProvider } from "@rneui/themed";
import { loginTheme } from "@/theme/login-theme";
import Icon from "react-native-vector-icons/FontAwesome";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { styles } from "@/assets/style/selectavatar";
import { UserData,DataUser } from "@/data/datadummyavatar";

const schema = z.object({
  name: z.string().min(1,"Name is required"),
});


interface FormData {
  name: string;
}

export default function SelectAvatar() {
  const [selectedAvatar, setSelectedAvatar] = useState<number | null>(null);

  const handleContinue = (data:FormData) => {
    alert(`Name: ${data.name}\nSelected Avatar ID: ${selectedAvatar}`);
  };

  const { control, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const renderAvatar: ListRenderItem<UserData> = ({ item }) => (
    <TouchableOpacity onPress={() => setSelectedAvatar(item.id)}>
      <Image
        source={item.avatar}
        style={[
          styles.avatar,
          selectedAvatar === item.id && styles.selectedAvatar,
        ]}
      />
    </TouchableOpacity>
  );

  return (
    <ThemeProvider theme={loginTheme}>
      <ImageBackground
        source={require("@/assets/images/background.jpg")}
        style={styles.background}
      >
        <Image
          source={require("@/assets/images/triviagame.png")}
          style={{ width: 130, height: 80, marginBottom: 60 }}
        />
        <View style={styles.container}>
          <Text style={styles.title}>CHOOSE YOUR AVATAR</Text>
          <FlatList
            data={DataUser}
            renderItem={renderAvatar}
            keyExtractor={(item) => item.id.toString()}
            numColumns={4}
            contentContainerStyle={styles.avatarList}
          />
           <Controller
            control={control}
            name="name"
            render={({ field: { onChange, onBlur, value } }) => (
          <Input
            placeholder="Your Name"
            leftIcon={<Icon name="user" size={20} color="#fff" />}
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            inputStyle={{ color: "#fff", paddingStart: 5 }}
            placeholderTextColor={"#ddd"}
            inputContainerStyle={styles.inputContainer}
            errorMessage={errors.name ? errors.name.message : undefined}
            />
            )}
          />
          <Button
            title="Continue"
            buttonStyle={styles.continueButton}
            onPress={handleSubmit(handleContinue)}
          />
        </View>
      </ImageBackground>
    </ThemeProvider>
  );
}


