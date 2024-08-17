import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  TextInput,
  ActivityIndicator,
  Text,
  useColorScheme,
  Animated,
  Easing,
  Alert,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {
  fetchImages,
  setSearchQuery,
  deleteImage,
  deleteAlbum,
  fetchAlbums,
} from '../redux/imagesSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faSearch,
  faTimes,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';

const {width} = Dimensions.get('window');
const ALBUM_HEIGHT = 180;

const GalleryScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const images = useSelector(state => state.images.data);
  const albums = useSelector(state => state.images.albums);
  const status = useSelector(state => state.images.status);
  const searchQuery = useSelector(state => state.images.searchQuery);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const colorScheme = useColorScheme();
  const [searchActive, setSearchActive] = useState(false);
  const searchBarWidth = useRef(new Animated.Value(0)).current;
  const scrollY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    loadCachedImages();
    if (status === 'idle') {
      dispatch(fetchImages());
      dispatch(fetchAlbums());
    }
  }, [status, dispatch]);

  const loadCachedImages = async () => {
    try {
      const cachedImages = await AsyncStorage.getItem('cachedImages');
      if (cachedImages) {
        dispatch({
          type: 'images/setCachedImages',
          payload: JSON.parse(cachedImages),
        });
      }
    } catch (error) {
      console.error('Error loading cached images:', error);
    }
  };

  const handleLoadMore = () => {
    if (status !== 'loading') {
      dispatch(fetchImages());
    }
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    dispatch(fetchImages()).then(() => setIsRefreshing(false));
  };

  const handleDelete = imageId => {
    dispatch(deleteImage(imageId));
  };

  const handleDeleteAlbum = albumId => {
    Alert.alert(
      'Confirm Deletion',
      'Are you sure you want to delete this album and all its images?',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Delete',
          onPress: () => {
            dispatch(deleteAlbum(albumId));
            images.forEach(image => {
              if (image.albumId === albumId) {
                dispatch(deleteImage(image.id));
              }
            });
          },
          style: 'destructive',
        },
      ],
      {cancelable: true},
    );
  };

  const filteredImages = images.filter(image =>
    image.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const albumsWithImages = albums.filter(album =>
    images.some(image => image.albumId === album.id),
  );

  const handleSearchIconPress = () => {
    if (!searchActive) {
      setSearchActive(true);
      Animated.timing(searchBarWidth, {
        toValue: width * 0.7,
        duration: 300,
        easing: Easing.out(Easing.ease),
        useNativeDriver: false,
      }).start();
    } else {
      setSearchActive(false);
      dispatch(setSearchQuery(''));
      Animated.timing(searchBarWidth, {
        toValue: 0,
        duration: 300,
        easing: Easing.out(Easing.ease),
        useNativeDriver: false,
      }).start();
    }
  };

  const renderImageItem = ({item}) => (
    <TouchableOpacity
      style={styles.imageContainer}
      onPress={() => navigation.navigate('ImageDetail', {image: item})}>
      <Image source={{uri: item.thumbnailUrl}} style={styles.thumbnail} />
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => handleDelete(item.id)}>
        <FontAwesomeIcon icon={faTimes} size={12} color="#fff" />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  const renderAlbumItem = ({item}) => (
    <TouchableOpacity
      style={styles.albumContainer}
      onLongPress={() => handleDeleteAlbum(item.id)}
      onPress={() => navigation.navigate('AlbumsScreen', {albumId: item.id})}>
      <Image
        source={{uri: `https://via.placeholder.com/150?text=Album+${item.id}`}}
        style={styles.albumImage}
      />
      <Text style={styles.albumTitle}>Album {item.id}</Text>
    </TouchableOpacity>
  );

  const renderNewAlbumsCell = () => (
    <TouchableOpacity
      style={styles.newAlbumsContainer}
      onPress={() => navigation.navigate('NewAlbumsScreen')}>
      <View style={styles.newAlbumsContent}>
        <Text style={styles.newAlbumsText}>New Albums</Text>
        <Text style={styles.newAlbumsSubtext}>Scroll and explore</Text>
      </View>
      <FontAwesomeIcon icon={faChevronRight} size={20} color="#007AFF" />
    </TouchableOpacity>
  );

  const headerComponent = () => (
    <Animated.View
      style={[
        styles.albumListContainer,
        {
          opacity: scrollY.interpolate({
            inputRange: [0, ALBUM_HEIGHT],
            outputRange: [1, 0],
            extrapolate: 'clamp',
          }),
          transform: [
            {
              translateY: scrollY.interpolate({
                inputRange: [0, ALBUM_HEIGHT],
                outputRange: [0, -ALBUM_HEIGHT],
                extrapolate: 'clamp',
              }),
            },
          ],
        },
      ]}>
      <Text style={styles.sectionTitle}>Albums</Text>
      <FlatList
        data={[...albumsWithImages, {id: 'new_albums'}]}
        renderItem={({item}) =>
          item.id === 'new_albums'
            ? renderNewAlbumsCell()
            : renderAlbumItem({item})
        }
        keyExtractor={item => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </Animated.View>
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
        <Text
          style={[
            styles.headerText,
            colorScheme === 'dark' ? styles.darkText : styles.lightText,
          ]}>
          Gallery
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
            style={[styles.searchBarContainer, {width: searchBarWidth}]}>
            <TextInput
              style={[
                styles.searchBar,
                colorScheme === 'dark'
                  ? styles.darkSearchBar
                  : styles.lightSearchBar,
              ]}
              placeholder="Search images..."
              value={searchQuery}
              onChangeText={text => dispatch(setSearchQuery(text))}
              placeholderTextColor={colorScheme === 'dark' ? '#ccc' : '#888'}
            />
          </Animated.View>
        </View>
      </View>
      <Animated.FlatList
        data={filteredImages}
        renderItem={renderImageItem}
        keyExtractor={item => item.id.toString()}
        numColumns={3}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.1}
        refreshing={isRefreshing}
        onRefresh={handleRefresh}
        ListHeaderComponent={headerComponent}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollY}}}],
          {useNativeDriver: false},
        )}
        scrollEventThrottle={16}
        contentContainerStyle={styles.imageList}
        ListFooterComponent={() =>
          status === 'loading' && (
            <ActivityIndicator
              style={styles.loading}
              color={colorScheme === 'dark' ? '#fff' : '#000'}
            />
          )
        }
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
  headerText: {
    fontSize: 28,
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
  },
  searchBar: {
    height: 40,
    borderRadius: 20,
    paddingHorizontal: 15,
  },
  albumListContainer: {
    height: ALBUM_HEIGHT,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 15,
    marginBottom: 10,
  },
  albumContainer: {
    marginRight: 15,
    alignItems: 'center',
  },
  albumImage: {
    width: 120,
    height: 120,
    borderRadius: 10,
  },
  albumTitle: {
    marginTop: 5,
    fontSize: 14,
  },
  imageList: {
    paddingHorizontal: 5,
  },
  imageContainer: {
    margin: 5,
    position: 'relative',
  },
  thumbnail: {
    width: width / 3 - 10,
    height: (width / 3 - 10) * 1.5,
    borderRadius: 10,
  },
  deleteButton: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: 'rgba(255, 0, 0, 0.7)',
    borderRadius: 15,
    padding: 5,
  },
  loading: {
    marginVertical: 20,
  },
  darkBackground: {
    backgroundColor: '#121212',
  },
  lightBackground: {
    backgroundColor: '#f5f5f5',
  },
  darkHeader: {
    backgroundColor: '#1e1e1e',
  },
  lightHeader: {
    backgroundColor: '#fff',
  },
  darkText: {
    color: '#fff',
  },
  lightText: {
    color: '#000',
  },
  darkSearchBar: {
    backgroundColor: '#333',
    color: '#fff',
  },
  lightSearchBar: {
    backgroundColor: '#e0e0e0',
    color: '#000',
  },
  newAlbumsContainer: {
    // width: 150,
    // height: 150,
    borderRadius: 10,
    // backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
    padding: 10,
    flexDirection: 'row',
  },
  newAlbumsContent: {
    flex: 1,
    justifyContent: 'center',
  },
  newAlbumsText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: 5,
  },
  newAlbumsSubtext: {
    fontSize: 12,
    color: '#666',
  },
});

export default GalleryScreen;
