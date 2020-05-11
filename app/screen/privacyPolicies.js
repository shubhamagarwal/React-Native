import React, { Component } from 'react';
import { Button, View, Text, StyleSheet, Dimensions, TextInput, Image, TouchableOpacity } from 'react-native';

import Animated, { Easing } from 'react-native-reanimated';
import { TapGestureHandler, State } from 'react-native-gesture-handler';

const { width, height } = Dimensions.get('window');
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default class privacyPolicies extends Component {

    render() {
        return (
<KeyboardAwareScrollView>
            <View>

                <View style={{
                    backgroundColor: '#EBECED',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: 40
                }}>
                    <Text style={{ color: '#183650', fontSize: 20, fontWeight: '600' }}>Privacy Policy</Text>
                </View>

                <View style={{ justifyContent: 'center' }}>

                    <Text style={{ color: '#183650', fontSize: 16, fontWeight: '300', padding: '2%' }}>
                        Flake Technologies built the Flake app as an Ad Supported, freemium app. This SERVICE is provided
                        by Flake Technologies at no cost and is intended for use as is.
             </Text>
                    <Text style={{ color: '#183650', fontSize: 16, fontWeight: '300', padding: '2%' }}>
                        This page is used to inform visitors regarding our policies with the collection, use, and disclosure of
                        Personal Information if anyone decided to use our Service.
             </Text>
                    <Text style={{ color: '#183650', fontSize: 16, fontWeight: '300', padding: '2%' }}>
                        If you choose to use our Service, then you agree to the collection and use of information in relation
                        to this policy. The Personal Information that we collect is used for providing and improving the
                        Service. We will not use or share your information with anyone except as described in this Privacy
                        Policy.
             </Text>

                    <Text style={{ color: '#183650', fontSize: 16, fontWeight: '300', padding: '2%' }}>
                        The terms used in this Privacy Policy have the same meanings as in our Terms and Conditions,
                        which is accessible at Flake unless otherwise defined in this Privacy Policy.
             </Text>
                    <Text style={{ color: '#183650', fontSize: 16, fontWeight: '300', padding: '2%' }}>

                    </Text>
                    <Text style={{ color: '#183650', fontSize: 18, fontWeight: 'bold', padding: '2%' }}>
                        Information Collection and Use
</Text>
                    <Text style={{ color: '#183650', fontSize: 16, fontWeight: '300', padding: '2%' }}>
                        For a better experience, while using our Service, we may require you to provide us with certain
                        personally identifiable information, including but not limited to email, name, photo. The information
                        that we request will be retained by us and used as described in this privacy policy.
</Text>
                    <Text style={{ color: '#183650', fontSize: 16, fontWeight: '300', padding: '2%' }}>
                        The app does use third party services that may collect information used to identify you.
</Text>
                    <Text style={{ color: '#183650', fontSize: 16, fontWeight: '300', padding: '2%' }}>
                        Link to privacy policy of third party service providers used by the app.
</Text>
                    <Text style={{ color: '#183650', fontSize: 16, fontWeight: '300', padding: '2%' }}>
                        Google Play Service
                    </Text>
                    <Text style={{ color: '#183650', fontSize: 18, fontWeight: 'bold', padding: '2%' }}>
                    Log Data
</Text>

<Text style={{ color: '#183650', fontSize: 16, fontWeight: '300', padding: '2%' }}>
We want to inform you that whenever you use our Service, in a case of an error in the app we collect
data and information (through third party products) on your phone called Log Data. This Log Data
may include information such as your device Internet Protocol (“IP”) address, device name, operating
system version, the configuration of the app when utilizing our Service, the time and date of your use
of the Service, and other statistics.
                    </Text>
                    <Text style={{ color: '#183650', fontSize: 18, fontWeight: 'bold', padding: '2%' }}>
                    Cookies
</Text>
                    <Text style={{ color: '#183650', fontSize: 16, fontWeight: '300', padding: '2%' }}>
                    Cookies are files with a small amount of data that are commonly used as anonymous unique
identifiers. These are sent to your browser from the websites that you visit and are stored on your
device&#39;s internal memory.
                    </Text>
                    <Text style={{ color: '#183650', fontSize: 16, fontWeight: '300', padding: '2%' }}>
                    This Service does not use these “cookies” explicitly. However, the app may use third party code and
libraries that use “cookies” to collect information and improve their services. You have the option to
either accept or refuse these cookies and know when a cookie is being sent to your device. If you
choose to refuse our cookies, you may not be able to use some portions of this Service.
                    </Text>  

                                        <Text style={{ color: '#183650', fontSize: 18, fontWeight: 'bold', padding: '2%' }}>
                                        Service Providers
</Text>               
<Text style={{ color: '#183650', fontSize: 16, fontWeight: '300', padding: '2%' }}>
We may employ third-party companies and individuals due to the following reasons:
                    </Text>  
                    <View style={{flexDirection: 'row'}}>

      <Text style={{flex: 1, paddingLeft: '2%', color: '#183650', fontSize: 16}}>{`\u2022`}To facilitate our Service;</Text>
    </View>
    <View style={{flexDirection: 'row'}}>
    <Text style={{flex: 1, paddingLeft: '2%', color: '#183650', fontSize: 16}}>{`\u2022`}To provide the Service on our behalf;</Text>
        </View>
        <View style={{flexDirection: 'row'}}>
      <Text style={{flex: 1, paddingLeft: '2%', color: '#183650', fontSize: 16}}>{`\u2022`}To perform Service-related services;</Text>
        </View>
        <View style={{flexDirection: 'row'}}>
      <Text style={{flex: 1, paddingLeft: '2%', color: '#183650', fontSize: 16}}>{`\u2022`}To assist us in analyzing how our Service is used.</Text>
        </View>
        <Text style={{ color: '#183650', fontSize: 16, fontWeight: '300', padding: '2%' }}>
        We want to inform users of this Service that these third parties have access to your Personal
Information. The reason is to perform the tasks assigned to them on our behalf. However, they are
obligated not to disclose or use the information for any other purpose.
                    </Text>  
                    <Text style={{ color: '#183650', fontSize: 18, fontWeight: 'bold', padding: '2%' }}>
                                        Security
</Text>               
<Text style={{ color: '#183650', fontSize: 16, fontWeight: '300', padding: '2%' }}>
We value your trust in providing us your Personal Information, thus we are striving to use
commercially acceptable means of protecting it. But remember that no method of transmission over
the internet, or method of electronic storage is 100% secure and reliable, and we cannot guarantee
its absolute security.
                    </Text>
                    <Text style={{ color: '#183650', fontSize: 18, fontWeight: 'bold', padding: '2%' }}>
                    Links to Other Sites
</Text>               
<Text style={{ color: '#183650', fontSize: 16, fontWeight: '300', padding: '2%' }}>
This Service may contain links to other sites. If you click on a third-party link, you will be directed to
that site. Note that these external sites are not operated by us. Therefore, we strongly advise you to
review the Privacy Policy of these websites. We have no control over and assume no responsibility
for the content, privacy policies, or practices of any third-party sites or services.
                    </Text>
                    <Text style={{ color: '#183650', fontSize: 18, fontWeight: 'bold', padding: '2%' }}>
                    Children’s Privacy
</Text>          

<Text style={{ color: '#183650', fontSize: 16, fontWeight: '300', padding: '2%' }}>
These Services do not address anyone under the age of 13. We do not knowingly collect personally
identifiable information from children under 13. In the case we discover that a child under 13 has
provided us with personal information, we immediately delete this from our servers. If you are a
parent or guardian and you are aware that your child has provided us with personal information,
please contact us so that we will be able to do necessary actions.
                    </Text>
                    <Text style={{ color: '#183650', fontSize: 18, fontWeight: 'bold', padding: '2%' }}>
                    Changes to This Privacy Policy
</Text>  
<Text style={{ color: '#183650', fontSize: 16, fontWeight: '300', padding: '2%' }}>
We may update our Privacy Policy from time to time. Thus, you are advised to review this page
periodically for any changes. We will notify you of any changes by posting the new Privacy Policy on
this page. These changes are effective immediately after they are posted on this page.
                    </Text>       
                    <Text style={{ color: '#183650', fontSize: 18, fontWeight: 'bold', padding: '2%' }}>
                    Contact Us
</Text>   
<Text style={{ color: '#183650', fontSize: 16, fontWeight: '300', padding: '2%' }}>
If you have any questions or suggestions about our Privacy Policy, do not hesitate to contact us at
help@flaketechnologies.com.
                    </Text> 
                </View>


            </View>
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
    button: {
        height: 60,
        marginHorizontal: 50,
        borderRadius: 35,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 8,
        shadowOffset: { width: 2, height: 2 },
        shadowColor: 'black',
        shadowOpacity: 0.2
    },
    buttonText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff'
    },
    forgotText: {
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 20
    }

});