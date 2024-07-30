import { StyleSheet, ImageBackground, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Headers from '../screen/Home/headers';
import Profile from '../screen/Home/profile';
import Footers from '../screen/Home/footer';

const ImageUrl = { uri: 'https://png.pngtree.com/thumb_back/fh260/background/20200808/pngtree-versus-screen-background-for-e-sport-game-image_389287.jpg' }
export default function HomeScreen() {
  return (
    <ImageBackground source={ImageUrl} style={styles.countainerImageBg}>
      <SafeAreaProvider style={styles.countainerprov}>
        <Headers />
        <View style={styles.countainer2}>
          <Profile />
          <Footers />
        </View>
      </SafeAreaProvider>
    </ImageBackground >
  );
}


const styles = StyleSheet.create({
  countainerImageBg: {
    height: '100%'
  },
  countainerprov: {
    display: 'flex',
  },
  countainer2: {
    justifyContent: 'space-between',
    marginTop: 20
  },
})