import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

import ExtraerUbicacion from './components/ExtraerUbicacion';
import UsersMap from './components/UsersMap';
import AlertaOffline from './components/AlertaOffline';


export default class App extends React.Component {
  state = {
    userLocation: null,
    usersPlaces: [],
    isConnected : true
  }

  getUserLocationHandler = () =>{
    navigator.geolocation.getCurrentPosition(position => {
      this.setState({
        userLocation:{
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.0422,
          longitudeDelta: 0.0221
        }
      });
      fetch('https://helloreactnative-213000.firebaseio.com/lugares.json',{
        method: 'POST',
        body: JSON.stringify({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        })
      })
      .then(res => console.log(res))
      .catch(err => console.log(err));
    }, error => console.log(err));
  }

  getUserPlacesHandler = () =>{
    fetch('https://helloreactnative-213000.firebaseio.com/lugares.json')
      .then(res => res.json())
      .then(parsedRes =>{
        const placesArray = [];

        for(const key in parsedRes)
        {
          placesArray.push({
            latitude: parsedRes[key].latitude,
            longitude: parsedRes[key].longitude,
            id: key
          })
        }
        this.setState({
          usersPlaces : placesArray
        });
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <View style={styles.container}>
        <AlertaOffline/>
        <Text>Cual es tu ubicacion?</Text>
        <ExtraerUbicacion onExtraerUbicacion={this.getUserLocationHandler}/>
        <UsersMap userLocation={this.state.userLocation} usersPlaces={this.state.usersPlaces} />
        <View style={{marginTop: 20}}>
          <Button title="Obtener Lugares" onPress={this.getUserPlacesHandler} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
