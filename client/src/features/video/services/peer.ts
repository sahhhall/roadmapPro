class PeerService {
    public peer: RTCPeerConnection;

    constructor() {
        this.peer = new RTCPeerConnection({
            iceServers: [
                {
                    urls: [
                        "stun:stun.l.google.com:19302",
                        "stun:global.stun.twilio.com:3478",
                    ],
                },
            ],
        });
    }

    // Method to handle the remote offer and return the generated answer
    async getAnswer(offer: RTCSessionDescriptionInit): Promise<RTCSessionDescriptionInit> {
        if (!this.peer) throw new Error("Peer connection not initialized.");

        //set local desc
        await this.peer.setRemoteDescription(new RTCSessionDescription(offer));
        const answer = await this.peer.createAnswer();
        await this.peer.setLocalDescription(answer);
        return answer;
    }

    // Method to set the local description with a given answer
    async setLocalDescription(answer: RTCSessionDescriptionInit): Promise<void> {
        if (!this.peer) throw new Error("Peer connection not initialized.");

        await this.peer.setRemoteDescription(new RTCSessionDescription(answer));
    }

    // Method to create and return an offer
    async getOffer(): Promise<RTCSessionDescriptionInit> {
        if (!this.peer) throw new Error("Peer connection not initialized.");

        const offer = await this.peer.createOffer();
        await this.peer.setLocalDescription(offer);
        return offer;
    }
}

export default new PeerService();
