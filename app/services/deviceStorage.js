import { AsyncStorage } from 'react-native';

const deviceStorage = {

     _storeData : async (key, value,cb) => {
        try {
          const getdata = await AsyncStorage.setItem(key, value);
          cb({success : true, errorMessage : '' , data : getdata});
        } catch (error) {
             cb({success : false, errorMessage : error.message , data : '' });
        }
      },
      _retrieveData : async (key,cb)=> {
        try {
          const value = await AsyncStorage.getItem(key);
          if (value !== null) {
             cb({success : true, errorMessage : '' , data :  value });
          }
        } catch (error) {
            cb({success : false, errorMessage : error.message , data : '' });
        }
      },
      _removeData : async (key,cb) => {
        try {
          const value = await AsyncStorage.removeItem(key);
          cb({success : true, errorMessage : '' , data : value });
        } catch (error) {
           cb({success : false, errorMessage : error.message , data : '' });
        }
      }
};

export default deviceStorage;