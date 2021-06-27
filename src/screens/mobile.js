import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, ActivityIndicator } from 'react-native';
import { ScrollView, TextInput, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import Header from '../components/header';
import Root from '../components/root';
import { apiurl, colors } from '../constants/constants';
import { cstyles } from '../constants/cstyles';


// mobile validation
const phoneno = /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/;

const Mobile = ({
    navigation,
}) => {
    const [error, setError] = useState(null)
    const [form, setForm] = useState({ values: { mobile: null }, error: {}, touched: {} })
    const [loading, setLoading] = useState(null)

    // phone number validation
    useEffect(() => {
        let { values, error, touched } = form
        if (touched.mobile && !values.mobile) error.mobile = 'phone number is required'
        else error.mobile = null
        if (touched.mobile && !phoneno.test(values.mobile)) error.mobile = 'enter a valid phone number'
        else error.mobile = null
        setForm({ ...form, error: error })
    }, [form.values])


    const validation = () => {
        let { values, error } = form
        if (!values.mobile) error.mobile = 'phone number is required'
        else error.mobile = null
        if (!phoneno.test(values.mobile)) error.mobile = 'enter a valid phone number'
        else error.mobile = null
        setForm({ ...form, error: error })
        if (Object.keys(error).every(k => error[k] == null)) reset()
        else setError('please input mobile number')
    }

    const reset = number => {
        setLoading(true)
        let formdata = new FormData()
        formdata.append('phone', form.values.mobile)
        Axios.post(`${apiurl}/mobileuser/reset`, formdata)
            .then(res => res.data)
            .then(res => {
                console.warn(res)
                if (res.status) navigation.navigate('resetotp', { user: res.user, session_id: res.session_id })
            })
            .catch(e => {
                if (e && e.response && e.response.data) setError(e.response.data)
            })
            .finally(e => setLoading(false))
    }

    return (
        <Root>
            <Header title="Verify" />
            <ScrollView contentContainerStyle={styles.container}>
                <View style={cstyles.box}>
                    <Text style={styles.text}>Enter a valid Mobile Number to receive One Time Password ( without country code ) </Text>
                    <TextInput
                        placeholderTextColor={colors.text}
                        placeholder="Mobile Number"
                        keyboardType="phone-pad"
                        value={form.values.mobile}
                        onChangeText={val => {
                            setError(null)
                            setForm({ ...form, values: { ...form.values, mobile: val }, touched: { mobile: true } })
                        }}
                        style={cstyles.input} />
                    {form.error.mobile != null && <Text style={cstyles.error}>{form.error.mobile}</Text>}
                    {loading ?
                        <ActivityIndicator size="large" color={colors.primary} />
                        : <TouchableWithoutFeedback
                            onPress={() => validation()}
                            style={cstyles.btn}>
                            <Text style={cstyles.btntext}>Verify</Text>
                        </TouchableWithoutFeedback>}
                    {error && <Text style={[cstyles.error, { textAlign: "center" }]}>{error}</Text>}
                </View>
            </ScrollView>
        </Root>
    )
};
const styles = StyleSheet.create({
    text: {
        color: colors.primary,
        textAlign: 'center',
        marginBottom: 15
    },
    container: {
        flex: 1,
        justifyContent: 'center',
    }
});
export default Mobile;
