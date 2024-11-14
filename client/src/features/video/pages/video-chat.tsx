import { X, Mic, Video, Phone } from "lucide-react";
import { useSocket } from "../context/SocketProvider";
import { useCallback, useEffect, useRef, useState } from "react";
import peer from "../services/peer";

const VideoChat = () => {
  const socket = useSocket();
  const [remoteSocketId, setRemoteSocketId] = useState(null);
  const [myStream, setMyStream] = useState<MediaStream | any>(null);
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
  const myVideoRef = useRef<HTMLVideoElement>(null);
  const remoteStreamRef = useRef<HTMLVideoElement>(null);

  const remoteSocketIdRef = useRef<string | null>(null); //new

  const handleuserJoined = useCallback(async ({ email, id }) => {
    console.log(`email ${email} joined room ${id}`);
    setRemoteSocketId(id); // This will trigger the useEffect below
    remoteSocketIdRef.current = id;
  }, []);
  // for calling other end user

  // const handleCallUser = useCallback(async () => {
  //   // currect user stream
  //   const stream = await navigator.mediaDevices.getUserMedia({
  //     audio: true,
  //     video: true,
  //   });

  //   const offer = await peer.getOffer();
  //   // to which user
  //   socket.emit("user:call", { to: remoteSocketId, offer });

  //   setMyStream(stream);
  //   if (myVideoRef.current) {
  //     myVideoRef.current.srcObject = stream;
  //   }
  // }, []);

  useEffect(() => {
    if (!remoteSocketId) return;

    const callUser = async () => {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      });
      setMyStream(stream);

      if (myVideoRef.current) {
        myVideoRef.current.srcObject = stream;
      }

      const offer = await peer.getOffer();
      socket.emit("user:call", { to: remoteSocketId, offer });
    };

    callUser();
  }, [remoteSocketId, socket]); //new

  const handleIncomingCall = useCallback(
    async ({ from, offer }) => {
      setRemoteSocketId(from);
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      });
      setMyStream(stream);
      console.log(`Incoming call from ${from}`, offer);
      const ans = await peer.getAnswer(offer);
      socket.emit("call:accepted", { to: from, ans });
    },
    [socket]
  );

  //accept call

  const handleCallAccpeted = useCallback(
    async ({ to, ans }) => {
      await peer.setLocalDescription(ans);
      console.log("call accepted", ans);

      //   myStream is not null or undefined before accessing its getTracks method avoid er
      if (myStream) {
        for (const track of myStream.getTracks()) {
          peer.peer.addTrack(track, myStream);
        }
      }
    },
    [myStream]
  );

  const handleNegoNeeded = useCallback(async () => {
    const offer = await peer.getOffer();
    socket.emit("peer:nego:needed", { offer, to: remoteSocketId });
  }, [remoteSocketId, socket]);

  const handleNegoNeededIncoming = useCallback(
    async ({ from, offer }) => {
      const ans = await peer.getAnswer(offer);
      socket.emit("peer:nego:done", { to: from, ans });
    },
    [socket]
  );

  const handleNegoFinal = useCallback(
    async ({ ans }) => {
      await peer.setLocalDescription(ans);
    },
    [socket]
  );

  useEffect(() => {
    peer.peer.addEventListener("negotiationneeded", handleNegoNeeded);

    return () => {
      peer.peer.removeEventListener("negotiationneeded", handleNegoNeeded);
    };
  }, [handleNegoNeeded]);

  useEffect(() => {
    peer.peer.addEventListener("track", (ev) => {
      const [stream] = ev.streams;
      setRemoteStream(stream);
      if (remoteStreamRef.current) {
        remoteStreamRef.current.srcObject = stream;
      }
    });
  }, []);

  useEffect(() => {
    // when new user joined
    socket.on("user:joined", handleuserJoined);
    socket.on("incoming:call", handleIncomingCall);
    socket.on("call:accepted", handleCallAccpeted);
    socket.on("peer:nego:needed", handleNegoNeededIncoming);
    socket.on("peer:nego:final", handleNegoFinal);

    return () => {
      socket.off("user:joined", handleuserJoined);
      socket.off("incoming:call", handleIncomingCall);
      socket.off("call:accepted", handleCallAccpeted);
      socket.off("peer:nego:final", handleNegoFinal);
    };
  }, [
    socket,
    handleuserJoined,
    handleCallAccpeted,
    handleIncomingCall,
    handleNegoNeededIncoming,
    handleNegoFinal,
  ]);

  return (
    <div className="bg-gray-900 min-h-[100vh] overflow-hidden flex flex-col">
      <div className="flex-1 sm:max-h-[100vh] relative bg-black">
        <h1 className="text-white">
          {remoteSocketId ? "you are connected" : "no in ine room"}
        </h1>
        <video
          className="w-full h-full object-cover"
          autoPlay
          playsInline
          ref={remoteStreamRef}
        />
        <div className="absolute top-4 w-[230px] left-4 aspect-video bg-black rounded-lg overflow-hidden shadow-lg border border-white">
          <video
            ref={myVideoRef}
            className="w-full h-full object-cover"
            autoPlay
            playsInline
            muted
          />
        </div>
        <div className="flex absolute bottom-6 left-1/2 transform -translate-x-1/2 gap-4">
          <button className="bg-purple-500 text-white p-4 rounded-full">
            <Mic className="h-6 w-6" />
          </button>
          <button className="bg-purple-500 text-white p-4 rounded-full">
            <Video className="h-6 w-6" />
          </button>
          <button className="bg-red-500 text-white p-4 rounded-full">
            <Phone className="h-6 w-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoChat;
