import React, { useEffect, useState } from 'react';
import { ActivityIndicator, TouchableOpacity, Image, Modal, Platform, StyleSheet, Text, TextInput, View } from 'react-native';
import Header from '../components/header';
import Root from '../components/root';
import ImagePicker from 'react-native-image-crop-picker';
import { apiurl, colors, width } from '../constants/constants';
import { useSelector } from 'react-redux';
import { ScrollView, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { cstyles } from '../constants/cstyles';
import Axios from 'axios';
import Clipboard from '@react-native-community/clipboard'
import Snackbar from 'react-native-snackbar';

const Upload = ({
    navigation,
    route
}) => {
    const { upi, amount, id } = route.params
    const initstate = {
        screenshot: null,
        order_id: id,
        utr: null
    }
    const [form, setForm] = useState({ touched: {}, error: {}, values: initstate })
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const { token: { token }, user } = useSelector(state => state)
    const [openmodal, setOpenmodal] = useState(false)

    //image picking function
    const pickimage = async () => {
        await ImagePicker.openPicker({
            mediaType: 'photo'
        }).then(response => {
            console.log(response)
            setForm({ ...form, values: { ...form.values, screenshot: response }, touched: { ...form.touched, screenshot: true } })
        }).catch(e => console.log('something went wrong'))
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
            uploadscreenshot()
        } else {
            setError('please check all the errors')
        }

    }

    // upload screenshot
    const uploadscreenshot = () => {
        if (loading) return
        setLoading(true)
        let { values } = form
        let formdata = new FormData()
        formdata.append('screenshot', {
            name: values.screenshot.fileName ? values.screenshot.fileName : 'sdfsdfsdj',
            type: values.screenshot.mime,
            uri: Platform.OS === "android" ? values.screenshot.path : values.screenshot.path.replace("file://", "")
        })
        formdata.append('id', values.order_id)
        formdata.append('utr', values.utr)
        Axios.post(`${apiurl}/usertoken/uploadscreenshot`, formdata, { headers: { 'auth-token': token } })
            .then(res => res.data)
            .then(res => {
                if (res.status) {
                    navigation.replace('success', { message: 'Your PIN Purchase is awaiting for Approval.It will be Sanctioned within 24hours After Verification Process. Support@nfbi.in Thank you' })
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

    const copyToClipboard = async () => {
        Clipboard.setString(upi);
        Snackbar.show({
            text: 'UPI Id copied',
            duration: Snackbar.LENGTH_SHORT,
            backgroundColor: colors.primary
        });
        setOpenmodal(true)
    };
    const copyToClipboardamount = async () => {
        Clipboard.setString(amount.toString())
        Snackbar.show({
            text: 'Amount is copied',
            duration: Snackbar.LENGTH_SHORT,
            backgroundColor: colors.primary
        });
    };
    return (
        <Root>
            <Header title="Upload Screenshot" />
            <ScrollView style={styles.main}>

                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={openmodal}
                    onRequestClose={() => {
                        setOpenmodal(!openmodal)
                    }}
                >
                    <View style={{
                        flex: 1, justifyContent: 'center', alignItems: 'center',
                        backgroundColor: 'rgba(0,0,0,0.7)'
                    }}>
                        <View style={[styles.box, {
                            width: width * .9,
                            paddingVertical: 30,
                            alignItems: 'center'
                        }]}>
                            <Image style={{ width: width * .2, height: width * .2, }} source={require('../assets/tick.svg')} />
                            <Text style={{
                                fontSize: 20,
                                color: colors.primary,
                                fontWeight: '700',
                                marginVertical: 15
                            }}>Copy Success</Text>

                            <Text style={{
                                fontSize: 15,
                                color: colors.border,
                                fontWeight: '400',
                                marginVertical: 15,
                                textAlign: 'center'
                            }}>Open your UPI payment service provider & {'\n'} Complete Payment </Text>

                            <View style={cstyles.rowflex}>
                                <Image style={styles.pay2} source={require('../assets/gpay.svg')} />
                                <Image style={styles.pay2} source={require('../assets/phonepe.svg')} />
                                <Image style={styles.pay2} source={require('../assets/bhim.svg')} />
                                <Image style={styles.pay2} source={require('../assets/upi.svg')} />
                            </View>

                            <TouchableOpacity
                                onPress={() => setOpenmodal(false)}
                                style={[cstyles.btn, { width: width * .3, alignSelf: 'center', paddingVertical: 10 }]}>
                                <Text >OK</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                </Modal>

                <TouchableWithoutFeedback
                    // onPress={() => pickimage('bank')}
                    style={[styles.boxing]}>
                    <Text style={styles.title}>{upi}</Text>
                    <TouchableWithoutFeedback
                        onPress={copyToClipboard}
                        style={{
                            backgroundColor: colors.primary,
                            paddingVertical: 10,
                            paddingHorizontal: 10,
                            borderRadius: 5
                        }}>
                        <Text style={[styles.title, { color: colors.background, fontSize: 11 }]}>click to copy</Text>
                    </TouchableWithoutFeedback>
                </TouchableWithoutFeedback>
                <View style={cstyles.rowflex}>
                    <Image style={styles.pay} source={require('../assets/gpay.svg')} />
                    <Image style={styles.pay} source={require('../assets/phonepe.svg')} />
                    <Image style={styles.pay} source={require('../assets/bhim.svg')} />
                    <Image style={styles.pay} source={require('../assets/upi.svg')} />
                </View>

                <TouchableWithoutFeedback
                    // onPress={() => pickimage('bank')}
                    style={[styles.boxing]}>
                    <Text style={styles.title}>Rs {amount} /- to pay</Text>
                    <TouchableWithoutFeedback
                        onPress={copyToClipboardamount}
                        style={{
                            backgroundColor: colors.primary,
                            paddingVertical: 10,
                            paddingHorizontal: 10,
                            borderRadius: 5
                        }}>
                        <Text style={[styles.title, { color: colors.background, fontSize: 11 }]}>click to copy</Text>
                    </TouchableWithoutFeedback>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback
                    onPress={() => pickimage('bank')}
                    style={[styles.box, styles.line]}>
                    {form.values.screenshot == null ? <View>
                        <Image style={styles.upload} source={require('../assets/cloud.svg')} />
                        <Text style={styles.title2}>Upload Payment Screenshot</Text>
                        {/* <Text style={styles.para}>Last 6 months</Text> */}
                        <View
                            onPress={() => pickimage('bank')}
                            style={[cstyles.btn, { width: width * .3, alignSelf: 'center', paddingVertical: 10 }]}>
                            <Text >Upload</Text>
                        </View>
                    </View> :
                        <Image style={styles.profile} source={{ uri: form.values.screenshot.path }} />}
                </TouchableWithoutFeedback>
                {form.error.screenshot != null && <Text style={cstyles.error}>{form.error['screenshot']}</Text>}
                <TextInput
                    style={cstyles.input}
                    placeholder="Payment UTR Number"
                    value={form.values.utr}
                    onChangeText={val => setForm({
                        ...form,
                        values: {
                            ...form.values,
                            utr: val
                        }
                    })}
                    placeholderTextColor={colors.text}
                />
                {form.error.utr != null && <Text style={cstyles.error}>{form.error['utr']}</Text>}
            </ScrollView>
            {loading ?
                <ActivityIndicator size="large" color={colors.primary} /> :
                <TouchableWithoutFeedback
                    onPress={validate}
                    style={[cstyles.btn, { marginHorizontal: width * 0.05 }]}>
                    <Text style={[cstyles.btntext, { textTransform: 'uppercase' }]}>UPLOAD</Text>
                </TouchableWithoutFeedback>}
            {error && <Text style={[cstyles.error, { textAlign: 'center' }]}>{error}</Text>}
        </Root>
    )
};

const styles = StyleSheet.create({
    pay: {
        width: width * .2,
        marginBottom: 15
    },
    pay2: {
        width: width * .2,
    },
    line: {
        borderWidth: 1,
        borderColor: colors.primary,
        borderStyle: 'dashed'
    },
    boxing: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderColor: colors.border,
        borderWidth: 1,
        paddingVertical: 12,
        paddingHorizontal: 15,
        borderRadius: 4,
        marginBottom: 20
    },
    profile: {
        height: 400,
        width: width * .7,
        resizeMode: 'contain',
        borderRadius: 6,
        alignSelf: 'center'
    },
    upload: {
        width: width * .25,
        alignSelf: 'center',
        height: width * .25,
        resizeMode: 'contain'
    },
    para: {
        color: colors.border,
        textAlign: 'center',
        marginTop: 5,
        textTransform: 'uppercase'
    },
    title: {
        color: colors.primary,
        textAlign: 'center',
        fontSize: 17
    },
    title2: {
        color: colors.primary,
        textAlign: 'center',
        fontSize: 19,
        fontWeight: '500'
    },
    box: {
        backgroundColor: colors.inputbg,
        paddingVertical: 15,
        paddingHorizontal: 15,
        borderRadius: 4,
        marginBottom: 20
    },
    main: {
        paddingHorizontal: width * 0.05
    }
});

export default Upload;
