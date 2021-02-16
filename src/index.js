import { EventEmitter } from "events"
import { sendMessageToChat, sendMessageToVideo } from "./shared/iframe-communicator";

class Communicator extends EventEmitter {

  constructor({ sessionToken }){
    super();
    window.addEventListener("message", e => this.onMessageReceived(e));
    this.sessionToken = sessionToken;
  }

  onMessageReceived = e => {
    switch(e.data.type){
      case "onVideoPlay": this.emit("videoPlay"); break;
      case "onVideoStop": this.emit("videoStop");  break;
      case "onVideoOffline": this.emit("videoOffline"); break;
      case "onVideoError": this.emit("videoError"); break;
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

  destroyVideo = () => {
    sendMessageToVideo({
      type: "destroyVideo",
      sessionToken: this.sessionToken,
    });
  }

  // Chat actions:

  goToGroupChat = () => {
    sendMessageToChat({type: "goToPrivate", sessionToken: this.sessionToken});
  }

}

export {
  Communicator,
}