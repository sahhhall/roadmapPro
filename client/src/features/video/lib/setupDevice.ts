
// specifying the types of media to request, along with any requirements for each type. 
const constraints = {
    video: {
        width: { ideal: 1280 },
        height: { ideal: 720 },
        frameRate: { ideal: 30 },
    },
    audio: true,
};

let peerConnection: RTCPeerConnection;
let remoteStream: MediaStream;
let localStream: MediaStream;

const servers = {
    iceServers: [
        {
            urls: [
                "stun:stun4.l.google.com:5349",
                "stun:stun4.l.google.com:19302",
                "stun:stun3.l.google.com:5349",
                "stun:stun3.l.google.com:3478",
                "stun:stun2.l.google.com:5349",
                "stun:stun2.l.google.com:19302",
                "stun:stun1.l.google.com:5349",
                "stun:stun.l.google.com:19302",
                "stun:stun.l.google.com:5349",
                "stun:stun1.l.google.com:3478"]
        }
    ]
}
export const setupDevice = async (): Promise<MediaStream | undefined> => {
    try {
        localStream = await navigator.mediaDevices.getUserMedia(constraints);
        const localPlayer = document.getElementById('user-1') as HTMLVideoElement;
        if (localPlayer) {
            localPlayer.srcObject = localStream;
        }
        return localStream;
    } catch (error) {
        console.error("err accessing media devices:", error);
    }
}


//offer is just part of signaling proccess
export const createOffer = async () => {

    // create rtc peer connnection
    peerConnection = new RTCPeerConnection(servers);
    // it will ppoplted lateron
    remoteStream = new MediaStream();

    localStream.getTracks().forEach((track) => {
        peerConnection.addTrack(track, localStream)
    });


    peerConnection.ontrack = (event) => {
        event.streams[0].getTracks().forEach((track) => {
            remoteStream.addTrack(track)
        });
    };


    peerConnection.onicecandidate = async (event) => {
        if (event.candidate) {
            console.log('new Ice candidate', event.candidate)
        }
    }   

    const remotePlayer = document.getElementById('user-2') as HTMLVideoElement;
    if (remotePlayer) {
        remotePlayer.srcObject = remoteStream;
    }
    // gernating sdp based on currecnt media
    let offer = await peerConnection.createOffer();
    //it set local sdp description 
    // it fire above icecnadiate
    await peerConnection.setLocalDescription(offer);
    console.log('offer created:', offer);
}


// here first we creaate instacefor peer conecction

// second for later use

// genrated sdp protocal for exchagne

// it setted localdescription