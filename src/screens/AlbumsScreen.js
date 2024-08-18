import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  FlatList,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  TextInput,
  Animated,
  Easing,
  Text,
  useColorScheme,
  Alert,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigation, useRoute} from '@react-navigation/native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faSearch,
  faArrowLeft,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import {deleteImage} from '../redux/imagesSlice'; // Import the deleteImage action

const {width, height} = Dimensions.get('window');

const AlbumsScreen = () => {
  const {albumId} = useRoute().params;
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const images = useSelector(state => state.images.data);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const searchBarWidth = useRef(new Animated.Value(0)).current;
  const colorScheme = useColorScheme();

  const albumImages = images.filter(image => image.albumId === albumId);
  const filteredImages = albumImages.filter(image =>
    image.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  useEffect(() => {
    Animated.timing(searchBarWidth, {
      toValue: isSearching ? width * 0.7 : 0,
      duration: 300,
      easing: Easing.out(Easing.ease),
      useNativeDriver: false,
    }).start();
  }, [isSearching]);

  const handleSearchIconPress = () => {
    setIsSearching(!isSearching);
  };

  const handleImagePress = image => {
    navigation.navigate('ImageDetail', {image});
  };

  const handleDelete = image => {
    Alert.alert(
      'Confirm Deletion',
      'Are you sure you want to delete this image?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => dispatch(deleteImage(image.id)), // Dispatch delete action
        },
      ],
    );
  };

  const renderItem = ({item}) => (
    <View style={styles.imageContainer}>
      <TouchableOpacity onPress={() => handleImagePress(item)}>
        <Image source={{uri: item.thumbnailUrl}} style={styles.thumbnail} />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => handleDelete(item)}>
        <FontAwesomeIcon icon={faTrash} size={20} color="#fff" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View
      style={[
        styles.container,
        colorScheme === 'dark' ? styles.darkBackground : styles.lightBackground,
      ]}>
      <View
        style={[
          styles.header,
          colorScheme === 'dark' ? styles.darkHeader : styles.lightHeader,
        ]}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
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
          Album {albumId}
        </Text>
        <View style={styles.searchContainer}>
          <TouchableOpacity onPress={handleSearchIconPress}>
            <FontAwesomeIcon
              icon={faSearch}
              size={24}
              color={colorScheme === 'dark' ? '#fff' : '#000'}
              style={styles.searchIcon}
            />
          </TouchableOpacity>
          <Animated.View
            style={[
              styles.searchBarContainer,
              {width: searchBarWidth},
              colorScheme === 'dark'
                ? styles.darkSearchBar
                : styles.lightSearchBar,
            ]}>
            <TextInput
              style={[
                styles.searchBar,
                colorScheme === 'dark'
                  ? styles.darkSearchBar
                  : styles.lightSearchBar,
              ]}
              placeholder="Search images..."
              value={searchQuery}
              onChangeText={text => setSearchQuery(text)}
              placeholderTextColor={colorScheme === 'dark' ? '#ccc' : '#888'}
            />
          </Animated.View>
        </View>
      </View>
      <FlatList
        data={filteredImages}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        numColumns={3}
        style={styles.list}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    marginRight: 10,
  },
  headerText: {
    fontSize: width * 0.05, // Responsive font size
    fontWeight: 'bold',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchIcon: {
    marginRight: 10,
  },
  searchBarContainer: {
    overflow: 'hidden',
    borderRadius: 20,
  },
  searchBar: {
    height: 40,
    paddingHorizontal: 15,
  },
  // list: {
  //   margin: 10,
  // },
  listContainer: {
    paddingBottom: 20, // Add some padding to the bottom
  },
  imageContainer: {
    margin: 6,
    borderRadius: 15,
    overflow: 'hidden',
    backgroundColor: '#fff',
    elevation: 3,
    position: 'relative',
  },
  thumbnail: {
    width: width / 3 - 12, // Responsive width
    height: width / 3 - 12, // Responsive height
    borderRadius: 15,
  },
  deleteButton: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: 'red',
    borderRadius: 20,
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lightBackground: {
    backgroundColor: '#f8f8f8',
  },
  darkBackground: {
    backgroundColor: '#333',
  },
  lightHeader: {
    backgroundColor: '#f8f8f8',
  },
  darkHeader: {
    backgroundColor: '#444',
  },
  lightHeaderText: {
    color: '#000',
  },
  darkHeaderText: {
    color: '#fff',
  },
  lightSearchBar: {
    backgroundColor: '#fff',
  },
  darkSearchBar: {
    backgroundColor: '#555',
  },
});

export default AlbumsScreen;
