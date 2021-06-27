import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import Header from '../components/header';
import Root from '../components/root';
import { cstyles } from '../constants/cstyles';
import LottieView from 'lottie-react-native';
import { colors, height, width } from '../constants/constants';



const Success = ({ navigation, route }) => {
    const message = route.params && route.params.message
    return (
        <Root>
            <View style={styles.container}>
                <LottieView source={require('../assets/success.json')} autoPlay loop={false} />

            </View>
            {message && <View style={styles.new}>
                <View style={{ backgroundColor: colors.inputbg, padding: 10, borderRadius: 5 }}>
                    <Text style={styles.message}>{message}</Text>
                </View>
            </View>}
            <TouchableWithoutFeedback
                onPress={() => navigation.replace('home')}
                style={[cstyles.btn, styles.box]}>
                <Text style={cstyles.btntext}>Go Home</Text>
            </TouchableWithoutFeedback>
        </Root>
    )
};
const styles = StyleSheet.create({
    new: {
        ...StyleSheet.absoluteFill,
        bottom: height * .2,
        top: height * .7,
        paddingHorizontal: width * .05,
        alignItems: 'center'
    },
    message: {
        color: colors.primary,
        textAlign: 'center'
    },
    box: {
        marginHorizontal: width * 0.05
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});
export default Success;
