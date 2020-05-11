import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image, Dimensions, SectionList, YellowBox, Button } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Animated, { Easing } from 'react-native-reanimated';
import { getProfileDetails, getLoggedInUserId } from '../../network/getProfileData';
import AddEvent from './addEvent';
import {
    EVENT_TEXT,
    ERROR_MSG,
    VOTE_BUTTON_TEXT
} from '../../constant';

const { width, height } = Dimensions.get('window');

export default class HomeTabScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userDetails: {},
            friendList: [{
                title: 'Next Event',
                data: [
                    {   
                        uid: 1, 
                        name: 'Christina James',
                        email: 'christina.james@gmail.com',
                        image: ''
                    }
                ],
            },{
                title: 'Upcoming Event',
                data: [
                    {   
                        uid: 1, 
                        name: 'Christina James',
                        email: 'christina.james@gmail.com',
                        image: ''
                    },
                    {
                        name: 'Broot Nait',
                        email: 'broot.naitam@gmail.com',
                        image: '',
                        uid: 2
                    },
                    {
                        name: 'James Kate',
                        uid: 3, 
                        email: 'james.kate@gmail.com',
                        image: ''
                    },
                    {
                        name: 'Christina James',
                        uid: 4, 
                        email: 'christina.james@gmail.com',
                        image: ''
                    }
                ],
            }]
        }
    }

    componentDidMount() {
        getLoggedInUserId(this.getUserId);
    }

    getUserId = (response) => {
        if (response.success) {
            getProfileDetails(response.body.userId, this.getUserDetails)
        } else {
            this.refs.toast.show(ERROR_MSG, DURATION.LENGTH_LONG)
        }
    }

    getUserDetails = (response) => {
        if (response.success) {
            this.setState({ userDetails: response.body })
        } else {
            this.refs.toast.show(`${response.message}`, DURATION.LENGTH_LONG)
        }
    }

    showAddEvent = () => {
        this.props.navigation.navigate('addEvent');
    }

    sectionHeader = ({section}) => {
        return (
            <Text style={styles.headerTitle}>{section.title}</Text>
        )
    }

    renderListItem = ({item}) => {
        const { name, email, image, type } = item
        return (
        <View style={styles.container}>
            <View style={styles.calenderDateContainer}>
                <Image  style={styles.calenderIcon} resizeMode={'contain'} source={require('../../../assets/date-event.png')} />
                <View style={styles.eventDateTime}>
                    <Text style={styles.eventDate}>Feb 24</Text>
                    <Text>in 2 days</Text>
                    <View style={styles.voteButton}>
                        <Button
                                title={VOTE_BUTTON_TEXT}
                                color="#193550"
                                onPress={(e) => console.log('press')}
                            >
                            </Button>
                    </View>
                </View>
            </View>
            <View style={styles.detailsContainer}>
                <Image  style={styles.profileImage} resizeMode={'contain'} source={require('../../../assets/group_2-7.png')} />
                <View style={styles.voteNameText}>
                    <Text style={styles.titleText}>Drinks with Jeniffer</Text>
                    <Text style={styles.votedText}>no one has voted yet</Text>
                </View>
            </View>
        </View>
        )
    }

    render() {
        const { friendList, userDetails } = this.state;
        console.log(userDetails);
        YellowBox.ignoreWarnings([
            'VirtualizedLists should never be nested', // TODO: Remove when fixed
        ])
        return (
            <KeyboardAwareScrollView style={styles.headerColor}>
                <View style={styles.homeTitleHeader}>
                    <View style={styles.profileImageContainer}>
                        {userDetails && userDetails.profileImage ? (
                            <Image resizeMode={'contain'} style={styles.profileIcon} source={{ uri: userDetails.profileImage }} />)
                            : (<Text>{''}</Text>)}
                    </View>
                    <Text style={styles.homeHeaderText}>{EVENT_TEXT}</Text>
                    <TouchableOpacity onPress={this.showAddEvent}>
                        <Image resizeMode={'contain'} style={styles.eventIcon} source={require('../../../assets/Plus-icon.png')} />
                    </TouchableOpacity>
                </View>
                <View>
                    <SectionList
                        style={styles.listContainer}
                        sections={friendList}
                        renderItem={this.renderListItem}
                        renderSectionHeader={this.sectionHeader}
                        keyExtractor={(item, index) => index}
                    />
                </View>
            </KeyboardAwareScrollView>
        );
    }
}

const styles = StyleSheet.create({
    eventIcon: {
        width: 40,
        height: 40,
        marginRight: 5
    },
    headerColor: {
        backgroundColor:'white'
    },
    homeTitleHeader: {
        backgroundColor: '#EBECED',
        justifyContent: 'center',
        alignItems: 'center',
        height: 60,
        flexDirection: 'row',
        display: 'flex',
        justifyContent: 'space-between'
    },
    homeHeaderText: {
        color: '#183650', fontSize: 20, fontWeight: '600'
    },
    listContainer: {
        paddingLeft: 5,
        paddingRight: 5,
        backgroundColor: '#fff',
        paddingBottom: 5,
    },
    headerTitle: {
        fontSize:20,
        fontWeight:'bold',
        color:'#545454',
        borderBottomColor: '#9A9A9A',
        borderBottomWidth: 3,
        marginTop: 10,
        marginBottom: 10,
     },
     container: {
        display: 'flex',
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#fff',
        marginTop: 5,
      },
      calenderDateContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flex: 0.38,
        backgroundColor: '#ECECEC',
        marginRight: 5,
        padding: 15,
        flexDirection: 'row'
      },
      detailsContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 0.62,
        padding: 20,
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: '#ECECEC',
      },
      titleText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#000'
      },
      votedText: {
        fontSize: 12,
        color: '#000'
      },
      profileImage: {
        width: 50, 
        height: 50, 
        borderRadius: 50, 
        justifyContent: 'center', 
        alignItems: 'center'
      },
      calenderIcon: {
        width: 35,
        height: 35,
        marginBottom: 20
      },
      eventDate: {
        fontWeight: 'bold'
      },
      eventDateTime: {
        marginTop: 20
      },
      voteNameText: {
        marginLeft: 10
      },
      voteButton: {
        marginTop: 5
      },
      profileImageContainer: {
        width: 50,
        height: 50,
        borderRadius: 50 / 2,
        position: 'relative',
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 5
    },
    profileIcon: {
        justifyContent: 'center',
        alignItems: 'center',
        minWidth: '150%',
        minHeight: '150%'
    }
})