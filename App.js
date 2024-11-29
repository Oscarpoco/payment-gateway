import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView } from 'react-native';
import Pay from './payment.js';

export default function App() {
  const [onPay, setOnPay] = useState(false);
  const [lightMode, setLightMode] = useState(true);

  return (
    <View style={[styles.container, { backgroundColor: lightMode ? '#fff' : '#000' }]}>
      {onPay ? (
        <Pay onClose={() => setOnPay(false)} />
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
              source={require('./assets/playstation.jpg')} 
              style={styles.image} 
              resizeMode="contain"
            />
          </View>

          {/* ITEM NAME */}
          <View style={styles.itemNameContainer}>
            <Text style={[styles.text, { color: lightMode ? '#000' : '#fff' }, {letterSpacing: 2}]}>
              Playstation 5
            </Text>
            <Text style={[styles.text, { color: lightMode ? '#ab173f' : '#ab173f' }, { backgroundColor: lightMode ? '#1AEB84' : '#1AEB84' }, {paddingHorizontal: 15, paddingVertical: 3, borderRadius: 10}]}>
              R7000
            </Text>
          </View>

          {/* DESCRIPTION */}
          <View style={styles.descriptionContainer}>

            <Text 
              style={[
                styles.descriptionText, 
                { 
                  color: lightMode ? '#000' : '#fff',
                  textAlign: 'center'
                }
              ]}
            >
              Experience gaming like never before with the PlayStation 5 - 
              cutting-edge performance and immersive next-gen gaming.
            </Text>
          </View>

          <View style={styles.recommendContainerWrapper}>
          <Text style={[styles.text, { color: lightMode ? '#000' : '#fff' }, {paddingHorizontal: 5, fontWeight: 600}]}>Choose the item to view</Text>
            <View style={styles.recommendContainer}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <TouchableOpacity style={[styles.recommendItems, { backgroundColor: lightMode ? '#f0f0f0' : '#444' }]}>
                <Image 
                source={require('./assets/apple.jpg')} 
                style={styles.imageRec} 
                resizeMode="contain"
                />
              </TouchableOpacity>
              
              <TouchableOpacity style={[styles.recommendItems, { backgroundColor: lightMode ? '#f0f0f0' : '#444' }]}>
                <Image 
                source={require('./assets/pc.jpg')} 
                style={styles.imageRec} 
                resizeMode="contain"
                />
              </TouchableOpacity>

              <TouchableOpacity style={[styles.recommendItems, { backgroundColor: lightMode ? '#f0f0f0' : '#333' }]}>
                <Image 
                source={require('./assets/headphone.jpg')} 
                style={styles.imageRec} 
                resizeMode="contain"
                />
              </TouchableOpacity>
              <TouchableOpacity style={[styles.recommendItems, { backgroundColor: lightMode ? '#f0f0f0' : '#333' }]}>
                <Image 
                source={require('./assets/Huawei.jpg')} 
                style={styles.imageRec} 
                resizeMode="contain"
                />
              </TouchableOpacity>
              <TouchableOpacity style={[styles.recommendItems, { backgroundColor: lightMode ? '#f0f0f0' : '#333' }]}>
                <Image 
                source={require('./assets/monitor.jpg')} 
                style={styles.imageRec} 
                resizeMode="contain"
                />
              </TouchableOpacity>
              </ScrollView>
            </View>
          </View>

          {/* Checkout Button */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => setOnPay(true)}
            >
              <Text style={styles.buttonText}>Checkout</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
      <StatusBar style= {lightMode ? 'dark' : 'light'} />
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
    width: '100%',
    height: 50,
    backgroundColor: '#1AEB84',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    paddingVertical: 10,
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
  },

  recommendContainerWrapper:
  {
    width: '100%',
    marginVertical: 10,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',

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
