import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { colors, height } from '../constants/constants';

const Loader = ({ navigation }) => (
    <View
        pointerEvents="none"
        style={styles.container}>
        <ActivityIndicator size="large" color={colors.primary} />
    </View>
);
const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFill,
        flex: 1,
        height: height - height * .08,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 100,
    }
});
export default Loader;
