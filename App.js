import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Provider} from 'react-redux';
import {store} from './src/redux/store';
import GalleryScreen from './src/screens/GalleryScreen';
import ImageDetailScreen from './src/screens/ImageDetailScreen';
import AlbumsScreen from './src/screens/AlbumsScreen';


const Stack = createStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Gallery">
          <Stack.Screen
            name="Gallery"
            component={GalleryScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="ImageDetail"
            component={ImageDetailScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="AlbumsScreen"
            component={AlbumsScreen}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
