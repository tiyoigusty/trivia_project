import { io } from "socket.io-client";

const URL = process.env.EXPO_PUBLIC_NGROK_URL as string;

export const socket = io(URL);
