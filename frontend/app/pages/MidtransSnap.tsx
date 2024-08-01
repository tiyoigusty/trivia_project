import React, { useState, useEffect } from 'react';
import { View, Button, ActivityIndicator, Text } from 'react-native';
import WebView from 'react-native-webview';
import axios from 'axios';

export default function PaymentScreen() {
    const [snapToken, setSnapToken] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const fetchSnapToken = async () => {
        try {
            setLoading(true);
            // Panggil API backend Anda untuk mendapatkan snap token
            const response = await axios.post('https://your-backend-url.com/payment/create', {
                orderId: 'order-id-example',
                amount: 100000,
            });
            setSnapToken(response.data.token);
            setLoading(false);
        } catch (error) {
            console.log('Error fetching Snap token:', error);
            setLoading(false);
        }
    };

    const handlePayNow = () => {
        fetchSnapToken();
    };

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            {loading && <ActivityIndicator size="large" color="#0000ff" />}
            {!loading && !snapToken && (
                <Button title="Pay Now" onPress={handlePayNow} />
            )}
            {snapToken && (
                <WebView
                    source={{ uri: `https://app.sandbox.midtrans.com/snap/v2/vtweb/${snapToken}` }}
                    style={{ marginTop: 20, width: '100%', height: '100%' }}
                    onNavigationStateChange={(event) => {
                        if (event.url.includes('transaction-status')) {
                            // Logic untuk menangani setelah pembayaran selesai
                            console.log('Transaction finished', event.url);
                        }
                    }}
                />
            )}
            {!loading && snapToken && (
                <Text style={{ alignSelf: 'center', marginTop: 20 }}>Processing Payment...</Text>
            )}
        </View>
    );
}