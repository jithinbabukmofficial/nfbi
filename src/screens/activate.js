import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { ScrollView, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import Root from '../components/root';
import { colors, height } from '../constants/constants';
import { cstyles } from '../constants/cstyles';

const Activate = ({
    navigation,
}) => {
    const data = [
        'Free Scratch Cards',
        'Redeem Scratch Card Bonus Upto Rs 10,000 / -',
        'Use all Premium features of NFBI App',
        'You can start doing Business through this app',
        'Use, Refer, Earn Unlimited Income'
    ]
    return (
        <Root>
            <ScrollView style={cstyles.box}>
                <Image style={styles.about} source={require('../assets/activate.svg')} />

                <TouchableWithoutFeedback
                    onPress={() => navigation.navigate('plan')}
                    style={styles.btn}>
                    <Text style={styles.btntext}>Activate</Text>
                    <Image source={require('../assets/activatebtn.svg')} />
                </TouchableWithoutFeedback>


                <View style={styles.container}>
                    {data.map((item, index) => <View key={index.toString()} style={[cstyles.row, { marginBottom: 15 }]}>
                        <Image style={styles.right} source={require('../assets/righticon.svg')} />
                        <Text style={styles.text}>{item}</Text>
                    </View>)}
                </View>
            </ScrollView>
        </Root>
    )
};
const styles = StyleSheet.create({
    btntext: {
        color: colors.primary,
        fontSize: 20,
        fontWeight: 'bold',
        marginRight: 10,
    },
    btn: {
        backgroundColor: '#0E0E10',
        paddingVertical: 15,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        marginVertical: height * .05
    },
    text: {
        color: colors.primary,
        marginLeft: 10,
        fontSize: 17,
        fontWeight: 'bold'
    },
    right: {
        width: 15,
        height: 15,
        resizeMode: 'contain'
    },
    about: {
        marginTop: height * .05,
        alignSelf: 'center'
    },
    container: {
        backgroundColor: colors.inputbg,
        paddingVertical: 15,
        paddingHorizontal: 15,
        borderRadius: 5,
    }
});
export default Activate;
