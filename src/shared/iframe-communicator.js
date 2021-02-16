const sendMessageToVideo = message => {
  // logger.log("sendMessageToVideo", message);
  window.top.frames['video-frame'].postMessage(message, "*");
}

const sendMessageToChat = message => {
  // logger.log("sendMessageToChat", message);
  window.top.frames['chat-frame'].postMessage(message, "*");
}


export {
  sendMessageToChat,
  sendMessageToVideo,
}