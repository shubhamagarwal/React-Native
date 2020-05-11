import React, { useState, useEffect } from 'react'
import { StyleSheet, View, SectionList, Text, Image, TouchableOpacity, SafeAreaView, YellowBox } from 'react-native';
import { SearchBar, CheckBox } from 'react-native-elements';
import { Contacts } from '../../ContactsData';
import {
    SAVE_TEXT
  } from '../../constant';


const AddEventContactList = (props) => {
    const {
        friendList,
        showSelectedContactList
    } = props && props.route && props.route.params;
    
    const [selectedFriendList, setSelectedFriendList] = useState([]);

    YellowBox.ignoreWarnings([
        'VirtualizedLists should never be nested', // TODO: Remove when fixed
    ])

    YellowBox.ignoreWarnings([
        'Non-serializable values were found in the navigation state',
      ]);

    const sectionHeader = ({ section }) => {
        return (
            <Text style={styles.headerTitle}>{section.title}</Text>
        )
    }

    const renderListItem = ({ item }) => {
        return (
            <ContactCard user={item} />
        )
    }

    const checkBoxClickEvent = (id, flag) => {
        const elementsIndex = friendList[0].data.findIndex(element => element.uid == id );
        let newContactList = friendList.slice();
        newContactList[0]['data'][elementsIndex] = {...newContactList[0]['data'][elementsIndex], isChecked: !newContactList[0]['data'][elementsIndex].isChecked};
        setSelectedFriendList(newContactList);
    }

    const ContactCard = ({ user }) => {
        const { name, email, image, isChecked, uid } = user
        return (
            <View key={name} style={styles.contactContainer}>
                <CheckBox
                    checked={isChecked}
                    value='sdf'
                    onPress={() => checkBoxClickEvent(uid, isChecked)}
                />
                <View style={styles.imageContainer}>
                    <Image style={styles.profileImage} resizeMode={'contain'} source={{ uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/hebertialmeida/128.jpg' }} />
                </View>
                <View style={styles.detailsContainer}>
                    <Text style={styles.titleText}>{name}</Text>
                    <Text style={styles.email}>{email}</Text>
                </View>

            </View>
        )
    }

    const backToAddEvent = () => {
        props.navigation.navigate('addEvent')
    }


    const saveContactlist = () => {
        let newContactList = [...friendList];
        const selectedContactList = newContactList[0]['data'].filter(friend => {
            return friend.isChecked === true;
        })
        const setSelectedListOnEvent = [{ title: 'Friend List', data: [...selectedContactList]}]
        showSelectedContactList(setSelectedListOnEvent);
        props.navigation.goBack();
    } 


    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
                <View style={styles.backHeader}>
                    <TouchableOpacity onPress={backToAddEvent}>
                        <Image resizeMode={'contain'} style={styles.backIcon} source={require('../../../assets/back1.png')} />
                    </TouchableOpacity>
                </View>
                <SectionList
                    style={styles.listContainer}
                    sections={friendList}
                    renderItem={renderListItem}
                    renderSectionHeader={sectionHeader}
                    keyExtractor={(item, index) => index}
                />
                <TouchableOpacity
                    style={styles.submit}
                    onPress={saveContactlist}
                    underlayColor='#fff'>
                    <Text style={styles.submitText}>{SAVE_TEXT}</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default AddEventContactList

const styles = StyleSheet.create({
    backHeader: {
        backgroundColor: '#EBECED',
        alignItems: 'flex-start',
        height: 40
    },
    backIcon: {
        width: 75,
        height: 75,
        marginTop: -10
    },
    container: {
        flex: 1,
    },
    listContainer: {
        paddingLeft: 10,
        paddingRight: 10,
        backgroundColor: '#fff',
        paddingBottom: 10,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#545454',
        borderBottomColor: '#9A9A9A',
        borderBottomWidth: 3,
        textTransform: 'uppercase',
        marginTop: 10,
        marginBottom: 10,
    },
    item: {
        fontSize: 14,
    },
    contactContainer: {
        display: 'flex',
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        marginTop: 5
    },
    imageContainer: {
        flex: 0.3,
        backgroundColor: '#ECECEC',
        marginRight: 5,
        padding: 15,
        height: '100%',
    },
    detailsContainer: {
        flex: 0.7,
        padding: 20,
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: '#ECECEC',
        height: '100%',
    },
    profileImage: {
        width: 70,
        height: 70,
        borderRadius: 200 / 2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    titleText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000'
    },
    email: {
        color: '#183650', fontSize: 13, fontWeight: '600'
    },
    submit: {
        marginRight: 40,
        marginLeft: 40,
        marginTop: 30,
        paddingTop: 10,
        paddingBottom: 10,
        marginBottom: 30,
        backgroundColor: '#183650',
        borderRadius: 50,
        borderWidth: 1,
        borderColor: '#183650'
    },
    submitText: {
        color: '#fff',
        textAlign: 'center',
        fontWeight: "bold",
        fontSize: 20
    }
});