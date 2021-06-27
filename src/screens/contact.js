import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, Image, TextInput, ActivityIndicator } from 'react-native';
import { ScrollView, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import Header from '../components/header';
import Root from '../components/root';
import { apiurl, colors } from '../constants/constants';
import { cstyles } from '../constants/cstyles';

const Contact = ({ navigation }) => {
    const { token } = useSelector(state => state.token)
    const [error, setError] = useState(null)
    const [form, setForm] = useState({ values: { message: null }, error: {}, touched: {} })
    const [loading, setLoading] = useState(null)

    useEffect(() => {
        let { error, touched, values } = form
        if (touched.message && !values.message) error.message = 'feedback is required'
        else error.message = null
        setForm({ ...form, error })
    }, [form.values])

    // form validation
    const validate = () => {
        let { error } = form
        if (!form.values.message) error.message = 'feedback is required'
        else error.message = null
        setForm({ ...form, error })
        if (form.values.message) submit()
    }
    const submit = () => {
        setError(null)
        setLoading(true)
        let formdata = new FormData()
        formdata.append('message', form.values.message)
        Axios.post(`${apiurl}/mobileuser/support`, formdata, { headers: { 'auth-token': token } })
            .then(res => res.data)
            .then(res => {
                console.warn(res)
                if (res.status) alert('your feedback is successfully submited')
                setForm({ ...form, values: { message: null }, touched: { message: false } })
            })
            .catch(e => {
                console.warn(e.response.data)
                if (e && e.response && e.response.data) setError(e.response.data)
            })
            .finally(e => setLoading(false))
    }
    return (
        <Root>
            <Header title="Contact Us" />
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={cstyles.box}>
                    <View style={styles.container}>
                        <View style={[cstyles.rowflex, styles.line]}>
                            <View style={[cstyles.row, { flex: 1 }]}>
                                <Image style={styles.icon} source={require('../assets/location.svg')} />
                                <Text style={styles.title}>corporate office</Text>
                            </View>
                            <View>
                                <Text style={styles.content}>ESSAR TRADE CENTER MAP</Text>
                                <Text style={styles.content}> USA GOA INDIA</Text>
                            </View>
                        </View>
                        <View style={[cstyles.rowflex, styles.line]}>
                            <View style={[cstyles.row, { flex: 1 }]}>
                                <Image style={styles.icon} source={require('../assets/website.svg')} />
                                <Text style={styles.title}>website</Text>
                            </View>
                            <Text style={styles.content}>www.nfbi.in</Text>
                        </View>
                        <View style={[cstyles.rowflex, styles.line]}>
                            <View style={[cstyles.row, { flex: 1 }]}>
                                <Image style={styles.icon} source={require('../assets/email.svg')} />
                                <Text style={styles.title}>email</Text>
                            </View>
                            <Text style={styles.content}>Business@nfbi.in</Text>
                        </View>
                    </View>

                    {/* contact */}
                    <View style={styles.container}>
                        <Text style={styles.heading}>help desk</Text>
                        <TextInput
                            placeholder="Feedback"
                            placeholderTextColor={colors.text}
                            numberOfLines={4}
                            multiline={true}
                            value={form.values.message}
                            onChangeText={val => setForm({
                                ...form,
                                values: {
                                    ...form.values, message: val
                                },
                                touched: { message: true }
                            })}
                            style={[cstyles.input, {
                                textAlignVertical: 'top',
                                minHeight: 100
                            }]} />
                        {form.error.message && <Text style={styles.error}>feedback is required</Text>}
                        {loading ?
                            <ActivityIndicator
                                color={colors.primary} size="large" />
                            : <TouchableWithoutFeedback
                                onPress={val => validate()}
                                style={cstyles.btn}>
                                <Text style={cstyles.btntext}>Submit</Text>
                            </TouchableWithoutFeedback>}
                        {error && <Text style={[styles.error, { textAlign: 'center' }]}>{error}</Text>}
                    </View>
                </View>
            </ScrollView>
        </Root>
    )
};
const styles = StyleSheet.create({
    error: {
        color: 'red',
        fontSize: 16
    },
    heading: {
        color: colors.primary,
        textTransform: 'capitalize',
        fontSize: 17,
        marginBottom: 15,
        marginTop: 5
    },
    line: {
        borderBottomColor: '#131313',
        borderBottomWidth: 1,
        paddingVertical: 10
    },
    content: {
        color: colors.sidebar,
        flex: 1,
        paddingLeft: 10,
        textAlign: 'right',
        fontSize: 12
    },
    title: {
        color: colors.primary,
        textTransform: 'capitalize',
        fontSize: 12
    },
    icon: {
        width: 40,
        height: 40,
        resizeMode: 'contain',
        marginRight: 10
    },
    container: {
        backgroundColor: colors.inputbg,
        paddingVertical: 10,
        borderRadius: 6,
        paddingHorizontal: 10,
        marginBottom: 15
    }
});
export default Contact;
