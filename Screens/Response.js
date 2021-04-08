
// Comletely for testing purpose

import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, View, Item } from 'react-native';
import Axios from 'axios';
import App from '../App';

export default Response = () => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    Axios.get('http://api.geonames.org/findNearbyPlaceNameJSON?lat=23.0225&lng=72.5715&style=short&cities=cities15000&radius=30&maxRows=30&username=udaykh')
      .then(({ data }) => {
        console.log("defaultApp -> data", data.geonames)
        setData(data.geonames)
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);
  
  const ItemView = ({item}) => {
      console.log(item);
    return (
      // FlatList Item
      <View>
        <Text
          onPress={() => getItem(item)}>
          {item.name}
        </Text>
      </View>
    );
  };
  return (
    <View style={{ flex: 1, padding: 24 }}>
    <Text>Uday</Text>
      {isLoading ? <ActivityIndicator /> : (
        <FlatList
          data={data}
          keyExtractor={(item, index) => {
            // console.log("index", index)
            return index.toString();
          }}
          renderItem={ItemView}
        />
      )}
    </View>
  );
};

