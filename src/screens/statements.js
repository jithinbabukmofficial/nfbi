import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, ActivityIndicator } from 'react-native';
import { useSelector } from 'react-redux';
import Header from '../components/header';
import Root from '../components/root';
import { apiurl, colors, width } from '../constants/constants';
import { cstyles } from '../constants/cstyles';
import moment from 'moment'
import Loader from '../components/loader';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import { getType } from 'react-native-device-info';


const Statements = ({ navigation }) => {
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState([])
    const [page, setPage] = useState(0)
    const [more, setMore] = useState(true)
    const { token: { token } } = useSelector(state => state)


    useEffect(() => {
        getData()
    }, [token, page])

    const getData = () => {
        if (loading && !more) return
        setLoading(setLoading(true))
        Axios.get(`${apiurl}/payments/all/${page}`, { headers: { 'auth-token': token } })
            .then(res => res.data)
            .then(res => {
                setData([...data, ...res.data])
                setPage(page + 1)
                if (res.data.length == 30) setMore(true)
                else setMore(false)
            })
            .catch(e => {
                // console.log(e.response.data)
                console.warn(e)
            })
            .finally(e => setLoading(false))
    }

    const gettype = type => {
        let term = ''
        if (type == 'scratch') term = 'Scratch Card'
        else if (type == 'dealer') term = 'Dealer Commission'
        else if (type == 'return') term = 'Monthly Benefit'
        else term = 'Referal Commission'
        return term
    }

    return (
        <Root>
            <Header title="ACCOUNT STATEMENT" />
            <ScrollView showsVerticalScrollIndicator={false}>
                <ScrollView showsHorizontalScrollIndicator={false} horizontal>
                    <View style={[cstyles.box]}>
                        <View style={cstyles.row}>
                            <Text style={[styles.title, styles.no]}>No</Text>
                            <Text style={[styles.title, styles.date]}>Date</Text>
                            <Text style={[styles.title, styles.amount]}>Amount</Text>
                            <Text style={[styles.title, styles.type]}>Type</Text>
                            <Text style={[styles.title, styles.proccessing]}>Proccessing fee</Text>
                            <Text style={[styles.title, styles.tds]}>TDS</Text>
                            <Text style={[styles.title, styles.balance]}>Balance</Text>
                            <Text style={[styles.title, styles.status]}>Status</Text>
                        </View>
                        <View style={cstyles.line} />
                        <FlatList
                            data={data}
                            renderItem={({ item, index }) => {
                                const prsfee = (item.amount / 100) * 8
                                const tdsfee = ((item.amount - prsfee) / 100) * 5
                                return (
                                    <View style={[cstyles.row, styles.item]}>
                                        <Text style={[styles.tet, styles.no]}>{index + 1}</Text>
                                        <Text style={[styles.tet, styles.date]}>{`${moment(item.date).format('D-M-Y')} -- ${moment(item.date).format('hh:mm A')}`}</Text>
                                        <Text style={[styles.tet, styles.amount]}>{item.paid ? item.amount : 0}</Text>
                                        <Text style={[styles.tet, styles.type]}>{gettype(item.type)}</Text>
                                        <Text style={[styles.tet, styles.proccessing]}>{prsfee.toFixed(2)}</Text>
                                        <Text style={[styles.tet, styles.tds]}>{tdsfee.toFixed(2)}</Text>
                                        <Text style={[styles.tet, styles.balance]}>{(item.amount - prsfee - tdsfee).toFixed(2)}</Text>
                                        <Text style={[styles.tet, styles.status]}>{item.credited ? 'Bank Credited' : !item.paid ? 'Processing' : 'Wallet Credited'}</Text>
                                    </View>
                                )
                            }}
                            onEndReached={() => getData()}
                            onEndReachedThreshold={0.1}
                        />
                    </View>
                    {loading && <ActivityIndicator size="large" color={colors.primary} />}
                </ScrollView>
            </ScrollView>
        </Root>
    )
};
const styles = StyleSheet.create({
    no: {
        width: width * .1,
    },
    date: {
        width: 170,
    },
    amount: {
        width: 100
    },
    type: {
        width: 150
    },
    proccessing: {
        width: 140
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
        // textTransform: 'capitalize'
    }
});
export default Statements;