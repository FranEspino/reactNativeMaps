import {View, StyleSheet, Image, Text, Button} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import Fab from '../components/Fab';
import {colorPrimary} from '../assets/colors';
import {usePermission} from '../hooks/usePermission';
import {useSelector} from 'react-redux';
import {
  InterstitialAd,
  AdEventType,
  TestIds,
  BannerAd,
  BannerAdSize,
} from 'react-native-google-mobile-ads';

const MapScreen = nativeStack => {

  const [loaded, setLoaded] = useState(false);
  const [banner, setBanner] = useState(false);
  const {locations} = useSelector(state => state.locations);
  const {currentLocation} = usePermission();
  const mapViewRef = useRef(null);

  const interstitial = InterstitialAd.createForAdRequest(TestIds.INTERSTITIAL, {
    requestNonPersonalizedAdsOnly: true,
  });
  interstitial.load();

  useEffect(() => {
    const unsubscribe = interstitial.addAdEventListener(
      AdEventType.LOADED, () => {
      setLoaded(true);
      console.log(interstitial)
    });
    
    if(!interstitial){
      interstitial.load();
    }
    return unsubscribe;
  }, []);

  return (
    <>
      <View style={{width: '100%', height: banner ? '90%' : '100%'}}>
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
              {locations.map(location => (
                <Marker
                  draggable={true}
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
              ))}
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
                  interstitial.load();
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
                onPress={() => {
                  if (loaded) {
                  //  interstitial.show();
                  } else {
//interstitial.show();

                    //nativeStack.navigation.navigate('SavelocationsScreen');
                  }
                }}
              />
            </View>
          </>
        )}
      </View>
      <BannerAd
        unitId={TestIds.BANNER}
        size={BannerAdSize.ADAPTIVE_BANNER}
        requestOptions={{
          requestNonPersonalizedAdsOnly: true,
        }}
        onAdLoaded={() => {
          setBanner(true);
        }}
        onAdFailedToLoad={error => {
          setBanner(false);
        }}
      />
    </>
  );
};

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default MapScreen;
