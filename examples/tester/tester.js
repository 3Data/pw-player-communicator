// Config:

var sessionToken = document.querySelector("#sessionToken").textContent;
var communicator = new PWPlayer.Communicator({sessionToken});

// UI:

var btGoPrivate = document.querySelector("#btGoPrivate");
var btRequestVIP = document.querySelector("#btRequestVIP");
var btDestroyVideo = document.querySelector("#btDestroyVideo");
var btVol50 = document.querySelector("#btVol50");
var btVol100 = document.querySelector("#btVol100");
var btMute = document.querySelector("#btMute");
var btUnmute = document.querySelector("#btUnmute");
var btActivateCam = document.querySelector("#btActivateCam");
var btDeactivateCam = document.querySelector("#btDeactivateCam");

var formChat = document.querySelector("#chat-form");
var input = formChat.querySelector("input");
var chatMessages = document.querySelector("#chat-messages");
var roomModeIndicator = document.querySelector("#roomMode");
var VIPRequestStatusIndicator = document.querySelector("#VIPRequestStatus");

// Video events:

communicator.on("videoPlay", function(){
  console.log("video play in tester");
});

communicator.on("videoStop", function(){
  console.log("video stop in tester");
});

communicator.on("videoOffline", function(){
  console.log("video offline in tester");
});

communicator.on("videoError", function(){
  console.log("video error in tester");
});

communicator.on("disconnected", function(reason){
  console.log("disconnected in tester", reason);
});

// Chat events:

communicator.on("chatMessage", function(data){
  console.log("chat message in tester:", data);
  var node = document.createElement("li");
  var textNode = document.createTextNode(JSON.stringify(data));
  node.appendChild(textNode);
  chatMessages.appendChild(node);
});

communicator.on("roomModeUpdate", function(roomMode){
  console.log("roomModeUpdate on tester", roomMode);
  roomModeIndicator.textContent = roomMode;
  updateFormAvailability(roomMode);
});

communicator.on("VIPRequestStatusUpdate", function(status){
  console.log("VIPRequestStatusUpdate on tester", status);
  VIPRequestStatusIndicator.textContent = status;
  updateVIPButtonAvailability(status);
});

// Actions

btDestroyVideo.addEventListener("click", function(){
  communicator.destroyVideo();
});

btGoGroupChat.addEventListener("click", function(){
  communicator.goToGroupChat();
});

btRequestVIP.addEventListener("click", function(){
  communicator.requestVIP();
});

btVol50.addEventListener("click", function(){
  communicator.setVolume(0.2);
});

btVol100.addEventListener("click", function(){
  communicator.setVolume(1);
});

btMute.addEventListener("click", function(){
  communicator.setMuted(true);
});

btUnmute.addEventListener("click", function(){
  communicator.setMuted(false);
});

btActivateCam.addEventListener("click", function(){
  communicator.activateUserCam();
});

btDeactivateCam.addEventListener("click", function(){
  communicator.deactivateUserCam();
});

formChat.addEventListener("submit", function(e){
  e.preventDefault();
  if(input.value === "") return;
  communicator.sendMessage(input.value);
  input.value = "";
})

function updateFormAvailability(roomMode){
  var disabled = !['freechat', 'private', 'vip'].includes(roomMode);
  Array.from(formChat.children).forEach(function(children){
    children.disabled = disabled;
  });
}

function updateVIPButtonAvailability(status){
  btRequestVIP.disabled = ['requesting', 'waiting', 'accepted'].includes(status);
}

updateFormAvailability();
updateVIPButtonAvailability();