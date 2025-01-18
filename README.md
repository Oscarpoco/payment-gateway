# Payment Gateway App

A sleek and modern e-commerce mobile application built with React Native and Expo, featuring Paystack integration for seamless payment processing.

## Features

- Interactive product showcase with animated transitions
- Paystack payment integration
- Custom splash screen with animations
- Category filtering
- Quantity selection
- Toast notifications for payment status
- Responsive design with blur effects and gradients
- Smooth scrolling animations

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14 or higher)
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)
- Android Studio (for Android development)


## Installation

1. Clone the repository:
```bash
git clone https://github.com/Oscarpoco/payment-gateway.git
cd payment-gateway
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Configure Paystack:
- Replace the `paystackKey` in the App.js file with your own Paystack public key
- Update the `billingEmail` and other billing information as needed

## Running the App

### Development

```bash
# Start Expo development server
npm start
# or
yarn start

# Run on Android
npm run android
# or
yarn android

# Run on iOS
npm run ios
# or
yarn ios
```

### Production Build

```bash
# Build for Android
eas build -p android

# Build for iOS
eas build -p ios
```

## Dependencies

- `expo` (v52.0.25) - Framework and platform for universal React applications
- `expo-blur` (v14.0.2) - Blur effect component
- `expo-linear-gradient` (v14.0.2) - Linear gradient component
- `expo-status-bar` (v2.0.1) - Status bar component
- `react` (v18.3.1) - React framework
- `react-native` (v0.76.6) - React Native framework
- `react-native-paystack-webview` (v4.3.1) - Paystack payment integration
- `react-native-toast-message` (v2.2.1) - Toast notifications

## Project Structure

```
payment-gateway/
├── assets/              # Images and other static assets
├── App.js              # Main application component
├── package.json        # Project dependencies and scripts
└── README.md           # Project documentation
```

## Key Components

1. **SplashScreen**: Custom animated splash screen with gradient background
2. **Product Display**: Scrollable product list with animations
3. **Payment Integration**: Seamless Paystack payment processing
4. **Category Filter**: Product filtering by category
5. **Quantity Controls**: Interactive quantity selection
6. **Toast Notifications**: User feedback for payment status

## Customization

### Styling
- Modify the `styles` object in `App.js` to customize the appearance
- Update gradient colors in `LinearGradient` components
- Adjust blur intensity in `BlurView` components

### Products
Edit the `items` array in `App.js` to modify the product list:
```javascript
{
  id: [number],
  name: [string],
  price: [string],
  description: [string],
  image: require([path]),
}
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request


## Acknowledgments

- [Expo](https://expo.dev/)
- [Paystack](https://paystack.com/)
- [React Native](https://reactnative.dev/)

## Support

For support, please open an issue in the repository or contact the development team.
