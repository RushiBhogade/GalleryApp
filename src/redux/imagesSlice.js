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
    return response.data;
  },
);

// Fetch albums
export const fetchAlbums = createAsyncThunk('images/fetchAlbums', async () => {
  const response = await axios.get(
    'https://jsonplaceholder.typicode.com/albums',
  );
  return response.data;
});

// Delete image
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

const imagesSlice = createSlice({
  name: 'images',
  initialState: {
    data: [],
    albums: [], // State for albums
    status: 'idle',
    error: null,
    lastFetchedPage: 0,
    searchQuery: '',
  },
  reducers: {
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchImages.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchImages.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = [...state.data, ...action.payload];
        state.lastFetchedPage += 1;
        // Cache the data
        AsyncStorage.setItem('cachedImages', JSON.stringify(state.data));
      })
      .addCase(fetchImages.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
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
        // Update the cache
        AsyncStorage.setItem('cachedImages', JSON.stringify(state.data));
      });
  },
});

export const {setSearchQuery} = imagesSlice.actions;
export default imagesSlice.reducer;