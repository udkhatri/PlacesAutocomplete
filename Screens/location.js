import React,{useState, useEffect} from 'react';
import { Text, View,StyleSheet, Button, FlatList, ActivityIndicator,PermissionsAndroid, Alert, Dimensions, TouchableOpacity } from 'react-native';
import Geolocation from '@react-native-community/geolocation'
import FetchLoc from './FetchLocc'

const Location = () => {
   const long= 'longi'
   const lat = 'lati'
   const [latitude, setLatitude] = useState('');
   const [longitude, setlongitude] = useState('');

    useEffect(()=>{
        Geolocation.getCurrentPosition(data=> {
            setLatitude(data.coords.latitude)
            setlongitude(data.coords.longitude)
            console.log(data);
            },
            (err)=> {console.log(err);}
            )
    })
        return(
            <View>
                <Text>{longitude}</Text>
                <FetchLoc long={longitude} lat={latitude} />
            </View>
        )
    }
        export default Location;