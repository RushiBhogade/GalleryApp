import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Fetch images
export const fetchImages = createAsyncThunk(
  'images/fetchImages',
  async (_, {getState}) => {
    const {lastFetchedPage} = getState().images;
    const response = await axios.get(
      `https://jsonplaceholder.typicode.com/photos?_page=${
        lastFetchedPage + 1
      }&_limit=20`,
    );
    const images = response.data;

    // Cache images to AsyncStorage
    try {
      const cachedImages = await AsyncStorage.getItem('cachedImages');
      const newImages = cachedImages
        ? [...JSON.parse(cachedImages), ...images]
        : images;
      await AsyncStorage.setItem('cachedImages', JSON.stringify(newImages));
    } catch (error) {
      console.error('Error caching images:', error);
    }

    return images;
  },
);

// Fetch albums
export const fetchAlbums = createAsyncThunk('images/fetchAlbums', async () => {
  const response = await axios.get(
    'https://jsonplaceholder.typicode.com/albums',
  );
  const albums = response.data;

  // Cache albums to AsyncStorage
  try {
    await AsyncStorage.setItem('cachedAlbums', JSON.stringify(albums));
  } catch (error) {
    console.error('Error caching albums:', error);
  }

  return albums;
});
export const deleteImage = createAsyncThunk(
  'images/deleteImage',
  async imageId => {
    // In a real app, you'd make an API call here to delete the image
    // For this example, we'll just return the ID of the image to delete
    return imageId;
  },
);

// Delete album
export const deleteAlbum = createAsyncThunk(
  'images/deleteAlbum',
  async albumId => {
    // In a real app, you'd make an API call here to delete the album
    // For this example, we'll just return the ID of the album to delete
    return albumId;
  },
);
// Define the slice
const imagesSlice = createSlice({
  name: 'images',
  initialState: {
    data: [],
    albums: [],
    status: 'idle',
    searchQuery: '',
    lastFetchedPage: 0,
  },
  reducers: {
    setSearchQuery(state, action) {
      state.searchQuery = action.payload;
    },
    setCachedImages(state, action) {
      state.data = action.payload;
    },
    setCachedAlbums(state, action) {
      state.albums = action.payload;
    },
  },
  extraReducers: builder => {
    // Add cases for the async thunks
    builder
      .addCase(fetchImages.fulfilled, (state, action) => {
        state.data = [...state.data, ...action.payload];
        state.lastFetchedPage += 1;
      })
      .addCase(fetchAlbums.fulfilled, (state, action) => {
        state.albums = action.payload;
      })
      .addCase(deleteImage.fulfilled, (state, action) => {
        state.data = state.data.filter(image => image.id !== action.payload);
        // Update the cache
        AsyncStorage.setItem('cachedImages', JSON.stringify(state.data));
      })
      .addCase(deleteAlbum.fulfilled, (state, action) => {
        // Filter out the deleted album
        state.albums = state.albums.filter(
          album => album.id !== action.payload,
        );
        // Also, remove all images associated with the deleted album
        state.data = state.data.filter(
          image => image.albumId !== action.payload,
        );
        AsyncStorage.setItem('cachedImages', JSON.stringify(state.data));
      });
  },
});

export const {setSearchQuery, setCachedImages, setCachedAlbums} =
  imagesSlice.actions;
export default imagesSlice.reducer;
