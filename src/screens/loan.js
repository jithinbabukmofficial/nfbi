import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Text, TextInput, View } from 'react-native';
import { ScrollView, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import Drp from '../components/dropdown';
import Header from '../components/header';
import Root from '../components/root';
import { apiurl, colors, width } from '../constants/constants';
import { cstyles } from '../constants/cstyles';

const initstate = {
    name: null,
    vintage: null,
    turnover: null,
    amount: null,
    type: 'bussiness'
}

const Loan = ({ navigation, route }) => {

    const { title } = route.params
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
                console.warn(res)
                if (res.status) navigation.navigate('bussinessloan')
                setForm({ ...form, values: { message: null }, touched: { message: false } })
            })
            .catch(e => {
                if (e && e.response && e.response.data) setError(e.response.data)
            })
            .finally(e => setLoading(false))
    }


    return (
        <Root>
            <Header title={title.toUpperCase()} />
            <ScrollView>
                <View style={cstyles.box}>
                    <TextInput
                        style={cstyles.input}
                        placeholder="Business Name"
                        keyboardType="default"
                        value={form.values.name}
                        onChangeText={val => onchanged(val, 'name')}
                        placeholderTextColor={colors.text}
                    />
                    {form.error.name != null && <Text style={[cstyles.error,]}>Bussiness Name is required</Text>}

                    {/* <Drp value={form.values.category} onChange={val => onchanged(val, 'category')} data={[
                        { name: 'Gold' },
                        { name: 'Platinum' },
                        { name: 'Diamond' },
                    ]} title="Category" />
                    {form.error.category != null && <Text style={[cstyles.error,]}>Category is required</Text>} */}

                    <Drp value={form.values.vintage} onChange={val => onchanged(val, 'vintage')} data={[
                        { name: '0-1year' },
                        { name: '1year -3year' },
                        { name: '3year above' },
                    ]} title="Vintage of Business" />
                    {form.error.vintage != null && <Text style={[cstyles.error,]}>Vintage of Bussiness is required</Text>}

                    {/* <TextInput
                        style={cstyles.input}
                        placeholder="Any Other Loans"
                        keyboardType="default"
                        value={form.values.otherloan}
                        onChangeText={val => onchanged(val, 'otherloan')}
                        placeholderTextColor={colors.text}
                    />
                    {form.error.otherloan != null && <Text style={[cstyles.error,]}>This Field is required</Text>} */}

                    <Drp value={form.values.turnover} onChange={val => onchanged(val, 'turnover')} data={[
                        { name: '1L - 25L' },
                        { name: '25L - 50L' },
                        { name: '50L - 1Cr' },
                        { name: '1Cr Above' },
                    ]} title="Business Turnover" />
                    {form.error.turnover != null && <Text style={[cstyles.error,]}>Bussiness Turnover is required</Text>}


                    <TextInput
                        style={cstyles.input}
                        placeholder="Required Amount"
                        keyboardType="default"
                        value={form.values.amount}
                        onChangeText={val => onchanged(val, 'amount')}
                        placeholderTextColor={colors.text}
                    />
                    {form.error.amount != null && <Text style={[cstyles.error,]}>Required Amount is required</Text>}

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

export default Loan;
