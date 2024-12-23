import React, { useState, useRef, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { 
  StyleSheet, 
  Text, 
  View, 
  TouchableOpacity, 
  Image, 
  ScrollView, 
  Animated, 
  Dimensions,
  ActivityIndicator 
} from 'react-native';
import { Paystack } from 'react-native-paystack-webview';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import Toast from 'react-native-toast-message';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

const items = [
  {
    id: 1,
    name: 'PlayStation 5',
    price: '7000',
    description: 'Experience gaming like never before with the PlayStation 5 - cutting-edge performance and immersive next-gen gaming.',
    image: require('./assets/playstation.jpg'),
  },
  {
    id: 2,
    name: 'Apple iPhone',
    price: '15000',
    description: 'The latest Apple iPhone with advanced features and stunning design.',
    image: require('./assets/apple.jpg'),
  },
  {
    id: 3,
    name: 'Gaming PC',
    price: '20000',
    description: 'High-performance gaming PC for the ultimate gaming experience.',
    image: require('./assets/pc.jpg'),
  },
  {
    id: 4,
    name: 'Headphones',
    price: '2000',
    description: 'Noise-canceling headphones for immersive sound.',
    image: require('./assets/headphone.jpg'),
  },
  {
    id: 5,
    name: 'Huawei Phone',
    price: '12000',
    description: 'Sleek and powerful Huawei smartphone for everyday use.',
    image: require('./assets/Huawei.jpg'),
  },
  {
    id: 6,
    name: 'Monitor',
    price: '3000',
    description: 'High-resolution monitor for work and gaming.',
    image: require('./assets/monitor.jpg'),
  },
];

const SplashScreen = ({ onFinish }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.5)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 20,
        useNativeDriver: true,
      })
    ]).start();

    setTimeout(onFinish, 2500);
  }, []);

  return (
    <LinearGradient
      colors={['#000', '#1AEB84']}
      style={styles.splashContainer}
    >
      <Animated.View style={[
        styles.splashContent,
        {
          opacity: fadeAnim,
          transform: [{ scale: scaleAnim }]
        }
      ]}>
        <Text style={styles.splashText}>TakeEverything</Text>
        <ActivityIndicator color="#fff" style={{ marginTop: 20 }} />
      </Animated.View>
    </LinearGradient>
  );
};

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [selectedItem, setSelectedItem] = useState(items[0]);
  const [quantity, setQuantity] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const paystackWebViewRef = useRef();
  const scrollY = useRef(new Animated.Value(0)).current;


  const handleCheckout = () => {
    if (selectedItem && quantity > 0) {
      paystackWebViewRef.current?.startTransaction();
    }
  };

  const imageScale = scrollY.interpolate({
    inputRange: [-100, 0, 100],
    outputRange: [1.2, 1, 0.8],
    extrapolate: 'clamp',
  });

  if (showSplash) {
    return <SplashScreen onFinish={() => setShowSplash(false)} />;
  }

  return (
    <View style={styles.container}>
      <Paystack
        paystackKey="pk_test_97ccd94767aae209e33c425d6e12a0b6357464a6"
        billingEmail="okpoco15@gmail.com"
        currency="ZAR"
        amount={parseFloat(selectedItem?.price || 0) * quantity}
        reference={`ORDER_${Date.now()}`}
        lastName="Poco"
        firstName="Oscar"
        billingName={selectedItem?.name}
        onCancel={() => 
          Toast.show({
            text1: 'Cancelled',
            text2: 'Transaction cancelled',
            position: 'bottom',
            type: 'info'
          })
        }
        onSuccess={(res) => 
          Toast.show({
            text1: 'Success',
            text2: `Payment Successful! Reference: ${res.reference}`,
            position: 'bottom',
            type: 'success'
          })
        }
        ref={paystackWebViewRef}
      />

      <ScrollView
        style={styles.scrollView}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
      >
        <LinearGradient
          colors={['rgba(26,235,132,0.3)', 'transparent']}
          style={styles.headerGradient}
        />
        
        <Animated.View style={[styles.imageContainer, { transform: [{ scale: imageScale }] }]}>
          <Image source={selectedItem.image} style={styles.heroImage} resizeMode="contain" />
          <BlurView intensity={80} tint="dark" style={styles.priceTag}>
            <Text style={styles.priceText}>R{selectedItem.price}</Text>
          </BlurView>
        </Animated.View>

        <View style={styles.contentContainer}>
          <Text style={styles.itemName}>{selectedItem.name}</Text>
          <Text style={styles.description}>{selectedItem.description}</Text>

          <View style={styles.categoryContainer}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {['All', ...new Set(items.map(item => item.category))].map((category, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.categoryPill,
                    selectedCategory === category && styles.categoryPillActive
                  ]}
                  onPress={() => setSelectedCategory(category)}
                >
                  <Text style={[
                    styles.categoryText,
                    selectedCategory === category && styles.categoryTextActive
                  ]}>{category}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          <Text style={styles.sectionTitle}>More Products</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.productsScroll}>
            {items
              .filter(item => selectedCategory === 'All' || item.category === selectedCategory)
              .map((item, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.productCard}
                  onPress={() => {
                    setSelectedItem(item);
                    setQuantity(1);
                  }}
                >
                  <LinearGradient
                    colors={['rgba(26,235,132,0.1)', 'rgba(26,235,132,0)']}
                    style={styles.cardGradient}
                  />
                  <Image source={item.image} style={styles.productImage} resizeMode="contain" />
                  <Text style={styles.productName}>{item.name}</Text>
                  <Text style={styles.productPrice}>R{item.price}</Text>
                </TouchableOpacity>
              ))}
          </ScrollView>
        </View>
      </ScrollView>

      <BlurView intensity={100} tint="dark" style={styles.bottomBar}>
        <View style={styles.quantityControls}>
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={() => setQuantity(Math.max(1, quantity - 1))}
          >
            <Text style={styles.quantityButtonText}>
              <Ionicons name='remove' size={20} color='#fff' />
            </Text>
          </TouchableOpacity>
          <Text style={styles.quantityText}>{quantity}</Text>
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={() => setQuantity(quantity + 1)}
          >
            <Text style={styles.quantityButtonText}>
              <Ionicons name='add' size={20} color='#fff' />
            </Text>
          </TouchableOpacity>
        </View>
        
        <TouchableOpacity 
          style={styles.checkoutButton} 
          onPress={handleCheckout}
        >
          <LinearGradient
            colors={['#1AEB84', '#13B366']}
            style={styles.checkoutGradient}
          >
            <Text style={styles.checkoutButtonText}>
              Checkout • R{(parseFloat(selectedItem.price) * quantity).toLocaleString()}
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </BlurView>
      
      <View style={styles.toast}>
          <Toast/>
      </View>
      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({

  // SPLASH SCREEN
  splashContainer: 
  {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  splashContent: 
  {
    alignItems: 'center',
  },

  splashText: 
  {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#fff',
    letterSpacing: 2,
  },

  // MAIN STYLE
  container: 
  {
    flex: 1,
    backgroundColor: '#000',
  },

  headerGradient: 
  {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 200,
  },

  scrollView: 
  {
    flex: 1,
  },

  imageContainer: 
  {
    height: 400,
    backgroundColor: '#111',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    overflow: 'hidden',
  },

  heroImage: 
  {
    width: '100%',
    height: '100%',
  },

  priceTag: 
  {
    position: 'absolute',
    bottom: 20,
    right: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },

  priceText: 
  {
    color: '#1AEB84',
    fontSize: 24,
    fontWeight: 'bold',
  },

  contentContainer: 
  {
    padding: 20,
  },

  itemName: 
  {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  description: 
  {
    color: '#999',
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 30,
  },

  categoryContainer: 
  {
    marginBottom: 20,
  },

  categoryPill: 
  {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 10,
    backgroundColor: '#111',
    borderWidth: 1,
    borderColor: '#333',
  },

  categoryPillActive: 
  {
    backgroundColor: '#1AEB84',
    borderColor: '#1AEB84',
  },

  categoryText: 
  {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },

  categoryTextActive: 
  {
    color: '#000',
  },

  sectionTitle: 
  {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },

  productsScroll: 
  {
    marginBottom: 100,
  },

  productCard: 
  {
    width: 160,
    height: 220,
    backgroundColor: '#111',
    marginRight: 15,
    borderRadius: 20,
    padding: 15,
    borderWidth: 1,
    borderColor: '#333',
    overflow: 'hidden',
  },

  cardGradient: 
  {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '100%',
  },

  productImage: 
  {
    width: '100%',
    height: 120,
    marginBottom: 10,
  },

  productName: 
  {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 5,
  },

  productPrice: 
  {
    color: '#1AEB84',
    fontSize: 16,
    fontWeight: 'bold',
  },

  bottomBar: 
  {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    padding: 20,
    paddingBottom: 40,
    alignItems: 'center',
    justifyContent: 'space-between',
    overflow: 'hidden',
    borderTopWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },

  quantityControls: 
  {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#111',
    borderRadius: 25,
    padding: 5,
  },

  quantityButton: 
  {
    width: 40,
    height: 40,
    backgroundColor: '#222',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },

  quantityButtonText: 
  {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center'
  },

  quantityText: 
  {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginHorizontal: 15,
  },

  checkoutButton: 
  {
    overflow: 'hidden',
    borderRadius: 25,
  },

  checkoutGradient: 
  {
    paddingHorizontal: 15,
    paddingVertical: 15,
  },

  checkoutButtonText: 
  {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },

  toast:
  {
    width: '100%',
    position: 'absolute',
    bottom: 50,
    zIndex: 10
  }
});