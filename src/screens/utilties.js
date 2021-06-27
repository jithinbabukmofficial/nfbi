import React from 'react';
import { Text, View, StyleSheet, FlatList, Image } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import { utilities } from '../components/data';
import Header from '../components/header';
import Root from '../components/root';
import { colors } from '../constants/constants';
import { cstyles } from '../constants/cstyles';

const Util = ({ item: { title, image, route, data, url, takelead }, navigation }) => {
    const { user } = useSelector(state => state)
    return (
        <View style={styles.item}>
            <TouchableWithoutFeedback onPress={() => {
                if (title === 'More Premium Services') {
                    if (!user.active) navigation.navigate('activate')
                    else navigation.navigate('premium')
                }
                else if (takelead) navigation.navigate('devlead', { data, title, uri: url, page: route, lead: title })
                else navigation.navigate(route, { data, title, uri: url })
            }}>
                <Image style={styles.itemimage} source={image} />
                <Text style={styles.itemtext}>{title}</Text>
            </TouchableWithoutFeedback>
        </View>
    )
}



const Utilities = ({ navigation }) => {

    return (
        <Root>
            <Header title="Utilities" />
            <View style={cstyles.box}>
                <FlatList
                    columnWrapperStyle={{
                        justifyContent: 'space-between'
                    }}
                    numColumns={4}
                    renderItem={({ item, index }) => <Util navigation={navigation} key={index.toString()} item={item} />}
                    data={utilities} />
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
        paddingHorizontal: 5,
    },
    itemimage: {
        alignSelf: 'center'
    },
    item: {
        flex: .24,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10,
        marginBottom: 5,
        backgroundColor: colors.inputbg,
        borderRadius: 4
    }
});
export default Utilities;
