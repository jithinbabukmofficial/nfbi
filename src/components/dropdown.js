import React, { useRef, useState } from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity, } from 'react-native';
import { TouchableWithoutFeedback, ScrollView } from 'react-native-gesture-handler';
import { colors } from '../constants/constants';
import { cstyles } from '../constants/cstyles';
import RBSheet from "react-native-raw-bottom-sheet";


const Drp = ({
    title,
    data,
    onChange,
    value
}) => {
    const [open, setOpen] = useState(false)
    const [selected, setSelected] = useState(value)
    const refRBSheet = useRef();
    return (
        <View style={styles.row}>
            <TouchableWithoutFeedback
                onPress={() => {
                    refRBSheet.current.open()
                    // setOpen(!open)
                }}
                style={{
                    paddingVertical: 15,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: '100%',

                }}>
                <Text numberOfLines={1} style={styles.text}>{selected != null ? selected : title}</Text>
                <Image source={require('../assets/dropdown.svg')} />
            </TouchableWithoutFeedback>
            {open ?
                <View style={styles.item}>
                    <ScrollView style={{ flex: 1 }}>
                        {data.map(item => <TouchableOpacity
                            onPress={() => {
                                setSelected(item.name)
                                setOpen(false)
                                refRBSheet.current.close()
                            }}
                            style={styles.itemlist}>
                            <Text style={styles.itemtext}>{item.name}</Text>
                        </TouchableOpacity>)}
                    </ScrollView>
                </View>
                : null}
            <RBSheet
                ref={refRBSheet}
                closeOnDragDown={true}
                closeOnPressMask={false}
                height={300}
                customStyles={{
                    wrapper: {
                        backgroundColor: "transparent"
                    },
                    container: {
                        backgroundColor: '#333'
                    },
                    draggableIcon: {
                        backgroundColor: "#000"
                    }
                }}
            >
                <View style={styles.item}>
                    <ScrollView
                        style={{ flex: 1 }}
                        showsVerticalScrollIndicator={false}>
                        {data.map(item => <TouchableOpacity
                            onPress={() => {
                                setSelected(item.name)
                                setOpen(false)
                                refRBSheet.current.close()
                                onChange(item.name)
                            }}
                            style={styles.itemlist}>
                            <Text style={styles.itemtext}>{item.name}</Text>
                        </TouchableOpacity>)}
                    </ScrollView>
                </View>
            </RBSheet>

        </View>
    )
};
const styles = StyleSheet.create({
    itemtext: {
        color: colors.text,
        textAlign: 'center',
        fontSize: 16
    },
    itemlist: {
        paddingVertical: 15,
        paddingHorizontal: 10,
        // borderBottomColor: colors.primary,
        // borderBottomWidth: 1
    },
    // item: {
    //     position: 'absolute',
    //     top: 50,
    //     right: 0,
    //     left: 0,
    //     backgroundColor: '#fff',
    //     paddingVertical: 10,
    //     borderRadius: 4,
    //     height: 300,
    //     overflow: 'hidden',
    //     zIndex: 10000,
    //     borderWidth: 1,
    //     // borderColor: colors.border,
    //     backgroundColor: colors.inputbg
    // },
    item: {
        // backgroundColor: '#fff',
        // alignItems: 'center',
        paddingVertical: 10,
        height: 500,
        overflow: 'hidden',
        zIndex: 10000,
        borderWidth: 1,
        // borderColor: colors.border,
        backgroundColor: colors.inputbg
    },
    text: {
        color: colors.text,
        fontSize: 15
    },
    row: {
        borderColor: colors.border,
        borderWidth: 1,
        borderRadius: 4,
        paddingHorizontal: 10,
        flex: .48,
        justifyContent: 'space-between',
        backgroundColor: colors.inputbg,
        marginBottom: 15
    }
});
export default Drp;
