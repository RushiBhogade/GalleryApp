

---

# 📸 Gallery App

## 🎨 Overview

Welcome to the **Gallery App**, where your images come to life! This mobile gallery application empowers you to **view, edit, and share** your favorite images. With a sleek, modern design and intuitive user experience, you’ll be able to explore images like never before. The app leverages **Redux Toolkit** for robust state management and **React Navigation** for seamless transitions. Fetching data from the **JSONPlaceholder API**, it’s designed to adapt beautifully across all device sizes and orientations, and offers a delightful experience with support for both **dark** and **light themes**.

## 🌟 Features

1. **Gallery Screen**
   - 🖼️ A responsive grid layout showcasing vibrant image thumbnails.
   - 🔍 **Tap** on any thumbnail to dive into the Image Detail Screen.
   - 🔍 **Search Bar** to filter images by title or album.

2. **Image Detail Screen**
   - 🔍 A larger view of your selected image, making it pop!
   - 🏷️ Image title and extra metadata for a complete experience.
   - ✂️ **Edit/Crop** options to personalize your images.
   - 📤 **Share** functionality to showcase your images on social media.
   - 🔙 A handy back button to return to your Gallery Screen.

3. **Theming**
   - 🌙 **Dark Theme** & 🌞 **Light Theme** options to fit your mood.
   - 🌗 Automatically adapts to your device’s system theme settings.

4. **Bonus Challenges (Optional)**
   - 📜 Lazy loading images as you scroll for smooth performance.
   - 📦 Caching strategies to enable offline access to your favorite images.
   - 🗑️ Delete functionality to manage albums and images effortlessly.

## 💻 Technologies Used

- **React Native**: Building beautiful cross-platform mobile apps.
- **Redux Toolkit**: Efficient state management for seamless interactions.
- **React Navigation**: Smooth transitions between screens.
- **JSONPlaceholder API**: Fetching dynamic image data.
- **AsyncStorage**: Local caching for offline use (if implemented).
- **Image Editing Library**: For cropping and adjusting images.
- **Share Library**: Easily share images with the world.

## 🚀 Setup and Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/RushiBhogade/GalleryApp.git
   cd GalleryApp
   ```

2. **Install Dependencies**

   Make sure you have Node.js and npm or Yarn installed. Then run:

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

   Execute tests using:

   ```bash
   npm test
   # or
   yarn test
   ```

## 🌈 Usage

1. **Gallery Screen**
   - Navigate through a grid of stunning image thumbnails.
   - **Tap** to view an image in full detail.
   - **Search** and filter images effortlessly.

2. **Image Detail Screen**
   - Enjoy a larger view of your selected image.
   - Use **edit/crop** tools to refine your images.
   - **Share** your images with ease.
   - **Return** to the gallery with the back button.

3. **Theming**
   - Switch seamlessly between **dark** and **light** themes based on your preference.

## 🤔 Assumptions

- The app assumes a stable internet connection for fetching images.
- Designed to adapt gracefully to both phones and tablets with Flexbox.
- Editing and sharing features may require specific permissions.

## ✨ Additional Features

- **Image Editing/Cropping**: Tailor your images to perfection.
- **Image Sharing**: Spread the joy by sharing images to other apps or social media.
- **Theming**: Automatically adjust themes based on system preferences for a personalized experience.

## Download the APK

You can download the APK file for the Gallery App from the GitHub Releases page:

- **[Download Photos APK](https://github.com/RushiBhogade/GalleryApp/releases/tag/v1)**

## 📝 License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).

