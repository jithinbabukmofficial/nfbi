import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import Root from '../components/root';
import { colors, height } from '../constants/constants';
import { cstyles } from '../constants/cstyles';

const Slidethree = () => {
    const nav = useNavigation()
    const data = [
        'FREE USER REGISTRATION',
        'PREMIUM UTILITIES AVAILABLE ON APP',
        'DIRECT REFERRAL INCOME 40% (INCLUDING TDS) ',
        'MONTHLY ADDITIONAL BENEFIT 5% (BASED ON BUSINESS PLAN)',
        '2nd LEVEL REFERAL INCOME BENEFIT 4%  ',
        '3rd LEVEL REFERAL INCOME BENEFIT .4%  ',
        '4th LEVEL REFERAL INCOME BENEFIT 0.04%  ',
        'GUARANTEED Scratch Prizes & Price from RS 10/- TO RS 10,000/- '
    ]
    return (
        <Root>
            <View style={cstyles.box}>
                <Image style={styles.about} source={require('../assets/about.svg')} />


                <View style={styles.container}>
                    {data.map((item, index) => <View key={index.toString()} style={[cstyles.row, { marginBottom: 10 }]}>
                        <Image style={styles.right} source={require('../assets/righticon.svg')} />
                        <Text style={styles.text}>{item}</Text>
                    </View>)}
                </View>


            </View>
            <View style={{
                ...StyleSheet.absoluteFill,
                bottom: 15,
                right: 15,
                justifyContent: 'flex-end'
            }}>
                <TouchableWithoutFeedback
                    onPress={() => nav.navigate('login')}
                    style={[cstyles.row, { justifyContent: 'flex-end' }]}>
                    <Text style={styles.next}>Next</Text>
                    <Image style={styles.right} source={require('../assets/righticon.svg')} />
                </TouchableWithoutFeedback>
            </View>
        </Root>
    )
};
const styles = StyleSheet.create({
    next: {
        color: colors.primary,
        marginRight: 7,
        fontSize: 17,
        textTransform: 'uppercase',
    },
    text: {
        color: colors.border,
        marginLeft: 10,
        fontSize: height * 0.018
    },
    right: {
        width: 15,
        height: 15,
        resizeMode: 'contain'
    },
    about: {
        marginTop: height * .1,
        alignSelf: 'center'
    },
    container: {
        backgroundColor: colors.inputbg,
        paddingVertical: 15,
        paddingHorizontal: 15,
        borderRadius: 5,
        marginTop: height * .1
    }
});
export default Slidethree;
