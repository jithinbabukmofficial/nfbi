import Axios from 'axios';
import React, { useEffect } from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import { useSelector } from 'react-redux';
import Root from '../components/root';
import { apiurl, height, width } from '../constants/constants';

const Splash = ({ navigation }) => {
    const { token } = useSelector(state => state.token)
    useEffect(() => {
        if (!token) return navigation.navigate('slide')
        check()
    }, [])

    const check = () => {
        Axios.get(`${apiurl}/mobileuser/testexpire`, {
            headers: {
                'auth-token': token
            }
        }).then(res => res.data)
            .then(res => {
                console.log(res)
                if (res.status) navigation.replace('home')
            }).catch(e => {
                navigation.navigate('login')
            })
    }
    return (
        <Root>
            <View style={styles.container}>
                <Image style={styles.image} source={require('../assets/bg2.svg')} />
                <Image style={styles.image} source={require('../assets/background.svg')} />
                <View style={styles.box}>
                    <Image style={styles.logo} source={require('../assets/logo.svg')} />
                </View>
                <View style={styles.box2}>
                    <View style={styles.row}>
                        <Image style={styles.icon} source={require('../assets/trusted.svg')} />
                        <Image style={styles.icon} source={require('../assets/iso.svg')} />
                        <Image style={styles.icon} source={require('../assets/certified.svg')} />
                        <Image style={{ width: width * .25, height: width * .2, marginLeft: 10, resizeMode: 'contain' }} source={require('../assets/assurance.svg')} />
                    </View>
                </View>
            </View>
        </Root>
    )
};
const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: height * .1
    },
    icon: {
        width: width * .15,
        height: width * .15,
        resizeMode: 'contain',
        marginRight: 10
    },
    image: {
        resizeMode: 'cover',
        width: width,
    },
    box2: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    box: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignItems: 'center'
    },
    logo: {
        width: width * .8,
        height: width * .3,
        resizeMode: 'contain'
    },
    container: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center'
    }
});
export default Splash;
