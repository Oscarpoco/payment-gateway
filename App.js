import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView } from 'react-native';
import Pay from './payment.js';

const items = [
  {
    id: 1,
    name: 'PlayStation 5',
    price: 'R7000',
    description: 'Experience gaming like never before with the PlayStation 5 - cutting-edge performance and immersive next-gen gaming.',
    image: require('./assets/playstation.jpg'),
  },
  {
    id: 2,
    name: 'Apple iPhone',
    price: 'R15000',
    description: 'The latest Apple iPhone with advanced features and stunning design.',
    image: require('./assets/apple.jpg'),
  },
  {
    id: 3,
    name: 'Gaming PC',
    price: 'R20000',
    description: 'High-performance gaming PC for the ultimate gaming experience.',
    image: require('./assets/pc.jpg'),
  },
  {
    id: 4,
    name: 'Headphones',
    price: 'R2000',
    description: 'Noise-canceling headphones for immersive sound.',
    image: require('./assets/headphone.jpg'),
  },
  {
    id: 5,
    name: 'Huawei Phone',
    price: 'R12000',
    description: 'Sleek and powerful Huawei smartphone for everyday use.',
    image: require('./assets/Huawei.jpg'),
  },
  {
    id: 6,
    name: 'Monitor',
    price: 'R3000',
    description: 'High-resolution monitor for work and gaming.',
    image: require('./assets/monitor.jpg'),
  },
];

export default function App() {
  const [onPay, setOnPay] = useState(false);
  const [lightMode, setLightMode] = useState(true);
  const [selectedItem, setSelectedItem] = useState(items[0]); 

  return (
    <View style={[styles.container, { backgroundColor: lightMode ? '#fff' : '#000' }]}>
      {onPay ? (
        <Pay onClose={() => setOnPay(false)} selectedItem={selectedItem}/>
      ) : (
        <View style={styles.ItemParent}>
          {/* IMAGE */}
          <View 
            style={[
              styles.imageContainer, 
              { backgroundColor: lightMode ? '#f0f0f0' : '#444' }
            ]}
          >
            <Image 
              source={selectedItem.image} 
              style={styles.image} 
              resizeMode="contain"
            />
          </View>

          {/* ITEM NAME */}
          <View style={styles.itemNameContainer}>
            <Text style={[styles.text, { color: lightMode ? '#000' : '#fff' }, {letterSpacing: 2}]}>
              {selectedItem.name}
            </Text>
            <Text style={[styles.text, { color: lightMode ? '#ab173f' : '#ab173f' }, { backgroundColor: lightMode ? '#1AEB84' : '#1AEB84' }, {paddingHorizontal: 15, paddingVertical: 3, borderRadius: 10}]}>
              {selectedItem.price}
            </Text>
          </View>

          {/* DESCRIPTION */}
          <View style={styles.descriptionContainer}>
            <Text 
              style={[
                styles.descriptionText, 
                { color: lightMode ? '#000' : '#fff', textAlign: 'center' }
              ]}
            >
              {selectedItem.description}
            </Text>
          </View>

          {/* RECOMMENDED ITEMS */}
          <View style={styles.recommendContainerWrapper}>
            <Text style={[styles.text, { color: lightMode ? '#000' : '#fff', fontWeight: '600' }]}>
              Choose an item to view
            </Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {items.map((item) => (
                <TouchableOpacity 
                  key={item.id} 
                  style={[styles.recommendItems, { backgroundColor: lightMode ? '#f0f0f0' : '#444' }]}
                  onPress={() => setSelectedItem(item)}
                >
                  <Image 
                    source={item.image} 
                    style={styles.imageRec} 
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* Checkout Button */}
          <View style={styles.buttonContainer}>
           <View style={styles.incrementWrapper}>
            <TouchableOpacity style={styles.buttonIncrement}>
              <Text style={styles.buttonText}>-</Text>
            </TouchableOpacity>
            <Text style={styles.buttonText}>1</Text>
            <TouchableOpacity style={styles.buttonIncrement}>
              <Text style={styles.buttonText}>+</Text>
            </TouchableOpacity>
           </View>
            <TouchableOpacity
              style={styles.button}
              onPress={() => setOnPay(true)}
            >
              <Text style={styles.buttonText}>Checkout</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
      <StatusBar style={lightMode ? 'dark' : 'light'} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 30,
  },

  ItemParent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    gap: 5,
    width: '100%',
  },

  // BUTTON
  button: {
    width: '60%',
    height: 50,
    backgroundColor: '#1AEB84',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },

  incrementWrapper: {
    height: 50,
    backgroundColor: '#f0f0f0',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    paddingVertical: 10,
    gap: 20
  },

  buttonIncrement:
  {
    width: 40,
    height: 40,
    backgroundColor: '#1AEB84',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
  },

  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },

  // IMAGE
  imageContainer: {
    padding: 10,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },

  image: {
    width: 300,
    height: 250,
    resizeMode: 'contain',
  },

  itemNameContainer: {
    paddingVertical: 10,
    paddingHorizontal: 5,
    marginVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },

  text: {
    fontSize: 18,
    fontWeight: 600,
  },

  buttonContainer: {
    width: '100%',
    marginVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 10
  },

  recommendContainerWrapper:
  {
    width: '100%',
    marginVertical: 10,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    gap: 5,
    marginTop: 30,
  },

  recommendContainer:
  {
    width: '100%',
    marginVertical: 10,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: 120,
    borderRadius: 10,
    gap: 10,
  },

  descriptionContainer:
  {
    width: '100%',
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },

  descriptionText:
  {
    fontSize: 16,
    fontWeight: 400,
  },

  recommendItems:
  {
    width: 120,
    height: 100,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
    marginRight: 10,
  },

  imageRec:
  {
    width: 70,
    height: 70,
  }
});
