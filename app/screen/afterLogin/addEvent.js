import React, { useState, useEffect, useRef } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image, Dimensions, TextInput, Button, SectionList, YellowBox } from 'react-native';
import { getProfileDetails, getLoggedInUserId } from '../../network/getProfileData';
import Animated from 'react-native-reanimated';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import DateTimePicker from '@react-native-community/datetimepicker';
import Toast, { DURATION } from 'react-native-easy-toast';
import AddEventContactList from './addEventContactList';
const { width, height } = Dimensions.get('window');
import {
    VALIDATION_TITLE,
    VALIDATION_LOCATION,
    EVENT_TEXT,
    ADD_EVENT,
    SAVE_TEXT,
    CONTACT_LIST
} from '../../constant';

const AddEvent = (props) => {
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [userDetails, setUserDetails] = useState({});
    const [eventDetails, setEventDeails] = useState({
        title: '',
        location: ''
    })
    const [showContactListPage, setContactList] = useState(false)
    const [selectedContactList, setSelectedContactList] = useState([])
    const [friendList, setFriendList] = useState([
        {
            title: 'Friend List',
            data: [
                {   
                    uid: 1, 
                    name: 'Christina James',
                    email: 'christina.james@gmail.com',
                    image: '',
                    isChecked: false
                },
                {
                    name: 'Broot Nait',
                    email: 'broot.naitam@gmail.com',
                    image: '',
                    uid: 2,
                    isChecked: false
                },
                {
                    name: 'James Kate',
                    uid: 3, 
                    email: 'james.kate@gmail.com',
                    image: '',
                    isChecked: false
                },
                {
                    name: 'Christina James',
                    uid: 4, 
                    email: 'christina.james@gmail.com',
                    image: '',
                    isChecked: false
                },
                {
                    name: 'Broot Nait',
                    uid: 5, 
                    email: 'broot.naitam@gmail.com',
                    image: '',
                    isChecked: false
                },
                {
                    name: 'James Kate',
                    uid: 6, 
                    email: 'james.kate@gmail.com',
                    image: '',
                    isChecked: false
                }
            ],
        }
    ]
    )

    const titleInput = useRef();
    const toast = useRef();
    const locationInput = useRef();
    const getDate = date.getDate().toString();
    const getMonth = (date.getMonth() + 1).toString();
    const getYear = date.getFullYear().toString();

    useEffect(() => {
        getLoggedInUserId(getUserId);
    }, []);

    YellowBox.ignoreWarnings([
        'VirtualizedLists should never be nested', // TODO: Remove when fixed
    ])

    const getUserId = (response) => {
        if (response.success) {
            getProfileDetails(response.body.userId, getUserDetails)
        } else {
            toast.current && toast.current.show(`${response.message}`, DURATION.LENGTH_LONG)
        }
    }

    const getUserDetails = (response) => {
        if (response.success) {
            setUserDetails(response.body);
        } else {
            toast.current && toast.current.show(`${response.message}`, DURATION.LENGTH_LONG)
        }
    }

    const setEventDetails = (value, fieldName) => {
        setEventDeails({
            ...eventDetails,
            [fieldName]: value
        })
        setShow(false);
    }

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
    };

    const showMode = currentMode => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
    };

    const showTimepicker = () => {
        showMode('time');
    };

    const saveEvent = () => {
        var currentDateTime = new Date();
        var selectedEventDateTime = date;
        if (eventDetails.title === '') {
            alert(VALIDATION_TITLE);
            titleInput.current && titleInput.current.focus();
            return;
        } else if(currentDateTime > selectedEventDateTime) {
            alert('Please select the future date & time')
        }   else if (eventDetails.location === '') {
            alert(VALIDATION_LOCATION)
            locationInput.current && locationInput.current.focus();
        } else {
            alert('Event Saved !!')
        }
    }

    const showContactList = () => {
        props.navigation.navigate('addEventContactList', {
            friendList: friendList,
            showSelectedContactList: saveContactlist
        });
    }

    const hideContactList = () => {
        setContactList(false)
    }

    const sectionHeader = ({ section }) => {
        return (
            <Text style={styles.contactListTitle}>{section.title}</Text>
        )
    }

    const renderListItem = ({ item }) => {
        return (
            <ContactCard user={item} />
        )
    }

    const deleteContact = uid => () => {
        let contactListAfterDeletion = [...selectedContactList];
        contactListAfterDeletion[0].data = selectedContactList[0].data.filter(contact => {
            return contact.uid !== uid;
        })
        if(contactListAfterDeletion[0].data.length) {
            setSelectedContactList(contactListAfterDeletion);
        } else {
            setSelectedContactList([]);
        }
    }

    const ContactCard = ({ user }) => {
        const { name, email, image, uid } = user
        return (
            <View key={name} style={styles.contactContainer}>

                <View style={styles.contactImageContainer}>
                    <Image style={styles.contactProfileImage} resizeMode={'contain'} source={{ uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/hebertialmeida/128.jpg' }} />
                </View>
                <View style={styles.detailsContainer}>
                    <View style={styles.nameDeleteContainer}>
                        <Text style={styles.titleText}>{name}</Text>
                        <TouchableOpacity onPress={deleteContact(uid)}>
                            <Image resizeMode={'contain'} style={styles.deleteImage} source={require('../../../assets/delete.png')} />
                        </TouchableOpacity>
                    </View>
                    
                    <Image resizeMode={'contain'} style={styles.addContact} source={require('../../../assets/add_contact.png')} />
                </View>

            </View>
        )
    }

    const saveContactlist = (setSelectedListOnEvent) => {
        const contactListOnEvent = [...setSelectedListOnEvent]
        setSelectedContactList(contactListOnEvent);
    }

    const backToHomePage = () => {
        props.navigation.navigate('dashboard');
    }

    return (
        <KeyboardAwareScrollView style={styles.addEventHeaderBackground}>
            <Toast
                ref={toast}
                style={styles.toast}
                position='bottom'
                positionValue={200}
                fadeInDuration={200}
                fadeOutDuration={5000}
                opacity={0.8}
                textStyle={{
                    color: 'white',
                    fontSize: 16,
                    fontWeight: 'normal'
                }}
            />
            {!showContactListPage ?
                (<View>
                    <View style={styles.eventHeader}>
                        <View style={styles.backHeader}>
                            <TouchableOpacity onPress={backToHomePage}>
                                <Image resizeMode={'contain'} style={styles.backIcon} source={require('../../../assets/back1.png')} />
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.headerText}>{EVENT_TEXT}</Text>
                        <View style={styles.imageContainer}>
                            {userDetails && userDetails.profileImage ? (
                                <Image resizeMode={'contain'} style={styles.profileIcon} source={{ uri: userDetails.profileImage }} />)
                                : (<Text>{''}</Text>)}
                        </View>
                        
                    </View>
                    <Animated.View>
                        <View style={styles.eventContainer}>
                            <Text style={styles.addEventText}>{ADD_EVENT}</Text>
                            <View
                                style={styles.lineBlock}
                            />
                            <TextInput
                                onChangeText={text => setEventDetails(text, 'title')}
                                value={eventDetails.title}
                                style={styles.textInputFields}
                                placeholder="Title"
                                ref={titleInput}
                            />
                            <View style={styles.dateTimeField}>
                                    <TextInput
                                        disabled
                                        value={`${getDate}-${getMonth}-${getYear}`}
                                        style={[styles.textInputFields, styles.dateTimeTextWidth]}
                                        placeholder="Date"
                                        onFocus={() => showDatepicker()}
                                    />
                                <TouchableOpacity onPress={showDatepicker}>
                                    <Image resizeMode={'contain'} style={styles.dateIcon} source={require('../../../assets/date.png')} />
                                </TouchableOpacity>
                            </View>
                            <View style={styles.dateTimeField}>
                                <TextInput
                                    disabled
                                    value={`${date.getHours().toString()}:${date.getMinutes().toString()}:${date.getSeconds().toString()}`}
                                    style={[styles.textInputFields, , styles.dateTimeTextWidth]}
                                    placeholder="Time"
                                    onFocus={() => showTimepicker()}
                                />
                                <TouchableOpacity onPress={showTimepicker}>
                                    <Image resizeMode={'contain'} style={styles.timeIcon} source={require('../../../assets/time.png')} />
                                </TouchableOpacity>
                            </View>
                            <TextInput
                                onChangeText={text => setEventDetails(text, 'location')}
                                value={eventDetails.location}
                                style={styles.textInputFields}
                                placeholder="Location"
                                ref={locationInput}
                            />
                            <View style={{ flex: 1 }}>
                                {selectedContactList.length ? (<SectionList
                                    style={styles.listContainer}
                                    sections={selectedContactList}
                                    renderItem={renderListItem}
                                    renderSectionHeader={sectionHeader}
                                    keyExtractor={(item, index) => index}
                                />) : <Text>{' '}</Text> }
                            </View>
                            <View style={styles.contactSaveContainer}>
                                <View style={styles.contactListButton}>
                                    <Button
                                        title={CONTACT_LIST}
                                        color="#8e8e8e"
                                        onPress={showContactList}
                                    >
                                    </Button>
                                </View>
                                <View style={styles.saveButton}>
                                    <Button
                                        title={SAVE_TEXT}
                                        color="#193550"
                                        onPress={saveEvent}
                                    >
                                    </Button>
                                </View>
                            </View>
                        </View>
                        {show && (
                            <DateTimePicker
                                testID="dateTimePicker"
                                timeZoneOffsetInMinutes={0}
                                value={date}
                                mode={mode}
                                is24Hour={true}
                                display="default"
                                onChange={onChange}
                            />
                        )}
                    </Animated.View>
                </View>) : (
                    <AddEventContactList
                        friendList={friendList}
                        saveContactlist={saveContactlist}
                    />
                )}
        </KeyboardAwareScrollView>
    )
}


export default React.memo(AddEvent);

const styles = StyleSheet.create({
    contactListTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#545454',
        borderBottomColor: '#9A9A9A',
        borderBottomWidth: 3,
        textTransform: 'uppercase',
        marginTop: 10,
        marginBottom: 10,
    },
    detailsContainer: {
        flex: 0.7,
        padding: 20,
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: '#ECECEC',
        height: '100%',
    },
    nameDeleteContainer: {
        flex: 0.7,
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#ECECEC',
        height: '100%',
    },
    titleText: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#000'
    },
    contactContainer: {
        display: 'flex',
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        marginTop: 5
    },
    contactProfileImage: {
        width: 70,
        height: 70,
        borderRadius: 200 / 2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    contactImageContainer: {
        flex: 0.3,
        backgroundColor: '#ECECEC',
        marginRight: 5,
        padding: 15,
        height: '100%',
    },
    eventHeader: {
        display: 'flex',
        backgroundColor: '#EBECED',
        flexDirection: 'row',
        alignItems: 'center',
        height: 60,
        justifyContent: 'space-between'
    },
    dateTimeField: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    contactSaveContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop:20
    },
    dateIcon: {
        width: 33,
        height: 38,
        marginTop: 20
    },
    imageContainer: {
        width: 50,
        height: 50,
        borderRadius: 50 / 2,
        position: 'relative',
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
        marginTop: 5
    },
    profileIcon: {
        justifyContent: 'center',
        alignItems: 'center',
        minWidth: '150%',
        minHeight: '150%'
    },
    headerText: {
        color: '#193550',
        fontSize: 20,
        fontWeight: '600',
        marginRight: 45
    },
    mainArea: {
        position: 'relative'
    },
    eventContainer: {
        padding: 40,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: 'white'
    },
    addEventText: {
        color: '#525252',
        fontSize: 18,
        fontWeight: "bold",
    },
    lineBlock: {
        backgroundColor: '#8e8e8e',
        height: 3,
        width: 280,
        marginTop: 0
    },
    textInputFields: {
        height: 40, marginTop: 20,
        borderRadius: 10,
        backgroundColor: '#ececec',
        color: '#9a9a9a',
        padding: 10
    },
    dateTimeTextWidth: {
        width: 220
    },
    timeIcon: {
        width: 33,
        height: 38,
        marginTop: 20
    },
    toast: {
        backgroundColor: '#05213F',
        borderRadius: 5,
        padding: 10
    },
    deleteImage: {
        width: 20,
        height: 20,
        marginRight:0
    },
    addContact: {
        width: 130,
        height: 50,
        marginTop: 10
    },
    backIcon: {
        width: 80,
        height: 80,
        marginTop: -10
    },
    backHeader: {
        backgroundColor: '#EBECED',
        alignItems: 'flex-start',
        height: 40
    },
    contactListButton: {
        width: 170,
        borderRadius: 50
    },
    saveButton: {
        width: 100
    },
    addEventHeaderBackground: {
        backgroundColor: 'white'
    }
})