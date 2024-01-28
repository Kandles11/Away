import { Text, View } from 'tamagui'
import React, { useState, useEffect } from 'react';
import { Button, Image, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { H1, H2, H3, H4, H5, H6, Heading, XStack,  Paragraph,  ScrollView } from 'tamagui'


export default function TabTwoScreen() {

    const [image, setImage] = useState(null);

    const openCamera = async () => {
        // Ask the user for the permission to access the camera
        const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

        if (permissionResult.granted === false) {
            alert("You've refused to allow this app to access your camera!");
            return;
        }

        const result = await ImagePicker.launchCameraAsync();

        // Explore the result
        console.log(result);

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    }

        const pickImage = async () => {
            // No permissions request is necessary for launching the image library
            let result = await ImagePicker.launchCameraAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });

            console.log(result);

            if (!result.canceled) {
                setImage(result.assets[0].uri);
            }
        };

        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <H4>Hey Mason,</H4>
                <H2>Let's get packed!</ H2>
                <Button title="Pick an image from camera roll" onPress={openCamera} />
                {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
            </View>
        )
    }
