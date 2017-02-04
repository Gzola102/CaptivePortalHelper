function captureLogout() {
  var strGateway = localStorage.getItem("ipGateway");
  var strNewURL = "http://" + strGateway + "/capture/logout/";
  chrome.tabs.create({ url: strNewURL });
}


function tryLogout(strCallerScript) {
  // get values to assemble string
  var strIPAddress = localStorage.getItem("ipAddress");
  var strGateway = localStorage.getItem("ipGateway");
  var strUserName = localStorage.getItem("userName");
  var strURLPrefix = localStorage.getItem("urlPrefix");
  var strDomainName = localStorage.getItem("domainName");
  var strHostname = localStorage.getItem("hostName");
  var strSecretKey = localStorage.getItem("secretKey");
  var strGetURL = "";
  // according to documentation
  //strGetURL = strURLPrefix + "://" + strGateway + "/userapi/registration?action=logout&clientIP="+strIPAddress;
  // one that actually works
  //strGetURL = strURLPrefix + "://" + strGateway + "/userapi/registration?action=logout&clientIP="+strIPAddress+"&username="+strUserName+"&domain="+strDomainName+"&hostname="+strHostname;
  // trying this one so it goes to a "bad" username
  strGetURL = strURLPrefix + "://" + strGateway + "/userapi/registration?action=logout&clientIP="+strIPAddress+"&username=thisusershouldneverexist&domain="+strDomainName+"&hostname="+strHostname;
  // test if using secretKey or not
  if (strSecretKey != "NOKEY") {
    strGetURL = strGetURL + "&secretKey="+strSecretKey;
  }
  var xhr = new XMLHttpRequest();
  xhr.open("GET", strGetURL, true);
  xhr.send();
  var dateLogInOutEvent = Date();
  localStorage.setItem("lastLoginOutEvent", "Logout");
  localStorage.setItem("lastLoginOutDate", dateLogInOutEvent);
  localStorage.setItem("lastLoginOutURL", strGetURL);
  if (strCallerScript == "popup.js") {
    testDisplayElement('lastLoginOutEvent', '<b>Event:</b>\n ' + "Logout");
    testDisplayElement('lastLoginOutDate', '<b>Date:</b>\n ' + dateLogInOutEvent);
  }
}

function tryLogin(strCallerScript) {
  // first, only run if ChromeOS
  var strHostOS = localStorage.getItem("hostOS");
  if (strHostOS == "cros") {
    // now login
    // get values to assemble string
    var strIPAddress = localStorage.getItem("ipAddress");
    var strGateway = localStorage.getItem("ipGateway");
    var strUserName = localStorage.getItem("userName");
    var strURLPrefix = localStorage.getItem("urlPrefix");
    var strDomainName = localStorage.getItem("domainName");
    var strHostname = localStorage.getItem("hostName");
    var strSecretKey = localStorage.getItem("secretKey");
    var strGetURL = "";
    // with hostname
    //strGetURL = strURLPrefix + "://" + strGateway + "/userapi/registration?action=login&clientIP="+strIPAddress+"&username="+strUserName+"&domain="+strDomainName+"&hostname="+strHostname;
    // without hostname
    strGetURL = strURLPrefix + "://" + strGateway + "/userapi/registration?action=login&clientIP="+strIPAddress+"&username="+strUserName+"&domain="+strDomainName;
    // test if using secretKey or not
    if (strSecretKey != "NOKEY") {
      strGetURL = strGetURL + "&secretKey="+strSecretKey;
    }
    // now send the string to log into untangle without Captive Portal
    var xhr = new XMLHttpRequest();
    xhr.open("GET", strGetURL, true);
    xhr.send();
    var dateLogInOutEvent = Date();
    localStorage.setItem("lastLoginOutEvent", "Login");
    localStorage.setItem("lastLoginOutDate", dateLogInOutEvent);
    localStorage.setItem("lastLoginOutURL", strGetURL);
    if (strCallerScript == "popup.js") {
      testDisplayElement('lastLoginOutEvent', '<b>Event:</b>\n ' + "Login");
      testDisplayElement('lastLoginOutDate', '<b>Date:</b>\n ' + dateLogInOutEvent);
    }
  } else {
    var dateLogInOutEvent = Date();
    localStorage.setItem("lastLoginOutEvent", "Not ChromeOS");
    localStorage.setItem("lastLoginOutDate", dateLogInOutEvent);
    localStorage.setItem("lastLoginOutURL", strGetURL);
    if (strCallerScript == "popup.js") {
      testDisplayElement('lastLoginOutEvent', '<b>Event:</b>\n ' + "Not ChromeOS");
      testDisplayElement('lastLoginOutDate', '<b>Date:</b>\n ' + dateLogInOutEvent);
    }
  }
}
