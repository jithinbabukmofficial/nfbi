import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Image, StyleSheet, Text, View } from 'react-native';
import Root from '../components/root';
import { apiurl, base_url, colors, height, width } from '../constants/constants';
import { cstyles } from '../constants/cstyles';

const Slideone = ({ navigation }) => {

    const [winners, setWinners] = useState([])
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getWinners()
    }, [])

    const getWinners = () => {
        Axios.get(`${apiurl}/mobileuser/winners`)
            .then(res => res.data)
            .then(res => {
                if (res.status) setWinners(res.winners)
            })
            .catch(e => {
                if (e && e.response && e.response.data) setError(e.response.data)
            })
            .finally(e => setLoading(false))
    }


    return (
        <Root>
            <View style={styles.top}>
                <Image style={styles.topimage} source={require('../assets/winners.svg')} />
            </View>
            <View style={cstyles.box}>
                {loading && <ActivityIndicator color={colors.primary} size="large" />}
                <FlatList
                    numColumns={4}
                    columnWrapperStyle={{ justifyContent: 'space-between' }}
                    renderItem={({ item, index }) => <View key={index.toString()} style={styles.item}>
                        <Image style={styles.pimage} source={{ uri: `${base_url}/${item.user_id.image}` }} />
                        <Text style={styles.name}>{item.user_id.name.substring(0, 8)}</Text>
                        <Text style={styles.designation}>{item.user_id.designation}</Text>
                    </View>}
                    data={winners} />
            </View>
            <View style={[styles.row, { justifyContent: 'center' }]}>
                <Image style={styles.icon2} source={require('../assets/bussiness1.svg')} />
                <Image style={styles.icon2} source={require('../assets/isobussiness.svg')} />
            </View>
            <View style={styles.box2}>
                <View style={styles.row}>
                    <Image style={styles.icon} source={require('../assets/trusted.svg')} />
                    <Image style={styles.icon} source={require('../assets/perfect.svg')} />
                    <Image style={styles.icon} source={require('../assets/passive.svg')} />
                    <Image style={{ width: width * .25, height: width * .2, marginLeft: 10, resizeMode: 'contain' }} source={require('../assets/assurance.svg')} />
                </View>
            </View>
        </Root>
    )
};
const styles = StyleSheet.create({
    pimage: {
        width: width * .12,
        height: width * .12,
        alignSelf: 'center',
        borderRadius: width * .12,
        marginBottom: 7
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    icon2: {
        width: width * .3,
        height: width * .3,
        resizeMode: 'contain',
        marginRight: 10
    },
    icon: {
        width: width * .15,
        height: width * .15,
        resizeMode: 'contain',
        marginRight: 10
    },
    image: {
        resizeMode: 'cover',
        width: width,
    },
    box2: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    item: {
        marginBottom: 15
    },
    designation: {
        fontSize: 13,
        color: colors.primary,
        textAlign: 'center',
        marginTop: 5,
        textTransform:'uppercase'
    },
    name: {
        color: colors.border,
        textAlign: 'center',
        marginTop: 7,
        fontSize: 17,
        fontWeight: 'bold',
        textTransform:'uppercase'
    },
    top: {
        height: height * .2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    topimage: {
        width: width * .6,
        resizeMode: 'contain'
    }
});
export default Slideone;
