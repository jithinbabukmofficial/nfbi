import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Image, StyleSheet, Text, View } from 'react-native';
import { ScrollView, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import Header from '../components/header';
import Root from '../components/root';
import { colors, width } from '../constants/constants';
import { cstyles } from '../constants/cstyles';
import DocumentPicker from 'react-native-document-picker';
import Pdf from 'react-native-pdf';

const initstate = {
    adhar: null,
    bank: null,
    gst: null,
    msme: null,
    itr: null
}

const HousingLoan = ({ navigation }) => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const [form, setForm] = useState({ touched: {}, error: {}, values: initstate })

    const pickAdhar = async field => {
        try {
            const res = await DocumentPicker.pick({
                type: [DocumentPicker.types.pdf],
            });
            setForm({
                ...form,
                touched: { ...form.touched, [field]: true },
                values: { ...form.values, [field]: res }
            })
        } catch (err) {
            console.log(err)
        }
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
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
            navigation.replace('success')
        }, 2000);
    }
    return (
        <Root>
            <Header title="Documents" />
            <ScrollView>
                <View style={cstyles.box}>
                    <TouchableWithoutFeedback
                        onPress={() => pickAdhar('adhar')}
                        style={styles.box}>
                        {form.values.adhar == null ? <View>
                            <Image style={styles.upload} source={require('../assets/cloud.svg')} />
                            <Text style={styles.title}>KYC UPLOAD</Text>
                            <Text style={styles.para}>Adhar card & Pan card</Text>
                        </View> : <Pdf
                                source={{ uri: form.values.adhar.uri }}
                                style={styles.pdf} />}
                    </TouchableWithoutFeedback>
                    {form.error.adhar != null && <Text style={[cstyles.error,]}>This field is required</Text>}

                    <TouchableWithoutFeedback
                        onPress={() => pickAdhar('bank')}
                        style={styles.box}>
                        {form.values.bank == null ? <View>
                            <Image style={styles.upload} source={require('../assets/cloud.svg')} />
                            <Text style={styles.title}>SALARY CERTIFICATE</Text>
                        </View> :
                            <Pdf
                                source={{ uri: form.values.bank.uri }}
                                style={styles.pdf} />}
                    </TouchableWithoutFeedback>
                    {form.error.bank != null && <Text style={[cstyles.error,]}>This field is required</Text>}

                    <TouchableWithoutFeedback
                        onPress={() => pickAdhar('gst')}
                        style={styles.box}>
                        {form.values.gst == null ? <View>
                            <Image style={styles.upload} source={require('../assets/cloud.svg')} />
                            <Text style={styles.title}>SALARY SLIP</Text>
                            <Text style={styles.para}>Last 6 months</Text>
                        </View> :
                            <Pdf
                                source={{ uri: form.values.gst.uri }}
                                style={styles.pdf} />}
                    </TouchableWithoutFeedback>
                    {form.error.gst != null && <Text style={[cstyles.error,]}>This field is required</Text>}

                    <TouchableWithoutFeedback
                        onPress={() => pickAdhar('msme')}
                        style={styles.box}>
                        {form.values.msme == null ? <View>
                            <Image style={styles.upload} source={require('../assets/cloud.svg')} />
                            <Text style={styles.title}>bank statement</Text>
                            {/* <Text style={styles.para}>Last 6 months</Text> */}
                        </View> :
                            <Pdf
                                source={{ uri: form.values.msme.uri }}
                                style={styles.pdf} />}
                    </TouchableWithoutFeedback>
                    {form.error.msme != null && <Text style={[cstyles.error,]}>This field is required</Text>}

                    <TouchableWithoutFeedback
                        onPress={() => pickAdhar('itr')}
                        style={styles.box}>
                        {form.values.itr == null ? <View>
                            <Image style={styles.upload} source={require('../assets/cloud.svg')} />
                            <Text style={styles.title}>FORM 16</Text>
                            {/* <Text style={styles.para}>Last 6 months</Text> */}
                        </View> :
                            <Pdf
                                source={{ uri: form.values.itr.uri }}
                                style={styles.pdf} />}
                    </TouchableWithoutFeedback>
                    {form.error.itr != null && <Text style={[cstyles.error,]}>This field is required</Text>}

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
const styles = StyleSheet.create({
    pdf: {
        width: width * .4,
        height: width * .4,
        alignSelf: 'center'
    },
    upload: {
        width: width * .4,
        alignSelf: 'center',
        height: width * .4,
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
        fontSize: 17,
        textTransform: 'uppercase'
    },
    box: {
        backgroundColor: colors.inputbg,
        paddingVertical: 15,
        paddingHorizontal: 15,
        borderRadius: 4,
        marginBottom: 20
    },
    container: {

    }
});
export default HousingLoan;
