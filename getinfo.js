//used later on
function getLocalIPs(callback) {
    var ips = [];

    var RTCPeerConnection = window.RTCPeerConnection ||
        window.webkitRTCPeerConnection || window.mozRTCPeerConnection;

    var pc = new RTCPeerConnection({
        // Don't specify any stun/turn servers, otherwise you will
        // also find your public IP addresses.
        iceServers: []
    });
    // Add a media line, this is needed to activate candidate gathering.
    pc.createDataChannel('');

    // onicecandidate is triggered whenever a candidate has been found.
    pc.onicecandidate = function(e) {
        if (!e.candidate) { // Candidate gathering completed.
            pc.close();
            callback(ips);
            return;
        }
        var ip = /^candidate:.+ (\S+) \d+ typ/.exec(e.candidate.candidate)[1];
        if (ips.indexOf(ip) == -1) // avoid duplicate entries (tcp/udp)
            ips.push(ip);
    };
    pc.createOffer(function(sdp) {
        pc.setLocalDescription(sdp);
    }, function onerror() {});
}

function getStoreIPInfo() {
  var arrayLocalIPs = [];
  arrayLocalIPs = getLocalIPs(function(ips) { // <!-- ips is an array of local IP addresses. -->
    localStorage.setItem("ipAddress", ips[0]);
    var numLocationFirstDot = ips[0].indexOf(".",0);
    var numFirstOctet = ips[0].substring(0,numLocationFirstDot);
    var numLocationSecondDot = ips[0].indexOf(".",numLocationFirstDot+1);
    var numSecondOctet = ips[0].substring(numLocationFirstDot+1,numLocationSecondDot);
    var numLocationThirdDot = ips[0].indexOf(".",numLocationSecondDot+1);
    var numThirdOctet = ips[0].substring(numLocationSecondDot+1,numLocationThirdDot);
    var numFourthOctet = ips[0].substring(numLocationThirdDot+1);
    var strGateway = numFirstOctet + '.' + numSecondOctet + '.0.1';
    localStorage.setItem("ipGateway", strGateway);
  });
}

function getStoreUserInfo() {
  // get User Information
  chrome.identity.getProfileUserInfo(function(userInfo) {
    var strUserName = userInfo.email;
    var numLocationAt = strUserName.indexOf("@",0);
    strUserName = strUserName.substring(0,numLocationAt);
    localStorage.setItem("userName", strUserName);
  });
}

function getStoreHostInfo() {
  // get hostname if possible
  var strHostname = "statichostname";
  localStorage.setItem("hostName", strHostname);
  // get hosOS if possible
  var strHostOS = "OS Unknown";
  localStorage.setItem("hostOS", strHostOS);
  chrome.runtime.getPlatformInfo(function(platformInfo) {
    var strHostOS = platformInfo.os;
    localStorage.setItem("hostOS", strHostOS);
  });
}

function getDisplayAllAlarms() {
  chrome.alarms.getAll(function(alarms) {
    var stringOfAlarms = '<b>Alarms:</b>\n ';
    for (var i = 0; i < alarms.length; i++) {
      scheduledTimeObject = new Date(alarms[i].scheduledTime);
      scheduledTimeReadable = scheduledTimeObject.toString();
      stringOfAlarms = stringOfAlarms + String.fromCharCode(13) + alarms[i].name + ' || ' + scheduledTimeReadable + ' || ' + alarms[i].periodInMinutes;
    }
    testDisplayElement('showAlarmsInfoParagraph', stringOfAlarms);
  });
}
