import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image, Dimensions, Button } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Animated from 'react-native-reanimated';
const { width, height } = Dimensions.get('window');
import { Camera } from 'expo-camera';
import * as Permissions from 'expo-permissions';
import { FontAwesome, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import firebase from '../../auth/Firebase';
import { getProfileDetails, getLoggedInUserId } from '../../network/getProfileData';
import { onSelect } from '../afterLogin/profile';
import Loader from '../../components/shared/loader';

export default class cameraPage extends Component {
    constructor(props) {
        super(props);
    }

    state = {
        hasCameraPermission: null,
        type: Camera.Constants.Type.front,
        previewUri: undefined,
        imagePreviewDismiss: false,
        visible: false,
        loading: false,
        userDetails: {}
    }

    async componentWillMount() {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({ hasCameraPermission: status === 'granted' });
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

    snap = async () => {
        this.setState({ loading: true });
        if (this.camera) {
            let options = {
                base64: true
            }
            await this.camera.takePictureAsync(options).then(photo => {
                this.setState({ previewUri: photo.uri });
                this.setState({ loading: false });
            })
        }
    };

    pickImageFromGallery = async () => {

        this.setState({ loading: true });

        await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
        }).then(result => {
            this.setState({ previewUri: result.uri });
            this.setState({ loading: false });
        })

    }

    uploadProfileImage = async () => {

        let that = this;
        this.setState({ loading: true });

        var storageRef = firebase.storage().ref(`/files/userProfileImage/` + this.state.userDetails.uid + `/profilePicture.jpg`);

        var metadata = {
            contentType: 'image/jpeg'
        };

        const response = await fetch(this.state.previewUri);
        const blob = await response.blob();
        var uploadTask = await storageRef.put(blob, metadata);

        uploadTask.task.on('state_changed',
            function (snapshot) {
                var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                switch (snapshot.state) {
                    case firebase.storage.TaskState.PAUSED:
                        break;
                    case firebase.storage.TaskState.RUNNING:
                        break;
                }
            }, function (error) {
                switch (error.code) {
                    case 'storage/unauthorized':
                        break;

                    case 'storage/canceled':
                        break;

                    case 'storage/unknown':
                        break;
                }
            }, function () {
                uploadTask.task.snapshot.ref.getDownloadURL().then(function (downloadURL) {
                    that.updateProfileDetails(downloadURL);
                });
            });
    }

    updateProfileDetails = async (downloadURL) => {
        firebase.firestore().
            collection('users').doc(this.state.userDetails.uid).update({
                profileImage: downloadURL
            }).then(() => {
                this.props.navigation.goBack();
            }).catch((error) => {
                console.log(`here is the error ${error}`);
            });
    }

    cancelImagePreview = async () => {
        this.setState({ previewUri: undefined });
        this.setState({ loading: false });
    }

    render() {

        const { loading } = this.state;

        const { hasCameraPermission } = this.state;
        if (this.state.previewUri) {
            return <View style={styles.viewDiv}>
                <Image source={{ uri: this.state.previewUri }} style={styles.previewImage} />
                <View style={styles.imageView}>

                    <TouchableOpacity onPress={this.cancelImagePreview}
                        style={styles.previewCancel}>
                        <FontAwesome
                            name="times-circle"
                            style={styles.cancel}
                        />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={this.uploadProfileImage}
                        style={styles.previewConfirm}>
                        <FontAwesome
                            name="check-circle"
                            style={styles.yes}
                        />
                    </TouchableOpacity>
                </View>
                <Loader loading={loading} />
            </View>
        }
        if (hasCameraPermission === null) {
            return <View />;
        } else if (hasCameraPermission === false) {
            return <Text>No access to camera granted.</Text>
        } else {
            return (
                <View style={styles.viewDiv}>
                    <Camera style={styles.camera} type={this.state.type} ref={ref => {
                        this.camera = ref;
                    }}>
                        <Loader loading={loading} />
                        <View style={styles.cameraOptions}>

                            <TouchableOpacity onPress={this.pickImageFromGallery}
                                style={styles.galleryButton}>
                                <Ionicons
                                    name="ios-photos"
                                    style={styles.galleryIcon}
                                />
                            </TouchableOpacity>

                            <TouchableOpacity onPress={this.snap}
                                style={styles.cameraButton}>
                                <FontAwesome
                                    name="camera"
                                    style={styles.cameraIcon}
                                />
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => {
                                this.setState({
                                    type: this.state.type === Camera.Constants.Type.back
                                        ? Camera.Constants.Type.front
                                        : Camera.Constants.Type.back
                                });
                            }}
                                style={styles.switchButton}>
                                <MaterialCommunityIcons
                                    name="camera-switch"
                                    style={styles.switchIcon}
                                />
                            </TouchableOpacity>
                        </View>
                    </Camera>
                </View>
            )
        }

    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    switchIcon: {
        color: "#fff",
        fontSize: 40
    },
    cameraIcon: {
        color: "#fff", 
        fontSize: 40
    },
    galleryIcon: {
        color: "#fff", 
        fontSize: 40
    },
    switchButton: {
        alignSelf: 'flex-end',
        alignItems: 'center',
        backgroundColor: 'transparent'
    },
    cameraButton: {
        alignSelf: 'flex-end',
        alignItems: 'center',
        backgroundColor: 'transparent'
    },
    galleryButton: {
        alignSelf: 'flex-end',
        alignItems: 'center',
        backgroundColor: 'transparent'
    },
    cameraOptions: { 
        flex: 1, 
        flexDirection: "row", 
        justifyContent: "space-between", 
        margin: 20 
    },
    camera: {
        flex: 1, 
        height: height
    },
    previewCancel: {
        alignSelf: 'flex-end',
        alignItems: 'center',
        backgroundColor: 'transparent'
    },
    previewConfirm: {
        alignSelf: 'flex-end',
        alignItems: 'center',
        backgroundColor: 'transparent',
    },
    cancel: { 
        color: "#183650", 
        fontSize: 60
    },
    yes: { 
        color: "#183650", 
        fontSize: 60 
    },
    previewImage: { 
        width: width / 1.1, 
        height: height / 2.0, 
        margin: 20 
    },
    imageView: { 
        flex: 1, 
        flexDirection: "row", 
        justifyContent: "space-between", 
        margin: 20 
    },
    viewDiv: { 
        flex: 1 
    }
});