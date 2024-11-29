import React, { useRef } from 'react';
import { Paystack, paystackProps } from 'react-native-paystack-webview';
import { View, TouchableOpacity, Text } from 'react-native';

function Pay({onClose, selectedItem}) {
  // Ref to interact with Paystack WebView component
  const paystackWebViewRef = useRef(paystackProps.PayStackRef);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {/* Paystack Webview for handling payment */}
      <Paystack
        paystackKey="pk_test_97ccd94767aae209e33c425d6e12a0b6357464a6" 
        billingEmail="okpoco15@gmail.com"
        currency='ZAR' 
        amount={selectedItem.price}
        reference={'ORDER_1234567890'}
        lastName='Poco'
        firstName='Oscar'
        billingName={selectedItem.name}

        onCancel={(e) => {
          // Handle the payment cancellation
          console.log('Payment cancelled', e);
        }}
        onSuccess={(res) => {
          // Handle successful payment response
          console.log('Payment successful', res);
          alert(`Payment Successful! Payment ID: ${res.reference}`);
        }}
        ref={paystackWebViewRef}
      />

      {/* Button to trigger payment transaction */}
      <TouchableOpacity
        style={{
          backgroundColor: '#007bff',
          padding: 10,
          borderRadius: 5,
          marginTop: 20,
        }}
        onPress={() => paystackWebViewRef.current?.startTransaction()} 
      >
        <Text style={{ color: '#fff', fontSize: 18 }}>Pay Now</Text>
      </TouchableOpacity>
    </View>
  );
}

export default Pay;
