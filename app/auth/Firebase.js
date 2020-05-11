import * as firebase from 'firebase';
import firestore from 'firebase/firestore'
import { config } from '../config/firebaseConfig'

const settings = {timestampsInSnapshots: true};

firebase.initializeApp(config);

export default firebase;