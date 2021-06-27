import React from 'react';
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import { colors } from '../constants/constants';

const Root = ({
    children,
}) => {
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor={colors.background} />
            {children}
        </SafeAreaView>
    )
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background
    }
});
export default Root;
