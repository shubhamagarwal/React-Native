import axios from 'axios';
// import { config } from '../config/firebaseConfig'
export const config = {
  apiKey: "AIzaSyAyiwZOSfQb8VRbtvpoz4BY52fcbVDbs3M",
  authDomain: 'flake-qa.firebaseapp.com',
  databaseURL: 'https://flake-qa.firebaseio.com',
  projectId: 'flake-qa',
  storageBucket: 'flake-qa.appspot.com',
  messagingSenderId: '474269069571'
};

const { projectId } = config 

const BASE_URL = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents`
const SERVICE_TIME_OUT = 3000 

export const ApiClient = axios.create({
    baseURL: BASE_URL,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    timeout: SERVICE_TIME_OUT,
  })

export const AuthApiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'ACCESS-TOKEN': '',
  },
  timeout: SERVICE_TIME_OUT,
})
  

//Request Interceptor
ApiClient.interceptors.request.use(function (config) {
    // Do something before request is sent
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
});
 
//Response Interceptor
ApiClient.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  }, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
});  
