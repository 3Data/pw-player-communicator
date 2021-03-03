# pw-player-communicator

Tool to achieve the easiest way of communication with the video/chat frames.

 - [Installation](#Installation)
 - [Events](#Events)
 - [Methods](#Methods)

## Installation

### 0. Pre-requisites

You should have the two iframes already created on the DOM, with the the attributes `name="video-frame"` and `name="chat-frame"` respectively.

### 1. Include the library:

You can do this inyecting directly to window:

    <script src="path/to/lib.js"></script>
    <script src="path/to/your.js"></script>

Or if you're working with NPM / ES6:

    npm install --save pw-player-communicator
    ...
    import PWPlayer from "pw-player-communicator";


### 2. Instance the communicator with the sessionToken in options object:

    var communicator = new PWPlayer.Communicator({
      sessionToken: sessionToken
    });

## Events

### How to listen

    communicator.on("videoPlay", function(){
      console.log("video play in tester");
    });

### Available events

#### Video events

  - videoPlay()
  - videoStop()
  - videoOffline()
  - videoError()

#### Chat events

  - chatMessage(object: { nick, message })
  - roomModeUpdate(string: roomMode)
  - VIPRequestStatusUpdate(string: status)

### Common events
  
  - disconnected(string: reason)

## Methods

### Video

  - setVolume(float 0 ... 1: volume)
  - setMuted(boolean: muted)
  - destroyVideo()
  - activateUserCam()
  - deactivateUserCam()

### Chat

  - sendMessage(string: message)
  - sendTip(int: amount)
  - sendToy(int: amount)
  - goToGroupChat()
  - requestVIP()
