import React, { useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { ScrollView, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import Header from '../components/header';
import Loader from '../components/loader';
import Root from '../components/root';
import { colors } from '../constants/constants';
import { cstyles } from '../constants/cstyles';

const Salaried = ({
    navigation,
}) => {
    const [loading, setLoading] = useState(false)
    const data = [
        'Salaried',
        'business',
    ]

    return (
        <Root>
            <Header title="" />
            {loading && <Loader />}
            <View style={styles.box}>
                <View style={cstyles.box}>
                    {data.map(item => <TouchableWithoutFeedback
                        onPress={() => {
                            if (item == 'business') navigation.navigate('loan', { title: 'HOUSING LOAN'})
                            else navigation.navigate('housingloan')

                        }}
                        style={styles.container}>
                        <Text style={styles.text}>{item}</Text>
                        <Image style={styles.right} source={require('../assets/righticon.svg')} />
                    </TouchableWithoutFeedback>)}
                </View>
            </View>
        </Root>
    )
};
const styles = StyleSheet.create({
    box: {
        flex: 1,
    },
    text: {
        fontSize: 20,
        color: colors.primary,
        textTransform: 'uppercase'
    },
    right: {
        width: 15,
        height: 15,
        resizeMode: 'contain'
    },
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: colors.inputbg,
        paddingVertical: 20,
        paddingHorizontal: 15,
        borderRadius: 5,
        marginBottom: 15
    }
});
export default Salaried;

