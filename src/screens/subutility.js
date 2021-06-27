import React from 'react';
import { FlatList, Image, StyleSheet, Text, View, TouchableWithoutFeedback } from 'react-native';
import { } from 'react-native-gesture-handler';
import Header from '../components/header';
import Root from '../components/root';
import { colors, width } from '../constants/constants';
import { cstyles } from '../constants/cstyles';

const Subutility = ({ navigation, route }) => {
    const { data, title } = route.params
    return (
        <Root>
            <Header title={title} />
            <View style={cstyles.box}>
                <FlatList
                    data={data}
                    numColumns={3}
                    columnWrapperStyle={{ justifyContent: 'space-between' }}
                    renderItem={({ item, index }) => {
                        return (
                            <View style={styles.item}>
                                {/* <View style={styles.color}> */}
                                <TouchableWithoutFeedback
                                    style={{ flex: 1 }}
                                    onPress={() => navigation.navigate('web', { uri: item.url })}>
                                    <View style={{ flex: 1 }}>
                                        <View style={{ flex: 1 }}>
                                            <View style={{ flex: 1 }}>
                                                <Image style={styles.image} source={item.image} />
                                            </View>
                                            <Text style={styles.itemtext}>{item.title}</Text>
                                        </View>
                                        <View style={styles.btn}>
                                            <Text style={styles.btntext}>Click Here</Text>
                                        </View>
                                    </View>
                                </TouchableWithoutFeedback>
                                {/* </View> */}
                            </View>
                        )
                    }}
                />
            </View>
        </Root>
    )
};
const styles = StyleSheet.create({
    btn: {
        backgroundColor: colors.primary,
        paddingVertical: 9,
        alignItems: 'center',
        borderBottomLeftRadius: 6,
        borderBottomRightRadius: 6,
    },
    btntext: {
        fontSize: 12
    },
    image: {
        height: width * .08,
        resizeMode: 'contain',
        alignSelf: 'center'
    },
    itemtext: {
        fontSize: 13,
        color: colors.heading,
        alignContent: 'flex-end',
        textAlign: 'center',
        paddingTop: 15,
        paddingBottom: 10
    },
    item: {
        flex: .3,
        backgroundColor: colors.inputbg,
        paddingTop: 20,
        borderTopRightRadius: 6,
        borderTopLeftRadius: 6,
        marginBottom: 15
    },
});
export default Subutility;
