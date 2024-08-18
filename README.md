

# Gallery App

## Overview

This mobile gallery application allows users to view, edit, and share images. It uses Redux Toolkit for state management and React Navigation for screen transitions. The app fetches data from the JSONPlaceholder API and adapts to various device sizes and orientations. It also supports dark and light themes.

## Features

1. **Gallery Screen**
   - Displays a responsive grid of image thumbnails.
   - Tapping on a thumbnail navigates to the Image Detail Screen.
   - Includes a search bar to filter images by title or album.

2. **Image Detail Screen**
   - Shows a larger version of the image.
   - Displays the image title and additional metadata.
   - Includes options to edit/crop and share the image.
   - Includes a back button to return to the Gallery Screen.

3. **Theming**
   - Supports both dark and light themes.
   - Automatically adapts to the user's system theme preference.

4. **Bonus Challenges (Optional)**
   - Lazy loading of images as the user scrolls.
   - Caching strategies for offline access.
   - Delete functionality for albums and images.

## Technologies Used

- **React Native**: Framework for building the mobile application.
- **Redux Toolkit**: State management library.
- **React Navigation**: Library for handling navigation and routing.
- **JSONPlaceholder API**: Public API for fetching image data.
- **AsyncStorage**: For caching data locally (if implemented).
- **Image Editing Library**: For cropping and editing images.
- **Share Library**: For sharing images.

## Setup and Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/RushiBhogade/GalleryApp.git
   cd GalleryApp
   ```

2. **Install Dependencies**

   Ensure you have Node.js and npm or Yarn installed. Then run:

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run the Application**

   For iOS:

   ```bash
   npx react-native run-ios
   ```

   For Android:

   ```bash
   npx react-native run-android
   ```

4. **Run Tests**

   If you have tests, you can run them using:

   ```bash
   npm test
   # or
   yarn test
   ```

## Usage

1. **Gallery Screen**
   - The main screen displays a grid of image thumbnails.
   - Tap on a thumbnail to navigate to the Image Detail Screen.
   - Use the search bar to filter images.

2. **Image Detail Screen**
   - Shows a larger version of the selected image along with its title.
   - Use the edit/crop button to modify the image.
   - Use the share button to share the image.
   - Use the back button to return to the Gallery Screen.

3. **Theming**
   - Switch between dark and light themes based on system settings.

## Assumptions

- The application assumes the user has a stable internet connection for fetching images.
- The design adapts to both phones and tablets using Flexbox for layout.
- Image editing and sharing functionalities require appropriate permissions and configurations.

## Additional Features

- **Image Editing/Cropping**: Allows users to crop and adjust images.
- **Image Sharing**: Users can share images to other apps or social media.
- **Theming**: Supports automatic theme switching based on system preferences.


## License

This project is licensed under the MIT License.
