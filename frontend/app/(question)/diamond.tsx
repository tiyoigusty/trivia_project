import { api } from "@/libs/api";
import axios from "axios";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
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
  const [diamond, setDiamond] = useState<DiamondImage[]>([]);
  const [selectedDiamond, setSelectedDiamond] = useState<Diamond>({
    id: "",
    price: 0,
    quantity: 0,
  });
  const [token, setToken] = useState(null);
  const [showWebview, setShowWebview] = useState(false);

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
    }

    getDataDiamond();
  }, []);

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
        url: `${api}/payment/pay`,
        data: newData,
        headers: {
          "Content-Type": "application/json",
        },
      });
      setToken(response.data.token);
      setShowWebview(true);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      {showWebview && token ? (
        <WebView
          source={{
            uri: `https://app.sandbox.midtrans.com/snap/v2/vtweb/${token}`,
          }}
          onNavigationStateChange={(event) => {
            if (event.url.includes("your-custom-redirect-url")) {
              // Tangani setelah pembayaran selesai
              setShowWebview(false);
              onClose();
            }
          }}
        />
      ) : (
        <View>
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
            <TouchableOpacity
              style={{
                backgroundColor: "cyan",
                padding: 8,
                borderRadius: 5,
                width: 150,
              }}
              onPress={buyDiamond}
            >
              <Text style={{ alignSelf: "center" }}>Purchase</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </>
  );
}
