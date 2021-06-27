import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Text, View, StyleSheet, Image, SafeAreaView } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { colors, height, width } from '../constants/constants';

const HomeHeader = () => {
    const nav = useNavigation()
    return (
        <SafeAreaView style={styles.container}>
            <TouchableWithoutFeedback style={styles.btn} onPress={() => nav.toggleDrawer()}>
                <Image style={styles.image} source={require('../assets/hmenu.svg')} />
            </TouchableWithoutFeedback>
            <View style={styles.logocontainer}>
                <Image style={styles.logo} source={require('../assets/logo.svg')} />
            </View>
        </SafeAreaView>
    )
};
const styles = StyleSheet.create({
    logo: {
        width: width * .25,
        resizeMode: 'contain',
        height: height * .04
    },
    btn: {
        paddingVertical: 10,
        paddingRight: 10
    },
    logocontainer: {
        flex: 1,
        alignItems: 'center',
        marginRight: 40
    },
    title: {
        color: colors.primary,
        fontSize: 21,
        fontWeight: '500',
        textAlign: 'center'
    },
    image: {
        height: 20,
        marginRight: 20,
        resizeMode: 'contain'
    },
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        height: height * .08,
        backgroundColor: colors.headerbg,
        paddingHorizontal: width * .05,
        marginBottom: 10
    }
});
export default HomeHeader;
