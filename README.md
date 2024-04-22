# pw-player-communicator

Tool to achieve the easiest way of communication with the video/chat frames.

- [Installation](#installation)
- [Events](#events)
- [Methods](#methods)
- [Known Issues](#known-issues)
- [Integration examples](#integration-examples)

## Installation

### 0. Pre-requisites

You should have the two iframes already created on the DOM with the the attributes `name="video-frame"` and `name="chat-frame"` respectively. The `video-frame` needs the attribute `allow="camera;microphone;autoplay;fullscreen"` in order to allow the user to activate his camera in private and his camera and microphone in VIP.

### 1. Include the library:

You can do this inyecting directly to window:

    <script src="path/to/lib.js"></script>
    <script src="path/to/your.js"></script>

Or if you're working with NPM / ES6:

    npm install --save @pw2016/pw-player-communicator
    ...
    import { Communicator } from "@pw2016/pw-player-communicator";

Maybe you are interested in the [Integration examples](#integration-examples).

### 2. Instance the communicator with the sessionToken in options object:

If you are inyecting into window:

    var communicator = new PWPlayer.Communicator({
      sessionToken: sessionToken
    });

Or if you're working with NPM / ES6:

    const communicator = new Communicator({
        sessionToken: "sessionToken"
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
- userCamStatus(string: status)

## Methods

### Video

- setVolume(float 0 ... 1: volume)
- setMuted(boolean: muted)
- destroyVideo()
- activateUserCam()
- deactivateUserCam()
- playVideo()

### Chat

- sendMessage(string: message)
- sendTip(int: amount)
- sendToy(int: amount)
- goToGroupChat()
- requestVIP()

- You have one example of the tester in the folder: examples/tester

## Known issues

### Autoplay Audio not started

Some browser doesn't allow autoplay with sound. You can fix this with AudioContext and adding the permission autoplay in the iframe

You have one example in the folder: [examples/detectnoaudio](examples/detectnoaudio)

### Not video because Low Power Mode in iPhone

If you have the low power mode on in your iPhone, you can´t see the video because the phone is trying to keep the battery.

You can fix this with checking if you got the "videoPlay" event in the communicator after few seconds.

You have one example in the folder: [examples/lowpowermodeiphone](examples/lowpowermodeiphone)

## Integration examples

Currently we have an example of integration using [Next.js](https://nextjs.org/) using the _appRouter_.

Check out the [Next.js integration example](https://github.com/3Data/broker-nextjs).
