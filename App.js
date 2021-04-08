/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React,{useEffect} from 'react';
import {
  View,
} from 'react-native';
import AutoComplete from './Screens/AutoComplete'
import Location from './Screens/location'


const App = () => {

  return (
    <View>
        <AutoComplete/>
        {/* <Location /> */}
    </View>
    
  );
};

export default App;
