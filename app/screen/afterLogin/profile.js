import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Animated from 'react-native-reanimated';
import { getProfileDetails, getLoggedInUserId, saveEditProfile } from '../../network/getProfileData';
import Toast, { DURATION } from 'react-native-easy-toast';
import EditProfile from './editProfile';
import {
  HOME,
  CONTACTS,
  CONTACT_LIST,
  CONTACT_US,
  NEED_HELP,
  USER_COLLECTION
} from '../../constant';
import UserService from '../../services/userService'

const { width, height } = Dimensions.get('window');
import * as firebase from 'firebase';
import { AsyncStorage } from 'react-native';

export default class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userDetails: {},
            showEditPage: false,
            nameEditable: false
        }

        let that = this;
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                let uid = user.uid;
                firebase.firestore().collection("users").doc(uid)
                    .onSnapshot({
                        includeMetadataChanges: true
                    }, function (details) {
                        if (Object.keys(that.state.userDetails).length) {
                            that.setState({ userDetails: details.data() })
                        }
                    });
            } else {
            }
        });
    }

    signOut = () => {
        this.props.navigation.navigate('Home');
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

    componentDidMount() {
        getLoggedInUserId(this.getUserId);
    }

    onEditClick = () => {
        this.setState({ showEditPage: true })
      

    }

  signOut = () => {
    this.props.navigation.navigate('Home');
  }

  getUserId = (response) => {
    if (response.success) {
      getProfileDetails(response.body.userId, this.getUserDetails)
    } else {
      this.refs.toast.show(`Something Went Wrong.`, DURATION.LENGTH_LONG)
    }

    
  }

  backToProfile = () => {
    this.setState({ showEditPage: false })
    getLoggedInUserId(this.getUserId);
  }

//   getUserDetails = () => {
//     const userInfo = JSON.parse(localStorage.getItem('userInfo'))
//     UserService(USER_COLLECTION).profileByID(userInfo.uid).then(res => {
//       const { fields:{
//         email:{stringValue:userEmail},
//         profileImage:{stringValue:userImage},
//         uid:{stringValue:userID},
//         lastName:{stringValue:userLastName},
//         firstName:{stringValue:userFirstName}
//         } 
//       } = res.data 
//       this.setState({ userDetails: {firstName:userFirstName, lastName:userLastName, profileImage:userImage, email:userEmail}})

//     }).catch( error => console.log("Inside Profile:CATCH>>> "+error)
//     )
//   }

  componentDidMount() {
    // this.getUserDetails()
    getLoggedInUserId(this.getUserId);
  }

  onEditClick = () => {
    this.setState({ showEditPage : true })
  }

  backToProfile = () => {
    this.setState({ showEditPage : false })
    getLoggedInUserId(this.getUserId);
  }

  editName = () => {
    this.setState({ nameEditable: true })
  }

  getUpdatedName = (name) => {
    const [fName, lName] = name.split(' ');
    const nameDetails = {...this.state.userDetails};
    nameDetails.firstName = fName;
    nameDetails.lastName = lName;
    this.setState({
      userDetails: nameDetails
    })
  }

  saveUserDetails = () => {
    saveEditProfile(this.state.userDetails, this.getSavedData)
  }

  getSavedData = (response) => {
    if (response.success) {
      this.setState({ userDetails: response.body, nameEditable: false })
      this.refs.toast.show(`${response.message}`, DURATION.LENGTH_LONG)
    } else {
      this.refs.toast.show(`${response.message}`, DURATION.LENGTH_LONG)
    }
  } 

  editProfileImage = () => {
    this.props.navigation.navigate('cameraPage');
  }



  render() {
    const { userDetails, nameEditable } = this.state;
    return (
      <KeyboardAwareScrollView>
        <Toast
              ref="toast"
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
        { !this.state.showEditPage ? 
        (<View>
          <View style={styles.header}>
            <Text>{' '}</Text>
            <Text style={styles.homeText}> {HOME} </Text>
            <TouchableOpacity onPress={this.onEditClick}>
              <Image resizeMode={'contain'} style={styles.editIcon} source={require('../../../assets/layer_4_copy.png')} />
            </TouchableOpacity>
          </View>
          <View style={{ height: height / 1.2, justifyContent: 'center' }}>
            <Animated.View style={styles.animatedView}>
              <View style={styles.profileContainer}>
                {Object.keys(userDetails).length && userDetails.profileImage === "" ? (
                  <Image resizeMode={'contain'} style={styles.profileImage} source={require('../../../assets/place-holder.png')} />
                  ) : (<Image resizeMode={'contain'} style={styles.profileImage} source={{ uri: userDetails.profileImage}} />)
                }
              </View>
              <Text style={styles.firstLastName}> {userDetails && userDetails.firstName} {userDetails && userDetails.lastName} </Text>
              <Text style={styles.email}> {userDetails && userDetails.email} </Text>
            </Animated.View>
            <Text style={styles.contacts}>{CONTACTS}</Text>
            <TouchableOpacity
              style={styles.submit}
              underlayColor='#fff'>
              <Text style={styles.submitText}>{CONTACT_LIST}</Text>
            </TouchableOpacity>
            <Text style={styles.helpSection}>
              <Text style={styles.needHelp}>{NEED_HELP} </Text>
              <Text style={styles.contactUs}>{CONTACT_US}</Text>
            </Text>
          </View>
        </View>) : (
          <EditProfile
            backToProfile={this.backToProfile}
            userDetails={userDetails}
            saveUserDetails={this.saveUserDetails}
            editName={this.editName}
            nameEditable={nameEditable}
            getUpdatedName={this.getUpdatedName}
            editProfileImage={this.editProfileImage}
          />
        ) }

      </KeyboardAwareScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#183650'
  },
  submit: {
    marginRight: 40,
    marginLeft: 40,
    marginTop: 10,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: '#183650',
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#183650',
    fontSize: 20
  },
  submitText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: "bold"
  },
  needHelp: {
    color: '#7f7f7f', textAlign: 'center', fontSize: 15
  },
  contactUs: {
    color: '#183650', textAlign: 'center', fontSize: 15, fontWeight: "bold", textDecorationLine: 'underline'
  },
  contacts: {
    color: '#183650', textAlign: 'center', fontSize: 15, fontWeight: "bold"
  },
  firstLastName: {
    color: '#000000', fontSize: 20, fontWeight: '600'
  },
  email: {
    color: '#000000', fontSize: 18, fontWeight: '600'
  },
  header: {
    backgroundColor: '#EBECED',
    flexDirection: 'row',
    alignItems: 'center',
    height: 40,
    justifyContent: 'space-between'
  },
  homeText: {
    color: '#193550', fontSize: 20, fontWeight: '600'
  },
  editIcon: {
    width: 30, height: 25
  },
  profileContainer: {
    width: 100,
    height: 100,
    borderRadius: 100/2,
    position: 'relative',
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImage: {
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: '150%',
    minHeight: '150%'
  },
  animatedView: {
    height: height / 3, marginBottom: 70, justifyContent: 'center', alignItems: 'center', position: 'relative'
  },
  toast: {
    backgroundColor: '#05213F',
    borderRadius: 5,
    padding: 10
  },
  helpSection : {
    textAlign: 'center', marginTop: 25
  }
});