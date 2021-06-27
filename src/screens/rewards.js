import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, Image, FlatList, Modal, TouchableOpacity } from 'react-native';
import { ScrollView, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { color } from 'react-native-reanimated';
import Header from '../components/header';
import Root from '../components/root';
import Winners from '../components/winners';
import { apiurl, colors, height, width } from '../constants/constants';
import { cstyles } from '../constants/cstyles';
import { useDispatch, useSelector } from 'react-redux';
import Axios from 'axios';
import Loader from '../components/loader';
import Card from '../components/card';
import Used from '../components/Used';


const Rewards = ({
    navigation,
}) => {
    const { token: { token } } = useSelector(state => state)
    const [amount, setAmount] = useState(0)
    const [loading, setLoading] = useState(true)
    const [winners, setWinners] = useState([])
    const [cards, setCards] = useState([])
    const [used, setUsed] = useState([])
    const [error, setError] = useState(null)


    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            setLoading(true)
            getData()
            getWinners()
            getUnused()
        });

        return unsubscribe;
    }, [token])

    const getData = () => {
        Axios.get(`${apiurl}/scratch/balance`, { headers: { 'auth-token': token } })
            .then(res => res.data)
            .then(res => setAmount(res.data))
            .catch(e => console.log(e))
    }

    const getWinners = () => {
        Axios.get(`${apiurl}/scratch/winners`, { headers: { 'auth-token': token } })
            .then(res => res.data)
            .then(res => {
                if (res.status) setWinners(res.winners)
            })
            .catch(e => {
                if (e && e.response && e.response.data) setError(e.response.data)
            })
            .finally(e => setLoading(false))
    }

    const getUnused = async _ => {
        Axios.get(`${apiurl}/scratch/unused`, { headers: { 'auth-token': token } })
            .then(res => res.data)
            .then(res => {
                if (res.status) {
                    setCards(res.cards)
                    setUsed(res.used)
                }
            })
            .catch(e => {
                if (e && e.response && e.response.data) setError(e.response.data)
            })
            .finally(e => setLoading(false))
    }


    return (
        <Root>
            <Header title="My Rewards" />
            {loading ? <Loader /> : <ScrollView
                keyboardShouldPersistTaps={true}
                showsVerticalScrollIndicator={false}>
                <View style={cstyles.box}>
                    <View style={[cstyles.shadebox, cstyles.rowflex, { paddingHorizontal: 15 }]}>
                        <View style={styles.rewardcontainer}>
                            <Text style={styles.rewardheading}>Total Rewards Earned</Text>
                            <Text style={styles.rewardprice}>₹ {amount}</Text>
                        </View>
                        <Image style={styles.image} source={require('../assets/rimage.svg')} />
                    </View>
                </View>



                {cards.length > 0 && <View style={cstyles.box}>
                    <FlatList
                        keyboardShouldPersistTaps={'handled'}
                        columnWrapperStyle={{ justifyContent: 'space-between' }}
                        numColumns={2}
                        data={cards}
                        renderItem={({ item, index }) => <Card credited={val => {
                            getData()
                            getWinners()
                            getUnused()
                        }} item={item} key={index} />}
                    />
                </View>}

                {used.length > 0 && <FlatList
                    keyboardShouldPersistTaps={'handled'}
                    columnWrapperStyle={{ justifyContent: 'space-between', paddingHorizontal: width * 0.05 }}
                    numColumns={2}
                    data={used}
                    renderItem={({ item, index }) => <Used item={item} key={index} />}
                />}
            </ScrollView>}
        </Root>
    )
};
//styles
const styles = StyleSheet.create({
    modalbutton: {
        marginTop: 20,
        width: width * .7
    },
    modalView: {
        borderRadius: 10,
        overflow: 'hidden',
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: 'center',
        backgroundColor: 'rgba(52, 52, 52, 0.8)'
    },
    price: {
        color: colors.primary,
        fontWeight: '100',
        fontSize: 30
    },
    wontext: {
        color: '#ABAEAD',
        fontSize: 21,
        marginVertical: 5
    },
    winimage: {
        width: width * .3,
        height: width * .2,
        resizeMode: 'contain'
    },
    scratchcardcontainer: {
        flex: .48,
        height: width * .5,
        width: width * .6,
        borderRadius: 10,
        overflow: 'hidden',
        marginBottom: 20
    },
    image: {
        height: height * .15,
        resizeMode: 'contain'
    },
    rewardheading: {
        color: colors.heading,
        marginBottom: 10,
        fontSize: 15
    },
    rewardprice: {
        color: colors.primary,
        fontSize: 41,
        fontWeight: 'bold'
    }
});
export default Rewards;
