function createAlarm() {
  var strMinWait = localStorage.getItem("numMinWait");
  chrome.alarms.create("alarm-untangle-login", {
    delayInMinutes: Number(strMinWait), periodInMinutes: Number(strMinWait)
  });
}

function removeAlarm() {
  chrome.alarms.clear("alarm-untangle-login");
}
