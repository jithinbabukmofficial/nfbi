import React, { useState } from 'react';
import { Text, TextInput, View } from 'react-native';
import { ScrollView, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import Drp from '../components/dropdown';
import Header from '../components/header';
import Root from '../components/root';
import { colors, width } from '../constants/constants';
import { cstyles } from '../constants/cstyles';

const Insurance = ({ navigation }) => {
    const [form, setForm] = useState({ values: {} })
    return (
        <Root>
            <Header title="Insurance" />
            <ScrollView>
                <View style={cstyles.box}>
                    <Drp value={form.values.state} onChange={val => onchanged(val, 'plan')} data={[
                        { name: 'gold' },
                        { name: 'platinum' },
                        { name: 'Diamond' },
                    ]} title="Plan" />
                    <TextInput
                        style={cstyles.input}
                        placeholder="Age"
                        keyboardType="default"
                        value={form.values.ifsc}
                        onChangeText={val => onchanged(val, 'age')}
                        placeholderTextColor={colors.text}
                    />
                    <TextInput
                        style={cstyles.input}
                        placeholder="Any Serious Disease"
                        keyboardType="default"
                        value={form.values.ifsc}
                        onChangeText={val => onchanged(val, 'age')}
                        placeholderTextColor={colors.text}
                    />
                    <TextInput
                        style={cstyles.input}
                        placeholder="Expected Premium"
                        keyboardType="default"
                        value={form.values.ifsc}
                        onChangeText={val => onchanged(val, 'age')}
                        placeholderTextColor={colors.text}
                    />

                </View>
            </ScrollView>
            <TouchableWithoutFeedback style={[cstyles.btn, { marginHorizontal: width * 0.05 }]}>
                <Text style={cstyles.btntext}>Submit</Text>
            </TouchableWithoutFeedback>
        </Root>
    )
};

export default Insurance;
