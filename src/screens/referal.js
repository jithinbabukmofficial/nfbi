import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Header from '../components/header';
import Root from '../components/root';
import { colors } from '../constants/constants';
import { cstyles } from '../constants/cstyles';

const Referal = ({ navigation }) => {
    return (
        <Root>
            <Header title="A/c Referal" />
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={cstyles.box}>
                    <View style={cstyles.rowflex}>
                        <Text style={styles.title}>no</Text>
                        <Text style={styles.title}>Date</Text>
                        <Text style={styles.title}>amount</Text>
                        <Text style={styles.title}>Status</Text>
                    </View>
                </View>
            </ScrollView>
        </Root>
    )
};
const styles = StyleSheet.create({
    title: {
        color: colors.sidebar,
        fontSize: 16,
        textTransform: 'capitalize'
    }
});
export default Referal;
