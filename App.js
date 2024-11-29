import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { useState } from 'react';

export default function App() {

  const [onPay, setOnPay] = useState(false);
  const [lightMode, setLightMode] = useState(true);
  return (
    <View style={styles.container}>
      
      {onPay ? 
      
      <View>

      </View>

      :

      <View style={styles.ItemParent}>

        {/* IMAGE */}
          <View style={[styles.imageContainer, {backgroundColor: lightMode ? '#f0f0f0' : '#333'}]}>
            <Image source={require('./assets/playstation.jpg')} style={styles.image} />
          </View>
        {/* ENDS */}

        {/* ITEM NAME */}
        <View style={styles.itemNameContainer}>
          <Text style={[styles.text, { color: lightMode ? '#000' : '#fff' }]}>
            Playstation 5
          </Text>
          <Text style={[styles.text, { color: lightMode ? '#000' : '#fff' }]}>
            R7000
          </Text>
        </View>
        {/* ENDS */}

        {/* DESCRIPTION */}
        <Text style={[styles.text, { color: lightMode ? '#000' : '#fff' }]}>
        The syntax you provided for the style prop in the component is incorrect. The issue lies in the way  trying to conditionally set the color property inside the array.
        </Text>
        {/* ENDS */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={() => setOnPay(true)}>
            <Text style={styles.buttonText}>Checkout</Text>
          </TouchableOpacity>
        </View>
      </View>

    }
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,

  },

  ItemParent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    gap: 10,
    width: '100%'
  },

  // BUTTON
  button: 
  {
    width: '100%',
    height: 50,
    backgroundColor: '#007bff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginVertical: 10
  },

  buttonText: 
  {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },

  // IMAGE
  imageContainer: 
  {
    padding: 20,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10
  },

  image: 
  {
    width: 300,
    height: 250,
    resizeMode: 'contain',

  },

  itemNameContainer:
  {
    paddingVertical: 10,
    marginVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%'
  },

  text:
  {
    fontSize: 18,
    fontWeight: 600,
  },

  buttonContainer:
  {
    width: '100%',
    marginVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  }

});
