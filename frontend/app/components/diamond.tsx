import { api } from "@/libs/api";
import axios from "axios";
import { LinearGradient } from "expo-linear-gradient";
import {
  ActivityIndicator,
  Alert,
  Image,
  Modal,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useState } from "react";
import { WebView } from "react-native-webview";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

type Diamond = {
  id: string;
  quantity: number;
  price: number;
};

interface DiamondImage extends Diamond {
  image: any;
}

export default function Diamond({
  onClose,
  data,
}: {
  onClose: any;
  data: any;
}) {
  const [snapToken, setSnapToken] = useState<string | null>(null);
  const [showWebView, setShowWebView] = useState<boolean>(false);
  const [selectedDiamond, setSelectedDiamond] = useState<Diamond>({
    id: "",
    price: 0,
    quantity: 0,
  });

  const queryClient = useQueryClient();

  const {
    data: diamondData,
    refetch,
    error,
    isLoading,
  } = useQuery<DiamondImage[]>({
    queryKey: ["diamond"],
    queryFn: async () => {
      const response = await axios.get<Diamond[]>(`${api}/diamond`);

      return response.data.map((data, index) => {
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
    },
  });

  const buyDiamondMutation = useMutation({
    mutationFn: async () => {
      const newData = {
        user_id: data.id,
        diamond_id: selectedDiamond.id,
      };

      const response = await axios.post(`${api}/payment/pay`, newData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      setSnapToken(response.data.token);
      setShowWebView(true);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      refetch();
    },
  });

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Error loading data...</Text>
      </View>
    );
  }

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
                onClose();
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
        {diamondData?.map((data) => (
          <LinearGradient
            colors={["#e474ba", "#5881ff"]}
            start={{ x: 1, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{ width: 100, height: 120, borderRadius: 10 }}
            key={data.id}
          >
            <TouchableOpacity
              onPress={() => setSelectedDiamond(data)}
              style={{
                height: "100%",
                alignItems: "center",
                justifyContent: "center",
                borderWidth: 3,
                borderRadius: 10,
                borderColor:
                  selectedDiamond.id === data.id ? "yellow" : "white",
              }}
            >
              <Text style={{ fontSize: 20 }}>{data.quantity}</Text>
              <Image source={data.image} style={{ marginVertical: 10 }} />
              <Text style={{ fontSize: 20 }}>Rp {data.price}</Text>
            </TouchableOpacity>
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

        {!snapToken && (
          <TouchableOpacity
            style={{
              backgroundColor: "cyan",
              padding: 8,
              borderRadius: 5,
              width: 150,
            }}
            onPress={() => buyDiamondMutation.mutate()}
          >
            <Text style={{ alignSelf: "center" }}>Purchase</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}
