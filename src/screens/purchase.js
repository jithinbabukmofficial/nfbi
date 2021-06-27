import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, Image, TextInput, ActivityIndicator } from 'react-native';
import { ScrollView, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import Header from '../components/header';
import Root from '../components/root';
import { apiurl, colors, key, width } from '../constants/constants';
import { cstyles } from '../constants/cstyles';
import RazorpayCheckout from 'react-native-razorpay';
// import RNUpiPayment from 'react-native-upi-pay';

const Purchase = ({ navigation }) => {
    const [count, setCount] = useState(1)
    const [error, setError] = useState(null)
    const [balance, setBalance] = useState(0)
    const [loading, setLoading] = useState(false)
    const [upiamount, setUpiamount] = useState(0)
    const [plan, setPlan] = useState(1)
    const { token: { token }, user } = useSelector(state => state)


    useEffect(() => {
        navigation.addListener('focus', () => {
            getData()
        });
    }, [])

    //get current pin balance
    const getData = () => {
        setLoading(true)
        Axios.get(`${apiurl}/usertoken/balance`, { headers: { 'auth-token': token } })
            .then(res => res.data)
            .then(({ count }) => setBalance(count))
            .catch(e => console.log(e.response.data))
            .finally(e => setLoading(false))
    }

    // create order
    const createorder = () => {
        setError(null)
        if (loading) return
        setLoading(true)
        let formdata = new FormData()
        formdata.append('count', count)
        Axios.post(`${apiurl}/usertoken/createofflineorder`, formdata, { headers: { 'auth-token': token } })
            .then(res => res.data)
            .then(({ status, amount, currency, id, upi }) => {
                if (status) {
                    navigation.navigate('upload', { amount, id, upi })
                }
                console.warn(amount, upi, id)
            }).catch(e => {
                console.warn(e)
                if (e.response && e.response.data) setError(e.response.data)
                else setError('something went wrong')
            })
            .finally(e => setLoading(false))
    }

    const paymoney = ({ amount, currency, id }) => {

        const options = {
            description: 'Purchase goods from NFBI',
            // image: 'https://i.imgur.com/3g7nmJC.png',
            currency: currency,
            order_id: id,
            key: key, // Your api key
            amount: amount,
            name: 'NFBI',
            prefill: {
                email: user.email,
                contact: user.phone,
                name: user.name
            },
            theme: { color: colors.primary }
        }
        RazorpayCheckout.open(options).then((data) => navigation.replace('success'))
            .catch((error) => setError('payment failed'));
    }

    // upi purchase
    const upipay = ({ amount, id }) => {
        // const upidata = {
        //     "payerVa": "vishal2@icici",
        //     "amount": "5.00",
        //     "note": "collect-pay-request",
        //     "collectByDate": "30/12/2016 06:30 PM",
        //     "merchantId": "400702",
        //     "me rchantName ": "Testmerchant",
        //     "subMerchantId": "400702",
        //     "subMerchantName": "Test",
        //     "terminalId": "5411",
        //     "merchantTranId": id,
        //     "billNumber": "sdf234234"
        // }
        // RNUpiPayment.initializePayment({
        //     vpa: 'uatmer031@icici',  		//your upi address 
        //     payeeName: user.name,   			// payee name 
        //     amount: '1',				//amount
        //     transactionNote: 'nfbi',		//note of transaction
        //     transactionRef: id	//some refs to aknowledge the transaction
        // }, successCallback, failureCallback);
    }

    const successCallback = data => {
        console.warn(data)
        if (!data) return
        const { Status, txnId, txnRef, responseCode } = data
        if (Status == "SUCCESS" && responseCode == "00") {
            setError(null)
            if (loading) return
            setLoading(true)
            let formdata = new FormData()
            formdata.append('upi_tid', txnId)
            formdata.append('order_id', txnRef)
            formdata.append('amount', upiamount)
            Axios.post(`${apiurl}/usertoken/verfiyupi`, formdata, { headers: { 'auth-token': token } })
                .then(res => res.data)
                .then(({ status }) => {
                    if (status) navigation.navigate('success')
                }).catch(e => {
                    if (e.response.data) setError(e.response.data)
                    else setError('something went wrong')
                })
                .finally(e => setLoading(false))
        } else setError("transaction failed")
    }
    const failureCallback = data => {

    }

    return (
        <Root>
            <Header title="PIN PURCHASE" />
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={cstyles.box}>
                    <View style={[styles.container, cstyles.rowflex]}>
                        <View style={styles.bbox}>
                            <Text style={styles.heading}>Total Balance PIN</Text>
                            <Text style={styles.balance}>{balance}</Text>
                        </View>
                        <Image source={require('../assets/pinbalance.svg')} />
                    </View>
                </View>
                <View style={cstyles.box} >
                    <TextInput
                        placeholder="Select a plan or enter the amount of pin"
                        placeholderTextColor={colors.text}
                        onChangeText={val => setCount(val)}
                        value={count.toString()}
                        keyboardType="number-pad"
                        style={cstyles.input} />
                    {error && <Text style={cstyles.error}>{error}</Text>}
                </View>
                {/* start of plan details */}
                <View style={cstyles.box}>
                    <View style={cstyles.rowflex}>
                        <View style={[styles.item, count == 1 && styles.selected]}>
                            <TouchableWithoutFeedback onPress={() => setCount(1)}>
                                <Text style={styles.itemtitle}>Silver</Text>
                                <Image style={styles.planimage} source={require('../assets/silver.svg')} />
                                <Text style={styles.itemprice}>₹ 2,500/-</Text>
                            </TouchableWithoutFeedback>
                        </View>
                        <View style={[styles.item, count == 2 && styles.selected]}>
                            <TouchableWithoutFeedback onPress={() => setCount(2)}>
                                <Text style={styles.itemtitle}>Gold</Text>
                                <Image style={styles.planimage} source={require('../assets/gold.svg')} />
                                <Text style={styles.itemprice}>₹ 5,000/-</Text>
                            </TouchableWithoutFeedback>
                        </View>
                    </View>
                    <View style={cstyles.rowflex}>
                        <View style={[styles.item, count == 4 && styles.selected]}>
                            <TouchableWithoutFeedback onPress={() => setCount(4)}>
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
                </View>
                {/* end plan details */}
            </ScrollView>
            {loading ?
                <ActivityIndicator size="large" color={colors.primary} /> :
                <TouchableWithoutFeedback
                    onPress={() => {
                        if (count != 0) {
                            if (count > 20) setError('can not purchase more than 20 pin')
                            // else navigation.navigate('methods', { count })
                            else createorder()

                        }
                        else setError('No of pin is required')
                        // payuintegration()

                    }}
                    style={[cstyles.btn, { marginHorizontal: width * 0.05 }]}>
                    <Text style={[cstyles.btntext, { textTransform: 'uppercase' }]}>PURCHASE</Text>
                </TouchableWithoutFeedback>}
        </Root>
    )
};
const styles = StyleSheet.create({
    selected: {
        borderColor: colors.primary,
        borderWidth: 2
    },
    cover: {
        height: 200,
        width: width * .44,
        resizeMode: 'cover'
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
        fontSize: 18,
        textTransform: 'uppercase'
    },
    container: {
        backgroundColor: colors.inputbg,
        borderRadius: 6,
        paddingVertical: 20,
        paddingHorizontal: 10
    },
});
export default Purchase;
