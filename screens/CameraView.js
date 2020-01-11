import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';
import { clockInRequest } from '../actions/ClockInActions';

export default function CameraView() {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }

  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <Camera style={{ flex: 1 }} type={Camera.Constants.Type.front}>
      <View
        style={{
          flex: 1,
          backgroundColor: 'transparent',
          flexDirection: 'row',
        }}>
        <TouchableOpacity
          style={{
            flex: 0.5,
            alignSelf: 'flex-end',
            alignItems: 'center',
          }}
          onPress={(image) => {
            // console.log('test');
            clockInRequest(image);
          }}>
          <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}> Clock In </Text>
        </TouchableOpacity>
      </View>
    </Camera>
  );
}
