import React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import { ScrollView, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import Header from '../components/header';
import Refereal from '../components/referal';
import Root from '../components/root';
import Winners from '../components/winners';
import { base_url, colors, height, width } from '../constants/constants';
import { cstyles } from '../constants/cstyles';

const Team = ({
    navigation,
}) => {
    const { user } = useSelector(state => state)
    const data = [
        { title: 'Direct Business Associates', id: 1 },
        { title: '2nd Level Business Associates', id: 2 },
        { title: '3rd Level Business Associates', id: 3 },
        { title: '4th Level Business Associates', id: 4 }
    ]
    return (
        <Root>
            <Header title="Business Team" />
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={cstyles.box}>
                    <View style={styles.box}>
                        <View style={styles.imagecontainer}>
                            <Image style={styles.image} source={{ uri: `${base_url}/${user.image}` }} />
                            <View style={styles.editicon}>
                                <TouchableWithoutFeedback onPress={() => alert('haai')}>
                                    {/* <Image style={styles.editimage} source={require('../assets/upload.svg')} /> */}
                                </TouchableWithoutFeedback>
                            </View>
                        </View>
                        <Text style={styles.username}>{user.name}</Text>
                        {data.map((item, index) => <Refereal key={index} data={item} />)}
                    </View>
                    {/* <Winners title="Top Achievers" data={[1, 2, 3, 5, 6, 7]} /> */}
                </View>
            </ScrollView>
        </Root>
    )
};
const styles = StyleSheet.create({
    line: {
        borderBottomColor: '#131313',
        borderBottomWidth: 3
    },
    itemtext: {
        color: colors.heading,
        fontSize: 17
    },
    item: {
        marginHorizontal: 15,
        paddingVertical: 10
    },
    username: {
        textAlign: 'center',
        color: colors.heading,
        marginBottom: 20,
        marginTop: 10,
        fontSize: 17
    },
    editimage: {
        width: width * .15,
        height: width * .15,
        resizeMode: 'contain',
    },
    editicon: {
        position: 'absolute',
        bottom: 1,
        right: -25,
        justifyContent: 'center',
        alignItems: 'flex-end'
    },
    image: {
        width: width * .3 - 1,
        height: width * .3 - 1,
        borderRadius: width * .3 - 1
    },
    imagecontainer: {
        width: width * .3,
        height: width * .3,
        borderRadius: width * .3,
        backgroundColor: '#fff',
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center'
    },
    box: {
        backgroundColor: colors.inputbg,
        borderRadius: 6,
        paddingVertical: 20,
        marginBottom: 20
    }
});

export default Team;
