import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Header from '../components/header';
import Root from '../components/root';
import { colors, width } from '../constants/constants';
import { cstyles } from '../constants/cstyles';

const Donation = ({ navigation }) => {
    return (
        <Root>
            <Header title="Donation" />
            <View style={styles.container}>
                <View style={cstyles.rowflex}>
                    <View style={styles.box}>
                        <Text style={styles.title}>Covid - 19</Text>
                    </View>
                    <View style={styles.box}>
                        <Text style={styles.title}>Flood Donation</Text>
                    </View>
                </View>
            </View>
            <Text style={styles.bottomtext}>Namasthe Welcome</Text>
            <Text style={styles.bottomtext}>Thank you</Text>
        </Root>
    )
};
const styles = StyleSheet.create({
    bottomtext: {
        color: colors.sidebar,
        fontSize: 17,
        textAlign: 'center',
        marginBottom: 5
    },
    title: {
        color: colors.primary,
        fontSize: 17
    },
    box: {
        flex: .49,
        backgroundColor: colors.inputbg,
        borderRadius: 6,
        alignItems: 'center',
        paddingVertical: 20
    },
    container: {
        flex: 1,
        marginHorizontal: width * 0.05
    }
});
export default Donation;
