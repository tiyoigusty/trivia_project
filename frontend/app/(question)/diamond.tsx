import { LinearGradient } from "expo-linear-gradient";
import { ActivityIndicator, Alert, Button, Image, Modal, Text, TouchableOpacity, View } from "react-native";
import axios from 'axios';
import { useEffect, useState } from "react";
import WebView from "react-native-webview";

export default function Diamond({ onClose }: { onClose: any }) {
  const [loading, setLoading] = useState<boolean>(true);
  const [snapToken, setSnapToken] = useState<string | null>(null);
  const [showWebView, setShowWebView] = useState<boolean>(false);

  useEffect(() => {
    const fetchSnapToken = async () => {
      try {
        const response = await axios.post('https://4f5b-2404-8000-1005-37ac-a470-9579-5a3-c59b.ngrok-free.app/payment/create', {
          orderId: 'order-id-example',
          amount: 100000,
        });
        const snapToken = response.data;
        setSnapToken(snapToken);
      } catch (error) {
        Alert.alert('Error', 'Failed to fetch Snap token');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchSnapToken();
  }, []);

  const handlePayNow = () => {
    setShowWebView(true);
  };


  return (
    <View>
      <Modal
        visible={showWebView}
        animationType="slide"
        transparent={false}
        onRequestClose={() => setShowWebView(false)}
      >
        {snapToken && (
          <WebView
            source={{ uri: `https://app.sandbox.midtrans.com/snap/v2/vtweb/${snapToken}` }}
            style={{ marginTop: 20, width: '100%', height: '100%' }}
            onNavigationStateChange={(event) => {
              if (event.url.includes('transaction-status')) {
                console.log('Transaction finished', event.url);
                Alert.alert('Success', 'Pembayaran berhasil!');
                setShowWebView(false);
                onClose(); // Tutup modal atau layar setelah pembayaran selesai
              }
            }}
          />
        )}
        {!snapToken && (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Loading payment...</Text>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        )}
      </Modal>
      <View
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "row",
          gap: 20,
          flexWrap: "wrap",
        }}
      >
        <LinearGradient
          colors={["#e474ba", "#5881ff"]}
          start={{ x: 1, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{ width: 100, height: 120, borderRadius: 10 }}
        >
          <View
            style={{
              height: "100%",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={{ fontSize: 20 }}>100</Text>
            <Image
              source={require("@/assets/icons/diamond1.png")}
              style={{ marginVertical: 10 }}
            />
            <Text style={{ fontSize: 20 }}>Rp 100.000</Text>
          </View>
        </LinearGradient>
        <LinearGradient
          colors={["#e474ba", "#5881ff"]}
          start={{ x: 1, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{ width: 100, height: 120, borderRadius: 10 }}
        >
          <View
            style={{
              height: "100%",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={{ fontSize: 20 }}>250</Text>
            <Image
              source={require("@/assets/icons/diamond2.png")}
              style={{ marginVertical: 10 }}
            />
            <Text style={{ fontSize: 20 }}>Rp 37.000</Text>
          </View>
        </LinearGradient>
        <LinearGradient
          colors={["#e474ba", "#5881ff"]}
          start={{ x: 1, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{ width: 100, height: 120, borderRadius: 10 }}
        >
          <View
            style={{
              height: "100%",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={{ fontSize: 20 }}>500</Text>
            <Image
              source={require("@/assets/icons/diamond3.png")}
              style={{ marginVertical: 10 }}
            />
            <Text style={{ fontSize: 20 }}>Rp 69.000</Text>
          </View>
        </LinearGradient>
        <LinearGradient
          colors={["#e474ba", "#5881ff"]}
          start={{ x: 1, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{ width: 100, height: 120, borderRadius: 10 }}
        >
          <View
            style={{
              height: "100%",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={{ fontSize: 20 }}>1.000</Text>
            <Image
              source={require("@/assets/icons/diamond4.png")}
              style={{ marginVertical: 10 }}
            />
            <Text style={{ fontSize: 20 }}>Rp 135.000</Text>
          </View>
        </LinearGradient>
        <LinearGradient
          colors={["#e474ba", "#5881ff"]}
          start={{ x: 1, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{ width: 100, height: 120, borderRadius: 10 }}
        >
          <View
            style={{
              height: "100%",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={{ fontSize: 20 }}>5.000</Text>
            <Image
              source={require("@/assets/icons/diamond5.png")}
              style={{ marginVertical: 10 }}
            />
            <Text style={{ fontSize: 20 }}>Rp 250.000</Text>
          </View>
        </LinearGradient>
        <LinearGradient
          colors={["#e474ba", "#5881ff"]}
          start={{ x: 1, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{ width: 100, height: 120, borderRadius: 10 }}
        >
          <View
            style={{
              height: "100%",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={{ fontSize: 20 }}>10.000</Text>
            <Image
              source={require("@/assets/icons/diamond6.png")}
              style={{ marginVertical: 10 }}
            />
            <Text style={{ fontSize: 20 }}>Rp 516.000</Text>
          </View>
        </LinearGradient>
      </View>

      <View
        style={{
          marginTop: 50,
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          gap: 20,
        }}
      >
        <TouchableOpacity
          style={{
            backgroundColor: "red",
            padding: 8,
            borderRadius: 5,
            width: 150,
          }}
          onPress={onClose}
        >
          <Text style={{ alignSelf: "center" }}>Cancel</Text>
        </TouchableOpacity>
        {/* Menampilkan Loading Indicator saat mengambil Snap Token */}
        {loading && <ActivityIndicator size="large" color="#0000ff" />}

        {/* Tombol 'Pay Now' akan muncul jika Snap Token tidak ada dan tidak loading */}
        {!loading && snapToken && (
          <Button title="Pay Now" onPress={handlePayNow} />
        )}
        {/* <TouchableOpacity
          style={{
            backgroundColor: "red",
            padding: 8,
            borderRadius: 5,
            width: 150,
          }}
          onPress={onClose}
        >
          <Text style={{ alignSelf: "center" }}>Cancel</Text>
        </TouchableOpacity> */}
      </View>
    </View>
  );
}
