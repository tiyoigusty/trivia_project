import { api } from "@/libs/api";
import axios from "axios";
import { LinearGradient } from "expo-linear-gradient";
import {
  ActivityIndicator,
  Alert,
  Button,
  Image,
  Modal,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useEffect, useState } from "react";
import WebView from "react-native-webview";

type Diamond = {
  id: string;
  quantity: number;
  price: number;
};

interface DiamondImage extends Diamond {
  image: any; // Ubah tipe menjadi any agar dapat menerima hasil require
}

export default function Diamond({ onClose }: { onClose: any }) {
  // const [loading, setLoading] = useState<boolean>(true);
  const [snapToken, setSnapToken] = useState<string | null>(null);
  const [showWebView, setShowWebView] = useState<boolean>(false);
  const [diamond, setDiamond] = useState<DiamondImage[]>([]);
  const [selectedDiamond, setSelectedDiamond] = useState<Diamond>({
    id: "",
    price: 0,
    quantity: 0,
  });

  useEffect(() => {
    async function getDataDiamond() {
      const response = await axios.get<Diamond[]>(`${api}/diamond`);

      const dataDiamond = response.data.map((data, index) => {
        let image: any;

        switch (index) {
          case 0:
            image = require("@/assets/icons/diamond1.png");
            break;
          case 1:
            image = require("@/assets/icons/diamond2.png");
            break;
          case 2:
            image = require("@/assets/icons/diamond3.png");
            break;
          case 3:
            image = require("@/assets/icons/diamond4.png");
            break;
          case 4:
            image = require("@/assets/icons/diamond5.png");
            break;
          case 5:
            image = require("@/assets/icons/diamond6.png");
            break;
        }

        return {
          id: data.id,
          quantity: data.quantity,
          price: data.price,
          image,
        };
      });
      setDiamond(dataDiamond);
      console.log("ini data diamond", dataDiamond);
    }

    getDataDiamond();
  }, []);

  // useEffect(() => {
  //   const fetchSnapToken = async () => {
  //     try {
  //       const response = await axios.post(
  //         "https://4f5b-2404-8000-1005-37ac-a470-9579-5a3-c59b.ngrok-free.app/payment/create",
  //         {
  //           orderId: "order-id-example",
  //           amount: 100000,
  //         }
  //       );
  //       const snapToken = response.data;
  //       setSnapToken(snapToken);
  //     } catch (error) {
  //       Alert.alert("Error", "Failed to fetch Snap token");
  //       console.error(error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchSnapToken();
  // }, []);

  async function buyDiamond(data: any) {
    try {
      const newData = {
        ...data,
        user_id: Date.now(),
        diamond_id: selectedDiamond.id,
        amount: selectedDiamond.price,
      };

      const response = await axios({
        method: "post",
        url: `https://330c-2404-8000-1005-37ac-6d66-e6ab-4dee-9423.ngrok-free.app/payment/pay`,
        data: newData,
        headers: {
          "Content-Type": "application/json",
        },
      });

      setSnapToken(response.data.token);
      console.log("buy", response.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {});

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
            source={{
              uri: `https://app.sandbox.midtrans.com/snap/v2/vtweb/${snapToken}`,
            }}
            style={{ marginTop: 20, width: "100%", height: "100%" }}
            onNavigationStateChange={(event) => {
              if (event.url.includes("transaction-status")) {
                console.log("Transaction finished", event.url);
                Alert.alert("Success", "Pembayaran berhasil!");
                setShowWebView(false);
                onClose(); // Tutup modal atau layar setelah pembayaran selesai
              }
            }}
          />
        )}
        {!snapToken && (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
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
        {diamond.map((data) => (
          <LinearGradient
            colors={["#e474ba", "#5881ff"]}
            start={{ x: 1, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{ width: 100, height: 120, borderRadius: 10 }}
            key={data.id}
          >
            {selectedDiamond == data ? (
              <TouchableOpacity
                onPress={() => {
                  setSelectedDiamond(data);
                }}
                style={{
                  height: "100%",
                  alignItems: "center",
                  justifyContent: "center",
                  borderWidth: 3,
                  borderRadius: 10,
                  borderColor: "yellow",
                }}
              >
                <Text style={{ fontSize: 20 }}>{data.quantity}</Text>
                <Image source={data.image} style={{ marginVertical: 10 }} />
                <Text style={{ fontSize: 20 }}>Rp {data.price}</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => {
                  setSelectedDiamond(data);
                }}
                style={{
                  height: "100%",
                  alignItems: "center",
                  justifyContent: "center",
                  borderWidth: 2,
                  borderRadius: 10,
                  borderColor: "white",
                }}
              >
                <Text style={{ fontSize: 20 }}>{data.quantity}</Text>
                <Image source={data.image} style={{ marginVertical: 10 }} />
                <Text style={{ fontSize: 20 }}>Rp {data.price}</Text>
              </TouchableOpacity>
            )}
          </LinearGradient>
        ))}
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

        {/* {loading && <ActivityIndicator size="large" color="#0000ff" />} */}

        {!snapToken && (
          <TouchableOpacity
            style={{
              backgroundColor: "cyan",
              padding: 8,
              borderRadius: 5,
              width: 150,
            }}
            onPress={handlePayNow}
          >
            <Text style={{ alignSelf: "center" }}>Purchase</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}
