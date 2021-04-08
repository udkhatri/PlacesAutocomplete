import React,{useState, useEffect} from 'react';
import { Text, View,StyleSheet, Button, FlatList, ActivityIndicator,PermissionsAndroid, Alert, Dimensions, TouchableOpacity } from 'react-native';
import Geolocation from '@react-native-community/geolocation'
import axios from 'axios';

const windowWidth = Dimensions.get('window').width;

const FetchLoc = () => {
    const [latitude, setLatitude] = useState('');
    const [longitude, setlongitude] = useState('');
    const [response, setResponse] = useState([]);
    const [loader, setLoader] = useState(true)
    
    const locationData= async ()=>{

            Geolocation.getCurrentPosition(data=> {
            setLatitude(data.coords.latitude)
            //setAltitude(data.coords.altitude)
            setlongitude(data.coords.longitude)
            console.log(data);
            setLoader(false);
            
            },
            (err)=> {console.log(err);}
            )
          
            //GetNearCity()
    }

    // For requesting location on butten press 
    const requestLocation = async () => {
        try {
            const granted = await PermissionsAndroid.request(
              PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
              );
              if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log("Permission allowed");
                locationData();
                GetNearCity();
              } else {
                console.log("Permission denied");
              }
        } catch (err) {
          console.warn(err);
        }
        finally{
            console.log('finaly');
            //console.log(requestLocation);
        }
      };
    
    useEffect(() => {
       // requestLocation();
       PermissionsAndroid.check( PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,)
       .then(response => {
            if (response === true){
                console.log('permission is granted');
                locationData();
                GetNearCity();
            }
            else if (response === false){
                console.log('permission is not granted');
            }
        })
       
            //As useEffect is Asynchronous passing altitude and longitude to reflect change when these variable changes it's value
      },[latitude, longitude]);
      
     const GetNearCity = ()=>{
            
            //console.warn('pressed');

            /*  ---details about props of geoname API---
            cities= population of city
            radius= km of area around location
            row= max row to retrive
            username= username of account created on geoName
            */

            //  For static data \/
            //  axios.get('http://api.geonames.org/findNearbyPlaceNameJSON?lat=22.9496&lng=72.5986&style=short&cities='+'cities15000'+'&radius=60&maxRows=30&username=udaykh')
          axios.get('http://api.geonames.org/findNearbyPlaceNameJSON?lat='+`${latitude}`+'&lng='+`${longitude}`+'&style=short&cities='+'cities15000'+'&radius=60&maxRows=30&username=udaykh')
          .then(({ data }) => {
              //console.log("defaultApp -> data", data.geonames)
              setResponse(data.geonames)
          })
          .catch((error) => console.error(error))
          .finally(() => {
              console.log(loader);
              setLoader(false); 
              console.log(loader);
       });
         
     }

      const ItemView = ({item}) => {
      return (
        // FlatList Item
        <View  
            style={styles.TextBox} >
          <Text onPress={()=> Alert.alert(item.name , (item.geonameId).toString())} style={styles.Text}>
            {item.name}, India
          </Text>
        </View>
      );
    };
    
    return(
    <View style={styles.Button}>
        {/*
            // for testing purpose to show fetched data

            <View style={styles.Container}>
            <Text style={styles.Loc}>CURRENT LOCATION</Text>
            <Text style={styles.TextBox}>current Latitude: {latitude} </Text>
            <Text style={styles.TextBox}>current altitude: {altitude}</Text>
            <Text>current longitude: {longitude}</Text>
        </View> */}

        <TouchableOpacity onPress={requestLocation} style={{marginTop:50, paddingLeft:10, fontSize:20}}>
            <Text>Use current location</Text>
        </TouchableOpacity>
                   
        {/*{loader ? <ActivityIndicator /> : ( */}
       
        <FlatList
        
          style={{marginTop:10}}
          data={response}
          keyExtractor={(item, index) => {
            // console.log("index", index)
            return index.toString();
          }}
          renderItem={ItemView}
        />
      {/* )} */}
    </View>
);
}

const styles= StyleSheet.create({
    TextBox:{
        marginTop: 20,
        backgroundColor:"white",

    },
    Text:{
        backgroundColor:'#ccc',
        color:'#000',
        padding:10,
        width:windowWidth-15, 
        alignSelf:'center',
    },
    Container:{
        borderRadius: 6,
        borderWidth:2,
        borderColor: '#666',
        padding:5,
        margin:5,
        marginBottom:20
    },
    Loc:{
        fontSize:18,
        fontWeight: 'bold',
        color:'#666',
        alignSelf: 'center'
    },
    Button:{
        marginBottom:40
    }
})
export default FetchLoc;
