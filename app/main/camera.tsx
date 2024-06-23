import { Alert, Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useState, useRef } from 'react';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { useNavigation } from 'expo-router';
import OpenAI from "openai";

const api_key = 'sk-proj-RRaU29oFQPBxdrQ8A315T3BlbkFJ7LwKTCwpE1CRw1LohoIj';

//const api_key = null;

const openai = new OpenAI({apiKey: api_key});

export default function Camera() {
  const [facing, setFacing] = useState('back');
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef(null);
  const navigation = useNavigation();
  /*return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>2</Text>
    </View>
  );*/

  const takePicture = async () => {
    if (cameraRef.current) {
      const options = { quality: 0.5, base64: true };
      const data = await cameraRef.current.takePictureAsync(options);
      // console.log(data.base64);
      const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            role: "user",
            content: [
              { type: "text", text: "What food ingredients are in this image? Answer in list form like this: carrots, potatoes, pineapple, and so on" },
              {
                type: "image_url",
                image_url: {
                  "url": `data:image/jpeg;base64,${data.base64}`,
                }
              },
            ],
          },
        ],
      });
      navigation.navigate("start", {ingredients: response.choices[0].message.content});
      //navigation.navigate("start", {ingredients: "carrots potatoes banana"});
      //console.log(response.choices[0]);
      /*Alert.alert(
        "Picture Taken",
        response.choices[0].message.content,
        [
          { text: "OK", onPress: () => console.log("OK Pressed") }
        ],
        { cancelable: false }
      );*/
    }
  };

  

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }
  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }
  /*function toggleCameraFacing() {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  }*/

  return (
    <View style={styles.container}>
      <CameraView ref = {cameraRef} style={styles.camera} facing={'back'}>
      <View style={styles.buttonContainer}>
          <Button title="Take Picture" onPress={takePicture} />
        </View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    height: 70,
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
});
