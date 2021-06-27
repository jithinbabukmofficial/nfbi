import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, Image, SafeAreaView, TextInput, ActivityIndicator, Platform, } from 'react-native';
import { ScrollView, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { countries, states } from '../components/data';
import Drp from '../components/dropdown';
import Header from '../components/header';
import Root from '../components/root';
import { apiurl, colors } from '../constants/constants';
import { cstyles } from '../constants/cstyles';
import ImagePicker from 'react-native-image-crop-picker';
import Axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import CheckBox from '@react-native-community/checkbox';

//email reg
const reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
const phoneno = /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/;



// const initstate = {
//     profile: null,
//     name: null,
//     email: null,
//     phone: null,
//     password: null,
//     confirm: null,
//     addressline1: null,
//     addressline2: null,
//     district: null,
//     state: 'Kerala',
//     country: 'India',
//     pincode: null,
//     adhar: null,
//     payeename: null,
//     ifsc: null,
//     bank: null,
//     account: null,
//     confirmaccount: null,
//     branch: null,
//     parent: '5f91a6a553ab0b0be11f5880'
// }

const Register = ({
    navigation,
    route
}) => {
    const { parent } = route.params

    //form initstate
    const initstate = {
        profile: null,
        name: null,
        email: null,
        phone: null,
        password: null,
        confirm: null,
        addressline1: null,
        addressline2: null,
        district: null,
        state: 'Kerala',
        country: 'India',
        pincode: null,
        parent: parent
    }

    //component states
    const [form, setForm] = useState({ touched: {}, error: {}, values: initstate })
    const [loading, setLoading] = useState(false)
    const [ifscloading, setIfscloading] = useState(false)
    const [privacy, setPrivacy] = useState(false)
    const [old, setOld] = useState(false)

    const nav = useNavigation()

    //image picking function
    const pickimage = () => {
        ImagePicker.openPicker({
            width: 300,
            height: 300,
            cropping: true
        }).then(response => {
            console.log(response)
            setForm({ ...form, values: { ...form.values, profile: response }, touched: { ...form.touched, profile: true } })
        }).catch(e => console.log('something went wrong'))
    }

    //onchanged is called
    const onchanged = (val, field) => {
        setForm({ ...form, touched: { ...form.touched, [field]: true }, values: { ...form.values, [field]: val } })
        console.log(form)
    }

    //changed detect
    useEffect(() => {
        let { error, touched, values } = form
        Object.keys(values).forEach(k => {
            if (k != 'ifsc') {
                if (touched[k] && !values[k]) error[k] = `${k} is required`
                else error[k] = null
            }
        })
        //email validation
        if (touched.email && reg.test(values.email) == false) error.email = 'Enter a valid email'
        else error.email = null
        //phone validation
        if (touched.phone && !phoneno.test(values.phone)) error.phone = 'Enter a valid phone'
        else error.phone = null
        //password validation
        if (touched.confirm && values.password != values.confirm) error.confirm = "Password didn't match"
        else error.confirm = null
        // account no validation

        setForm({ ...form, error: error })
    }, [form.values])

    //form validation
    const validate = () => {
        let { error, values, touched } = form
        Object.keys(values).forEach(k => {
            if (values[k] == null) error[k] = `${k} is required`
            else error[k] = null
            touched[k] = true
        })

        //email validation
        if (touched.email && reg.test(values.email) == false) error.email = 'enter a valid email'
        //phone validation
        if (touched.phone && !phoneno.test(values.phone)) error.phone = 'enter a valid phone'
        //password validation
        if (touched.confirm && values.password != values.confirm) error.confirm = "password didn't match"
        // // account no validation
        // if (touched.confirmaccount && values.account != values.confirmaccount) error.confirmaccount = "account no didn't match"

        setForm({
            ...form,
            error: error,
            touched: touched
        })
        if (Object.keys(error).every(i => error[i] == null)) {
            register()
        } else {
            alert('please check all the errors')
            console.warn(error)
        }
    }
    //register user
    const register = async () => {
        if (!privacy || !old) return alert('please accept terms and conditions & age limit')
        setLoading(true)
        let { values } = form
        let formdata = new FormData()
        for (let i in values) {
            if (i != 'profile' && i != 'confirm') formdata.append(i, values[i])
        }
        formdata.append('profile', {
            name: values.profile.fileName ? values.profile.fileName : 'sdfsdfsdj',
            type: values.profile.mime,
            uri: Platform.OS === "android" ? values.profile.path : values.profile.path.replace("file://", "")
        })
        Axios.post(`${apiurl}/mobileuser/register`, formdata)
            .then(res => res.data)
            .then(res => {
                if (res.status) {
                    nav.replace('otp', { user: res.user, session_id: res.session_id })
                }
                setLoading(false)
                console.warn(res)
            })
            .catch(e => {
                alert(e.response.data)
                console.warn(e.response)
                setLoading(false)
            })

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
            <SafeAreaView style={cstyles.container}>
                <ScrollView style={[cstyles.scroll, { paddingBottom: 20 }]}>
                    <Header title="Register" />
                    <View style={cstyles.box}>
                        <View style={styles.pickimage}>

                            {form.values.profile != null ?
                                <Image style={styles.profile} source={{ uri: form.values.profile.path }} />
                                :
                                <TouchableWithoutFeedback
                                    onPress={() => {
                                        pickimage()
                                    }}
                                >
                                    <Image source={require('../assets/pickimage.svg')} />
                                </TouchableWithoutFeedback>}
                        </View>
                        {form.error.profile != null && <Text style={[styles.errortext, { textAlign: 'center' }]}>image is required</Text>}
                        <TextInput
                            style={cstyles.input}
                            autoCapitalize="characters"
                            placeholder="Name"
                            value={form.values.name}
                            onChangeText={val => onchanged(val, 'name')}
                            placeholderTextColor={colors.text}
                        />
                        {form.error.name != null && <Text style={styles.errortext}>{form.error['name']}</Text>}
                        <TextInput
                            style={cstyles.input}
                            placeholder="Email"
                            keyboardType="email-address"
                            value={form.values.email}
                            onChangeText={val => onchanged(val, 'email')}
                            placeholderTextColor={colors.text}
                        />
                        {form.error.email != null && <Text style={styles.errortext}>{form.error['email']}</Text>}
                        <TextInput
                            style={cstyles.input}
                            placeholder="Phone ( for OTP verification )"
                            keyboardType="phone-pad"
                            value={form.values.phone}
                            onChangeText={val => onchanged(val, 'phone')}
                            placeholderTextColor={colors.text}
                        />
                        {form.error.phone != null && <Text style={styles.errortext}>{form.error['phone']}</Text>}
                        <TextInput
                            style={cstyles.input}
                            placeholder="Password"
                            value={form.values.password}
                            onChangeText={val => onchanged(val, 'password')}
                            placeholderTextColor={colors.text}
                        />
                        {form.error.password != null && <Text style={styles.errortext}>{form.error['password']}</Text>}
                        <TextInput
                            style={cstyles.input}
                            placeholder="Confirm Password"
                            value={form.values.confirm}
                            onChangeText={val => onchanged(val, 'confirm')}
                            placeholderTextColor={colors.text}
                        />
                        {form.error.confirm != null && <Text style={styles.errortext}>{form.error['confirm']}</Text>}
                        <TextInput
                            style={cstyles.input}
                            placeholder="Address"
                            autoCapitalize="characters"
                            value={form.values.addressline1}
                            onChangeText={val => onchanged(val, 'addressline1')}
                            placeholderTextColor={colors.text}
                        />
                        {form.error.addressline1 != null && <Text style={styles.errortext}>{form.error['addressline1']}</Text>}
                        <TextInput
                            style={cstyles.input}
                            placeholder="City"
                            autoCapitalize="characters"
                            value={form.values.addressline2}
                            onChangeText={val => onchanged(val, 'addressline2')}
                            placeholderTextColor={colors.text}
                        />
                        {form.error.addressline2 != null && <Text style={styles.errortext}>{form.error['addressline2']}</Text>}
                        <TextInput
                            style={cstyles.input}
                            placeholder="District"
                            autoCapitalize="characters"
                            value={form.values.district}
                            onChangeText={val => onchanged(val, 'district')}
                            placeholderTextColor={colors.text}
                        />
                        {form.error.district != null && <Text style={styles.errortext}>{form.error['district']}</Text>}
                        <View style={cstyles.rowflex}>
                            <Drp value={form.values.state} onChange={val => onchanged(val, 'state')} data={states} title="State" />
                            <Drp value={form.values.country} onChange={val => onchanged(val, 'country')} data={countries} title="Country" />
                        </View>
                        <View style={cstyles.rowflex}>
                            <View style={{ flex: .48 }}>{form.error.state != null && <Text style={styles.errortext}>{form.error['state']}</Text>}</View>
                            <View style={{ flex: .48 }}>{form.error.country != null && <Text style={styles.errortext}>{form.error['country']}</Text>}</View>
                        </View>
                        <TextInput
                            style={cstyles.input}
                            placeholder="Pincode"
                            keyboardType="number-pad"
                            value={form.values.pincode}
                            onChangeText={val => onchanged(val, 'pincode')}
                            placeholderTextColor={colors.text}
                        />
                        {form.error.pincode != null && <Text style={styles.errortext}>{form.error['pincode']}</Text>}
                        <View style={cstyles.row}>
                            <CheckBox
                                boxType="square"
                                tintColor={colors.heading}
                                onCheckColor={colors.primary}
                                onTintColor={colors.primary}
                                tintColors={colors.primary}
                                disabled={false}
                                style={{ marginRight: 10, width: 20, height: 20 }}
                                value={old}
                                onValueChange={(newValue) => setOld(newValue)}
                            />
                            <Text style={styles.agree}> Yes I am 18 Years Old</Text>
                        </View>

                        <View style={cstyles.row}>
                            <CheckBox
                                boxType="square"
                                tintColor={colors.heading}
                                onCheckColor={colors.primary}
                                onTintColor={colors.primary}
                                tintColors={colors.primary}
                                disabled={false}
                                style={{ marginRight: 10, width: 20, height: 20 }}
                                value={privacy}
                                onValueChange={(newValue) => setPrivacy(newValue)}
                            />
                            <Text style={styles.agree}> I Agree All The Terms & Conditions and Privacy Policy.</Text>
                        </View>
                        {loading ?
                            <ActivityIndicator size="large" color={colors.primary} />
                            : <TouchableWithoutFeedback
                                onPress={() => {
                                    validate()
                                    // navigation.navigate('mobile')
                                }}
                                style={[cstyles.btn, { marginBottom: 0 }]}>
                                <Text style={cstyles.btntext}>Register</Text>
                            </TouchableWithoutFeedback>}
                    </View>
                    <Image style={cstyles.image} source={require('../assets/background.svg')} />
                </ScrollView>
            </SafeAreaView>
        </Root>
    )
};
const styles = StyleSheet.create({
    errortext: {
        color: 'red',
        marginBottom: 10
    },
    profile: {
        height: 150,
        width: 150,
        resizeMode: 'cover',
        borderRadius: 6
    },
    pickimage: {
        alignItems: 'center',
        paddingVertical: 15,
        marginBottom: 15
    },
    agree: {
        color: '#505151',
        textAlign: 'center',
        marginVertical: 10
    },
    reghead: {
        color: colors.primary,
        fontSize: 18,
        fontWeight: '500',
        marginVertical: 16
    }
});
export default Register;
