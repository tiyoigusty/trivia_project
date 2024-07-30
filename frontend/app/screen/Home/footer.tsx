import { Button } from "@rneui/base";
import { View, Image, StyleSheet } from "react-native";

const LogoDefault = { uri: 'https://static.vecteezy.com/system/resources/thumbnails/027/951/137/small_2x/stylish-spectacles-guy-3d-avatar-character-illustrations-png.png' }


export default function Footers() {
    return (
        <View style={styles.countainer4}>
            <Image source={LogoDefault} style={styles.countainerImage}></Image>
            <Button title="Log in"
                loading={false}
                titleStyle={styles.tittleButton}
                loadingProps={{ size: 'small', color: 'white' }}
                buttonStyle={styles.buttonColor}>Start Game</Button>

        </View>
    )
}

const styles = StyleSheet.create({
    countainer4: {
        alignItems: 'center',
    },
    countainerImage: {
        width: 180,
        height: 180,
        justifyContent: 'center',
    },
    buttonColor: {
        borderRadius: 10,
        backgroundColor: '#0ACF83',
        color: '#FFFFFF',
    },
    tittleButton: {
        fontSize: 30
    },
    bgInput: {
        backgroundColor: '#FFFFFF'
    },
})