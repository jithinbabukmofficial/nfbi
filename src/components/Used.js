import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { colors, width } from '../constants/constants';

const Used = ({
    item,
}) => {
    return (
        <View style={{ width: width * .46,marginBottom:20 }}>
            <View style={{
                justifyContent: "center",
                alignItems: "center",
                width: width * .43,
                height: width * .55,
                backgroundColor: colors.inputbg,
                borderRadius: 10
            }}>
                <View style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: width * .4,
                    backgroundColor: colors.inputbg,
                    borderRadius: 10
                }}>
                    <Image style={{ resizeMode: 'contain', height: width * .25 }} source={require('../assets/trophy.svg')} />
                    <Text style={styles.wontext}>{'You Won'}</Text>
                    <Text style={styles.price}>₹ {item.amount}</Text>
                </View>
            </View>
        </View>
    )
};
const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.8)'
    },
    price: {
        color: colors.primary,
        fontWeight: '100',
        fontSize: 30
    },
    wontext: {
        color: '#ABAEAD',
        fontSize: 21,
        marginVertical: 5
    },
    winimage: {
        width: width * .3,
        height: width * .2,
        resizeMode: 'contain'
    },
    scratchcardcontainer: {
        flex: .48,
        height: width * .5,
        width: width * .6,
        borderRadius: 10,
        overflow: 'hidden',
        marginBottom: 20
    },
});
export default Used;
