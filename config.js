// ******************************
//
// DO NOT CHECK IN THE KEY!!!!!!
//
// for testing, copy full file from shared folder on Google Drive
// any changes to file copy up to shared folder on Google Drive
// ******************************

// These are values that are changed for the environment the extension is used.

function setStoredValuesStatic() {
  localStorage.setItem("numMinWait", "5"); // value to wait for alarm to relogin to Untangle, alarm min is 1 min
  localStorage.setItem("passedStatus", "Not checked yet! :-)");
  localStorage.setItem("lastAlertSaved", "None at this point! :-)");
  localStorage.setItem("autoLogin", true); // controls whether alarm created/removed
  localStorage.setItem("testWebsite", "files.sscps.org/passtest.html");
  localStorage.setItem("netMask", "16"); // only 16 & 24 currently supported
  localStorage.setItem("urlPrefix", "http");
  localStorage.setItem("domainName", "AD");
  localStorage.setItem("secretKey", "NOKEY"); // value from Untangle screen or "NOKEY" to not use
}
