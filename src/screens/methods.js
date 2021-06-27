import Axios from 'axios';
import React, { useState } from 'react';
import { ActivityIndicator, Image, StyleSheet, Text, View } from 'react-native';
import { ScrollView, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import Snackbar from 'react-native-snackbar';
import { useSelector } from 'react-redux';
import Header from '../components/header';
import Root from '../components/root';
import { apiurl, colors, width } from '../constants/constants';
import { cstyles } from '../constants/cstyles';

const Methods = ({
    navigation,
    route
}) => {
    const { count } = route.params
    const { token: { token }, user } = useSelector(state => state)

    // component states
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const createorder = () => {
        setError(null)
        if (loading) return
        setLoading(true)
        let formdata = new FormData()
        formdata.append('count', count)
        Axios.post(`${apiurl}/usertoken/createofflineorder`, formdata, { headers: { 'auth-token': token } })
            .then(res => res.data)
            .then(({ status, amount, currency, id, upi }) => {
                if (status) {
                    navigation.navigate('upload', { amount, id, upi })
                }
                console.warn(amount, upi, id)
            }).catch(e => {
                console.warn(e)
                if (e.response && e.response.data) setError(e.response.data)
                else setError('something went wrong')
            })
            .finally(e => setLoading(false))
    }

    return (
        <Root>
            <Header title="Payment Methods" />
            {loading && <View style={{
                ...StyleSheet.absoluteFill,
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 1000
            }}>
                <ActivityIndicator color={colors.primary} size="large" />
            </View>}
            <View style={styles.main}>
                <TouchableWithoutFeedback
                    // disabled={true}
                    onPress={() => {
                        Snackbar.show({
                            text: 'Coming Soon',
                            duration: Snackbar.LENGTH_SHORT,
                            backgroundColor: colors.primary
                        });
                    }}
                    style={styles.container}>
                    <Text style={styles.text}>Online Payment</Text>
                    <Image style={styles.right} source={require('../assets/righticon.svg')} />
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback
                    onPress={() => createorder()}
                    style={styles.container}>
                    <Text style={styles.text}>Offline Payment</Text>
                    <Image style={styles.right} source={require('../assets/righticon.svg')} />
                </TouchableWithoutFeedback>

                <Text style={[cstyles.error, { textAlign: 'center' }]}>{error}</Text>
            </View>
        </Root>
    )
};
const styles = StyleSheet.create({
    box: {
        flex: 1,
    },
    text: {
        fontSize: 20,
        color: colors.primary,
        textTransform: 'uppercase'
    },
    right: {
        width: 15,
        height: 15,
        resizeMode: 'contain'
    },
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: colors.inputbg,
        paddingVertical: 20,
        paddingHorizontal: 15,
        borderRadius: 5,
        marginBottom: 15
    },
    main: {
        flex: 1,
        paddingHorizontal: width * 0.05,
        justifyContent: 'center'
    }
});
export default Methods;
