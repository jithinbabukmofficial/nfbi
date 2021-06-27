import React, { useState } from 'react';
import { Image, Text, View, StyleSheet, ActivityIndicator } from 'react-native';
import { ScrollView, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { removeToken } from '../action/token';
import { removeUser } from '../action/user';
import { apiurl, base_url, colors, height, width } from '../constants/constants';
import Menuitem from './menuitem';
import Root from './root';
import Share from 'react-native-share';
import ImagePicker from 'react-native-image-crop-picker';
import Axios from 'axios';


// https://play.google.com/store/apps/details?id=com.dreamsouq&referrer=

const Sidebar = ({ navigation, activeTintColor }) => {
    const dispatch = useDispatch()
    const { user: { image, name, _id, active }, token: { token } } = useSelector(state => state)

    const [loading, setLoading] = useState(false)
    const [userimage, setUserimage] = useState(null)

    //image picking function
    const pickimage = () => {
        ImagePicker.openPicker({
            width: 300,
            height: 300,
            cropping: true
        }).then(response => {
            console.warn('update called')
            updateProfile(response)
        }).catch(e => console.log('something went wrong'))
    }

    const updateProfile = data => {
        setLoading(true)
        let formdata = new FormData()
        formdata.append('profile', {
            name: data.fileName ? data.fileName : 'sdfsdfsdj',
            type: data.mime,
            uri: data.path
        })
        Axios.post(`${apiurl}/mobileuser/updateprofilepic`, formdata, { headers: { 'auth-token': token } }).then(res => res.data)
            .then(res => {
                if (res.status) setUserimage(data.path)
            })
            .catch(e => console.warn(e.response.data))
            .finally(e => setLoading(false))
    }
    return (
        <Root>
            <ScrollView style={{ backgroundColor: '#090909' }} showsVerticalScrollIndicator={false}>
                {image ? loading ? <ActivityIndicator size="large" color={colors.primary} /> : <TouchableWithoutFeedback onPress={pickimage}>
                    <Image style={styles.profile} source={{ uri: userimage ? userimage : `${base_url}/${image}` }} />
                    <View style={styles.editicon}>
                        <TouchableWithoutFeedback onPress={pickimage}>
                            <Image style={styles.editimage} source={require('../assets/upload.svg')} />
                        </TouchableWithoutFeedback>
                    </View>
                </TouchableWithoutFeedback> :
                    <Image style={styles.profile} source={require('../assets/profile.png')} />}
                <Text style={styles.title}>{name ? name : 'John Doe'}</Text>
                <Menuitem
                    title="Profile"
                    icon={require('../assets/sideprofile.svg')}
                    sub={[
                        { name: 'View profile', route: 'profile' },
                        { name: 'edit profile', route: 'editprofile' }]} />

                <Menuitem
                    title="PIN Bank"
                    icon={require('../assets/sidepin.svg')}
                    sub={[
                        { name: 'Balance Pin', route: 'balance' },
                        { name: 'Transfer Pin', route: 'transfer' },
                        { name: 'Purchase Pin', route: 'purchase' }]} />

                <Menuitem
                    title="Security"
                    icon={require('../assets/sidesecurity.svg')}
                    sub={[{ name: 'Change Password', route: 'change' }]} />


                <TouchableWithoutFeedback
                    onPress={() => navigation.navigate('statements')}
                    style={styles.menu}>
                    <Image style={styles.icon} source={require('../assets/sideaccount.svg')} />
                    <Text style={styles.menutext}>Account Statement</Text>
                </TouchableWithoutFeedback>


                {/* <TouchableWithoutFeedback
                    onPress={() => navigation.navigate('web', { uri: 'https://nfbi.in/terms-condition.html' })}
                    style={styles.menu}>
                    <Image style={[styles.icon]} source={require('../assets/termsand.svg')} />
                    <Text style={styles.menutext}>Terms and Conditions</Text>
                </TouchableWithoutFeedback> */}


                <TouchableWithoutFeedback
                    onPress={() => navigation.navigate('web', { uri: 'https://nfbi.in/privacy-policy.html' })}
                    style={styles.menu}>
                    <Image style={[styles.icon]} source={require('../assets/privacy.svg')} />
                    <Text style={styles.menutext}>Privacy Policy</Text>
                </TouchableWithoutFeedback>

                <TouchableWithoutFeedback
                    onPress={() => {
                        if (active) {
                            Share.open({
                                url: `https://play.google.com/store/apps/details?id=com.nfbi&referrer=${_id}`,
                                message: 'Please use the below link to signup on NFBI',
                                title: 'NFBI Invite'
                            })
                        } else navigation.navigate('activate')
                    }}
                    style={styles.menu}>
                    <Image style={styles.icon} source={require('../assets/share.svg')} />
                    <Text style={styles.menutext}>Share & Earn</Text>
                </TouchableWithoutFeedback>

                <TouchableWithoutFeedback
                    onPress={() => navigation.navigate('contact')}
                    style={styles.menu}>
                    <Image style={styles.icon} source={require('../assets/sidecontact.svg')} />
                    <Text style={styles.menutext}>Contact Us</Text>
                </TouchableWithoutFeedback>

                



                {/* <TouchableWithoutFeedback
                    onPress={() => navigation.navigate('web', { uri: 'https://nfbi.in/refund.html' })}
                    style={styles.menu}>
                    <Image style={[styles.icon]} source={require('../assets/refund.svg')} />
                    <Text style={styles.menutext}>Refund Policy</Text>
                </TouchableWithoutFeedback> */}

                <TouchableWithoutFeedback
                    onPress={() => {
                        dispatch(removeToken())
                        dispatch(removeUser())
                        navigation.replace('login')
                    }}
                    style={styles.menu}>
                    <Image style={styles.icon} source={require('../assets/sidesignout.svg')} />
                    <Text style={styles.menutext}>Sign Out</Text>
                </TouchableWithoutFeedback>
            </ScrollView>
            <View style={styles.bottommenu}>
                <Text style={styles.bottomtext}>Version : 1211198</Text>
            </View>
        </Root>
    )
};


//component styles
const styles = StyleSheet.create({
    editimage: {
        width: width * .15,
        height: width * .15,
        resizeMode: 'contain',
    },
    editicon: {
        position: 'absolute',
        bottom: - width * 0.04,
        right: 0,
        left: 0,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 100
    },
    icon: {
        height: 30,
        width: 30,
        resizeMode: 'contain',
        marginRight: 10
    },
    bottomtext: {
        color: colors.sidebar,
        fontSize: 13
    },
    bottommenu: {
        paddingVertical: 15,
        backgroundColor: colors.headerbg,
        paddingHorizontal: width * 0.05
    },
    menutext: {
        color: colors.primary,
        fontSize: 16,
        textTransform: 'uppercase'
    },
    menu: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        marginHorizontal: 10,
        paddingHorizontal: 15,
        backgroundColor: colors.inputbg,
        borderRadius: 6,
        marginBottom: 10
    },
    title: {
        fontSize: 25,
        color: '#ABAEAD',
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 20
    },
    profile: {
        alignSelf: 'center',
        marginTop: height * .05,
        height: width * .27,
        width: width * .27,
        borderRadius: width * .27,
        resizeMode: 'cover',
        zIndex: 1,
        marginBottom: width * 0.02
    }
});
export default Sidebar;
