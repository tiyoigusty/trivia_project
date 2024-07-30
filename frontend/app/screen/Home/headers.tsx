import { Button, Icon } from "@rneui/base";
import { View, Text, Image, StyleSheet } from "react-native";

const AvatarDefault = { uri: 'https://static.vecteezy.com/system/resources/thumbnails/027/951/137/small_2x/stylish-spectacles-guy-3d-avatar-character-illustrations-png.png' }
export default function Headers() {
    return (
        <View style={styles.container}>
            <Image
                source={AvatarDefault}
                style={styles.logo}
            />
            <View style={styles.rightContainer}>
                <View style={styles.containerfree}>
                    <Text style={styles.diamondCountfree}>21</Text>
                </View>
                <Image
                    source={require('@/assets/images/diamondfree.png')}
                    style={styles.diamondIconfree}
                />
                <View style={styles.containerdiamon}>
                    <Text style={styles.diamondCount}>21</Text>
                </View>
                <Image
                    source={require('@/assets/images/diamond.png')}
                    style={styles.diamondIcon}
                />
                <Button
                    icon={
                        <Icon
                            name="add"
                            size={15}
                            color="white"
                        />
                    }
                    buttonStyle={styles.addButton}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
        marginTop: 30,
    },
    logo: {
        width: 70,
        height: 70,
    },
    rightContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    containerfree: {
        flexDirection: 'row',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        marginRight: 20,
        borderRadius: 5,
    },
    diamondIconfree: {
        position: 'absolute',
        width: 20,
        height: 20,
    },
    diamondCountfree: {
        color: 'white',
        fontSize: 18,
        paddingLeft: 30,
    },
    containerdiamon: {
        flexDirection: 'row',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5,
    },
    diamondIcon: {
        position: 'absolute',
        left: 70,
        width: 20,
        height: 20,
    },
    diamondCount: {
        color: 'white',
        fontSize: 18,
        paddingLeft: 30,
    },
    addButton: {
        backgroundColor: '#00ff00',
        padding: 5,
        borderRadius: 5,
    },
});