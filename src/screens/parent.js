import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, Image, ActivityIndicator } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import Root from '../components/root';
import Loader from '../components/loader'
import { apiurl, base_url, colors, width } from '../constants/constants';
import { cstyles } from '../constants/cstyles';
import { getInstallReferrer } from 'react-native-device-info';
import Axios from 'axios';
import { PlayInstallReferrer } from 'react-native-play-install-referrer';


const Parent = ({ navigation }) => {
    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        getCode()
    }, [])
    const getCode = () => {
        PlayInstallReferrer.getInstallReferrerInfo((installReferrerInfo, error) => {
            if (!error) {
                getParent(installReferrerInfo.installReferrer)
            } else {
                getParent(null)
                console.warn("Failed to get install referrer info!");
                console.warn("Response code: " + error.responseCode);
                console.warn("Message: " + error.message);
            }
        });
    }

    const getParent = id => {
        Axios.get(`${apiurl}/mobileuser/parent/${id}`)
            .then(res => res.data)
            .then(res => setUser(res.user))
            .catch(e => {
                if (e && e.response && e.response.data) {
                    setError(e.response.data)
                }
                console.warn(e)
            })
            .finally(e => setLoading(false))
    }
    return (
        <Root>
            <View style={styles.container}>
                {user && <View style={styles.box}>
                    {loading ?
                        <Loader />
                        : <View style={{ alignItems: 'center' }}>
                            <Text style={styles.heading}>You are Invited by</Text>
                            <Image style={styles.profile} source={{ uri: `${base_url}/${user.image}` }} />
                            <Text style={styles.name}>{user.name}</Text>
                            <View style={[cstyles.row]}>
                                <Text style={styles.sptext}>Location : </Text>
                                <Text style={styles.sid}>{`${user.state} / ${user.district}`}</Text>
                            </View>
                            <View style={[cstyles.row]}>
                                <Text style={styles.sptext2}>Designation : </Text>
                                <Text style={styles.sid2}>{user.designation ? user.designation : 'Silver'}</Text>
                            </View>
                        </View>}
                </View>}
                {!user && !loading && <View>
                    <Image style={styles.excla} source={require('../assets/excla.svg')} />
                    <Text style={[styles.heading, { textAlign: 'center' }]}>invitation is required</Text>
                </View>}
            </View>
            {!loading && user ? <TouchableWithoutFeedback
                onPress={() => navigation.navigate('register', { parent: user._id })}
                style={[cstyles.btn, { marginHorizontal: width * .05 }]}>
                <Text style={cstyles.btntext}>Continue</Text>
            </TouchableWithoutFeedback> :
                <TouchableWithoutFeedback
                    onPress={() => navigation.navigate('login', { parent: user._id })}
                    style={[cstyles.btn, { marginHorizontal: width * .05 }]}>
                    <Text style={cstyles.btntext}>Go Back</Text>
                </TouchableWithoutFeedback>
            }
        </Root>
    )
};
const styles = StyleSheet.create({
    excla: {
        resizeMode: 'contain',
        width: width * .8
    },
    heading: {
        color: colors.primary,
        fontSize: 21,
        marginBottom: 20,
        textTransform: 'uppercase'
    },
    sid2: {
        color: colors.primary,
        textTransform: 'uppercase'
    },
    sptext2: {
        color: colors.sidebar,
        fontSize: 19,
        textTransform: 'uppercase'
    },
    sid: {
        color: colors.primary,
        textTransform: 'uppercase'
    },
    sptext: {
        color: colors.sidebar,
        fontSize: 16,
        textTransform: 'uppercase'
    },
    name: {
        color: colors.primary,
        fontSize: 26,
        textAlign: 'center',
        marginTop: 20
    },
    profile: {
        width: width * .5,
        height: width * .5,
        borderRadius: 10,
        resizeMode: 'cover',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});
export default Parent;
