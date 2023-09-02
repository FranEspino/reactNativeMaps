import {
  View,
  StyleSheet,
  Image,
  Platform,
  Alert,
  Text,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import {
  PERMISSIONS,
  check,
  openSettings,
  request,
} from 'react-native-permissions';
import {mapstyle} from '../assets/mapstyle';
import Icon from 'react-native-vector-icons/MaterialIcons';

const MapScreen = () => {
  const [currentLocation, setCurrentLocation] = useState({
    latitude: 0,
    longitude: 0,
  });

  useEffect(() => {
    checkLocationPermission();
  }, []);

  const mapViewRef = useRef(null);

  const getCurrentLocation = position => {
    setCurrentLocation({
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
    });
  };

  const checkLocationPermission = async () => {
    let permissionCheckStatus;
    if (Platform.OS == 'android') {
      permissionCheckStatus = await check(
        PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
      );
      if (permissionCheckStatus === 'denied') {
        askCheckPermission();
      }
      if (permissionCheckStatus === 'granted') {
        Geolocation.getCurrentPosition(position => {
          getCurrentLocation(position);
        });
      }
    }
  };

  const askCheckPermission = async () => {
    let permissionRequestStatus;
    if (Platform.OS == 'android') {
      permissionRequestStatus = await request(
        PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
      );
    }
    if (permissionRequestStatus === 'granted') {
      Geolocation.getCurrentPosition(position => {
        getCurrentLocation(position);
      });
    }
    if (permissionRequestStatus === 'blocked') {
      Alert.alert(
        'Permiso del gps denegado',
        'Por favor ingrese a la configuracion de la app y active los permisos de ubicacion',
        [
          {
            text: 'Cancel',
            onPress: () => checkLocationPermission(),
            style: 'cancel',
          },
          {
            text: 'OK',
            onPress: () => {
              openSettings();
            },
          },
        ],
      );
    }
  };

  return (
    <View style={{width: '100%', height: '100%'}}>
      {currentLocation.latitude === 0 && currentLocation.longitude === 0 ? (
        <Text>Cargando mapa ...</Text>
      ) : (
        <>
          <MapView
            ref={el => (mapViewRef.current = el)}
            zoomControlEnabled={false}
           // mapType="terrain"
            customMapStyle={mapstyle}
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
            <Marker
              identifier="Mi marcador 12"
              title="Este es un marcador"
              coordinate={{
                latitude: currentLocation.latitude,
                longitude: currentLocation.longitude,
              }}>
              <Image
                style={{width: 60, height: 60}}
                source={require('../assets/marker.png')}
              />
            </Marker>
          </MapView>
          <TouchableOpacity
            onPress={() => {
              const region = {
                latitude: currentLocation.latitude,
                longitude: currentLocation.longitude,
                latitudeDelta: 0.025,
                longitudeDelta: 0.021,
              };
              mapViewRef.current.animateToRegion(region);
            }}
            style={{
              width: 55,
              height: 55,
              position: 'absolute',
              bottom: 34,
              right: 12,
              borderColor: '#4527A0',
              borderWidth: 1,
              backgroundColor: '#C5CAE9',
              borderRadius: 30,
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 5,
            }}>
            <View
            style={{
                top: 12,
                left: 12,
            }}
            >
            <Icon  name="my-location" size={30} color="#000" />

            </View>

            </TouchableOpacity>
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
