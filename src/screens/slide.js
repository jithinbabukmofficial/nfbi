import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Root from '../components/root';
import ViewPager from '@react-native-community/viewpager';
import Slideone from './slideone';
import Slidetwo from './slidetwo';
import Slidethree from './slidethree';

const Slide = ({ navigation }) => {
    const [index, setIndex] = useState(0)
    const ref = useRef(null)
    useEffect(() => {
        setTimeout(() => {
            setIndex(1)
        }, 3000);
        // setTimeout(() => {
        //     setIndex(2)
        // }, 6000);
    }, [])


    useEffect(() => {
        ref.current.setPage(index)
    }, [index])
    return (
        <Root>
            <ViewPager ref={ref} style={styles.container} initialPage={index}>
                <View key="1" style={styles.page}>
                    <Slideone />
                </View>
                <View key="2" style={styles.page}>
                    <Slidetwo />
                </View>
                <View key="3" style={styles.page}>
                    <Slidethree />
                </View>
            </ViewPager>
        </Root>
    )
};
const styles = StyleSheet.create({
    page: {
        flex: 1
    },
    container: {
        flex: 1
    }
});
export default Slide;
