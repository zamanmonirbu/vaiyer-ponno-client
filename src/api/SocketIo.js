import { io } from "socket.io-client";

const socketIo = io('http://localhost:8800'); 

export default socketIo;
