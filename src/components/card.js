import { useNavigation } from '@react-navigation/native';
import Axios from 'axios';
import React, { useState } from 'react';
import { ActivityIndicator, Image, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import ScratchCard from "react-native-scratch-card";
import { useSelector } from 'react-redux';
import { apiurl, colors, width } from '../constants/constants';
import { cstyles } from '../constants/cstyles';
import Loader from './loader';


// scratch card view 
const Card = ({ item, credited }) => {
    const [percent, setPercent] = useState(0)
    const [finished, setFinished] = useState(false)
    const [visible, setVisible] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const nav = useNavigation()

    // token
    const { token } = useSelector(state => state.token)

    const credit = async () => {
        if (loading) return
        setLoading(true)
        let formdata = new FormData()
        formdata.append('id', item._id)
        Axios.post(`${apiurl}/scratch/credit`, formdata, { headers: { 'auth-token': token } })
            .then(res => res.data)
            .then(res => {
                if (res.status) {
                    nav.navigate('success')
                    credited(true)
                }
            })
            .catch(e => {
                if (e && e.response && e.response.date) setError(e.response.data)
            })
            .finally(e => {
                setLoading(false)
                setVisible(false)
            })
    }

    return (
        <View style={styles.scratchcardcontainer}>
            <TouchableWithoutFeedback onPress={() => setVisible(!visible)}>
                <View style={{
                    justifyContent: "center",
                    alignItems: "center",
                    width: width * .48,
                    height: width * .5,
                    backgroundColor: colors.primary,
                    borderRadius: 10
                }}>

                </View>
            </TouchableWithoutFeedback>
            <Modal
                animationType="fade"
                transparent={true}
                visible={visible}
                onRequestClose={() => {
                    
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <ScratchCard
                            brushSize={125}
                            getPercent={percent => {
                                setPercent(percent)
                            }}
                            onEnd={() => {
                                setPercent(100)
                                setFinished(true)
                            }}
                            maxPercent={70}
                            style={{
                                justifyContent: "center",
                                alignItems: "center",
                                width: width * .7,
                                height: width * .8,
                                backgroundColor: colors.inputbg,
                                borderRadius: 10
                            }}
                            color={colors.primary}
                        >
                            <View style={{
                                flex: 1,
                                justifyContent: 'center',
                                alignItems: 'center',
                                width: width * .7,
                                backgroundColor: colors.inputbg,
                            }}>
                                <Image source={require('../assets/trophy.svg')} />
                                <Text style={styles.wontext}>{'You Won'}</Text>
                                <Text style={styles.price}>₹ {item.amount}</Text>
                            </View>
                        </ScratchCard>
                    </View>
                    {finished ?
                        loading ? <Loader />
                            : <TouchableOpacity
                                style={[styles.modalbutton, cstyles.btn]}
                                onPress={() => {
                                    credit()
                                }}
                            >
                                <Text style={cstyles.btntext}>Continue</Text>
                            </TouchableOpacity>
                        : <TouchableOpacity
                            style={[styles.modalbutton, cstyles.btn]}
                            onPress={() => {
                                setVisible(!visible);
                            }}
                        >
                            <Text style={cstyles.btntext}>Cancel</Text>
                        </TouchableOpacity>}
                </View>
            </Modal>
        </View>
    )
}
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
        backgroundColor: 'rgba(0, 0, 0, 0.8)'
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
});
export default Card;
