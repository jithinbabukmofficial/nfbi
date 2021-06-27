import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import AnimateNumber from 'react-native-animate-number'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { colors } from '../constants/constants';
import { cstyles } from '../constants/cstyles';


const Homeitem = ({ data: { title, balance, available, image, route } }) => {
    const nav = useNavigation()
    return (
        <View style={styles.item} >
            <TouchableWithoutFeedback onPress={() => nav.navigate(route)}>
                <View style={cstyles.rowflex}>
                    <Text style={styles.heading}>{title}</Text>
                    <Image source={image} />
                </View>
                {title == 'Return' || title == 'My Wallet' ? <AnimateNumber
                    style={styles.balance}
                    value={balance}
                    timing="easeIn"
                    formatter={(val) => {
                        return '₹ ' + parseFloat(val).toFixed(0)
                    }} /> : <AnimateNumber
                    style={styles.balance}
                    value={balance}
                    timing="easeIn"
                    formatter={(val) => {
                        return '₹ ' + parseFloat(val).toFixed(0)
                    }} />}
                {/* <Text style={styles.balance}>{balance}</Text> */}
                <View style={styles.line} />
                <Text style={styles.subhead}>Available Balance</Text>
                {title == 'Return' || title == 'My Wallet' ?
                    <AnimateNumber
                        style={styles.balance2}
                        value={available}
                        timing="easeIn"
                        formatter={(val) => {
                            return '₹ ' + parseFloat(val).toFixed(0)
                        }} />
                    : <AnimateNumber
                        style={styles.balance2}
                        value={available}
                        timing="easeIn"
                        formatter={(val) => {
                            return '₹ ' + parseFloat(val).toFixed(0)
                        }} />}
            </TouchableWithoutFeedback>
        </View>
    )
};
const styles = StyleSheet.create({
    subhead: {
        color: colors.heading,
        fontSize: 12,
        marginVertical: 7
    },
    line: {
        backgroundColor: '#707473',
        height: 1
    },
    balance: {
        color: colors.primary,
        fontSize: 35,
        fontWeight: 'bold',
        marginVertical: 10
    },
    balance2: {
        color: colors.primary,
        fontSize: 21,
        marginBottom: 5
    },
    heading: {
        color: colors.heading
    },
    item: {
        flex: .48,
        backgroundColor: colors.inputbg,
        borderRadius: 6,
        paddingVertical: 15,
        paddingHorizontal: 10
    }
});
export default Homeitem;
