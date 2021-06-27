import React, { useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { ScrollView, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import Header from '../components/header';
import Loader from '../components/loader';
import Root from '../components/root';
import { colors } from '../constants/constants';
import { cstyles } from '../constants/cstyles';

const Development = ({
    navigation,
}) => {
    const [loading, setLoading] = useState(false)
    const data = [
        'Wealth Mastery',
        'Freedom Yogi',
        'Billionaire Meditation',
        'Spoken English',
        'Thought Mastery',
        'Law Of Attraction',
        'Mind Power Training',
        'Money Magnatisam',
        'Online Trading Training',
        'Power Yogi'
    ]

    const submit = () => {
        setLoading(true),
            setTimeout(() => {
                setLoading(false)
            }, 2000);
    }
    return (
        <Root>
            <Header title="Business Development Training" />
            {loading && <Loader />}
            <ScrollView>
                <View style={cstyles.box}>
                    {data.map(item => <TouchableWithoutFeedback
                        onPress={() => navigation.navigate('devlead', { lead: item, page: 'success' })}
                        style={styles.container}>
                        <Text style={styles.text}>{item}</Text>
                        <Image style={styles.right} source={require('../assets/righticon.svg')} />
                    </TouchableWithoutFeedback>)}
                </View>
            </ScrollView>
        </Root>
    )
};
const styles = StyleSheet.create({
    text: {
        fontSize: 17,
        color: colors.border
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
export default Development;
