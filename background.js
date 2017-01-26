// these are just "creating" the storage values.  look below for which are "static"
initStoredValues();

// these are all "static", meaning set it for environment working in
setStoredValuesStatic();

// these are all looked up later
getStoreIPInfo();
getStoreUserInfo();
getStoreHostInfo();



// when logout of chromeos, logout of untangle
// this doesn't seem to get fired, or else untangle is ignoring it
chrome.runtime.onSuspend.addListener(function() {
  tryLogout("background.js");
});

// if logout of chromeos cancelled login into untangle
chrome.runtime.onSuspendCanceled.addListener(function() {
  tryLogin("background.js");
});

// everything is setup, now login to Untangle
//tryLogin("background.js");
// tried different ways of doing this, pausing "brute force" loop
// next thing to try is more complicated.  created own passtest.
// so now there should be:
// check if os = cros
//   then, create "wait to login" loop to see if numMinWait = number/int (maybe all of the variables?)
//      then

// send "login" url to untangle
tryLogin("background.js");
// create alarm
createAlarm();
// wait for alarm to go off
chrome.alarms.onAlarm.addListener(function(alarm) {
  if (alarm.name == "alarm-untangle-login") {
    tryLogin("background.js");
  }
});

//      else, let loop roll
//   else, don't worry about a thing
// and may need to change alarm above.
//

