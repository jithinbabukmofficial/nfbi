import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, View, FlatList } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import { apiurl, base_url, colors, width } from '../constants/constants';
import { cstyles } from '../constants/cstyles';

const Refereal = ({
    data,
}) => {
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [users, setUsers] = useState([])

    // redux
    const { token } = useSelector(state => state.token)

    // get data
    useEffect(() => {
        setLoading(true)
        if (open) getData()
    }, [open])

    // get team
    const getData = async () => {
        Axios.get(`${apiurl}/mobileuser/getteam/${data.id}`, { headers: { 'auth-token': token } })
            .then(res => res.data)
            .then(res => setUsers(res.users))
            .catch(e => {
                if (e && e.response && e.response.data) setError(e.response.data)
                console.warn(e.response.data)
            })
            .finally(e => setLoading(false))
    }
    return (
        <View>
            <TouchableWithoutFeedback onPress={() => setOpen(!open)}>
                <View style={[cstyles.rowflex, styles.item]}>
                    <Text style={styles.itemtext}>{data.title}</Text>
                    <Image source={require('../assets/righticon.svg')} />
                </View>
            </TouchableWithoutFeedback>
            {open && users.length > 0 ? <View style={styles.container}>
                <FlatList
                    horizontal={true}
                    data={users}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item, index }) => <View key={index} style={styles.user}>
                        <Image style={styles.profile} source={{ uri: `${base_url}/${item && item.image}` }} />
                        <Text numberOfLines={2} style={[styles.itemtext, { fontSize: 12 }]}>{item.name}</Text>
                        <Text style={styles.amount}>{`₹ ${item.amount}`}</Text>
                    </View>} />
            </View> : open && !loading && <Text style={[cstyles.error, { marginLeft: 15 }]}>No users found</Text>}
        </View>
    )
};
const styles = StyleSheet.create({
    amount: {
        fontSize: 14,
        color: colors.primary,
        marginTop: 5
    },
    profile: {
        width: width * .15,
        height: width * .15,
        marginBottom: 10,
        borderRadius: width * .15,
        resizeMode: 'cover'
    },
    itemtext: {
        fontSize: 10,
        color: colors.sidebar,
        marginVertical: 10,
        textAlign: 'center',
        alignSelf: 'center'
    },
    user: {
        marginRight: 10,
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderWidth: .3,
        borderRadius: 5,
        borderColor: colors.primary,
        width: width * .3
    },
    container: {
        backgroundColor: colors.inputbg,
        paddingVertical: 10,
        borderRadius: 6,
        marginHorizontal: 10
    },
    itemtext: {
        color: colors.heading,
        textAlign: 'center',
        fontSize: 17
    },
    item: {
        marginHorizontal: 15,
        paddingVertical: 10
    },
});
export default Refereal;
