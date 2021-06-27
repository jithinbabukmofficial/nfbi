import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, Image, FlatList, ActivityIndicator } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import Header from '../components/header';
import Loader from '../components/loader';
import Root from '../components/root';
import { apiurl, colors, width } from '../constants/constants';
import { cstyles } from '../constants/cstyles';
import moment from 'moment'


const Balance = ({ navigation }) => {
    const [loading, setLoading] = useState(true)
    const [balance, setBalance] = useState(0)
    const [data, setData] = useState([])
    const { token: { token }, user } = useSelector(state => state)

    // totals
    const [purchase, setPurchase] = useState(0)
    const [transfered, setTransfered] = useState(0)
    const [activated, setActivated] = useState(0)
    const [recieved, setRecieved] = useState(0)

    useEffect(() => {
        navigation.addListener('focus', () => {
            getData()
            getTransactions()
        });
    }, [])

    useEffect(() => {
        let a = 0
        let p = 0
        let t = 0
        let r = 0
        for (let i = 0; i < data.length; i++) {
            if (data[i].type == 'purchase') p = p + data[i].tokens.length
            else if (data[i].type == 'transfer' && data[i].reciever_id == user._id) r = r + data[i].tokens.length
            else if (data[i].type == 'activation') a = a + data[i].tokens.length
            else if ( data[i].type == 'transfer' && data[i].user_id == user._id) t = t + data[i].tokens.length
        }

        setActivated(a)
        setPurchase(p)
        setTransfered(t)
        setRecieved(r)

    }, [data])

    const getData = () => {
        setLoading(true)
        Axios.get(`${apiurl}/usertoken/balance`, { headers: { 'auth-token': token } })
            .then(res => res.data)
            .then(({ count }) => setBalance(count))
            .catch(e => console.log(e.response.data))
    }

    const getTransactions = async () => {
        try {
            const result = await Axios.get(`${apiurl}/usertoken/alltransfers`, { headers: { 'auth-token': token } })
                .then(res => res.data)
            setData(result.result)
            setLoading(false)
            console.log(result.result)
        } catch (e) {
            console.log(e && e.response && e.response.data)
        }
    }
    return (
        <Root>
            <Header title="BALANCE PIN" />
            {/* {loading == true ? <Loader /> : null} */}
            <View style={cstyles.box}>
                <View style={[styles.container, cstyles.rowflex]}>
                    <View style={styles.bbox}>
                        <Text style={styles.heading}>Total PIN Balance</Text>
                        <Text style={styles.balancetext}>{balance}</Text>
                    </View>
                    <Image source={require('../assets/pinbalance.svg')} />
                </View>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
                <ScrollView showsHorizontalScrollIndicator={false} horizontal>
                    <View style={[cstyles.box]}>
                        <View style={cstyles.row}>
                            <Text style={[styles.title, styles.no]}>no</Text>
                            <Text style={[styles.title, styles.date]}>Date</Text>
                            <Text style={[styles.title, styles.amount]}>Customer</Text>
                            <Text style={[styles.title, styles.type]}>Purchase</Text>
                            <Text style={[styles.title, styles.type]}>Received</Text>
                            <Text style={[styles.title, styles.proccessing]}>Activated</Text>
                            <Text style={[styles.title, styles.tds]}>Transferred</Text>
                        </View>
                        <View style={cstyles.line} />
                        <FlatList
                            data={data}
                            renderItem={({ item, index }) => {
                                return (
                                    <View style={[cstyles.row, styles.item]}>
                                        <Text style={[styles.tet, styles.no]}>{index + 1}</Text>
                                        <Text style={[styles.tet, styles.date]}>{`${moment(item.date).format('D-M-Y')} - ${moment(item.date).format('hh:mm A')} `}</Text>
                                        <Text style={[styles.tet, styles.amount]}>NFBI-{item.reciever_id.substring(0, 14)}</Text>
                                        <Text style={[styles.tet, styles.type]}>{item.type == 'purchase' ? item.tokens.length : 0}</Text>
                                        <Text style={[styles.tet, styles.type]}>{item.type == 'transfer' && item.reciever_id == user._id ? item.tokens.length : 0}</Text>
                                        <Text style={[styles.tet, styles.proccessing]}>{item.type == 'activation' ? item.tokens.length : 0}</Text>
                                        <Text style={[styles.tet, styles.type]}>{item.type == 'transfer' && item.user_id == user._id ? item.tokens.length : 0}</Text>
                                    </View>
                                )
                            }}
                            onEndReached={() => getData()}
                            onEndReachedThreshold={0.1}
                        />
                        <View style={[cstyles.row, { marginTop: 20 }]}>
                            <Text style={[styles.title, styles.no]}>Total</Text>
                            <Text style={[styles.title, styles.date]}></Text>
                            <Text style={[styles.title, styles.amount]}></Text>
                            <Text style={[styles.title, styles.type]}>{purchase}</Text>
                            <Text style={[styles.title, styles.type]}>{recieved}</Text>
                            <Text style={[styles.title, styles.proccessing]}>{activated}</Text>
                            <Text style={[styles.title, styles.tds]}>{transfered}</Text>
                        </View>
                    </View>
                </ScrollView>
            </ScrollView>
        </Root >
    )
};
const styles = StyleSheet.create({
    item: {
        marginVertical: 10
    },
    tet: {
        color: 'red',
        fontSize: 14
    },
    tet1: {
        color: colors.primary,
        fontSize: 14
    },
    line: {
        height: 1,
        marginVertical: 10,
        backgroundColor: '#707070'
    },
    title: {
        color: colors.sidebar,
        fontSize: 16,
        textTransform: 'capitalize'
    },
    balancetext: {
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
        marginBottom: 30
    },
    no: {
        width: width * .1,
    },
    date: {
        width: 170,
    },
    amount: {
        width: 200
    },
    type: {
        width: 100,
    },
    proccessing: {
        width: 100
    },
    available: {
        width: 100
    },
    tds: {
        width: 90
    },
    balance: {
        width: 100
    },
    status: {
        width: 130
    },
    item: {
        marginVertical: 10
    },
    tet: {
        color: colors.primary,
        fontSize: 14
    },
    line: {
        height: 1,
        marginVertical: 10,
        backgroundColor: '#707070'
    },
    title: {
        color: colors.sidebar,
        fontSize: 16,
        textTransform: 'capitalize'
    }
});
export default Balance;
