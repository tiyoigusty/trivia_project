import { Button } from "@rneui/base";
import { View, Image, StyleSheet } from "react-native";


export default function Footers() {
    return (
        <View style={styles.countainer4}>
            <Image source={require('@/assets/images/logo.png')} style={styles.countainerImage}></Image>
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