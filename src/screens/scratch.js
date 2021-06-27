import React, { useState } from 'react';
import { Alert, SafeAreaView, Text, View, StyleSheet, Image } from 'react-native';
import Root from '../components/root';
import ScratchCard from "react-native-scratch-card";
import { colors, height, width } from '../constants/constants';
import Header from '../components/header';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { cstyles } from '../constants/cstyles';
import { useNavigation } from '@react-navigation/native';

const Scratch = ({
    navigation,
    route
}) => {
    const { amount } = route.params
    const [percent, setPercent] = useState(0)
    const [finished, setFinished] = useState(false)
    //navigation
    const nav = useNavigation()
    return (
        <Root>
            <Header />
            <SafeAreaView style={styles.container}>
                <Text>Scratch</Text>
                <View style={styles.scratchcardcontainer}>
                    <ScratchCard
                        brushSize={125}
                        getPercent={percent => {
                            setPercent(percent)
                        }}
                        onEnd={() => {
                            setPercent(100)
                            setFinished(true)
                        }}
                        maxPercent={70}
                        style={{
                            justifyContent: "center",
                            alignItems: "center",
                            width: width * .7,
                            height: width * .8,
                            backgroundColor: colors.inputbg,
                            borderRadius: 10
                        }}
                        color={colors.primary}
                    >
                        <View style={{
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: width * .7,
                            backgroundColor: colors.inputbg,
                        }}>
                            <Image source={require('../assets/trophy.svg')} />
                            <Text style={styles.wontext}>You Won</Text>
                            <Text style={styles.price}>₹ {amount}</Text>
                        </View>
                    </ScratchCard>
                </View>
                {finished && <Text style={styles.awsome}>CongratulationS</Text>}
                {finished && <TouchableWithoutFeedback
                    onPress={() => nav.navigate('home')}
                    style={[cstyles.btn, styles.btn]}>
                    <Text style={cstyles.btntext}>Continue</Text>
                </TouchableWithoutFeedback>}
            </SafeAreaView>
        </Root>
    )
};
const styles = StyleSheet.create({
    btn: {
        width: width * .7,
        marginTop: 20
    },
    awsome: {
        color: colors.primary,
        fontSize: 18,
        textAlign: 'center',
        marginTop: 20,
        fontStyle: 'italic',
        textTransform: 'uppercase'
    },
    price: {
        color: colors.primary,
        fontWeight: '100',
        fontSize: 30
    },
    wontext: {
        color: '#ABAEAD',
        fontSize: 21,
        marginVertical: 5
    },
    scratchcardcontainer: {
        height: width * .8,
        width: width * .7,
        borderRadius: 10,
        overflow: 'hidden',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});
export default Scratch;
