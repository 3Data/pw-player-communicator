const isSSR = typeof window === 'undefined';

const sendMessageToVideo = message => {
  if(isSSR) return;
  window.top.frames['video-frame'].postMessage(message, "*");
}

const sendMessageToChat = message => {
  if(isSSR) return;
  window.top.frames['chat-frame'].postMessage(message, "*");
}


export {
  sendMessageToChat,
  sendMessageToVideo,
}