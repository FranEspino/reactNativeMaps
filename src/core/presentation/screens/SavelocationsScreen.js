import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import {usePermission} from '../hooks/usePermission';
import Fab from '../components/Fab';
import {colorPrimary} from '../assets/colors';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MyButtom from '../components/MyButtom';
import DialogInput from 'react-native-dialog-input';
import {useSaveLocation} from '../../domain/usecases/useSavelocation';

const SavelocationsScreen = nativeStack => {

  const [showalert, setShowAlert] = useState(false);
  const [cutomlocation, setCustomLocation] = useState({
    latitude: 0,
    longitude: 0,
  });

  useEffect(() => {}, [cutomlocation]);

  const {currentLocation} = usePermission();
  const {saveLocationRedux} = useSaveLocation();
  const mapViewRef = useRef(null);

  return (
    <View style={{width: '100%', height: '100%'}}>
      {currentLocation.latitude === 0 && currentLocation.longitude === 0 ? (
        <Text>Cargando mapa ...</Text>
      ) : (
        <>
          <MapView
            onRegionChangeComplete={region => {
              setCustomLocation({
                latitude: region.latitude,
                longitude: region.longitude,
              });
            }}
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
            }}></MapView>

          <DialogInput
            isDialogVisible={showalert}
            title={'Nueva ubicacion'}
            hintTextColor={"#000000"}
            hintInput={'Titulo del lugar'}
            submitText="Guardar"
            cancelText="Cancelar"
            submitInput={inputText => {
              setShowAlert(!showalert);
              saveLocationRedux({
                title: inputText,
                ...cutomlocation,
              });
            }}
            closeDialog={() => setShowAlert(!showalert)}></DialogInput>
          <Image
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              marginLeft: -30,
              marginTop: -56,
              width: 60,
              height: 60,
            }}
            source={require('../assets/marker.png')}
          />

          <View
            style={{
              backgroundColor: colorPrimary,
              width: '100%',
              height: 55,
              position: 'absolute',
              alignItems: 'center',
              flexDirection: 'row',
              top: 0,
            }}>
            <TouchableOpacity
              style={{marginLeft: 4}}
              onPress={() => nativeStack.navigation.goBack()}>
              <Icon name={'arrow-back'} color={'white'} size={26} />
            </TouchableOpacity>
            <Text
              style={{
                color: 'white',
                fontWeight: 'bold',
                fontSize: 22,
                marginLeft: 8,
              }}>
              Registrar lugar
            </Text>
          </View>
          <View
            style={{
              position: 'absolute',
              bottom: 94,
              right: 18,
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
              bottom: 34,
              width: '100%',
              alignItems: 'center',
            }}>
            <MyButtom
              onPress={() => {
                setShowAlert(true);
              }}
              name={'Establecer ubicacion'}
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

export default SavelocationsScreen;
