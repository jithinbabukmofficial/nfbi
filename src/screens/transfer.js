import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, Image, TextInput, ActivityIndicator } from 'react-native';
import { ScrollView, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import Header from '../components/header';
import Root from '../components/root';
import Loader from '../components/loader'
import { apiurl, base_url, colors, width } from '../constants/constants';
import { cstyles } from '../constants/cstyles';


const phoneno = /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/;
const initstate = {
    amount: null,
    phone: null,
    password: null
}

const Transfer = ({ navigation }) => {
    const { token } = useSelector(state => state.token)
    const [loading, setLoading] = useState(false)
    const [balance, setBalance] = useState(0)
    const [userloading, setUserloading] = useState(false)
    const [error, setError] = useState(null)
    const [form, setForm] = useState({
        values: initstate, touched: {}, error: initstate
    })
    const [user, setUser] = useState(null)

    useEffect(() => {
        navigation.addListener('focus', () => {
            getData()
        });
        let { touched, error, values } = form
        Object.keys(values).forEach(k => {
            if (touched[k] && !values[k]) error[k] = `${k} is required`
            else error[k] = null
        })
        if (touched.phone && !phoneno.test(values.phone)) error.phone = 'enter a valid phone'
        if (error.phone) setUser(null)

        //count validation
        if (touched.amount && values.amount > balance) error.amount = 'You Dont Have Enough PIN'
        setForm({ ...form, error })
    }, [form.values])

    //check for valid user
    useEffect(() => {
        if (phoneno.test(form.values.phone)) search(form.values.phone)
    }, [form.values.phone])


    //form validation function
    const validate = () => {
        let { error, values, touched } = form
        Object.keys(values).forEach(k => {
            if (!values[k] || values[k] == null) error[k] = `${k} is required`
            else error[k] = null
            touched[k] = true
        })

        //phone validation
        if (!phoneno.test(values.phone)) error.phone = 'enter a valid phone'
        if (user == null) error.phone = 'select a user to transfer pin'

        //count validation
        if (values.amount > balance) error.amount = 'You Dont Have Enough PIN'

        setForm({
            ...form,
            error: error,
            touched: touched
        })
        if (Object.keys(error).every(i => error[i] == null)) {
            setError(null)
            sendData()
        }
    }

    const change = (value, name) => {
        setForm({
            ...form,
            values: {
                ...form.values,
                [name]: value
            },
            touched: {
                ...form.touched,
                [name]: true
            }
        })
    }

    const search = data => {
        console.warn(data)
        setUserloading(true)
        let formdata = new FormData()
        formdata.append('phone', data)
        Axios.post(`${apiurl}/mobileuser/find`, formdata, { headers: { 'auth-token': token } })
            .then(res => res.data)
            .then(res => {
                setUser(res.user)
                console.warn(res)
            })
            .catch(e => console.log(e.response.data))
            .finally(e => setUserloading(false))
    }

    const getData = () => {
        setLoading(true)
        Axios.get(`${apiurl}/usertoken/balance`, { headers: { 'auth-token': token } })
            .then(res => res.data)
            .then(({ count }) => setBalance(count))
            .catch(e => console.log(e.response.data))
            .finally(e => setLoading(false))
    }


    const sendData = () => {
        if (loading) return
        setLoading(true)
        let formdata = new FormData()
        formdata.append('reciever_id', user._id)
        formdata.append('amount', form.values.amount)
        formdata.append('password', form.values.password)
        Axios.post(`${apiurl}/usertoken/transfer`, formdata, { headers: { 'auth-token': token } })
            .then(res => res.data)
            .then(res => {
                console.log(res)
                if (res.status) {
                    setForm({ values: initstate, error: initstate, touched: {} })
                    setUser(null)
                    setError(null)
                    navigation.replace('success')
                }
            })
            .catch(e => {
                if (e.response.data) setError(e.response.data)
            })
            .finally(e => setLoading(false))
    }

    return (
        <Root>
            <Header title="Transfer pin" />
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={cstyles.box}>
                    <View style={[styles.container, cstyles.rowflex]}>
                        <View style={styles.bbox}>
                            <Text style={styles.heading}>Total Balance PIN</Text>
                            <Text style={styles.balance}>{balance}</Text>
                        </View>
                        <Image source={require('../assets/pinbalance.svg')} />
                    </View>
                    <View style={[cstyles.row, { marginTop: 20 }]}>
                        <Text style={styles.title}>no of pin</Text>
                        <View style={styles.ibox}>
                            <TextInput
                                keyboardType="number-pad"
                                placeholder="No of PIN to transfer"
                                onChangeText={(val => change(val, 'amount'))}
                                keyboardType="number-pad"
                                placeholderTextColor={colors.text}
                                style={[cstyles.input, { marginBottom: 0 }]} />
                            {form.error.amount && <Text style={styles.error}>{form.error.amount}</Text>}
                        </View>
                    </View>
                    <View style={[cstyles.row, { marginTop: 20, marginBottom: 15 }]}>
                        <Text style={styles.title}>Search</Text>
                        <View style={styles.ibox}>
                            <TextInput
                                keyboardType="phone-pad"
                                placeholder="Search user by phone no"
                                keyboardType="phone-pad"
                                onChangeText={(val => change(val, 'phone'))}
                                placeholderTextColor={colors.text}
                                style={[cstyles.input, { marginBottom: 0 }]} />
                            {form.error.phone && <Text style={styles.error}>{form.error['phone']}</Text>}
                        </View>
                    </View>
                    {userloading ? <ActivityIndicator size="large" color={colors.primary} /> : user && user.name &&
                        <View style={[styles.container, cstyles.row]}>
                            <Image style={styles.profile} source={{ uri: `${base_url}/${user.image}` }} />
                            <View style={styles.userbox}>
                                <Text style={styles.username}>{user.name}</Text>
                                <View style={[cstyles.row, { marginBottom: 3 }]}>
                                    <Text style={styles.sponser}>Email : </Text>
                                    <Text style={styles.sid}>{user.email}</Text>
                                </View>
                                <View style={[cstyles.row, { marginBottom: 3 }]}>
                                    <Text style={styles.sponser}>Location : </Text>
                                    <Text style={styles.sid}>{user.district}</Text>
                                </View>
                                <View style={[cstyles.row, { marginBottom: 3 }]}>
                                    <Text style={styles.sponser}>Designation : </Text>
                                    <Text style={[styles.sid, {
                                        textTransform: 'uppercase'
                                    }]}>{user.designation}</Text>
                                </View>
                            </View>
                        </View>}
                    <View style={[cstyles.row, { marginTop: 20, marginBottom: 20 }]}>
                        <Text style={styles.title}>Password</Text>
                        <View style={styles.ibox}>
                            <TextInput
                                placeholder="Password"
                                placeholderTextColor={colors.text}
                                onChangeText={(val => change(val, 'password'))}
                                style={[cstyles.input, { marginBottom: 0 }]} />
                            {form.error.password && <Text style={styles.error}>Password is required</Text>}
                        </View>
                    </View>
                    {loading ? <ActivityIndicator size="large" color={colors.primary} />
                        : <TouchableWithoutFeedback
                            onPress={() => validate()}
                            style={cstyles.btn}>
                            <Text style={cstyles.btntext}>Transfer</Text>
                        </TouchableWithoutFeedback>}
                    {error && <Text style={[styles.error, { textAlign: 'center' }]}>{error}</Text>}
                </View>
            </ScrollView>
        </Root>
    )
};
const styles = StyleSheet.create({
    profile: {
        width: width * .2,
        height: width * .2,
        borderRadius: width * .2,
        resizeMode: 'cover'
    },
    error: {
        marginTop: 10,
        color: 'red'
    },
    sid: {
        flex: 1,
        color: colors.primary,
        fontSize: 13,
        marginLeft: 5
    },
    sponser: {
        color: colors.sidebar,
        fontSize: 13
    },
    userbox: {
        flex: 1,
        paddingHorizontal: 20
    },
    username: {
        color: colors.primary,
        fontSize: 20,
        marginBottom: 10
    },
    ibox: {
        flex: 1,
        paddingLeft: 10
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
        fontSize: 21
    },
    container: {
        backgroundColor: colors.inputbg,
        borderRadius: 6,
        paddingVertical: 20,
        paddingHorizontal: 10
    },
    title: {
        color: colors.sidebar,
        fontSize: 14,
        textTransform: 'uppercase',
        flex: .3
    }
});
export default Transfer;
