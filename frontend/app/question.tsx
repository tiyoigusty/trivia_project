import { Link } from "expo-router";
import {
  Alert,
  Button,
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { api } from "@/libs/api";
import { useQuery } from "@tanstack/react-query";
import { getToken } from "@/libs/storage";
import axios from "axios";
import { FontAwesome } from "@expo/vector-icons";

interface Answere {
  id: number;
  content: string;
  is_correct: boolean;
}

interface Question {
  id: string;
  content: string;
  answere: Answere[];
  max_score: number;
  timer: number;
}

export default function Question() {
  const router = useRouter();

  const { data: userData } = useQuery({
    queryKey: ["user"],
    queryFn: getDataUser,
  });

  async function getDataUser() {
    const token = await getToken();
    const response = await axios({
      method: "get",
      url: `${api}/avatar/user`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  }

  const DataUser = userData?.data;

  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState<number>(0);
  const [isQuizFinished, setIsQuizFinished] = useState<boolean>(false);
  const [timer, setTimer] = useState<number>(0);

  useEffect(() => {
    if (questions.length > 0 && !isQuizFinished) {
      const question = questions[currentQuestionIndex];
      setTimer(question.timer);

      const intervalId = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            clearInterval(intervalId);
            submitAnswer(); // Kirim jawaban secara otomatis jika waktu habis
            goToNextQuestion(); // Pindah ke soal berikutnya
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(intervalId);
    }
  }, [currentQuestionIndex, questions, isQuizFinished]);

  const fetchQuestions = async () => {
    try {
      const response = await fetch(`${api}/quiz/questions`); // Sesuaikan dengan URL backend kamu
      const data = await response.json();
      if (data.length > 0) {
        setQuestions(data);
        setCurrentQuestionIndex(0); // Mulai dari pertanyaan pertama
        setIsQuizFinished(false); // Reset status kuis selesai
      } else {
        Alert.alert("Info", "Tidak ada pertanyaan tersedia.");
      }
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  const submitAnswer = async () => {
    if (selectedAnswer === null || questions.length === 0) {
      return;
    }

    const question = questions[currentQuestionIndex];
    const selected = question.answere.find((ans) => ans.id === selectedAnswer);
    if (!selected) {
      return;
    }

    const answerDto = {
      questionId: question.id,
      answerId: selectedAnswer,
      userId: DataUser.userId, // Ganti dengan ID pengguna sebenarnya
    };

    try {
      const response = await fetch(`${api}/quiz/answer`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(answerDto),
      });
      const result = await response.json();

      if (selected.is_correct) {
        setScore((prevScore) => prevScore + result.score);
      }
      setSelectedAnswer(null); // Reset jawaban yang dipilih
    } catch (error) {
      console.error("Error submitting answer:", error);
    }
  };

  const goToNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    } else {
      Alert.alert("Kuis Selesai!", `Skor akhir: ${score}`);
      setQuestions([]);
      setCurrentQuestionIndex(0);
      setScore(0); // Reset skor jika ingin memulai kuis baru
      setIsQuizFinished(true); // Mark the quiz as finished
    }
  };

  const handleBack = () => {
    router.navigate("/home");
  };

  return (
    <ImageBackground
      style={{
        height: "100%",
        width: "100%",
      }}
      source={require("@/assets/images/background.jpg")}
    >
      <SafeAreaView>
        <View
          style={{
            width: "100%",
            height: "100%",
            paddingHorizontal: 30,
            paddingVertical: 20,
          }}
        >
          <View
            style={{
              width: "100%",
              height: "100%",
              backgroundColor: "#rgba(250,250,250, .3)",
              borderRadius: 20,
              display: "flex",
              flexDirection: "row",
            }}
          >
            <View
              style={{
                flex: 1,
                alignItems: "center",
                alignSelf: "flex-end",
                marginBottom: 20,
                borderRightWidth: 2,
                borderStyle: "dashed",
                height: "70%",
              }}
            ></View>
            <View
              style={{
                flex: 1,
                alignItems: "center",
                alignSelf: "flex-end",
                marginBottom: 20,
              }}
            ></View>

            <View
              style={{
                position: "absolute",
                top: 0,
                left: "50%",
                transform: [{ translateX: -110 }],
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                marginTop: 20,
              }}
            >
              <View
                style={{
                  backgroundColor: "#e474ba",
                  width: 50,
                  height: 50,
                  padding: 5,
                  borderWidth: 2,
                  borderRadius: 50,
                  zIndex: 10,
                }}
              >
                <Text
                  style={{
                    fontSize: 30,
                    color: "#5881ff",
                    alignSelf: "center",
                    lineHeight: 45,
                  }}
                >
                  {timer}
                </Text>
              </View>
              <View
                style={{
                  backgroundColor: "#e474ba",
                  padding: 5,
                  borderWidth: 2,
                  borderRadius: 5,
                  paddingLeft: 30,
                  marginLeft: -25,
                  zIndex: 9,
                }}
              >
                <Text style={{ fontSize: 20 }}>
                  Player Remaining: <Text style={{ color: "#5881ff" }}>20</Text>
                </Text>
              </View>
            </View>

            <View
              style={{
                position: "absolute",
                top: 80,
                left: "50%",
                transform: [{ translateX: -125 }],
                marginTop: 10,
                padding: 20,
                width: 250,
                height: 100,
                alignSelf: "center",
                backgroundColor: "#rgba(250,250,250, .6)",
                borderWidth: 1,
                borderRadius: 10,
                zIndex: 9,
              }}
            >
              <Text style={{ fontSize: 20 }}>
                {questions.length > 0
                  ? questions[currentQuestionIndex].content
                  : "Loading..."}
              </Text>
            </View>

            <View
              style={{
                position: "absolute",
                bottom: 130,
                left: "50%",
                transform: [{ translateX: -150 }],
                marginTop: 10,
                width: 300,
                alignSelf: "center",
                borderRadius: 10,
              }}
            >
              <View
                style={{
                  position: "absolute",
                  left: "50%",
                  transform: [{ translateX: -140 }],
                  marginBottom: 20,
                  display: "flex",
                  flexDirection: "row",
                  gap: 80,
                }}
              >
                {questions.length > 0 &&
                  questions[currentQuestionIndex].answere.map((ans) => (
                    <TouchableOpacity
                      key={ans.id}
                      onPress={() => setSelectedAnswer(ans.id)}
                    >
                      <Image
                        source={{ uri: ans.content }}
                        style={{ width: 100, height: 100 }}
                      />
                    </TouchableOpacity>
                  ))}
              </View>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}
