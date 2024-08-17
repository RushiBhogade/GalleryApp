import React, {useState} from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  useColorScheme,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';
import {useDispatch} from 'react-redux';
import Share from 'react-native-share';
import ImageCropPicker from 'react-native-image-crop-picker'; // For cropping
import {deleteImage} from '../redux/imagesSlice';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faArrowLeft,
  faShareAlt,
  faTrashAlt,
  faEdit,
} from '@fortawesome/free-solid-svg-icons';

const {width, height} = Dimensions.get('window');

const ImageDetailScreen = ({route, navigation}) => {
  const {image} = route.params;
  const dispatch = useDispatch();
  const colorScheme = useColorScheme();
  const [isImageFullScreen, setIsImageFullScreen] = useState(false);

  const handleDelete = () => {
    dispatch(deleteImage(image.id));
    navigation.goBack();
  };

  const toggleFullScreen = () => {
    setIsImageFullScreen(!isImageFullScreen);
  };

  const handleShare = async () => {
    try {
      await Share.open({
        url: image.url,
        title: 'Check out this image!',
        message: `Here's an image titled "${image.title}"`,
      });
    } catch (error) {
      console.log('Error sharing image:', error);
    }
  };

  const handleEdit = () => {
    ImageCropPicker.openCropper({
      path: image.url,
      width: 300,
      height: 400,
      cropping: true,
    })
      .then(croppedImage => {
        console.log('Cropped Image: ', croppedImage);
        // Handle the cropped image
      })
      .catch(error => {
        console.log('Error cropping image:', error);
      });
  };

  return (
    <View
      style={[
        styles.container,
        colorScheme === 'dark' ? styles.darkContainer : styles.lightContainer,
      ]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <FontAwesomeIcon
            icon={faArrowLeft}
            size={24}
            color={colorScheme === 'dark' ? '#fff' : '#000'}
          />
        </TouchableOpacity>
        <Text
          style={[
            styles.headerText,
            colorScheme === 'dark'
              ? styles.darkHeaderText
              : styles.lightHeaderText,
          ]}>
          Image Details
        </Text>
        <View style={{width: 24}} />
      </View>

      {/* Image Container */}
      <TouchableOpacity onPress={toggleFullScreen} style={styles.imageWrapper}>
        <Image source={{uri: image.url}} style={styles.image} />
        {!isImageFullScreen && (
          <View style={styles.overlay}>
            <Text
              style={[
                styles.title,
                colorScheme === 'dark'
                  ? styles.darkTitleText
                  : styles.lightTitleText,
              ]}>
              {image.title}
            </Text>
          </View>
        )}
      </TouchableOpacity>

      {/* Footer with Share, Delete, and Edit Options */}
      <View style={styles.footer}>
        <TouchableOpacity onPress={handleShare} style={styles.footerButton}>
          <FontAwesomeIcon
            icon={faShareAlt}
            size={24}
            color={colorScheme === 'dark' ? '#fff' : '#000'}
          />
          <Text
            style={[
              styles.footerButtonText,
              colorScheme === 'dark'
                ? styles.darkFooterText
                : styles.lightFooterText,
            ]}>
            Share
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleDelete} style={styles.footerButton}>
          <FontAwesomeIcon icon={faTrashAlt} size={24} color="red" />
          <Text
            style={[
              styles.footerButtonText,
              colorScheme === 'dark'
                ? styles.darkFooterText
                : styles.lightFooterText,
            ]}>
            Delete
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleEdit} style={styles.footerButton}>
          <FontAwesomeIcon
            icon={faEdit}
            size={24}
            color={colorScheme === 'dark' ? '#fff' : '#000'}
          />
          <Text
            style={[
              styles.footerButtonText,
              colorScheme === 'dark'
                ? styles.darkFooterText
                : styles.lightFooterText,
            ]}>
            Edit
          </Text>
        </TouchableOpacity>
      </View>

      {/* Full-Screen Image Modal */}
      {isImageFullScreen && (
        <Modal
          visible={isImageFullScreen}
          transparent={true}
          animationType="fade"
          onRequestClose={toggleFullScreen}>
          <TouchableWithoutFeedback onPress={toggleFullScreen}>
            <View style={styles.fullScreenImageContainer}>
              <Image
                source={{uri: image.url}}
                style={styles.fullScreenImage}
                resizeMode="contain"
              />
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 16,
    justifyContent: 'space-between',
  },
  darkContainer: {
    backgroundColor: '#1c1c1c',
  },
  lightContainer: {
    backgroundColor: '#f8f8f8',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  headerText: {
    fontSize: width * 0.05, // 5% of screen width
    fontWeight: 'bold',
  },
  darkHeaderText: {
    color: '#fff',
  },
  lightHeaderText: {
    color: '#000',
  },
  imageWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    width: width * 0.9, // 90% of screen width
    height: height * 0.5, // 50% of screen height
    borderRadius: 20,
    overflow: 'hidden',
    elevation: 5,
    alignSelf: 'center',
    marginTop: 20,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    padding: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
  },
  title: {
    fontSize: width * 0.055, // 5.5% of screen width
    fontWeight: 'bold',
    color: '#fff',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    paddingVertical: 20,
    borderTopWidth: 1,
    borderColor: '#ccc',
  },
  footerButton: {
    alignItems: 'center',
  },
  footerButtonText: {
    marginTop: 4,
    fontSize: width * 0.04, // 4% of screen width
  },
  darkFooterText: {
    color: '#fff',
  },
  lightFooterText: {
    color: '#000',
  },
  fullScreenImageContainer: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullScreenImage: {
    width: '100%',
    height: '100%',
  },
});

export default ImageDetailScreen;
