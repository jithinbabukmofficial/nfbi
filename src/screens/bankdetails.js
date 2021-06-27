import Axios from 'axios';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, ActivityIndicator } from 'react-native';
import { ScrollView, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../action/user';
import Header from '../components/header';
import Root from '../components/root';
import { apiurl, colors } from '../constants/constants';
import { cstyles } from '../constants/cstyles';

const initstate = {
    adhar: null,
    payeename: null,
    ifsc: null,
    branch: null,
    bank: null,
    account: null,
    confirmaccount: null
}

const nameval = /[`~0-9!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi

const Bankdetails = ({ navigation }) => {
    // form values
    const [form, setForm] = useState({ values: initstate, error: {}, touched: {} })
    const [ifscloading, setIfscloading] = useState(false)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)


    // redux function
    const { token } = useSelector(state => state.token)
    const dispatch = useDispatch()


    //changed detect
    useEffect(() => {
        setError(null)
        let { error, touched, values } = form
        Object.keys(values).forEach(k => {
            if (k != 'ifsc') {
                if (touched[k] && !values[k]) error[k] = `${k} is required`
                else error[k] = null
            }
        })

        // account no validation
        if (touched.confirmaccount && values.account != values.confirmaccount) error.confirmaccount = "Account no didn't match"
        else error.confirmaccount = null

        setForm({ ...form, error: error })
    }, [form.values])

    //form validation
    const validate = () => {
        setError(null)
        let { error, values, touched } = form
        Object.keys(values).forEach(k => {
            if (values[k] == null) error[k] = `${k} is required`
            else error[k] = null
            touched[k] = true
        })

        // // account no validation
        if (touched.confirmaccount && values.account != values.confirmaccount) error.confirmaccount = "account no didn't match"

        setForm({
            ...form,
            error: error,
            touched: touched
        })
        if (Object.keys(error).every(i => error[i] == null)) {
            activate()
        } else {
            setError('please check all errors above')
            console.warn(error)
        }
    }


    // user activation
    const activate = () => {
        // form values
        let { values } = form
        if (loading) return
        setLoading(true)
        let formdata = new FormData()
        for (let i in values) {
            if(i == 'payeename') formdata.append(i, values[i].replace(/[`~0-9!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, ''))
            else if (i != 'confirmaccount') formdata.append(i, values[i])
        }
        Axios.post(`${apiurl}/mobileuser/paymentdetails`, formdata, { headers: { 'auth-token': token } })
            .then(res => res.data)
            .then(res => {
                if (res.status) {
                    dispatch(setUser(res.user))
                    navigation.goBack()
                }
            })
            .catch(e => {
                if (e && e.response && e.response.data) setError(e.response.data)
            }).finally(e => setLoading(false))
    }



    //onchanged is called
    const onchanged = (val, field) => {
        let newvalue = null
        if(field == 'payeename') newvalue = val.replace(/[`~0-9!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '')
        else newvalue = val
        setForm({ ...form, touched: { ...form.touched, [field]: true }, values: { ...form.values, [field]: newvalue } })
        console.log(form)
    }

    //isfc validation
    useEffect(() => {
        if (form.touched.ifsc) checkifsc(form.values.ifsc)
    }, [form.values.ifsc])

    //check for valid ifsc
    const checkifsc = ifsc => {
        if (ifscloading) return
        setIfscloading(true)
        setForm({ ...form, error: { ...form.error, ifsc: 'checking for valid ifsc....' } })
        Axios.post(`${apiurl}/ifsc/checkifsc`, { ifscode: ifsc })
            .then(res => res.data)
            .then(result => {
                setForm({
                    ...form,
                    values: { ...form.values, bank: result.BANK, branch: result.BRANCH },
                    error: {
                        ...form.error,
                        ifsc: null
                    }
                })
                setIfscloading(false)
            })
            .catch(e => {
                console.log(e.response.data)
                setForm({
                    ...form,
                    error: { ...form.error, ifsc: 'invalid ifsc' },
                    values: {
                        ...form.values,
                        bank: null,
                        branch: null
                    }
                })
                setIfscloading(false)
            })
    }
    return (
        <Root>
            <Header title="PAYMENT DETAILS" />
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={cstyles.box}>
                    <TextInput
                        style={cstyles.input}
                        placeholder="PAYEE NAME"
                        autoCapitalize="characters"
                        value={form.values.payeename}
                        onChangeText={val => onchanged(val, 'payeename')}
                        placeholderTextColor={colors.text}
                    />
                    {form.error.payeename != null && <Text style={styles.errortext}>{form.error['payeename']}</Text>}
                    <TextInput
                        style={cstyles.input}
                        placeholder="AADHAR CARD NUMBER "
                        value={form.values.adhar}
                        onChangeText={val => onchanged(val, 'adhar')}
                        placeholderTextColor={colors.text}
                    />
                    {form.error.adhar != null && <Text style={styles.errortext}>{form.error['adhar']}</Text>}
                    <TextInput
                        style={cstyles.input}
                        placeholder="PAN CARD NUMBER "
                        autoCapitalize="characters"
                        value={form.values.pan}
                        onChangeText={val => onchanged(val, 'pan')}
                        placeholderTextColor={colors.text}
                    />
                    {form.error.pan != null && <Text style={styles.errortext}>{form.error['pan']}</Text>}
                    <TextInput
                        style={cstyles.input}
                        placeholder="IFSC"
                        keyboardType="default"
                        autoCapitalize="characters"
                        value={form.values.ifsc}
                        onChangeText={val => onchanged(val, 'ifsc')}
                        placeholderTextColor={colors.text}
                    />
                    {form.error.ifsc != null && <Text style={styles.errortext}>{form.error['ifsc']}</Text>}
                    <TextInput
                        style={cstyles.input}
                        placeholder="BANK NAME"
                        autoCapitalize="characters"
                        editable={false}
                        selectTextOnFocus={false}
                        value={form.values.bank}
                        onChangeText={val => onchanged(val, 'bank')}
                        placeholderTextColor={colors.text}
                    />
                    {form.error.bank != null && <Text style={styles.errortext}>{form.error['bank']}</Text>}
                    <TextInput
                        style={cstyles.input}
                        placeholder="ACCOUNT NO "
                        value={form.values.account}
                        onChangeText={val => onchanged(val, 'account')}
                        placeholderTextColor={colors.text}
                    />
                    {form.error.account != null && <Text style={styles.errortext}>{form.error['account']}</Text>}
                    <TextInput
                        style={cstyles.input}
                        placeholder="CONFIRM ACCOUNT NUMBER"
                        value={form.values.confirmaccount}
                        onChangeText={val => onchanged(val, 'confirmaccount')}
                        placeholderTextColor={colors.text}
                    />
                    {form.error.confirmaccount != null && <Text style={styles.errortext}>{form.error['confirmaccount']}</Text>}
                    <TextInput
                        style={cstyles.input}
                        placeholder="BRANCH NAME"
                        editable={false}
                        selectTextOnFocus={false}
                        autoCapitalize="characters"
                        value={form.values.branch}
                        onChangeText={val => onchanged(val, 'branch')}
                        placeholderTextColor={colors.text}
                    />
                    {form.error.branch != null && <Text style={styles.errortext}>{form.error['branch']}</Text>}
                    <Text style={{ color: colors.primary, textAlign: 'center', marginBottom: 10, fontSize: 12 }}>
                        Please fill carefully. You can not change this details later
                        </Text>
                    {loading ? <ActivityIndicator size="large" color={colors.primary} />
                        : <TouchableWithoutFeedback
                            onPress={() => validate()}
                            style={cstyles.btn}>
                            <Text style={cstyles.btntext}>Submit</Text>
                        </TouchableWithoutFeedback>}
                    {error != null && <Text style={[styles.errortext, { textAlign: 'center' }]}>{error}</Text>}
                </View>
            </ScrollView>
        </Root>
    )
};

// component styles
const styles = StyleSheet.create({
    errortext: {
        color: 'red',
        marginBottom: 10
    },
});
export default Bankdetails;
