import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, Image, ActivityIndicator } from 'react-native';
import { ScrollView, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import { plandetails } from '../components/data';
import Header from '../components/header';
import Root from '../components/root';
import { apiurl, colors, width } from '../constants/constants';
import { cstyles } from '../constants/cstyles';

const Plan = ({
    navigation,
}) => {
    const [loading, setLoading] = useState(false)
    const { token: { token }, user } = useSelector(state => state)
    const [balance, setBalance] = useState(0)
    const [plan, setPlan] = useState(0)
    const [error, setError] = useState(null)
    // const [total, setTotal] = useState(0)


    useEffect(() => {
        navigation.addListener('focus', () => {
            getData()
        });
        setError(null)
    }, [plan])

    const getData = () => {
        setLoading(true)
        Axios.get(`${apiurl}/usertoken/balance`, { headers: { 'auth-token': token } })
            .then(res => res.data)
            .then(({ count }) => setBalance(count))
            .catch(e => console.log(e.response.data))
            .finally(val => setLoading(false))
    }

    const activate = async () => {
        if (loading) return
        setLoading(true)
        console.warn(plan)
        let formdata = new FormData()
        formdata.append('count', plan)
        Axios.post(`${apiurl}/usertoken/activate`, formdata, { headers: { 'auth-token': token } })
            .then(res => res.data)
            .then(res => {
                if (res.status) {
                    navigation.navigate('success')
                }
                console.warn(res)
            })
            .catch(e => {
                if (e && e.response && e.response.data) setError(e.response.data)
                console.warn(e)
            })
            .finally(e => setLoading(false))
    }
    return (
        <Root>
            <Header title="Business Plan" />
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={[cstyles.box, { flex: 1 }]}>
                    <View style={cstyles.rowflex}>
                        <View style={[styles.item, plan == 1 && styles.selected]}>
                            <TouchableWithoutFeedback
                                style={{ justifyContent: 'space-between' }}
                                onPress={() => setPlan(1)}>
                                <Text style={styles.itemtitle}>Silver</Text>
                                <Image style={styles.planimage} source={require('../assets/silver.svg')} />
                                <Text style={styles.itemprice}>₹ 2,500/-</Text>
                            </TouchableWithoutFeedback>
                        </View>
                        <View style={[styles.item, plan == 2 && styles.selected]}>
                            <TouchableWithoutFeedback
                                style={{ justifyContent: 'space-between' }}
                                onPress={() => setPlan(2)}>
                                <Text style={styles.itemtitle}>Gold</Text>
                                <Image style={styles.planimage} source={require('../assets/gold.svg')} />
                                <Text style={styles.itemprice}>₹ 5,000/-</Text>
                            </TouchableWithoutFeedback>
                        </View>
                    </View>
                    <View style={cstyles.rowflex}>
                        <View style={[styles.item, plan == 4 && styles.selected]}>
                            <TouchableWithoutFeedback onPress={() => setPlan(4)}>
                                <Text style={styles.itemtitle}>Platinum</Text>
                                <Image style={styles.planimage} source={require('../assets/platinum.svg')} />
                                <Text style={styles.itemprice}>₹ 10,000/-</Text>
                            </TouchableWithoutFeedback>
                        </View>
                        <View style={[styles.item, plan == 40 && styles.selected, { overflow: 'hidden', }]}>
                            <TouchableWithoutFeedback>
                                <Text style={styles.itemtitle}>Diamond</Text>
                                <Image style={styles.planimage} source={require('../assets/diamond.svg')} />
                                <Text style={styles.itemprice}>₹ 1,00,000/-</Text>
                            </TouchableWithoutFeedback>
                            <View style={{ ...StyleSheet.absoluteFillObject }}>
                                <Image style={styles.cover} source={require('../assets/diamondcover.svg')} />
                            </View>
                        </View>
                    </View>
                    <View style={[styles.container, cstyles.rowflex]}>
                        <View style={styles.bbox}>
                            <Text style={styles.heading}>Total Balance PIN</Text>
                            <Text style={styles.balance}>{balance}</Text>
                        </View>
                        <Image source={require('../assets/pinbalance.svg')} />
                    </View>

                    <View style={{ marginBottom: 20 }}>
                        <TouchableWithoutFeedback
                            onPress={() => navigation.navigate('purchase')}
                            style={[cstyles.btn]}>
                            <Text style={cstyles.btntext, { textTransform: 'uppercase' }}>REPURCHASE</Text>
                        </TouchableWithoutFeedback>
                    </View>

                </View>

            </ScrollView>
            {loading ?
                <ActivityIndicator size="large" color={colors.primary} />
                : <TouchableWithoutFeedback
                    onPress={() => {
                        if (plan == 0) setError('please select a plan')
                        else setError(null)
                        if (plan != 0 && user.ifsc != null) activate()
                        else if (plan != 0 && user.ifsc == null) navigation.navigate('bankdetails')
                    }}
                    style={[cstyles.btn, styles.bottom]}>
                    <Text style={cstyles.btntext}>Activate</Text>
                </TouchableWithoutFeedback>}
            {error && <Text style={[cstyles.error, { textAlign: 'center' }]}>{error}</Text>}
        </Root>
    )
};
const styles = StyleSheet.create({
    cover: {
        height: 200,
        width: width * .44,
        resizeMode: 'cover'
    },
    selected: {
        borderColor: colors.primary,
        borderWidth: 2
    },
    balance: {
        fontSize: 40,
        color: colors.primary,
        fontWeight: 'bold',
        marginTop: 10
    },
    bbox: {
        height: '100%',
        justifyContent: 'flex-start',
    },
    heading: {
        color: colors.sidebar,
        fontSize: 21,
    },
    container: {
        backgroundColor: colors.inputbg,
        borderRadius: 6,
        paddingVertical: 20,
        paddingHorizontal: 10,
        marginBottom: 10
    },
    bottom: {
        marginHorizontal: width * 0.05
    },
    item2image: {
        marginRight: 20,
        resizeMode: 'contain',
        height: 15,
        width: 15
    },
    itemtext: {
        flex: 1,
        color: colors.heading,
        fontSize: 16,
    },
    item2: {
        flex: 1,
        paddingHorizontal: 15,
        paddingVertical: 10
    },
    itemprice: {
        color: colors.heading,
        textAlign: 'center',
        fontSize: 17
    },
    planimage: {
        alignSelf: 'center',
        marginBottom: 15,
        resizeMode: 'contain'
    },
    itemtitle: {
        color: colors.heading,
        textAlign: 'center',
        fontSize: 21,
        paddingBottom: 15,
        fontWeight: 'bold'
    },
    item: {
        flex: .49,
        height: 200,
        backgroundColor: colors.inputbg,
        borderRadius: 6,
        justifyContent: 'space-between',
        paddingVertical: 15,
        marginBottom: 10
    }
});
export default Plan;
