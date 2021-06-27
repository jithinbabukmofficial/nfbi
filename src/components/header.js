import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Text, View, StyleSheet, Image, SafeAreaView } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { colors, height, width } from '../constants/constants';

const Header = ({
    title,
}) => {
    const nav = useNavigation()
    return (
        <SafeAreaView style={styles.container}>
            <TouchableWithoutFeedback style={styles.backcontainer} onPress={() => nav.goBack()}>
                <Image style={styles.image} source={require('../assets/back.svg')} />
            </TouchableWithoutFeedback>
            <Text style={styles.title}>{title}</Text>
        </SafeAreaView>
    )
};
const styles = StyleSheet.create({
    backcontainer: {
        padding: 10,
    },
    title: {
        color: colors.primary,
        fontSize: 17,
        fontWeight: '500'
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
export default Header;
