import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Button, Image, ActivityIndicator } from 'react-native';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import { COLORS } from '../../../../constants';
import MainButton from '../../../common/buttons/MainButton';
import SecondaryButton from '../../../common/buttons/SecondaryButton';
import AWS from 'aws-sdk';
import CustomAlert from '../../../common/alert/CustomAlert';
import { set } from 'mobx';

AWS.config.update({
    region: 'eu-central-1',
    accessKeyId: 'AKIA3OWYAJYHIJZ7VOXD',
    secretAccessKey: '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'
})

const s3 = new AWS.S3();

const uploadFileToS3 = async (bucketName, fileName, filePath) => {

    const params = {
        Bucket: bucketName,
        Key: fileName,
        Body: filePath
    };

    s3.upload(params, function (err, data) {
        if (err) {
            throw err;
        }
        console.log(`File uploaded successfully. ${data.Location}`);
    });
}

const circleContainerSize = 80;

const CameraWithButtons = ({ updateOrder }) => {
    const [hasPermission, setHasPermission] = useState(null);
    const [cameraRef, setCameraRef] = useState(null);
    const [photoUri, setPhotoUri] = useState(null);
    const [showAlert, setShowAlert] = useState(false);
    const [photoButtonPressed, setPhotoButtonPressed] = useState(false);
    useEffect(() => {
        const getCameraAccess = async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === 'granted');
        };
        getCameraAccess();

    }, []);

    const takePicture = async () => {
        setPhotoButtonPressed(true);
        if (!photoUri) {
            if (cameraRef) {
                const photo = await cameraRef.takePictureAsync();
                setPhotoUri(photo.uri);
            }
        } else {
            setPhotoUri(null);
        }
        setPhotoButtonPressed(false);
    };

    const processPicture = async () => {
        const bucketName = 'bloom-express-images';

        const filePath = photoUri;
        const fileName = 'test.jpg';

        let uploadSuccess = false;

        try {
            const fileData = await fetch(filePath).then(response => response.blob());
            // await uploadFileToS3(bucketName, fileName, fileData);
            uploadSuccess = true;
        } catch (error) {
            console.log(error);
        }
        if (uploadSuccess) {
            console.log("FILE UPLOADED TO S3!")
            updateOrder();
        } else {
            setShowAlert(true);
            console.log("FILE NOT UPLOADED TO S3!")
        }
    }

    return (
        <View style={styles.container}>
            {hasPermission === true ? (
                <View style={styles.cameraContainer}>
                    {photoUri ? <Image source={{ uri: photoUri }} style={styles.photo} /> :
                        <Camera
                            style={styles.camera}
                            type={Camera.Constants.Type.back}
                            ref={ref => setCameraRef(ref)}
                        />
                    }
                </View>
            ) : (
                <Text>No access to camera</Text>
            )}
            {/* {photoUri && <Image source={{ uri: photoUri }} style={styles.photo} />} */}
            <View style={styles.bottomContainer}>
                {!photoUri ?
                    <View style={styles.outerCircleContainer} onPress={takePicture}>
                        {
                            photoButtonPressed ?
                                <ActivityIndicator style={styles.circleContainer} size="large" color={COLORS.white} />
                                :
                                <TouchableOpacity style={styles.circleContainer} onPress={takePicture} />
                        }
                    </View>
                    :
                    < View style={styles.buttonsContainer}>
                        <MainButton text="Upload" onPress={processPicture} />
                        <SecondaryButton text="Retake" onPress={takePicture} />
                    </View>
                }
            </View>
            {showAlert && <CustomAlert visible={showAlert} title="Upload failed" message="Error uploading image to server" onClose={() => setShowAlert(false)} />}
        </View >
    );
};

const styles = StyleSheet.create({
    container: {
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    cameraContainer: {
        width: '100%',
        aspectRatio: 3 / 4,
    },
    camera: {
        width: '100%',
        aspectRatio: 3 / 4,
    },
    photo: {
        width: '100%',
        aspectRatio: 3 / 4,
        resizeMode: 'cover',
    },
    buttonContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#3498db',
        padding: 15,
        borderRadius: 10,
        width: '100%',
        margin: 4,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
    circleContainer: {
        width: circleContainerSize,
        borderRadius: circleContainerSize,
        height: circleContainerSize,
        backgroundColor: COLORS.orange,
        justifyContent: 'center',
        alignItems: 'center',
    },
    outerCircleContainer: {
        width: circleContainerSize + 6,
        borderRadius: circleContainerSize + 6,
        height: circleContainerSize + 6,
        backgroundColor: COLORS.white,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 4,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.95,
        shadowRadius: 16,
        paddingVertical: 16
    },
    buttonsContainer: {
        width: '90%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    bottomContainer: {
        paddingTop: 20,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export default CameraWithButtons;
