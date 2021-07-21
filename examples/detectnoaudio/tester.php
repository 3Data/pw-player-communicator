<?php
define('SECRET', "YOUR_SECRET_API_KEY");
define('PARTNER_ID',0);
define('APP_ID', 0);
define('URL_API',"YOUR_API_URL");
?>
<html>
  <head>
    <title>🛠️ TBR: ROOM TESTER</title>
    <link rel="stylesheet" href="./tester.css"></link>
  </head>
  <body>
    <?php
    $iframe = getIframe();
    ?>
    <div id="sessionToken"><?php echo $iframe->sessionToken; ?></div>
    <div>RoomMode: <span id="roomMode"></span></div>
    <div>VIPRequest status: <span id="VIPRequestStatus"></span></div>
    <div>Audio status: <span id="audioStatus"></span> <button style="visibility:hidden" id="btnGetVolume">Get Audio</button> </div>
    <div id="iframes-container" >
      <iframe name="video-frame" src="<?php echo $iframe->urlVideo; ?>" style="width:100%; height:400px;"  allow="camera;microphone;autoplay;fullscreen"></iframe>
      <iframe name="chat-frame" src="<?php echo $iframe->urlChat; ?>" style="width:100%; height:400px;"></iframe>
      <ul id="chat-messages"></ul>
    </div>
    <button id="btDestroyVideo">Destruir video</button>
    <button id="btVol50">Volumen al 20%</button>
    <button id="btVol100">Volumen al 100%</button>
    <button id="btMute">Mute</button>
    <button id="btUnmute">Unmute</button>
    <button id="btActivateCam">Activar cámara</button>
    <button id="btDeactivateCam">Desactivar cámara</button>
    <hr />
    <button id="btGoGroupChat">Ir a Group Chat</button>
    <button id="btRequestVIP">Solicitar VIP</button>
    <hr />
    <button id="btSendTip100">Send tip 100</button>
    <button id="btSendToy50">Send toy 50</button>
    <hr />
    <form id="chat-form">
      <input type="text" />
      <button type="submit">Enviar</button>
    </form>

    <hr />

    <?php
    echo '<pre>';
    print_r($iframe);
    echo '</pre>';
    ?>
    <script src="https://unpkg.com/@pw2016/pw-player-communicator@^1.9.2/dist/pw-room-handler.js"></script>
    <script src="./tester.js"></script>
  </body>
</html>

<?php
function doCurl($endpoint, $body){
  $curl = curl_init();
  curl_setopt($curl, CURLOPT_POST, 1);
  curl_setopt($curl, CURLOPT_POSTFIELDS, json_encode($body));

  // OPTIONS:
  curl_setopt($curl, CURLOPT_URL, $endpoint);
  curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
  curl_setopt($curl, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);
  // EXECUTE:
  $result = curl_exec($curl);
  curl_close($curl);

  return json_decode($result);
}

function getIframe(){
  $data = [
    # Required:
    "method"        => "getIframe",
    "roomMode"      => "auto",
    "userToken"     => isset($_GET['userToken']) ? $_GET['userToken'] : "usertoken",
    "userNick"      => isset($_GET['userNick']) ? $_GET['userNick'] : "userNick",
    "appId"         => APP_ID,
    "modelId"       => isset($_GET['modelId']) ? $_GET['modelId'] : 00000,
    "userId"        => isset($_GET['userId']) ? $_GET['userId'] : "userid",
    "partner_token" => getPartnerToken(),
    "pruebas"       => 1,
    "trackId"       => "test",
  ];
  return doCurl(URL_API."brokers.php", $data)->message;
}

function getPartnerToken(){

  $cacheFileName = "partnerToken.dat";

  if(file_exists($cacheFileName) && time() - filemtime($cacheFileName) < 86400){ // 24 hours
    $partnerToken = file_get_contents($cacheFileName);
  }else{
    $partnerToken = doCurl(URL_API."partnerauth.php", [
      "secret"      => SECRET,
      "partner_id"  => PARTNER_ID,
    ])->message->partner_token;
    file_put_contents($cacheFileName, $partnerToken);
  }

  return $partnerToken;
}
?>