import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { colors, width } from '../constants/constants';
import { cstyles } from '../constants/cstyles';

const Menuitem = ({
    title,
    sub,
    icon
}) => {
    const [open, setOpen] = useState(false)
    const nav = useNavigation()
    return (
        <View style={styles.container}>
            <TouchableWithoutFeedback
                onPress={() => setOpen(!open)}
                style={[cstyles.rowflex, styles.menu]}>
                <View style={cstyles.row}>
                    <Image style={styles.icon} source={icon} />
                    <Text style={styles.menutext}>{title}</Text>
                </View>
                <Image source={open ? require('../assets/bottomicon.svg') : require('../assets/righticon.svg')} />
            </TouchableWithoutFeedback>
            {open &&
                sub.map(item => <TouchableWithoutFeedback
                    onPress={() => nav.navigate(item.route)}
                    style={[styles.subitem, styles.menu]}>
                    <Text style={[styles.menutext, { textTransform: 'uppercase' }]}>{item.name}</Text>
                </TouchableWithoutFeedback>)
            }
        </View>
    )
};
const styles = StyleSheet.create({
    icon: {
        height: 30,
        width: 30,
        resizeMode: 'contain',
        marginRight: 10
    },
    container: {
        backgroundColor: colors.inputbg,
        marginHorizontal: 10,
        borderRadius: 6,
        marginBottom: 10
    },
    subitem: {
        paddingLeft: 70,
        marginBottom: 8
    },
    menutext: {
        color: colors.primary,
        fontSize: 16,
        textTransform: 'uppercase'
    },
    menu: {
        paddingVertical: 10,
        paddingHorizontal: 15,
    },
});
export default Menuitem;
