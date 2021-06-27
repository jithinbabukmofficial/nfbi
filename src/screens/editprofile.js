import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, Image, SafeAreaView, TextInput, ActivityIndicator, Platform, } from 'react-native';
import { ScrollView, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { countries, states } from '../components/data';
import Drp from '../components/dropdown';
import Header from '../components/header';
import Root from '../components/root';
import { apiurl, base_url, colors } from '../constants/constants';
import { cstyles } from '../constants/cstyles';
// import ImagePicker from 'react-native-image-picker'
import Axios from 'axios';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';


//email reg
const reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
// phone reg
const phoneno = /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/;



const Editprofile = ({ navigation }) => {
    const { user, token: { token } } = useSelector(state => state)

    //form initstate
    const initstate = {
        name: user.name,
        email: user.email,
        addressline1: user.addressline1,
        addressline2: user.addressline2,
        district: user.district,
        state: user.state,
        country: user.country,
        pincode: user.pincode,
    }
    //component states
    const [form, setForm] = useState({ touched: {}, error: {}, values: initstate })
    const [loading, setLoading] = useState(false)
    const [ifscloading, setIfscloading] = useState(false)
    const [cerror, setCerror] = useState(null)
    const [editable, setEditable] = useState(false)

    //image picking function
    const pickimage = () => {
        ImagePicker.launchImageLibrary(
            {
                mediaType: 'photo',
                // includeBase64: false,
                maxHeight: 200,
                maxWidth: 200,
                title: 'Select Profile Photo'
            },
            (response) => {
                if (response.didCancel) {
                    console.log('User cancelled image picker');
                } else if (response.error) {
                    console.log('ImagePicker Error: ', response.error);
                } else {
                    setForm({ ...form, values: { ...form.values, profile: response }, touched: { ...form.touched, profile: true } })
                }
            },
        )
    }

    //onchanged is called
    const onchanged = (val, field) => {
        setForm({ ...form, touched: { ...form.touched, [field]: true }, values: { ...form.values, [field]: val } })
    }

    //changed detect
    useEffect(() => {
        setTimeout(() => {
            setEditable(true)
        }, 100);
        let { error, touched, values } = form
        Object.keys(values).forEach(k => {
            if (k != 'ifsc') {
                if (touched[k] && !values[k]) error[k] = `${k} is required`
                else error[k] = null
            }
        })
        //email validation
        if (touched.email && reg.test(values.email) == false) error.email = 'enter a valid email'
        //phone validation
        if (touched.phone && !phoneno.test(values.phone)) error.phone = 'enter a valid phone'
        // account number validation
        if (touched.confirmaccount && values.account != values.confirmaccount) error.confirmaccount = "account no didn't match"

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

        setForm({
            ...form,
            error: error,
            touched: touched
        })
        if (Object.keys(error).every(i => error[i] == null)) {
            update()
        } else {
            alert('please check all the errors')
        }
    }

    //register user
    const update = async () => {
        setLoading(true)
        setCerror(null)
        let { values } = form
        let formdata = new FormData()
        for (let i in values) {
            formdata.append(i, values[i])
        }
        Axios.post(`${apiurl}/mobileuser/update`, formdata, { headers: { 'auth-token': token } })
            .then(res => res.data)
            .then(res => {
                if (res.status) navigation.navigate('home')
                setLoading(false)
                navigation.navigate('success')
            })
            .catch(e => {
                if (e && e.response && e.response.data) setCerror(e.response.data)
                setLoading(false)
            })

    }

    //isfc validation
    // useEffect(() => {
    //     if (form.touched.ifsc) checkifsc(form.values.ifsc)
    // }, [form.values.ifsc])

    //check for valid ifsc
    // const checkifsc = ifsc => {
    //     if (ifscloading) return
    //     setIfscloading(true)
    //     let { values, error, touched } = form
    //     setForm({ ...form, error: { ...form.error, ifsc: 'checking for valid ifsc' } })
    //     Axios.post(`${apiurl}/ifsc/checkifsc`, { ifscode: ifsc })
    //         .then(res => res.data)
    //         .then(result => {
    //             setForm({
    //                 ...form,
    //                 values: { ...form.values, bank: result.BANK, branch: result.BRANCH },
    //                 error: {
    //                     ...form.error,
    //                     ifsc: null
    //                 }
    //             })
    //             setIfscloading(false)
    //         })
    //         .catch(e => {
    //             console.log(e.response.data)
    //             setForm({
    //                 ...form,
    //                 error: { ...form.error, ifsc: 'invalid ifsc' },
    //                 values: {
    //                     ...form.values,
    //                     bank: null,
    //                     branch: null
    //                 }
    //             })
    //             setIfscloading(false)
    //         })
    // }
    return (
        <Root>
            <SafeAreaView style={cstyles.container}>
                <ScrollView style={[cstyles.scroll, { paddingBottom: 20 }]}>
                    <Header title="Edit Profile" />
                    <View style={cstyles.box}>
                        <TextInput
                            style={cstyles.input}
                            placeholder="Name"
                            autoCapitalize="characters"
                            value={form.values.name}
                            onChangeText={val => onchanged(val, 'name')}
                            placeholderTextColor={colors.text}
                        />
                        {form.error.name != null && <Text style={styles.errortext}>{form.error['name']}</Text>}
                        <TextInput
                            style={cstyles.input}
                            placeholder="Email"
                            editable={editable}
                            value={form.values.email}
                            onChangeText={val => onchanged(val, 'email')}
                            placeholderTextColor={colors.text}
                        />
                        {form.error.email != null && <Text style={styles.errortext}>{form.error['email']}</Text>}
                        {/* <TextInput
                            style={cstyles.input}
                            placeholder="Phone ( for otp verification )"
                            keyboardType="phone-pad"
                            value={form.values.phone}
                            onChangeText={val => onchanged(val, 'phone')}
                            placeholderTextColor={colors.text}
                        />
                        {form.error.phone != null && <Text style={styles.errortext}>{form.error['phone']}</Text>} */}
                        <TextInput
                            style={cstyles.input}
                            placeholder="Addressline1"
                            autoCapitalize="characters"
                            value={form.values.addressline1}
                            onChangeText={val => onchanged(val, 'addressline1')}
                            placeholderTextColor={colors.text}
                        />
                        {form.error.addressline1 != null && <Text style={styles.errortext}>{form.error['addressline1']}</Text>}
                        <TextInput
                            style={cstyles.input}
                            placeholder="Addressline2"
                            autoCapitalize="characters"
                            value={form.values.addressline2}
                            onChangeText={val => onchanged(val, 'addressline2')}
                            placeholderTextColor={colors.text}
                        />
                        {form.error.addressline2 != null && <Text style={styles.errortext}>{form.error['addressline2']}</Text>}
                        <TextInput
                            style={cstyles.input}
                            placeholder="district"
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
                        {/* <TextInput
                            style={cstyles.input}
                            placeholder="Adhar"
                            value={form.values.adhar}
                            onChangeText={val => onchanged(val, 'adhar')}
                            placeholderTextColor={colors.text}
                        />
                        {form.error.adhar != null && <Text style={styles.errortext}>{form.error['adhar']}</Text>}
                        <TextInput
                            style={cstyles.input}
                            placeholder="Pan"
                            autoCapitalize="characters"
                            value={form.values.pan}
                            onChangeText={val => onchanged(val, 'pan')}
                            placeholderTextColor={colors.text}
                        />
                        {form.error.pan != null && <Text style={styles.errortext}>{form.error['pan']}</Text>}
                        <Text style={styles.reghead}>Bank Details</Text>
                        <TextInput
                            style={cstyles.input}
                            placeholder="Payee Name"
                            value={form.values.payeename}
                            onChangeText={val => onchanged(val, 'payeename')}
                            placeholderTextColor={colors.text}
                        />
                        {form.error.payeename != null && <Text style={styles.errortext}>{form.error['payeename']}</Text>}
                        <TextInput
                            style={cstyles.input}
                            placeholder="Ifsc"
                            keyboardType="default"
                            autoCapitalize="characters"
                            value={form.values.ifsc}
                            onChangeText={val => onchanged(val, 'ifsc')}
                            placeholderTextColor={colors.text}
                        />
                        {form.error.ifsc != null && <Text style={styles.errortext}>{form.error['ifsc']}</Text>}
                        <TextInput
                            style={cstyles.input}
                            placeholder="Bank Name"
                            editable={false}
                            autoCapitalize="characters"
                            selectTextOnFocus={false}
                            value={form.values.bank}
                            onChangeText={val => onchanged(val, 'bank')}
                            placeholderTextColor={colors.text}
                        />
                        {form.error.bank != null && <Text style={styles.errortext}>{form.error['bank']}</Text>}
                        <TextInput
                            style={cstyles.input}
                            placeholder="Account Number"
                            value={form.values.account}
                            onChangeText={val => onchanged(val, 'account')}
                            placeholderTextColor={colors.text}
                        />
                        {form.error.account != null && <Text style={styles.errortext}>{form.error['account']}</Text>}
                        <TextInput
                            style={cstyles.input}
                            placeholder="Confirm Account Number"
                            value={form.values.confirmaccount}
                            onChangeText={val => onchanged(val, 'confirmaccount')}
                            placeholderTextColor={colors.text}
                        />
                        {form.error.confirmaccount != null && <Text style={styles.errortext}>{form.error['confirmaccount']}</Text>}
                        <TextInput
                            style={cstyles.input}
                            placeholder="Branch"
                            autoCapitalize="characters"
                            editable={false}
                            selectTextOnFocus={false}
                            value={form.values.branch}
                            onChangeText={val => onchanged(val, 'branch')}
                            placeholderTextColor={colors.text}
                        />
                        {form.error.branch != null && <Text style={styles.errortext}>{form.error['branch']}</Text>} */}
                        {loading ?
                            <ActivityIndicator size="large" color={colors.primary} />
                            : <TouchableWithoutFeedback
                                onPress={() => {
                                    validate()
                                    // navigation.navigate('mobile')
                                }}
                                style={[cstyles.btn, { marginBottom: 0 }]}>
                                <Text style={cstyles.btntext}>Update</Text>
                            </TouchableWithoutFeedback>}
                        {cerror != null && <Text style={[styles.errortext, { textAlign: 'center', marginTop: 10 }]}>{cerror}</Text>}
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
        alignSelf: 'center',
        marginVertical: 10
    },
    reghead: {
        color: colors.primary,
        fontSize: 18,
        fontWeight: '500',
        marginVertical: 16
    }
});
export default Editprofile;
