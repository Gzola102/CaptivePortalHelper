function createAlarm() {
  // need to put stuff inside checking for OS because localStorage might not be set yet
  chrome.runtime.getPlatformInfo(function(platformInfo) {
    var strHostOS = platformInfo.os;
    localStorage.setItem("hostOS", strHostOS);
    // create only if ChromeOS
    if (strHostOS == "cros") {
      var strMinWait = localStorage.getItem("numMinWait");
      chrome.alarms.create("alarm-untangle-login", {
        delayInMinutes: Number(strMinWait), periodInMinutes: Number(strMinWait)
      });
    }
  });
}

function removeAlarm() {
  chrome.alarms.clear("alarm-untangle-login");
}
