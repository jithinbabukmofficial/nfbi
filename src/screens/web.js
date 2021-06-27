
import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import Root from '../components/root';
import { WebView } from 'react-native-webview';
import Loader from '../components/loader';


const Web = ({ navigation, route }) => {
    const { uri } = route.params
    const [loading, setLoading] = useState(true)
    return (
        <Root>
            <View style={{ flex: 1 }}>
                {loading && <Loader />}
                <WebView
                    onLoadEnd={() => setLoading(false)}
                    source={{ uri: uri }} />
            </View>
        </Root>
    )
};

export default Web;
