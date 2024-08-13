import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import {
  Alert,
  Image,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { socket } from "./utils/socket";
import { useRouter } from "expo-router";
import { api } from "@/libs/api";

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

interface Players {
  id: string;
  avatar: string;
  username: string;
}

export default function Question() {
  const router = useRouter();

  const [players, setPlayers] = useState<Players[]>([]);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState<number>(0);
  const [isQuizFinished, setIsQuizFinished] = useState<boolean>(false);
  const [timer, setTimer] = useState<number>(0);

  // State untuk menyimpan di mana pemain memilih jawaban mereka
  const [playerAnswers, setPlayerAnswers] = useState<{
    [key: string]: number | null;
  }>({});

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const userDataString = await AsyncStorage.getItem("players");
        if (userDataString) {
          const userData = JSON.parse(userDataString);

          // Emit joinRoom setelah userId didapatkan
          if (socket && userData.id) {
            socket.emit("players", { id: userData.id });
          }
        }
      } catch (e) {
        console.error("Failed to load user data", e);
      }
    };

    fetchPlayers();
    // Dengarkan event startMatch dari server
    socket.on("startMatch", (data) => {
      console.log("Match data:", data);
    });

    return () => {
      socket.off("startMatch");
    };
  }, []);

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

  // Fungsi untuk menangani pemilihan jawaban oleh pemain
  const handleAnswerSelection = (playerId: string, answerId: number) => {
    setPlayerAnswers((prev) => ({
      ...prev,
      [playerId]: answerId,
    }));
    setSelectedAnswer(answerId);
  };

  const goToNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      setPlayerAnswers({}); // Reset pilihan jawaban pemain
    } else {
      // Alert.alert("Kuis Selesai!", `Skor akhir: ${score}`);
      setQuestions([]);
      setCurrentQuestionIndex(0);
      setScore(0); // Reset skor jika ingin memulai kuis baru
      setIsQuizFinished(true); // Tandai kuis sebagai selesai
      setPlayerAnswers({}); // Reset pilihan jawaban pemain
      router.navigate("/winner");
    }
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
        <View style={styles.container}>
          <View style={styles.subcontainer}>
            {/* Div untuk jawaban kiri */}
            <View style={styles.leftdiv}>
              <View style={styles.avatarcontainer}>
                <View style={styles.avatarsubcontainer}>
                  {players.map((player) => {
                    if (
                      playerAnswers[player.id] ===
                      questions[currentQuestionIndex]?.answere[0].id
                    ) {
                      return (
                        <Image
                          key={player.id}
                          source={{ uri: player.avatar }}
                          style={styles.avatar}
                        />
                      );
                    }
                    return null;
                  })}
                </View>

                {questions.length > 0 && (
                  <TouchableOpacity
                    key={questions[currentQuestionIndex].answere[0].id}
                    onPress={() =>
                      handleAnswerSelection(
                        players[0]?.id,
                        questions[currentQuestionIndex].answere[0].id
                      )
                    }
                  >
                    <Image
                      source={{
                        uri: questions[currentQuestionIndex].answere[0].content,
                      }}
                      style={{ width: 100, height: 100 }}
                    />
                  </TouchableOpacity>
                )}
              </View>
            </View>

            {/* Div untuk jawaban kanan */}
            <View style={styles.rightdiv}>
              <View style={styles.avatarcontainer}>
                <View style={styles.avatarsubcontainer}>
                  {players.map((player) => {
                    if (
                      playerAnswers[player.id] ===
                      questions[currentQuestionIndex]?.answere[1].id
                    ) {
                      return (
                        <Image
                          key={player.id}
                          source={{ uri: player.avatar }}
                          style={styles.avatar}
                        />
                      );
                    }
                    return null;
                  })}
                </View>

                {questions.length > 0 && (
                  <TouchableOpacity
                    key={questions[currentQuestionIndex].answere[1].id}
                    onPress={() =>
                      handleAnswerSelection(
                        players[0]?.id,
                        questions[currentQuestionIndex].answere[1].id
                      )
                    }
                  >
                    <Image
                      source={{
                        uri: questions[currentQuestionIndex].answere[1].content,
                      }}
                      style={{ width: 100, height: 100 }}
                    />
                  </TouchableOpacity>
                )}
              </View>
            </View>

            <View style={styles.containertimer}>
              <View style={styles.timerleft}>
                <Text style={styles.timer}>{timer}</Text>
              </View>
              <View style={styles.timerright}>
                <Text style={{ fontSize: 20 }}>
                  Player Remaining: <Text style={{ color: "#5881ff" }}>3</Text>
                </Text>
              </View>
            </View>

            <View style={styles.containerquestion}>
              <Text style={{ fontSize: 20 }}>
                {questions.length > 0
                  ? questions[currentQuestionIndex].content
                  : "Loading..."}
              </Text>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    paddingHorizontal: 30,
    paddingVertical: 20,
  },
  subcontainer: {
    width: "100%",
    height: "97%",
    marginTop: 25,
    backgroundColor: "#rgba(250,250,250, .3)",
    borderRadius: 20,
    display: "flex",
    flexDirection: "row",
  },
  leftdiv: {
    flex: 1,
    alignItems: "center",
    marginTop: 200,
    borderRightWidth: 2,
    borderStyle: "dashed",
  },
  rightdiv: {
    flex: 1,
    alignItems: "center",
    marginTop: 200,
    borderLeftWidth: 2,
    borderStyle: "dashed",
  },
  avatarcontainer: {
    height: "95%",
    position: "absolute",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: 10,
    marginTop: 10,
  },
  avatarsubcontainer: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    flexDirection: "row",
    gap: 5,
  },
  avatar: {
    width: 45,
    height: 45,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "black",
  },

  containertimer: {
    position: "absolute",
    top: 0,
    left: "50%",
    transform: [{ translateX: -110 }],
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
  timerleft: {
    backgroundColor: "#e474ba",
    width: 50,
    height: 50,
    padding: 5,
    borderWidth: 2,
    borderRadius: 50,
    zIndex: 10,
  },
  timer: {
    fontSize: 30,
    color: "#5881ff",
    alignSelf: "center",
    lineHeight: 45,
  },
  timerright: {
    backgroundColor: "#e474ba",
    padding: 5,
    borderWidth: 2,
    borderRadius: 5,
    paddingLeft: 30,
    marginLeft: -25,
    zIndex: 9,
  },

  containerquestion: {
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
  },
});
