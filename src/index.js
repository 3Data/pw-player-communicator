import { EventEmitter } from "events"
import { sendMessageToChat, sendMessageToVideo } from "./shared/iframe-communicator";

class Communicator extends EventEmitter {

  constructor({ sessionToken }){
    super();

    if(typeof window === 'undefined'){
      return;
    };

    window.addEventListener("message", e => this.onMessageReceived(e));
    this.sessionToken = sessionToken;
    
    // if(!document.querySelector("iframe[name=chat-frame")){
    //   throw new Error("Chat frame not found. Check if the element exists.");
    // }
    
    // if(!document.querySelector("iframe[name=video-frame")){
    //   throw new Error("Video frame not found. Check if the element exists.");
    // }
  }

  onMessageReceived = e => {
    switch(e.data.type){
      // Video events:
      case "onVideoPlay": this.emit("videoPlay"); break;
      case "onVideoStop": this.emit("videoStop");  break;
      case "onVideoOffline": this.emit("videoOffline"); break;
      case "onVideoError": this.emit("videoError"); break;
      // Chat events:
      case "onChatMessage": this.emit("chatMessage", e.data.data); break;
      case "onRoomModeUpdate": this.emit("roomModeUpdate", e.data.roomMode); break;
      case "onVIPRequestStatusUpdate": this.emit("VIPRequestStatusUpdate", e.data.status); break;
      // Common events:
      case "onDisconnected": this.emit("disconnected", e.data.reason); break;
      case "onUserCamStatus": this.emit("userCamStatus", e.data.status); break;
    }
  }

  // Video actions:

  setVolume = value => {
    if(value >= 0 && value <= 1){
      sendMessageToVideo({
        type: "setVolume",
        sessionToken: this.sessionToken,
        value: value,
      });
    }
  }

  setMuted = value => {
    if(typeof value === "boolean"){
      sendMessageToVideo({
        type: "setMuted",
        sessionToken: this.sessionToken,
        value: value,
      });
    }
  }

  activateUserCam = () => sendMessageToVideo({
    type: "activateUserCam",
    sessionToken: this.sessionToken,
  });

  deactivateUserCam = () => sendMessageToVideo({
    type: "deactivateUserCam",
    sessionToken: this.sessionToken,
  });

  destroyVideo = () => sendMessageToVideo({ type: "destroyVideo", sessionToken: this.sessionToken });

  stopVideo = () => sendMessageToVideo({ type: "stopVideo", sessionToken: this.sessionToken });

  pauseVideo = () => sendMessageToVideo({ type: "pauseVideo", sessionToken: this.sessionToken });

  playVideo = () => sendMessageToVideo({ type: "playVideo", sessionToken: this.sessionToken });

  // Chat actions:

  goToGroupChat = () => sendMessageToChat({type: "goToPrivate", sessionToken: this.sessionToken});

  requestVIP = () => sendMessageToChat({type: "requestVIP", sessionToken: this.sessionToken});

  sendMessage = message => sendMessageToChat({
    type: "externalMessage",
    value: message,
    sessionToken: this.sessionToken,
  });

  sendTip = amount => sendMessageToChat({
    type: "externalTip",
    amount: amount,
    sessionToken: this.sessionToken,
  });

  sendToy = amount => sendMessageToChat({
    type: "externalToy",
    amount: amount,
    sessionToken: this.sessionToken,
  });

}

export {
  Communicator,
}