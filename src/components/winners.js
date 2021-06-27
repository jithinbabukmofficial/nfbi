import React, { useEffect } from 'react';
import { Text, View, ScrollView, StyleSheet, Image } from 'react-native';
import { base_url, colors } from '../constants/constants';

const Winners = ({
    title,
    data
}) => {
    useEffect(() => {
        console.log(data)
    }, [data])
    return (
        <View style={styles.box}>
            <Text style={styles.heading}>{title}</Text>
            <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
            >
                {data.map(item => item.user && <View style={styles.winnerlist}>
                    <Image style={styles.winnerimage} source={{ uri: `${base_url}/${item.user && item.user.image}` }} />
                    <Text style={styles.winnername}>{item.user.name}</Text>
                </View>)}
            </ScrollView>
        </View>
    )
};
const styles = StyleSheet.create({
    winnername: {
        color: colors.heading,
        fontSize: 15
    },
    winnerimage: {
        height: 60,
        width: 60,
        borderRadius: 60,
        resizeMode: 'cover',
        marginTop: 15,
        marginBottom: 10
    },
    winnerlist: {
        alignItems: 'center',
        paddingRight: 20
    },
    heading: {
        color: colors.heading,
        fontSize: 18,
    },
    box: {
        backgroundColor: colors.inputbg,
        borderRadius: 6,
        paddingVertical: 20,
        paddingHorizontal: 10,
        marginBottom: 20
    }
});
export default Winners;
