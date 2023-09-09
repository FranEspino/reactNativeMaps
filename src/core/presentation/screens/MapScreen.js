import {
  View,
  StyleSheet,
  Image,
  Text
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {mapstyle} from '../assets/mapstyle';
import Fab from '../components/Fab';
import {colorPrimary} from '../assets/colors';
import {usePermission} from '../hooks/usePermission';

import {useSelector,useDispatch} from 'react-redux'
import { saveLocation } from '../redux/actions';
const MapScreen = (nativeStack) => {
  const {locations} = useSelector(state => state.locations)
  const {currentLocation} = usePermission();
  const mapViewRef = useRef(null);
  const dispatch = useDispatch()

useEffect(()=>{
  console.log(locations)
},[locations])

  return (
    <View style={{width: '100%', height: '100%'}}>
      {currentLocation.latitude === 0 && currentLocation.longitude === 0 ? (
        <Text>Cargando mapa ...</Text>
      ) : (
        <>
          <MapView
            ref={el => (mapViewRef.current = el)}
            zoomControlEnabled={false}
            mapType="terrain"
            // customMapStyle={mapstyle}
            showsUserLocation={true}
            showsMyLocationButton={false}
            provider={PROVIDER_GOOGLE}
            style={styles.map}
            region={{
              latitude: currentLocation.latitude,
              longitude: currentLocation.longitude,
              latitudeDelta: 0.025,
              longitudeDelta: 0.021,
            }}>
           {
            locations.map( location =>(
              <Marker
              key={location.title}
              identifier="Mi marcador 12"
              title={location.title}
              coordinate={{
                latitude: location.latitude,
                longitude: location.longitude,
              }}>
              <Image
                style={{width: 60, height: 60}}
                source={require('../assets/marker.png')}
              />
            </Marker>
            ))
            
           }
          </MapView>
          <View
            style={{
              position: 'absolute',
              bottom: 34,
              right: 12,
            }}>
            <Fab
              iconColor={'white'}
              iconName={'my-location'}
              style={{backgroundColor: colorPrimary}}
              onPress={() => {
                const region = {
                  latitude: currentLocation.latitude,
                  longitude: currentLocation.longitude,
                  latitudeDelta: 0.025,
                  longitudeDelta: 0.021,
                };
                mapViewRef.current.animateToRegion(region);
              }}
            />
          </View>
          <View
            style={{
              position: 'absolute',
              bottom: 94,
              right: 12,
            }}>
            <Fab
              iconColor={'white'}
              iconName={'add-location-alt'}
              style={{
                backgroundColor: colorPrimary,
              }}
              onPress={() => 
                 nativeStack.navigation.navigate('SavelocationsScreen')
              }
            />
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default MapScreen;
