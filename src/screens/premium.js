import React from 'react';
import { FlatList, Image, StyleSheet, Text, View } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import { premium } from '../components/data';
import Header from '../components/header';
import Root from '../components/root';
import { colors } from '../constants/constants';
import { cstyles } from '../constants/cstyles';


const Util = ({ item: { title, image, route, data, url ,takelead}, navigation }) => {
    const { user } = useSelector(state => state)
    return (
        <View style={styles.item}>
            <View style={styles.color}>
                <TouchableWithoutFeedback onPress={() => {
                    if (!user.active) navigation.navigate('activate')
                    else if (takelead) navigation.navigate('devlead', { data, title, uri: url, page: route, lead: title })
                    else if (data.length == 0) navigation.navigate(route, { uri: url, title })
                    else navigation.navigate(route, { data, title })
                }}>
                    <Image style={styles.itemimage} source={image} />
                    <Text style={styles.itemtext}>{title}</Text>
                </TouchableWithoutFeedback>
            </View>
        </View>
    )
}

const Premium = ({ navigation }) => {
    return (
        <Root>
            <Header title="Premium Utilities" />
            <View style={cstyles.box}>
                <FlatList
                    columnWrapperStyle={{
                        // justifyContent: 'space-between'
                    }}
                    numColumns={4}
                    renderItem={({ item, index }) => <Util navigation={navigation} key={index.toString()} item={item} />}
                    data={premium} />
            </View>
        </Root>
    )
};
//styles
const styles = StyleSheet.create({
    itemtext: {
        color: colors.heading,
        marginTop: 10,
        fontSize: 9,
        textAlign: 'center',
        paddingHorizontal: 5
    },
    itemimage: {
        alignSelf: 'center'
    },
    item: {
        flex: .25,
        paddingHorizontal: 2,
        overflow: 'scroll'
    },
    color: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10,
        marginBottom: 5,
        backgroundColor: colors.inputbg,
        borderRadius: 4,
    }
});
export default Premium;
