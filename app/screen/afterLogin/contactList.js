import React, { useState, useEffect } from 'react'
import { StyleSheet, View, SectionList, Text, TouchableOpacity, Image } from 'react-native';
import { SearchBar } from 'react-native-elements';
import ContactCard from '../../components/contactCard'
import { Contacts } from '../../ContactsData'
import { SEARCH_TEXT } from '../../constant'
import FloatingButton from '../../components/shared/floatingButton'



const ContactList = () => {

    const [searchValue, setSearchValue] = useState('')
    const [friendList, setFriendList] = useState(Contacts)


    const updateSearch = searchText => {
        setSearchValue(searchText)
        if (searchText.length > 2) {
            searchUsers(searchText)
        }
        else {
            setFriendList(Contacts)
        }
    };


    const searchUsers = (searchTxt) => {
        let updatedUsersList = friendList.filter(listItem =>
            listItem.data.map(user => user.name.toLowerCase().includes(searchTxt.toLowerCase()))
        );
        setFriendList(updatedUsersList)
    }

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

    const fbClickHandler = (e) => {
        console.log('Floating Button Clicked!!')
    }

    const fbIconPath='../../../assets/add-icon.png'
    return (
        <View style={styles.container}>
            <SearchBar
                placeholder={SEARCH_TEXT}
                onChangeText={updateSearch}
                value={searchValue}
                platform='ios'
                cancelIcon={false}
                searchIcon={true}
            />
            <SectionList
                style={styles.listContainer}
                sections={friendList}
                renderItem={renderListItem}
                renderSectionHeader={sectionHeader}
                keyExtractor={(item, index) => index}
            />
            <FloatingButton
                onClick={fbClickHandler}
                icon={require('../../../assets/add-icon.png')}
            />
        </View>
    )
}

export default ContactList

const styles = StyleSheet.create({
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
    }
});