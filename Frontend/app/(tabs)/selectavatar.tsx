import React, { useState } from 'react';
import {
  FlatList,
  StyleSheet,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
  Image,
  ListRenderItem
} from 'react-native';

import { Input, Button, ThemeProvider } from '@rneui/themed'
import { loginTheme } from '@/theme/login-theme';
import Icon from 'react-native-vector-icons/FontAwesome';

interface UserData {
  id: number;
  avatar: any;
};

const DataUser: UserData[] = [
  { id: 1, avatar: require('@/assets/avatar/avatar1.jpeg') },
  { id: 2, avatar: require('@/assets/avatar/avatar2.jpeg') },
  { id: 3, avatar: require('@/assets/avatar/avatar3.jpeg') },
  { id: 4, avatar: require('@/assets/avatar/avatar4.jpeg') },
  { id: 5, avatar: require('@/assets/avatar/avatar5.jpeg') },
  { id: 6, avatar: require('@/assets/avatar/avatar6.jpeg') },
  { id: 7, avatar: require('@/assets/avatar/avatar7.jpeg') },
  { id: 8, avatar: require('@/assets/avatar/avatar8.jpeg') },
  { id: 9, avatar: require('@/assets/avatar/avatar9.jpeg') },
  { id: 10, avatar: require('@/assets/avatar/avatar10.jpeg') },
  { id: 11, avatar: require('@/assets/avatar/avatar11.jpeg') },
  { id: 12, avatar: require('@/assets/avatar/avatar12.jpeg') },
];


export default function SelectAvatar() {
  const [selectedAvatar, setSelectedAvatar] = useState<number | null>(null);
  const [name, setName] = useState<string>('');

  const handleContinue = () => {
    alert(`Name: ${name}\nSelected Avatar ID: ${selectedAvatar}`);
  };

  const renderAvatar: ListRenderItem<UserData> = ({ item }) => (
    <TouchableOpacity onPress={() => setSelectedAvatar(item.id)}>
      <Image
        source={item.avatar}
        style={[styles.avatar, selectedAvatar === item.id && styles.selectedAvatar]}
      />
    </TouchableOpacity>
  );



  return (
    <ThemeProvider theme={loginTheme}>
      <ImageBackground
        source={require('@/assets/images/anime.jpg')}
        style={styles.background}
      >
        <Image
          source={require('@/assets/images/triviagame.png')}
          style={{ width: 130, height: 80, marginBottom: 60 }} />
        <View style={styles.container}>
          <Text style={styles.title}>CHOOSE YOUR AVATAR</Text>
          <FlatList
            data={DataUser}
            renderItem={renderAvatar}
            keyExtractor={item => item.id.toString()}
            numColumns={4}
            contentContainerStyle={styles.avatarList}
          />
          <Input
            placeholder='Your Name'
            leftIcon={<Icon name="user" size={20} color="#fff" />}
            value={name}
            onChangeText={setName}
            inputStyle={{ color: '#fff', paddingStart: 5 }}
            placeholderTextColor={'#ddd'}
            inputContainerStyle={styles.inputContainer}
          />
          <Button
            title="Continue"
            buttonStyle={styles.continueButton}
            onPress={handleContinue}
          />
        </View>
      </ImageBackground>
    </ThemeProvider>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: '90%',
    padding: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderRadius: 8,
  },
  title: {
    color: '#fff',
    textAlign: 'center',
    marginBottom: 16,
    fontSize: 18,
    fontWeight: 'bold',
  },
  avatarList: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 35,
    margin: 10,
    borderWidth: 3,
    borderColor: 'transparent',
  },
  selectedAvatar: {
    borderColor: '#ff0',
  },
  inputContainer: {
    borderBottomColor: '#fff',
    marginBottom: -15
  },
  continueButton: {
    backgroundColor: '#28a745',
    padding: 10,
  },
});
