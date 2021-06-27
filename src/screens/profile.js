import React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import Header from '../components/header';
import Root from '../components/root';
import { base_url, colors, width } from '../constants/constants';
import { cstyles } from '../constants/cstyles';

const Profile = ({ navigation }) => {
    const { user } = useSelector(state => state)
    return (
        <Root>
            <Header title="View Profile" />
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={[cstyles.box, styles.container]}>
                    <Image style={styles.pimage} source={{ uri: `${base_url}/${user.image}` }} />
                    {user.parent && <View style={[cstyles.rowflex, styles.item]}>
                        <Text style={styles.itemtitle}>Sponser Id</Text>
                        <Text style={styles.itemtext}>NFBI-{user.parent.substring(0, 14)}</Text>
                    </View>}
                    <View style={[cstyles.rowflex, styles.item]}>
                        <Text style={styles.itemtitle}>User ID</Text>
                        <Text style={styles.itemtext}>NFBI-{user._id.substring(0, 14)}</Text>
                    </View>
                    <View style={[cstyles.rowflex, styles.item]}>
                        <Text style={styles.itemtitle}>Designation</Text>
                        <Text style={[styles.itemtext, { textTransform: 'uppercase' }]}>{user.designation}</Text>
                    </View>
                </View>
                <View style={[cstyles.box, styles.container]}>
                    <Text style={styles.title}>PERSONAL DETAILS</Text>
                    <View style={[cstyles.rowflex, styles.item]}>
                        <Text style={styles.itemtitle}>name</Text>
                        <Text style={styles.itemtext}>{user.name}</Text>
                    </View>
                    <View style={[cstyles.rowflex, styles.item]}>
                        <Text style={styles.itemtitle}>g-mail</Text>
                        <Text style={[styles.itemtext, { textTransform: 'none' }]}>{user.email}</Text>
                    </View>
                    <View style={[cstyles.rowflex, styles.item]}>
                        <Text style={styles.itemtitle}>city/state</Text>
                        <Text style={styles.itemtext}>{user.district} / {user.state}</Text>
                    </View>
                    <View style={[cstyles.rowflex, styles.item]}>
                        <Text style={styles.itemtitle}>user name</Text>
                        <Text style={styles.itemtext}>{user.phone}</Text>
                    </View>
                    <Text style={[styles.title, { marginTop: 20 }]}>Bank DETAILS</Text>
                    <View style={[cstyles.rowflex, styles.item]}>
                        <Text style={styles.itemtitle}>payee name</Text>
                        <Text style={styles.itemtext}>{user.payeename}</Text>
                    </View>
                    <View style={[cstyles.rowflex, styles.item]}>
                        <Text style={styles.itemtitle}>bank name</Text>
                        <Text style={styles.itemtext}>{user.bank}</Text>
                    </View>
                    <View style={[cstyles.rowflex, styles.item]}>
                        <Text style={styles.itemtitle}>account</Text>
                        <Text style={styles.itemtext}>{user.account}</Text>
                    </View>
                    <View style={[cstyles.rowflex, styles.item]}>
                        <Text style={styles.itemtitle}>branch</Text>
                        <Text style={styles.itemtext}>{user.branch}</Text>
                    </View>
                    <View style={[cstyles.rowflex, styles.item]}>
                        <Text style={styles.itemtitle}>ifsc</Text>
                        <Text style={styles.itemtext}>{user.ifsc}</Text>
                    </View>
                </View>
            </ScrollView>
        </Root>
    )
};
const styles = StyleSheet.create({
    title: {
        color: colors.primary,
        fontSize: 17,
        textTransform: 'uppercase',
        marginBottom: 10
    },
    item: {
        borderBottomColor: colors.pborder,
        borderBottomWidth: 1,
        paddingVertical: 10
    },
    itemtext: {
        color: colors.primary,
        fontSize: 17,
        textTransform: 'uppercase'
    },
    itemtitle: {
        color: colors.sidebar,
        fontSize: 17,
        textTransform: 'uppercase'
    },
    pimage: {
        alignSelf: 'center',
        width: width * .25,
        height: width * .25,
        resizeMode: 'cover',
        borderRadius: width * .25,
        marginBottom: 20
    },
    container: {
        marginTop: 20,
        backgroundColor: colors.inputbg,
        paddingHorizontal: 15,
        marginHorizontal: width * 0.05,
        borderRadius: 6
    }
});
export default Profile;
