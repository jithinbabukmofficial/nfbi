import { colors, width } from "./constants";

const { StyleSheet } = require("react-native");

export const cstyles = StyleSheet.create({
    error: {
        color: 'red',
        marginBottom: 15,
        // textTransform: 'capitalize'
    },
    title: {
        color: colors.sidebar,
        fontSize: 16,
        textTransform: 'capitalize'
    },
    input: {
        paddingVertical: 13,
        paddingHorizontal: 10,
        borderColor: colors.border,
        borderWidth: 1,
        borderRadius: 4,
        backgroundColor: colors.inputbg,
        fontSize: 17,
        color: colors.primary,
        marginBottom: 15,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    rowflex: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        zIndex: 10000
    },
    box: {
        paddingHorizontal: width * 0.05,
        paddingVertical: 20
    },
    btn: {
        backgroundColor: colors.primary,
        paddingVertical: 14,
        alignItems: 'center',
        borderRadius: 4,
        marginVertical: 20
    },
    btntext: {
        color: colors.background,
        fontSize: 16,
        textTransform: 'capitalize'
    },
    line: {
        height: 1,
        flex: 1,
        backgroundColor: colors.border,
        marginVertical: 10
    },
    btntrans: {
        marginVertical: 20,
        paddingVertical: 14,
        borderWidth: 1,
        borderColor: colors.primary,
        alignItems: 'center',
        borderRadius: 4
    },
    btntext2: {
        color: colors.primary,
        fontSize: 16
    },
    container: {
        flex: 1,
        backgroundColor: colors.background,
        justifyContent: 'flex-end',
        zIndex: 1
    },
    scroll: {
        ...StyleSheet.absoluteFill,
    },
    image: {
        resizeMode: 'cover',
        width: width,
        zIndex: 10001
    },
    shadebox: {
        backgroundColor: colors.inputbg,
        borderRadius: 6,
        paddingVertical: 20,
        marginBottom: 20,
    }
});
