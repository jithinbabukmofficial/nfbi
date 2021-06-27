import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { ScrollView, Text, View, StyleSheet, Image, RefreshControl, ActivityIndicator } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import HomeHeader from '../components/homeheader';
import Root from '../components/root';
import { apiurl, colors, width } from '../constants/constants';
import { cstyles } from '../constants/cstyles';
import Homeitem from '../components/homeitem';
import { useDispatch, useSelector } from 'react-redux';
import Axios from 'axios';
import { setUser } from '../action/user';
import moment from 'moment'
import { setBalance, updateBalance } from '../action/balance';
import Share from 'react-native-share';


const Item2 = ({ data: { title, balance, available, image, icon, route } }) => {
    const nav = useNavigation()
    return (
        <View style={styles.item}>
            <TouchableWithoutFeedback onPress={() => nav.navigate(route)}>
                <View style={cstyles.rowflex}>
                    <Text style={styles.heading}>{title}</Text>
                    <Image style={{ resizeMode: 'contain' }} source={image} />
                </View>
                <Image style={styles.icon} source={icon} />
            </TouchableWithoutFeedback>
        </View>
    )
}

const Home = ({
    navigation,
}) => {
    //component states
    const { user, token, balance } = useSelector(state => state)
    const dispatch = useDispatch()

    const [bal, setBal] = useState(0)
    const [loading, setLoading] = useState(true)
    const [returns, setReturns] = useState(0)
    const [referals, setReferals] = useState(0)
    const [total, setTotal] = useState(0)
    const [refreshing, setRefreshing] = useState(false)


    useEffect(() => {
        const interval = setInterval(() => {
            dispatch(updateBalance(bal.currentreturn))
        }, 1000 * 60 * 10);
        return () => {
            clearInterval(interval);
        };
    });
    useEffect(() => {
        getData()
    }, [token])


    const getData = () => {
        setLoading(true)
        Axios.get(`${apiurl}/mobileuser/user`, { headers: { 'auth-token': token.token } })
            .then(res => res.data)
            .then(res => {
                if (res.status) dispatch(setUser(res.user))
                console.warn(res)
                setTotal(res.total)
                setReferals(res.referal)
                setReturns(res.returns)
                setBal(res)
            })
            .catch(e => console.log(e.response.data))
            .finally(e => {
                setLoading(false)
                setRefreshing(false)
            })
    }

    _onRefresh = () => {
        setRefreshing(true)
        getData()
    }
    const data = [
        {
            image: require('../assets/h1.svg'),
            title: 'My Wallet',
            balance: total,
            available: bal.currentdealer + bal.currentreturn + bal.currentscratch + bal.currentreferal,
            route: 'home'
        },
        {
            image: require('../assets/h2.svg'),
            title: 'My Business',
            balance: referals + bal.currentdealer,
            available: bal.currentreferal + bal.currentdealer,
            route: 'home'
        },
        {
            image: require('../assets/h3.svg'),
            title: 'Return',
            balance: returns,
            available: bal.currentreturn,
            route: 'home'
        },
        {
            image: require('../assets/h4.svg'),
            title: 'Business Team',
            balance: 250,
            available: 1500,
            icon: require('../assets/people.svg'),
            route: 'team'
        },
        {
            image: require('../assets/h5.svg'),
            title: 'Account Statement',
            balance: 250,
            available: 1500,
            icon: require('../assets/h11.svg'),
            route: 'statements'
        },
        {
            image: require('../assets/h6.svg'),
            title: 'Business Plan',
            balance: 250,
            available: 1500,
            icon: require('../assets/h22.svg'),
            route: 'plan'
        },
        {
            image: require('../assets/h7.svg'),
            title: 'Utilities',
            balance: 250,
            available: 1500,
            icon: require('../assets/h33.svg'),
            route: 'utilities'
        },
        {
            image: require('../assets/h8.svg'),
            title: 'Awards & Rewards',
            balance: 250,
            available: 1500,
            icon: require('../assets/h44.svg'),
            route: 'rewards'
        }
    ]
    const data2 = [
        {
            title: 'Business Loan',
            image: require('../assets/ha.svg'),
            route: 'loan'
        },
        {
            title: 'Insurance',
            image: require('../assets/hb.svg'),
            route: 'insurance'
        },
        {
            title: 'Share & Earn',
            image: require('../assets/share.svg'),
            route: 'insurance'
        }
    ]
    return (
        <Root>
            <HomeHeader />
            <ScrollView
                style={styles.scrollView}
                refreshControl={
                    <RefreshControl
                        refreshing={false}
                        onRefresh={() => _onRefresh()}
                    />
                }
                showsVerticalScrollIndicator={false}>
                {loading ? <ActivityIndicator color={colors.primary} size="large" />
                    : <View style={cstyles.box}>
                        <View style={[cstyles.rowflex, { marginBottom: 15 }]}>
                            <Homeitem data={data[0]} />
                            <Homeitem data={data[1]} />
                        </View>
                        <View style={[cstyles.rowflex, { marginBottom: 15 }]}>
                            <Homeitem data={data[2]} />
                            <Item2 data={data[3]} />
                        </View>
                        <View style={[cstyles.rowflex, { marginBottom: 15 }]}>
                            <Item2 data={data[4]} />
                            <Item2 data={data[5]} />
                        </View>
                        <View style={[cstyles.rowflex, { marginBottom: 15 }]}>
                            <Item2 data={data[6]} />
                            <Item2 data={data[7]} />
                        </View>
                        {data2.map(({ image, title, route }) => <TouchableWithoutFeedback
                            onPress={() => {
                                if (title == 'Business Loan') {
                                    if (!user.active) navigation.navigate('activate')
                                    else navigation.navigate(route, { title })
                                }
                                else if (title == 'Share & Earn') {
                                    if (!user.active) navigation.navigate('activate')
                                    else Share.open({
                                        url: `https://play.google.com/store/apps/details?id=com.nfbi&referrer=${user._id}`,
                                        message: 'Please use the below link to signup on NFBI',
                                        title: 'NFBI Invite'
                                    })
                                } else navigation.navigate('web', { uri: 'https://www.easypolicy.com/epnew/Partners/index.html?y4HB3Qxc0OepYJfDj2EDzhd4DA/tumHw5R5W/+c6h/o0rJghyVx+rvWsH/98Vjqgm2WLV6KplEEHe6Sa/k/bFrJnOl/EnJ2A9A6jcV3XA2QKqGPLc8Yq2bb3BAil/tv/Qeg86YWZh07U9Rp5xWnRDxKZLWkMv6+Ri9NYlwE0/QrvngfJk4HSd9hStn0jSgXr8b8u4OdCsfu0W9mRYiGBmwnU8YiOUVBJS9mwULUH+UsBzP9j/1R2K8b/JYbrCm5sBZdA+RlSHF+WK7pAa3GH5/n9mvwsDj+n2WqRnzeSrQ41dRoFkBjEiIi3GTd3R+NlLgRzWNfQpTcl6gKgXkUoeXfgdHPUS+g3RbBxtLI2UpqdDnNs9vYkBMjaE6pUaLMSBVj3/2o6MiLWKxHM1ohhKYg0zZZT9ZFSvA9f/Zo6RTUOgqHfdewP+RwBcN025LsMR7W/6L1D+mlMMxwJ34HfCPNsLvfH47YIVmUWgk299P/WF38Yb0iOu/RTD5AnUyyJBwGQM4wCIv6UFX8Qbiul39MCj6FV9CLM+ob7FnrwDhxspoEjndQjotdZYPSZ8XvF0wFdki5GdAGqEAXUd23Ce9KNw6wsRGenZfQEgsUjOzdQ3yqTYaXh7l0s/UpLTxQ4T/MwThrTXEIKr2u9V3mdQdwf86CLt8RwSfHU2IEP8snqO+ZbdP4y8RHuzSM1/cPKjQuKFap/mpH13Qr7gehqEyqvtFwiTl+AH/omskPCKpMaXUD/J+LtPgknVHorAPfCeasykey' })
                            }}
                            style={[cstyles.rowflex, styles.seconditem]}>
                            <View style={cstyles.row}>
                                <Image style={{
                                    height: width * .09,
                                    width: width * .09,
                                    resizeMode: 'contain'
                                }} source={image} />
                                <Text style={styles.secondtext}>{title}</Text>
                            </View>
                            <Image source={require('../assets/righticon.svg')} />
                        </TouchableWithoutFeedback>)}
                    </View>}
            </ScrollView>
        </Root>
    )
};
//styles
const styles = StyleSheet.create({
    scrollView: {
        flex: 1
    },
    secondtext: {
        color: colors.heading,
        marginLeft: 10
    },
    seconditem: {
        backgroundColor: colors.inputbg,
        borderRadius: 6,
        paddingVertical: 10,
        paddingHorizontal: 15,
        marginBottom: 15
    },
    icon: {
        alignSelf: 'center',
        marginVertical: 40,
        height: 50,
        resizeMode: 'contain'
    },
    subhead: {
        color: colors.heading,
        fontSize: 12,
        marginVertical: 7
    },
    line: {
        backgroundColor: '#707473',
        height: 1
    },
    balance: {
        color: colors.primary,
        fontSize: 35,
        fontWeight: 'bold',
        marginVertical: 10
    },
    balance2: {
        color: colors.primary,
        fontSize: 21,
        marginBottom: 5
    },
    heading: {
        color: colors.heading
    },
    item: {
        flex: .48,
        backgroundColor: colors.inputbg,
        borderRadius: 6,
        paddingVertical: 15,
        paddingHorizontal: 10
    }
});
export default Home;
