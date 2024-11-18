import { useToast } from "@/hooks/use-toast";
import { usegetUser } from "@/hooks/usegetUser";
import { Mic, Video, MicOff, VideoOff, PhoneOff } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { io } from "socket.io-client";
const VideoChat = () => {
  const [isMuted, setIsMuted] = useState(false);
  const [videoMuted, setVideoMuted] = useState(false);
  const { roomId } = useParams();
  const userVideo = useRef<HTMLVideoElement | null>(null);
  const partnerVideo = useRef<HTMLVideoElement | null>(null);
  const peerRef = useRef<RTCPeerConnection | null>(null);
  const socketRef = useRef<any>(null);
  const otherUser = useRef<string | null>(null);
  const userStream = useRef<MediaStream | null>(null);
  const user = usegetUser();

  const { toast } = useToast();

  const navigate = useNavigate();
  console.log(user, "user");

  useEffect(() => {
    return () => {
      if (userStream.current) {
        userStream.current.getTracks().forEach((track) => track.stop());
      }
      if (peerRef.current) {
        peerRef.current.close();
      }
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, []);

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ audio: true, video: true })
      .then((stream) => {
        if (userVideo.current) {
          userVideo.current.srcObject = stream;
          userVideo.current.style.transform = "scaleX(-1)";
        }
        userStream.current = stream;

        socketRef.current = io("http://localhost:3004", {
          transports: ["websocket"],
          reconnection: true,
        });
        // for other party i mean already user name
        const payload = {
          roomId: roomId,
          name: user?.name,
        };
        socketRef.current.emit("join-room", payload);

        socketRef.current.on("other user", (userId: string) => {
          callUser(userId);
          otherUser.current = userId;
        });

        socketRef.current.on("user joined", (payload: { userId: string; name: string }) => {
            console.log(payload,"payload from user")
            otherUser.current = payload.userId;
            toast({
              title: `${payload.name} has joined the meeting`,
            });            
          }
        );
        socketRef.current.on("offer", handleRecieveCall);
        socketRef.current.on("answer", handleAnswer);
        socketRef.current.on("ice-candidate", handleNewICECandidateMsg);
      })
      .catch((error) => {
        console.error("err accessing media devices:", error);
      });
  }, [roomId]);

  const createPeer = (userID?: string) => {
    const peer = new RTCPeerConnection({
      iceServers: [
        {
          urls: [
            "stun:stun.l.google.com:19302",
            "stun:global.stun.twilio.com:3478",
          ],
        },
      ],
    });

    // This event triggers when the browser detects a new ICE candidate
    peer.onicecandidate = handleICECandidateEvent;
    // This event triggers when a new media stream track (audio/video) is received from the other peer. It allows you to display the incoming media (e.g., video) on the screen
    peer.ontrack = handleTrackEvent;

    if (userID) {
      peer.onnegotiationneeded = () => handleNegotiationNeededEvent(userID);
    }

    return peer;
  };

  const callUser = (userID: string) => {
    peerRef.current = createPeer(userID);
    userStream.current?.getTracks().forEach((track) => {
      if (userStream.current) {
        peerRef.current?.addTrack(track, userStream.current);
      }
    });
  };

  const handleNegotiationNeededEvent = async (userID: string) => {
    try {
      const offer = await peerRef.current?.createOffer();
      if (!peerRef.current || !offer) return;

      await peerRef.current.setLocalDescription(offer);

      const payload = {
        target: userID,
        caller: socketRef.current.id,
        sdp: peerRef.current.localDescription,
      };
      socketRef.current.emit("offer", payload);
    } catch (err) {
      console.error("err during negotiation:", err);
    }
  };

  const handleRecieveCall = async (incoming: any) => {
    peerRef.current = createPeer();
    try {
      const desc = new RTCSessionDescription(incoming.sdp);
      await peerRef.current?.setRemoteDescription(desc);

      userStream.current?.getTracks().forEach((track) => {
        if (userStream.current && peerRef.current) {
          peerRef.current.addTrack(track, userStream.current);
        }
      });

      const answer = await peerRef.current?.createAnswer();
      await peerRef.current?.setLocalDescription(answer);

      const payload = {
        target: incoming.caller,
        caller: socketRef.current.id,
        sdp: peerRef.current?.localDescription,
      };
      socketRef.current.emit("answer", payload);
    } catch (err) {
      console.error("err handling incoming call:", err);
    }
  };

  const handleAnswer = (message: any) => {
    const desc = new RTCSessionDescription(message.sdp);
    peerRef.current
      ?.setRemoteDescription(desc)
      .catch((err) => console.error("err setting remote description:", err));
  };

  const handleICECandidateEvent = (e: RTCPeerConnectionIceEvent) => {
    if (e.candidate && otherUser.current) {
      const payload = {
        target: otherUser.current,
        candidate: e.candidate,
      };
      socketRef.current.emit("ice-candidate", payload);
    }
  };

  const handleNewICECandidateMsg = (incoming: RTCIceCandidate) => {
    const candidate = new RTCIceCandidate(incoming);
    peerRef.current
      ?.addIceCandidate(candidate)
      .catch((err) => console.error("err adding ICE candidate:", err));
  };

  const handleTrackEvent = (e: RTCTrackEvent) => {
    if (partnerVideo.current) {
      partnerVideo.current.srcObject = e.streams[0];
    }
  };

  //for toggle mic muting
  const handleMuteMice = () => {
    if (userStream.current) {
      const isEnabled = userStream.current.getAudioTracks()[0].enabled;
      console.log(isEnabled, "isenables");
      userStream.current.getAudioTracks().forEach((track) => {
        track.enabled = !isEnabled;
      });
      setIsMuted(!isMuted);
    }
  };

  const handleToggleVideo = () => {
    if (userStream.current) {
      const isEnabled = userStream.current.getVideoTracks()[0].enabled;
      console.log(userStream.current.getAudioTracks(), "isenables");
      userStream.current.getVideoTracks().forEach((track) => {
        track.enabled = !isEnabled;
      });
      setVideoMuted(!isEnabled);
    }
  };

  const handleHangupCall = () => {
    if (userStream.current) {
      userStream.current.getTracks().forEach((track) => track.stop());
    }
    if (peerRef.current) {
      peerRef.current.close();
    }
    if (socketRef.current) {
      socketRef.current.disconnect();
    }
    navigate("/profile/bookings");
  };

  return (
    <div className="bg-gray-900 min-h-[100vh] overflow-hidden flex flex-col">
      <div
        className="flex-1 sm:max-h-[100vh] relative"
        style={{ background: "#202124" }}
      >
        <video
          className="w-full min-h-[100vh] object-cover"
          autoPlay
          playsInline
          ref={partnerVideo}
        />
        <div
          style={{ background: "#202124" }}
          className="absolute top-4 w-[230px] left-4 aspect-video rounded-lg overflow-hidden shadow-lg border border-white"
        >
          <video
            ref={userVideo}
            className="w-full h-full object-cover"
            autoPlay
            playsInline
            muted
          />
        </div>
        <div className="flex absolute bottom-6 left-1/2 transform -translate-x-1/2 gap-4">
          <button
            onClick={handleMuteMice}
            className={` text-white p-4 rounded-full`}
            style={{ background: "#333537" }}
          >
            {!isMuted ? (
              <Mic className="h-6 w-6" />
            ) : (
              <MicOff className="h-6 w-6" />
            )}
          </button>
          <button
            onClick={handleToggleVideo}
            className=" text-white p-4 rounded-full"
            style={{ background: "#333537" }}
          >
            {videoMuted ? (
              <Video className="h-6 w-6" />
            ) : (
              <VideoOff className="h-6 w-6" />
            )}
          </button>
          <button
            onClick={handleHangupCall}
            className="bg-red-500 text-white p-4 rounded-full"
          >
            <PhoneOff className="h-6 w-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoChat;
