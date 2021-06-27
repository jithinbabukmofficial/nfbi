import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Text, TextInput, View } from 'react-native';
import { ScrollView, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import Header from '../components/header';
import Root from '../components/root';
import { apiurl, colors, width } from '../constants/constants';
import { cstyles } from '../constants/cstyles';



const Devlead = ({
    navigation,
    route
}) => {
    const { user } = useSelector(state => state)
    const { lead, page, uri = null, title = null, data = [] } = route.params
    const initstate = {
        name: user.name,
        email: user.email,
        phone: user.phone,
        location: user.addressline1,
        type: 'training',
        lead: lead
    }
    // redux functions
    const { token } = useSelector(state => state.token)


    const [form, setForm] = useState({ touched: {}, error: {}, values: initstate })
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)

    //onchanged is called
    const onchanged = (val, field) => {
        setForm({ ...form, touched: { ...form.touched, [field]: true }, values: { ...form.values, [field]: val } })
        console.log(form)
    }

    useEffect(() => {
        let { error, values, touched } = form
        Object.keys(values).forEach(k => {
            if (touched[k] && !values[k]) error[k] = `${k} is required`
            else error[k] = null
        })
        setForm({
            ...form,
            error: error
        })
    }, [form.values])


    // form validation
    const validate = () => {
        setError(null)
        let { error, values, touched } = form
        Object.keys(values).forEach(k => {
            if (!values[k] || values[k] == null) error[k] = `${k} is required`
            else error[k] = null
            touched[k] = true
        })

        setForm({
            ...form,
            error: error,
            touched: touched
        })

        if (Object.keys(error).every(i => error[i] == null)) {
            submit()
        } else {
            setError('please check all the errors')
            console.warn(error)
        }

    }

    const submit = () => {
        let { values } = form
        let formdata = new FormData()
        for (let i in values) {
            formdata.append(i, values[i])
        }
        Axios.post(`${apiurl}/mobileuser/bussinessloan`, formdata, { headers: { 'auth-token': token } })
            .then(res => res.data)
            .then(res => {
                if (res.status) {
                    if (uri) navigation.replace(page, { title, uri, data })
                    else navigation.replace('success')
                    // else navigation.replace(page)
                }
                setForm({ ...form, values: { message: null }, touched: { message: false } })
            })
            .catch(e => {
                if (e && e.response && e.response.data) setError(e.response.data)
            })
            .finally(e => setLoading(false))
    }


    return (
        <Root>
            <Header title={'User Deatails'} />
            <ScrollView>
                <View style={cstyles.box}>
                    <TextInput
                        style={cstyles.input}
                        placeholder="Name"
                        keyboardType="default"
                        value={form.values.name}
                        onChangeText={val => onchanged(val, 'name')}
                        placeholderTextColor={colors.text}
                    />
                    {form.error.name != null && <Text style={[cstyles.error,]}>Name is required</Text>}

                    <TextInput
                        style={cstyles.input}
                        placeholder="Email"
                        keyboardType="default"
                        value={form.values.email}
                        onChangeText={val => onchanged(val, 'email')}
                        placeholderTextColor={colors.text}
                    />
                    {form.error.email != null && <Text style={[cstyles.error,]}>Email is required</Text>}

                    <TextInput
                        style={cstyles.input}
                        placeholder="Phone"
                        keyboardType="phone-pad"
                        value={form.values.phone}
                        onChangeText={val => onchanged(val, 'phone')}
                        placeholderTextColor={colors.text}
                    />
                    {form.error.phone != null && <Text style={[cstyles.error,]}>Phone is required</Text>}

                    <TextInput
                        style={cstyles.input}
                        placeholder="Location"
                        keyboardType="default"
                        value={form.values.location}
                        onChangeText={val => onchanged(val, 'location')}
                        placeholderTextColor={colors.text}
                    />
                    {form.error.location != null && <Text style={[cstyles.error,]}>Location is required</Text>}
                </View>
            </ScrollView>
            {loading ?
                <ActivityIndicator
                    color={colors.primary} size="large" /> :
                <TouchableWithoutFeedback
                    onPress={() => validate()}
                    style={[cstyles.btn, { marginHorizontal: width * 0.05 }]}>
                    <Text style={cstyles.btntext}>Submit</Text>
                </TouchableWithoutFeedback>}
            {error != null && <Text style={[cstyles.error, { textAlign: 'center' }]}>{error}</Text>}
        </Root>
    )
};

export default Devlead;
