import React, { useRef } from 'react';
import { Text, TextInput, View, StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native';
import Animated from 'react-native-reanimated';
import {
  EDIT_PROFILE,
  EDIT_TEXT,
  CONTACT_US,
  NEED_HELP
} from '../../constant';
const { width, height } = Dimensions.get('window');

const EditProfile = (props) => {
    const {
      backToProfile,
      userDetails,
      saveUserDetails,
      editName,
      nameEditable,
      getUpdatedName,
      editProfileImage
    } = props;

    const myInput = useRef();

    const editNameAndFoucs = () => {
      myInput.current && myInput.current.focus();
      editName();
    }

    return(
        <>
        <View>
          <View style={styles.header}>
            <TouchableOpacity onPress={backToProfile}>
                <Image resizeMode={'contain'} style={styles.backIcon} source={require('../../../assets/back1.png')} />
            </TouchableOpacity>
            <Text style={styles.homeText}>{EDIT_PROFILE}</Text>
            <Text>{' '}</Text>    
          </View>
          <View style={{ height: height / 1.2, marginTop:30 }}>
            <Animated.View style={styles.animatedView}>
              <View style={styles.profileContainer}>
                {userDetails.profileImage === "" ? (
                    <Image resizeMode={'contain'} style={styles.profileImage} source={require('../../../assets/place-holder.png')} />
                    ) : (<Image resizeMode={'contain'} style={styles.profileImage} source={{ uri: userDetails.profileImage}} />)
                  }
              </View>
              <TouchableOpacity onPress={editProfileImage} hitSlop={styles.hitSlopProperty}>
                <Image resizeMode={'contain'} style={styles.editProfileIcon} source={require('../../../assets/edit-profile.png')} />
              </TouchableOpacity>
            </Animated.View>
            <Animated.View style={styles.mainArea}>
              <View
                style={styles.lineBlock}
              />
              <View style={{ flexDirection: 'column'}}>
                <View style={styles.nameEditSection}>
                  {!nameEditable ? 
                    (<Text style={styles.editFirstLastName}>
                      {userDetails && userDetails.firstName} {userDetails && userDetails.lastName} 
                      </Text>) :
                    (<TextInput
                      style={{ height: 40, borderColor: '#183650', borderWidth: 1 }}
                      editable
                      placeholderTextColor={'black'}
                      onChangeText={getUpdatedName}
                      value={`${userDetails.firstName.trim()} ${userDetails.lastName.trim()}`}
                      ref={myInput}
                      autoFocus={true} 
                    />) }
                  <TouchableOpacity onPress={editNameAndFoucs} >
                    <Image resizeMode={'contain'} style={styles.editIconMain} source={require('../../../assets/edit.png')} />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={editNameAndFoucs}>
                    <Text style={{ color: '#014b91'}}>{EDIT_TEXT}</Text>
                  </TouchableOpacity>
              </View>
              <View
                  style={styles.lineBlock}
                />
              <Text style={styles.emailEdit}> {userDetails && userDetails.email} </Text>
              <View
                style={styles.lineBlock}
              />
              </View>
            </Animated.View>
            <TouchableOpacity
              style={styles.save}
              underlayColor='#fff'
              onPress={saveUserDetails}>
              <Image resizeMode={'contain'} style={styles.saveImg} source={require('../../../assets/save.png')} />
            </TouchableOpacity>
            <Text style={styles.helpSection}>
              <Text style={styles.needHelp}>{NEED_HELP} </Text>
              <Text style={styles.contactUs}>{CONTACT_US}</Text>
            </Text>
          </View>
        </View>
        </>
    )
}

export default EditProfile;

const styles = StyleSheet.create({
  profileContainer: {
    width: 100,
    height: 100,
    borderRadius: 100/2,
    position: 'relative',
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  needHelp: {
    color: '#7f7f7f',
    textAlign: 'center',
    fontSize: 15
  },
  contactUs: {
    color: '#183650',
    textAlign: 'center',
    fontSize: 15,
    fontWeight: "bold",
    textDecorationLine: 'underline'
  },
  editFirstLastName : {
    color: '#545454',
    fontSize: 20,
    fontWeight: '600'
  },
  header: {
    backgroundColor: '#EBECED',
    flexDirection: 'row',
    alignItems: 'center',
    height: 40,
    justifyContent: 'space-between'
  },
  homeText: {
    color: '#193550',
    fontSize: 20,
    fontWeight: '600',
    marginRight: 75
  },
  backIcon: {
    width: 75,
    height: 75,
    marginTop: 15
  },
  profileImage: {
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: '150%',
    minHeight: '150%'
  },
  animatedView: {
    height: height / 4,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative'
  },
  mainArea: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative'
  },
  nameEditSection: {
    width: 300,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding:10
  },
  editIconMain: {
    width: 18,
    height: 15,
    marginLeft: 52
  },
  emailEdit: {
    color: '#000000',
    fontSize: 20,
    fontWeight: '600',padding:10
  },
  save: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative'
  },
  saveText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: "bold"
  },
  helpSection : {
    textAlign: 'center', marginTop: 25
  },
  lineBlock: {
    backgroundColor: '#9d9d9d',
    height: 2,
    width: 300
  },
  saveImg: {
    width: 200,
    height: 50,
    marginTop: 50
  },
  editProfileIcon: {
    width:  40,
    height: 40,
    marginLeft: 140,
    marginTop: -20
  },
  hitSlopProperty: {
    top: 20, bottom: 20, left: 50, right: 40
  }
});