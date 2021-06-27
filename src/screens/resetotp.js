import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { ScrollView, TextInput, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import Header from '../components/header';
import Root from '../components/root';
import { apiurl, colors, width } from '../constants/constants';
import { cstyles } from '../constants/cstyles';
import OTPInputView from '@twotalltotems/react-native-otp-input'
import Axios from 'axios';
import { useDispatch } from 'react-redux';
import { setToken } from '../action/token';

const ResetOtp = ({
    navigation,
    route
}) => {
    const { user, session_id } = route.params
    const [loading, setLoading] = useState(false)
    const [form, setForm] = useState({ values: { otp: null, password: null, confirm: null }, error: {}, touched: {} })
    const [error, setError] = useState(null)
    const [timer, setTimer] = useState(120)

    // dispatch
    const dispatch = useDispatch()

    useEffect(() => {
        const interval = setInterval(() => {
            if (timer != 0) setTimer(timer - 1)
        }, 1000);
        return () => {
            clearInterval(interval);
        };
    }, [user])


    useEffect(() => {
        let { values, error, touched } = form
        Object.keys(values).forEach(k => {
            if (touched[k] && !values[k]) error[k] = `${k} is required`
            else error[k] = null
        })
        if (touched.confirm && values.password != values.confirm) error.confirm = 'password didnt match'
        setForm({ ...form, error: error })
    }, [form.values])



    const validate = () => {
        let { values, error, touched } = form
        Object.keys(values).forEach(k => {
            if (!values[k]) error[k] = `${k} is required`
            else error[k] = null
        })
        if (touched.confirm && values.password != values.confirm) error.confirm = 'password didnt match'
        setForm({ ...form, error: error })
        if (Object.keys(error).every(k => error[k] == null)) resetPassword()
        else setError('please fill all fields')
    }

    useEffect(() => {
        navigation.addListener('beforeRemove', (e) => {
            if (timer != 0) {
                // If we don't have unsaved changes, then we don't need to do anything
                return;
            }

            // Prevent default behavior of leaving the screen
            e.preventDefault();

            // Prompt the user before leaving the screen
            Alert.alert(
                'Discard changes?',
                'You have unsaved changes. Are you sure to discard them and leave the screen?',
                [
                    { text: "Don't leave", style: 'cancel', onPress: () => { } },
                    {
                        text: 'Discard',
                        style: 'destructive',
                        // If the user confirmed, then we dispatch the action we blocked earlier
                        // This will continue the action that had triggered the removal of the screen
                        onPress: () => navigation.dispatch(e.data.action),
                    },
                ]
            );
        })
    }, [navigation])


    // otp validate function
    const resetPassword = code => {
        setError(null)
        setLoading(true)
        let formdata = new FormData()
        formdata.append('code', form.values.otp)
        formdata.append('user', user)
        formdata.append('password', form.values.password)
        formdata.append('session_id', session_id)
        // send post request
        Axios.post(`${apiurl}/mobileuser/resetpassword`, formdata)
            .then(res => res.data)
            .then(res => {
                console.warn(res)
                if (res.status) {
                    navigation.navigate('login')
                }
            })
            .catch(e => {
                if (e.response && e.response.data) setError(e.response.data)
            })
            .finally(e => setLoading(false))
    }
    return (
        <Root>
            <Header title="Otp" />
            <ScrollView contentContainerStyle={styles.container}>
                <View style={cstyles.box}>
                    <Text style={styles.text}>One Time Password ( OTP ) has been sent to the number given</Text>
                    <OTPInputView
                        style={{ width: '100%', height: 100, alignContent: 'space-between' }}
                        codeInputFieldStyle={styles.input}
                        onCodeFilled={code => setForm({ ...form, values: { ...form.values, otp: code }, touched: { otp: true } })}
                        pinCount={6} />
                    {form.error.otp != null && <Text style={cstyles.error}>{form.error.otp}</Text>}
                    <TextInput
                        placeholderTextColor={colors.text}
                        placeholder="Password"
                        secureTextEntry={true}
                        value={form.values.password}
                        onChangeText={val => {
                            setForm({ ...form, values: { ...form.values, password: val }, touched: { password: true } })
                        }}
                        style={cstyles.input} />
                    {form.error.password != null && <Text style={cstyles.error}>{form.error.password}</Text>}
                    <TextInput
                        placeholderTextColor={colors.text}
                        placeholder="Confirm Password"
                        secureTextEntry={true}
                        value={form.values.confirm}
                        onChangeText={val => {
                            setForm({ ...form, values: { ...form.values, confirm: val }, touched: { confirm: true } })
                        }}
                        style={cstyles.input} />
                    {form.error.confirm != null && <Text style={cstyles.error}>{form.error.confirm}</Text>}
                    {loading ?
                        <ActivityIndicator color={colors.primary} size="large" />
                        : <TouchableWithoutFeedback
                            onPress={() => validate()}
                            style={cstyles.btn}>
                            <Text style={cstyles.btntext}>submit</Text>
                        </TouchableWithoutFeedback>}
                    {error && <Text style={[cstyles.error, { textAlign: 'center' }]}>{error}</Text>}
                    {/* {timer == 0 && <Text style={styles.resend}>Resend Otp?</Text>} */}
                </View>
            </ScrollView>
        </Root>
    )
};
const styles = StyleSheet.create({
    resend: {
        color: colors.primary,
        textAlign: 'center',
        textDecorationColor: colors.primary,
    },
    input: {
        width: width * .14,
        height: width * .15,
        paddingVertical: 13,
        borderColor: colors.border,
        borderWidth: 1,
        borderRadius: 4,
        backgroundColor: colors.inputbg,
        fontSize: 20,
        color: colors.primary,
        marginBottom: 15,
        textAlign: 'center'
    },
    container: {
        flex: 1,
        justifyContent: 'center'
    },
    text: {
        color: colors.primary,
        textAlign: 'center',
        marginBottom: 20
    },
});

export default ResetOtp;
