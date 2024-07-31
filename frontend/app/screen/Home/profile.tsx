import AvatarSelectionDialog from "@/components/home/AvatarSelectionDialog";
import { Avatar } from "@/components/home/type";
import { Icon } from "@rneui/base";
import { Button } from "@rneui/themed";
import { useState } from "react";
import { StyleSheet, View, Text, Image } from "react-native";


const Profile: React.FC = () => {

    const [dialogVisible, setDialogVisible] = useState(false);

    const [selectedAvatar, setSelectedAvatar] = useState<Avatar | null>(null);

    const avatars = [
        { id: 1, uri: 'https://img.freepik.com/free-psd/3d-render-avatar-character_23-2150611771.jpg?size=338&ext=jpg', price: 'FREE' },
        { id: 2, uri: 'https://img.freepik.com/free-psd/3d-render-avatar-character_23-2150611713.jpg?size=338&ext=jpg', price: 'FREE' },
        { id: 3, uri: 'https://www.kindpng.com/picc/m/673-6735284_avatar-vector-icon-boy-png-download-png-people.png', price: 200 },
        { id: 4, uri: 'https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg?size=338&ext=jpg', price: 25 },
        { id: 5, uri: 'https://getillustrations.b-cdn.net//photos/pack/3d-avatar-male_lg.png', price: 30 },
        { id: 6, uri: 'https://png.pngtree.com/png-vector/20231019/ourmid/pngtree-user-profile-avatar-png-image_10211467.png', price: 100 },
    ];

    const defaultAvatar = {
        uri: 'https://png.pngtree.com/element_our/20200610/ourmid/pngtree-character-default-avatar-image_2237203.jpg'
    };

    const handleOpenDialog = () => {
        setDialogVisible(true);
    };

    const handleCloseDialog = () => {
        setDialogVisible(false);
    };

    const handleSaveSelection = (avatar: Avatar) => {
        setSelectedAvatar(avatar);
    };

    return (
        <View style={styles.countainer3}>
            <View style={styles.avatarContainer1}>
                <AvatarSelectionDialog
                    visible={dialogVisible}
                    onClose={handleCloseDialog}
                    onSave={handleSaveSelection}
                    avatars={avatars}
                />
                <Image source={{ uri: selectedAvatar ? selectedAvatar.uri : defaultAvatar.uri }} style={styles.selectedAvatar} />
                <Button containerStyle={styles.editIcon} title="Open Dialog" onPress={handleOpenDialog}>
                    <Icon name='heartbeat'
                        type='font-awesome' />
                </Button>
            </View>
            <Text style={styles.username}>Nama_Users</Text>
        </View>
    )
}

export default Profile

const styles = StyleSheet.create({
    countainer3: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatarContainer1: {
        position: 'relative',
    },
    avatar1: {
        width: 80,
        height: 80,
        borderRadius: 50,
    },
    editIcon: {
        position: 'absolute',
        height: 20,
        width: 20,
        right: 0,
        left: 70,
        bottom: 15,
        backgroundColor: '#1E37FF',
        borderRadius: 50,
    },
    username: {
        marginTop: 10,
        fontSize: 24,
        color: '#1E37FF',
        fontWeight: 'bold',
        marginBottom: 100
    },
    container: {
        backgroundColor: '#b0c4de',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
    },
    avatarGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    avatarContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        margin: 10,
    },
    avatar: {
        width: 80,
        height: 80,
        borderRadius: 40,
        marginBottom: 5,
    },
    price: {
        color: 'black',
        fontSize: 16,
    },
    buttonContainer: {
        flexDirection: 'row',
        marginTop: 20,
    },
    cancelButton: {
        backgroundColor: 'red',
        marginRight: 10,
    },
    saveButton: {
        backgroundColor: 'green',
    },
    selectedAvatarContainer: {
        alignItems: 'center',
        marginTop: 20,
    },
    selectedAvatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 10,
    },
})