import React, { Component, useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image, Dimensions, Button, FlatList } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Animated from 'react-native-reanimated';
const { width, height } = Dimensions.get('window');
import { getProfileDetails, getLoggedInUserId } from '../../network/getProfileData';
import Loader from '../../components/shared/loader';
import { SearchBar } from 'react-native-elements';
import * as firebase from 'firebase';
import Toast, { DURATION } from 'react-native-easy-toast';
import {
    PROFILE_SEARCH,
    CONTACTS,
    SEARCH,
    SEARCH_TITLE
} from '../../constant';

export default class profileSearch extends Component {
    constructor(props) {
        super(props);
    }

    state = {
        loading: false,
        userDetails: {},
        searchValue: '',
        SEARCH_TEXT: '',
        userList: ""
    }

    componentDidMount() {
        getLoggedInUserId(this.getUserId);
    }

    getUserId = (response) => {
        if (response.success) {
            getProfileDetails(response.body.userId, this.getUserDetails)
        } else {
            this.refs.toast.show(`Something Went Wrong.`, DURATION.LENGTH_LONG)
        }
    }

    getUserDetails = (response) => {
        if (response.success) {
            this.setState({ userDetails: response.body })
        } else {
            this.refs.toast.show(`${response.message}`, DURATION.LENGTH_LONG)
        }
    }

    updateSearch = (searchText) => {
        this.setState({ searchValue: searchText });
        if (searchText.length > 2) {
            this.searchUsers(searchText)
        } else {
            this.refs.toast.show(`Enter Atleast 3 Characters.`, DURATION.LENGTH_LONG)
        }
    };

    setSearchData = (searchText) => {
        this.setState({ searchValue: searchText });
    }

    searchUsers = (searchTxt) => {
        this.setState({ loading: true });
        let searchString = searchTxt.toLowerCase();
        this.state.userList = [];
        let that = this;
        firebase
            .firestore()
            .collection('users')
            .orderBy('email')
            .startAt(searchString)
            .endAt(searchString + '\uf8ff')
            .get()
            .then(snapshot => {
                snapshot.forEach(function (doc) {
                    let data = []
                    that.state.userList.push(doc.data());
                    data.push(doc.data());
                    that.setState({ 'userList': data });
                });
                that.setState({ loading: false });
            })
    }

    render() {
        const { searchValue } = this.state;
        const { loading } = this.state;
        const { userDetails } = this.state;
        return (
            <KeyboardAwareScrollView style={styles.keyboardContainer}>
                <Loader loading={loading} />
                <View>

                    <View style={styles.profileHeader}>
                        <View style={styles.imageContainer}>
                            {userDetails && userDetails.profileImage ? (
                                <Image resizeMode={'contain'} style={styles.backIcon} source={{ uri: userDetails.profileImage }} />)
                                : (<Text>{''}</Text>)}
                        </View>
                        <Text style={styles.headerText}>{PROFILE_SEARCH}</Text>
                        <Text>{''}</Text>
                    </View>

                    <View style={styles.editContainer}>
                        <Text style={styles.contactText}>{CONTACTS}</Text>
                        <View
                            style={styles.lineBlock}
                        />
                    </View>

                    <View>
                        <Text style={styles.searchTitle}> {SEARCH_TITLE} </Text>
                    </View>

                    <View style={styles.searchView}>
                        <SearchBar
                            onChangeText={this.setSearchData}
                            value={searchValue}
                            placeholder="Search"
                            platform='ios'
                            containerStyle={styles.searchbg}
                            cancelIcon={false}
                            searchIcon={true}
                        />
                    </View>

                    <View style={{ padding: 40, }}>
                        <TouchableOpacity onPress={this.updateSearch.bind(this, searchValue)}
                            style={styles.searchBtn}
                            underlayColor='#fff'>
                            <Text style={styles.searchTextView}  >{SEARCH}</Text>
                        </TouchableOpacity>
                    </View>

                    <Toast
                        ref="toast"
                        style={styles.toastView}
                        position='bottom'
                        positionValue={300}
                        fadeInDuration={200}
                        fadeOutDuration={5000}
                        opacity={0.8}
                        textStyle={{
                            color: 'white',
                            fontSize: 18,
                            fontWeight: 'normal'
                        }}
                    />

                    <View style={styles.container}>
                        <FlatList
                            data={this.state.userList}
                            renderItem={({ item }) =>
                                <View style={styles.containerCard}>
                                    <View>
                                        <View style={styles.profileImageContainer}>
                                        <Image style={styles.profileImage} resizeMode={'contain'} source={{ uri: item.profileImage }} />
                                        </View>
                                    </View>
                                    <View style={styles.detailsContainer}>
                                        <Text style={styles.titleText}>{item.firstName} {item.lastName}</Text>
                                        <Text style={styles.email}>{item.email}</Text>
                                    </View>
                                </View>
                            }
                        />
                    </View>

                </View>

            </KeyboardAwareScrollView>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 22,
        margin: 10
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
    },
    containerCard: {
        display: 'flex',
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        marginTop: 5,
    },
    detailsContainer: {
        flex: 0.7,
        padding: 20,
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: '#ECECEC',
        height: '100%',
        width: '100%'
    },
    titleText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000'
    },
    contacts: {
        color: '#183650', textAlign: 'center', fontSize: 15, fontWeight: "bold"
    },
    firstLastName: {
        color: '#183650', fontSize: 20, fontWeight: '600'
    },
    email: {
        color: '#183650', fontSize: 13, fontWeight: '600'
    },
    header: {
        backgroundColor: '#EBECED',
        flexDirection: 'row',
        alignItems: 'center',
        height: 40,
        justifyContent: 'space-between'
    },
    profileImage: {
        // width: 100,
        // height: 100,
        // borderRadius: 100 / 2,
        // justifyContent: 'center',
        // alignItems: 'center',
        // resizeMode: 'contain'
        
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: '170%',
    minHeight: '100%'
    },
    profileHeader: {
        display: 'flex',
        backgroundColor: '#EBECED',
        flexDirection: 'row',
        alignItems: 'center',
        height: 60,
        justifyContent: 'space-between'
    },
    backIcon: {
        width: 50,
        height: 50,
        marginTop: 0,
        marginLeft: 10,
        borderRadius: 200 / 2
    },
    imageContainer: {
        flex: 0.3,
        padding: 7,
        height: '100%',
    },
    profileImageContainer: {
        flex: 0.3,
        backgroundColor: '#ECECEC',
        marginRight: 5,
        padding: 15,
        // height: '100%',
    width: 70,
    height: 70,
    borderRadius: 100,
    position: 'relative',
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    },
    headerText: {
        color: '#193550',
        fontSize: 20,
        fontWeight: '600',
        marginRight: 60
    },
    lineBlock: {
        backgroundColor: '#8e8e8e',
        height: 2,
        width: 300,
        marginTop: 10
    },
    editContainer: {
        padding: 20,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: 'white'
    },
    searchTitle: {
        color: '#2b2b2b',
        fontSize: 18,
        textAlign: 'left',
        fontWeight: '600',
        margin: 20,
        marginTop: 0
    },
    searchView: {
        width: width / 1.2,
        marginLeft: 30,
        backgroundColor: 'white'
    },
    searchBtn: {
        marginRight: 10,
        marginLeft: 10,
        marginTop: 0,
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor: '#183650',
        borderRadius: 50,
        borderWidth: 1,
        borderColor: '#183650',
        fontSize: 20
    },
    searchTextView: {
        color: '#fff',
        textAlign: 'center',
        fontWeight: "bold"
    },
    toastView: {
        backgroundColor: '#05213F',
        borderRadius: 5,
        padding: 10,
    },
    keyboardContainer: {
        backgroundColor: 'white'
    },
    searchbg: {
        backgroundColor: 'white'
    },
    contactText: {
        color: '#525252',
        fontSize: 18,
        fontWeight: "bold",
    }
});