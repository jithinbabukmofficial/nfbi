import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
    Text, View, StyleSheet,
    ScrollView,
    Image,
    TextInput,
    SafeAreaView,
    TouchableOpacity,
    ActivityIndicator
} from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { useDispatch } from 'react-redux';
import { setToken } from '../action/token';
import Root from '../components/root';
import { apiurl, colors, height, width } from '../constants/constants';
import { cstyles } from '../constants/cstyles'



const phoneno = /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/;
const Login = ({
    navigation,
}) => {
    const [form, setForm] = useState({
        values: { phone: null, password: null },
        error: {},
        touched: {}
    })
    const [cerror, setCerror] = useState(null)
    const [loading, setLoading] = useState(false)

    const dispatch = useDispatch()

    //form change
    useEffect(() => {
        let { values, error, touched } = form
        if (touched.phone && !phoneno.test(values.phone)) error.phone = 'enter a valid phone'
        else error.phone = null
        if (touched.password && !values.password) error.password = 'Password is required'
        else error.password = null
        setForm({ ...form, error: error })
        setCerror(null)
    }, [form.values])

    const validate = () => {
        let { values, error, touched } = form
        if (!values.phone && !phoneno.test(values.phone)) error.phone = 'Phone is required'
        else error.phone = null
        if (!values.password && values.password == null) error.password = 'Password is required'
        else error.password = null
        setForm({ ...form, error })
        setCerror(null)
        return error
    }

    const change = (value, name) => {
        setForm({
            ...form,
            values: { ...form.values, [name]: value },
            touched: { ...form.touched, [name]: true }
        })
    }

    const submit = async () => {
        if (loading) return
        setCerror(null)
        setLoading(true)
        let { values } = form
        let formdata = new FormData()
        for (let i in values) {
            formdata.append(i, values[i])
        }
        Axios.post(`${apiurl}/mobileuser/login`, formdata)
            .then(res => res.data)
            .then(res => {
                if (res.message == "success") {
                    dispatch(setToken(res.token))
                    navigation.replace('home')
                } else if (res.message == "otp") {
                    navigation.navigate('otp', { session_id: res.session_id })
                }
            })
            .catch(e => setCerror(e.response.data))
            .finally(() => setLoading(false))
    }
    return (
        <Root>
            <SafeAreaView style={styles.container}>
                <Image style={styles.image} source={require('../assets/background.svg')} />
                <ScrollView style={styles.scroll} >
                    <View style={{ height: height - (height * .04), width: width }}>
                        <View style={styles.upperbox}>
                            <View style={cstyles.box}>
                                <Image style={styles.logo} source={require('../assets/logo.svg')} />
                            </View>
                        </View>
                        <View style={[cstyles.box, styles.bottombox]}>
                            <Text style={styles.logintitle}>Login</Text>
                            <View style={styles.inputrow}>
                                <Image style={styles.inputicon} source={require('../assets/user.svg')} />
                                <TextInput
                                    placeholder="Phone Number"
                                    onChangeText={val => change(val, 'phone')}
                                    keyboardType="phone-pad"
                                    placeholderTextColor={colors.text}
                                    style={styles.input} />
                            </View>
                            {form.error.phone && <Text style={styles.error}>{form.error.phone}</Text>}
                            <View style={styles.inputrow}>
                                <Image style={styles.inputicon} source={require('../assets/lock.svg')} />
                                <TextInput
                                    placeholder="Password"
                                    placeholderTextColor={colors.text}
                                    onChangeText={val => change(val, 'password')}
                                    secureTextEntry={true}
                                    style={styles.input} />
                            </View>
                            {form.error.password && <Text style={styles.error}>{form.error.password}</Text>}
                            {loading ?
                                <ActivityIndicator size="large" color={colors.primary} />
                                : <TouchableWithoutFeedback
                                    onPress={() => {
                                        const error = validate()
                                        console.log(error)
                                        if (Object.keys(error).every(k => error[k] == null)) submit()
                                        else setCerror('Please fill all fields')
                                    }}
                                    style={cstyles.btn}>
                                    <Text style={cstyles.btntext}>Login</Text>
                                </TouchableWithoutFeedback>}
                            {cerror && <Text style={[styles.error, styles.cerror]}>{cerror}</Text>}
                            <TouchableWithoutFeedback
                                onPress={() => navigation.navigate('mobile')}
                            >
                                <Text style={styles.forgot}>Forgot Password ?</Text>
                            </TouchableWithoutFeedback>
                            <View style={cstyles.row}>
                                <View style={cstyles.line} />
                                <Text style={styles.or}>or</Text>
                                <View style={cstyles.line} />
                            </View>

                            <TouchableWithoutFeedback
                                onPress={() => navigation.navigate('parent')}
                                style={[cstyles.btntrans, { zIndex: 101 }]}>
                                <Text style={cstyles.btntext2}>Register Your Business</Text>
                            </TouchableWithoutFeedback>
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </Root>
    )
};
const styles = StyleSheet.create({
    cerror: {
        textAlign: 'center',
        marginBottom: 10,
        fontSize: 15
    },
    error: {
        color: 'red'
    },
    forgot: {
        color: colors.primary,
        fontSize: 15,
        alignSelf: 'center',
        marginBottom: 20,
        marginTop: 5
    },
    or: {
        color: colors.text,
        marginHorizontal: 20,
        fontSize: 15
    },
    inputicon: {
        marginHorizontal: 20
    },
    input: {
        flex: 1,
        fontSize: 16,
        borderLeftWidth: 1,
        borderLeftColor: colors.border,
        paddingVertical: 12,
        paddingHorizontal: 15,
        color: colors.primary
    },
    inputrow: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: 5,
        marginTop: 20,
        marginBottom: 10,
        backgroundColor: colors.inputbg
    },
    logintitle: {
        color: colors.primary,
        alignSelf: 'center',
        fontSize: 15
    },
    bottombox: {
        flex: 6.5
    },
    upperbox: {
        flex: 3,
        justifyContent: 'center'
    },
    logo: {
        width: width * .7,
        resizeMode: 'contain',
        height: width * .3,
        alignSelf: 'center',
    },
    scroll: {
        ...StyleSheet.absoluteFill,
    },
    image: {
        resizeMode: 'cover',
        width: width,
    },
    container: {
        flex: 1,
        backgroundColor: colors.background,
        justifyContent: 'flex-end'
    }
});
export default Login;
