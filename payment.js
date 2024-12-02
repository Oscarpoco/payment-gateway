import React, { useRef } from 'react';
import { Paystack, paystackProps } from 'react-native-paystack-webview';
import { View, TouchableOpacity, Text } from 'react-native';

function Pay({ selectedItem, quantity, onClose }) {
  const paystackWebViewRef = useRef(paystackProps.PayStackRef);

  const generateReference = () => `ORDER_${Date.now()}`;

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
     
      <Paystack
        paystackKey="pk_test_97ccd94767aae209e33c425d6e12a0b6357464a6"
        billingEmail="okpoco15@gmail.com"
        currency="ZAR"
        amount={parseFloat(selectedItem?.price || 0) * quantity}
        reference={generateReference()}
        lastName="Poco"
        firstName="Oscar"
        billingName={selectedItem?.name || 'Unknown Item'}
        onCancel={(e) => {
          alert('Payment Cancelled!');
          onClose();
        }}
        onSuccess={(res) => {
          alert(`Payment Successful! Reference: ${res.reference}`);
          onClose();
        }}
        ref={paystackWebViewRef}
      />

      {/* Trigger payment */}
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
