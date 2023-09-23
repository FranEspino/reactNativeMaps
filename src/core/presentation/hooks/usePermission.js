import {useEffect, useState} from 'react';
import {
    PERMISSIONS,
    check,
    openSettings,
    request,
  } from 'react-native-permissions';
import Geolocation from 'react-native-geolocation-service';
import { Alert } from 'react-native';

export const usePermission = () => {
  const [currentLocation, setCurrentLocation] = useState({
    latitude: 0,
    longitude: 0,
  });

  useEffect(() => {
    checkLocationPermission();
  }, []);

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
            setCurrentLocation({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
              });
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
        setCurrentLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
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

  return {
    currentLocation
  }
};
