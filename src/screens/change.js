import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, TextInput, View } from 'react-native';
import { ScrollView, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { removeToken } from '../action/token';
import { removeUser } from '../action/user';
import Header from '../components/header';
import Root from '../components/root';
import { apiurl, colors } from '../constants/constants';
import { cstyles } from '../constants/cstyles';


const initstate = {
    current: null,
    password: null,
    confirm: null
}

const Change = ({ navigation }) => {
    const { token } = useSelector(state => state.token)
    const [form, setForm] = useState({ values: initstate, error: initstate, touched: {} })
    const [cerror, setCerror] = useState(null)
    const [loading, setLoading] = useState(false)


    // dispatch function
    const dispatch = useDispatch()

    //values change 
    const change = (value, name) => {
        setForm({
            ...form,
            values: { ...form.values, [name]: value },
            touched: { ...form.touched, [name]: true }
        })
    }

    //form validation on change
    useEffect(() => {
        let { error, values, touched } = form
        Object.keys(values).forEach(item => {
            if (touched[item] && !values[item]) error[item] = `${item} is required`
            else error[item] = null
            touched[item] = true
        })
        //password validation
        if (values.password != values.confirm) error.confirm = 'Password didnt match'

        setForm({ ...form, error, touched })
        setCerror(null)
    }, [form.values])

    //form validate function
    const validate = () => {
        let { error, values, touched } = form
        Object.keys(values).forEach(item => {
            if (!values[item]) error[item] = `${item} is required`
            else error[item] = null
            touched[item] = true
        })
        //password validation
        if (values.password != values.confirm) error.confirm = 'Password didnt match'

        setForm({ ...form, error, touched })
        setCerror(null)
        //validate 
        if (Object.keys(error).every(i => error[i] == null)) changePassword()
    }


    const changePassword = () => {
        if (loading) return
        setLoading(true)
        let { values: { current, password } } = form
        let formdata = new FormData()
        formdata.append('current', current)
        formdata.append('password', password)
        Axios.post(`${apiurl}/mobileuser/changepassword`, formdata, { headers: { 'auth-token': token } })
            .then(res => res.data)
            .then(res => {
                dispatch(removeToken())
                dispatch(removeUser())
                navigation.replace('login')
            })
            .catch(e => { if (e.response.data) setCerror(e.response.data) })
            .finally(e => setLoading(false))
    }
    return (
        <Root>
            <Header title="Change Password" />
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={cstyles.box}>
                    <TextInput
                        placeholder="Current Password"
                        placeholderTextColor={colors.text}
                        onChangeText={val => change(val, 'current')}
                        style={cstyles.input} />
                    {form.error.current && <Text style={styles.error}>Current password is required</Text>}
                    <TextInput
                        placeholder="New Password"
                        placeholderTextColor={colors.text}
                        onChangeText={val => change(val, 'password')}
                        secureTextEntry={true}
                        style={cstyles.input} />
                    {form.error.password && <Text style={styles.error}>{form.error.password}</Text>}
                    <TextInput
                        placeholder="Repeat New Password"
                        placeholderTextColor={colors.text}
                        onChangeText={val => change(val, 'confirm')}

                        style={cstyles.input} />
                    {form.error.confirm && <Text style={styles.error}>{form.error.confirm}</Text>}
                    {loading ?
                        <ActivityIndicator color={colors.primary} size="large" />
                        : <TouchableWithoutFeedback
                            onPress={() => validate()}
                            style={cstyles.btn}>
                            <Text style={cstyles.btntext}>Change Password</Text>
                        </TouchableWithoutFeedback>}
                    {cerror && <Text style={[styles.error, { textAlign: 'center' }]}>{cerror}</Text>}
                </View>
            </ScrollView>
        </Root>
    )
};
//component styles
const styles = StyleSheet.create({
    error: {
        color: 'red',
        marginBottom: 15,
        textTransform: 'capitalize'
    }
});
export default Change;
