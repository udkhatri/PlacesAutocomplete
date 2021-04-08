import React, {useState} from 'react';
import { Text, View, ScrollView, Input, StyleSheet, FlatList, ActivityIndicator, Button, Alert } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import Geolocation from '@react-native-community/geolocation'
import FetchLoc from './FetchLocc'
navigator.geolocation = require('@react-native-community/geolocation');

const AutoComplete = () => {

    const[placeId, setPlaceId] = useState('')
    const[placeFullname, setPlaceFullname] = useState('')
    const[placeName, setPlaceName] = useState('')
    const[placeDistict, setPlaceDistict] = useState('')
    const[listViewDisplayed, setlistViewDisplayed] = useState(false)
    const [loader, setLoader] = useState(false)
    const [SearchText , setSearchText] = useState('');
    console.log(loader);
    console.log(listViewDisplayed);
  return (
      <View>
            {/* HIDING LIST VIEW ON TYPING */}
            {SearchText ? <ActivityIndicator /> : (
           <FetchLoc />
            )}
            <View style={styles.panel }>
         <View style={[styles.panelHeader,
                        listViewDisplayed? styles.panelFill:styles.panel,]}></View>
                        <GooglePlacesAutocomplete
                            placeholder='Search for cities'
                            autoFocus={false}
                            textInputProps={{ 
                            onChangeText: (text) => {
                                console.log(text);
                                setSearchText(text)
                                 if(text !== null){
                                    setLoader(true)
                                 }else if(text === ''){
                                     setLoader(false)
                                 }
                                },
                               
                            }}
                            styles={{
                                description: {
                                    backgroundColor:'#ccc',color:'#000',padding:10,width:'100%', alignSelf:'center'
                                },
                              
                                predefinedPlacesDescription: {
                                    color: "black",
                                    },
                                listView: {
                                   position: "absolute",
                                    marginTop: 44,
                                    backgroundColor:"white",
                                    borderBottomEndRadius: 15,
                                    elevation:2
                                    }}}
                            onPress={(data) => {
                                // 'details' is provided when fetchDetails = true
                                setlistViewDisplayed(true)
                                console.log(data);
                                Alert.alert(data.structured_formatting.main_text)
                                setPlaceName(data.structured_formatting.main_text)
                                setPlaceDistict(data.structured_formatting.secondary_text)
                                setPlaceId(data.place_id)
                                setPlaceFullname(data.description)
                            }}
                            query={{
                                // KEY HERE
                                key: //'Key value',
                                language: 'en',
                                types: '(cities)',
                                // components: 'country:in'
                            }}
                            
                            enablePoweredByContainer={false}
                            //fetchDetails = {true}
                    
                        />
                         
                    </View>
                   
                {/* 
                    --------- FOR TESTING PURPOSE ----------
                    <View style={styles.Container}>
                    <Text style={styles.Loc}>DETAILS OF SELECTED CITY</Text>
                    <Text style={styles.TextBox}>Place id: {placeId}</Text>
                    <Text style={styles.TextBox}>City full name: {placeFullname}</Text>
                    <Text style={styles.TextBox}>City Name: {placeName}</Text>
                    <Text >Distict and country: {placeDistict}</Text>
                    <Button
                        title="Press me"
                        onPress={() => Alert.alert('Simple Button pressed')}
                    />
                </View> */}
                
            </View>
            
  );
};

const styles= StyleSheet.create({
    TextBox:{
        paddingBottom:10
    },
    Container:{
        borderRadius: 6,
        borderWidth:2,
        borderColor: '#666',
        padding:5,
        margin:5,
        marginBottom:20,
    },
    Loc:{
        fontSize:18,
        fontWeight: 'bold',
        color:'#666',
        alignSelf: 'center'
    },
    panelFill: {
     position: "absolute",
     top: 0,
     alignSelf: "stretch",
     right: 0,
     left: 0,
    },
    panel: {
     position: "absolute",
     top: 0,
     alignSelf: "stretch",
     right: 0,
     left: 0,
     flex: 1,
     height: '100%'
    },
})
export default AutoComplete;