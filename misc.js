function displayVersion() {
  document.getElementById('showVersion').innerHTML = '<b>VERSION:</b> 0.0.1.1';
}

function loadTestWebsite() {
  var strNewURL = "http://" + localStorage.getItem("testWebsite");
  chrome.tabs.create({ url: strNewURL });
}


function checkTestWebsite() {
  var strGetURL = "http://" + localStorage.getItem("testWebsite");
  var xhr = new XMLHttpRequest();
  xhr.open("GET", strGetURL, true);
  xhr.onreadystatechange = checkReadyState;
  function checkReadyState() {
    var strURLContent = null;
    if (xhr.readyState === 4) {
      if ((xhr.status == 200) || (xhr.status === 0)) {
        //page is returned, so put in variable
        strURLContent = xhr.responseText;
      }
    }
    if (strURLContent === null) {
      localStorage.setItem("passedStatus", "false, no page, last check: " + new Date());
    } else {
      // now process the page
      if (strURLContent == "Success!") {
        localStorage.setItem("passedStatus", "true, " + strURLContent + ", last check: " + new Date());
      } else {
        localStorage.setItem("passedStatus", "false, last check: " + new Date() + ", " + strURLContent);
      }
    }
  }
  xhr.send();

}

// don't use this as there seems to be a 200 response from Untangle on the block message
function checkTestWebsiteOLD() {
  var strGetURL = "http://" + localStorage.getItem("testWebsite");
  var xhr = new XMLHttpRequest();
  xhr.open("GET", strGetURL, true);
  xhr.onreadystatechange = checkReadyState;
  function checkReadyState() {
    if (xhr.readyState === 4) {
      if ((xhr.status == 200) || (xhr.status === 0)) {
        //page exists
        //localStorage.setItem("passedStatus", "passed");
        localStorage.setItem("passedStatus", xhr.status + ", last check: " + new Date());
        return true;
      } else {
        //page does not exist
        //localStorage.setItem("passedStatus", "blocked");
        localStorage.setItem("passedStatus", xhr.status + ", last check: " + new Date());
        return false;
      }
    }
  }
  xhr.send();
}


function initStoredValues() {
  localStorage.setItem("passedStatus", "passedStatus Init");
  localStorage.setItem("lastAlertSaved", "lastAlertSaved Init");  // for quickest time to working, only unset after know its not cros
  localStorage.setItem("autoLogin", true);  // for quickest time to working, only unset after know its not cros
  localStorage.setItem("testWebsite", "testWebsite Init");
  localStorage.setItem("netMask", "netMask Init");
  localStorage.setItem("urlPrefix", "urlPrefix Init");
  localStorage.setItem("domainName", "domainName Init");
  localStorage.setItem("secretKey", "secretKey Init");
  localStorage.setItem("ipAddress", "ipAddress Init");
  localStorage.setItem("ipGateway", "ipGateway Init");
  localStorage.setItem("userName", "userName Init");
  localStorage.setItem("hostName", "hostName Init");
  localStorage.setItem("hostOS", "hostOS Init");
  localStorage.setItem("lastLoginOutEvent", "lastLoginOutEvent Init");
  localStorage.setItem("lastLoginOutDate", "lastLoginOutDate Init");
  localStorage.setItem("lastLoginOutURL", "lastLoginOutURL Init");
  localStorage.setItem("numMinWait", "1"); // one minute is the minimum Google allows for alarms
}

// should only be called from popup.js
function displayStoredInfo() {
  if (localStorage.getItem("autoLogin") === 'true') {
    document.getElementById("checkboxAutoLogin").checked = true;
  } else {
    document.getElementById("checkboxAutoLogin").checked = false;
  }
  document.getElementById('passedStatus').innerHTML = '<b>Passed?</b>\n ' + localStorage.getItem("passedStatus");
  document.getElementById('showNetMaskParagraph').innerHTML = '<b>netMask:</b>\n ' + localStorage.getItem("netMask");
  document.getElementById('showURLPrefixParagraph').innerHTML = '<b>urlPrefix:</b>\n ' + localStorage.getItem("urlPrefix");
  document.getElementById('showDomainNameParagraph').innerHTML = '<b>domainName:</b>\n ' + localStorage.getItem("domainName");
  document.getElementById('showIPAddressParagraph').innerHTML = '<b>ipAddress:</b>\n ' + localStorage.getItem("ipAddress");
  document.getElementById('showIPGatewayParagraph').innerHTML = '<b>ipGateway:</b>\n ' + localStorage.getItem("ipGateway");
  document.getElementById('showTestWebsiteParagraph').innerHTML = '<b>Test Website:</b>\n ' + localStorage.getItem("testWebsite");
  document.getElementById('showUserNameParagraph').innerHTML = '<b>userName:</b>\n ' + localStorage.getItem("userName");
  document.getElementById('showHostnameParagraph').innerHTML = '<b>hostName:</b>\n ' + localStorage.getItem("hostName");
  document.getElementById('showHostOSParagraph').innerHTML = '<b>hostOS:</b>\n ' + localStorage.getItem("hostOS");
  //document.getElementById('showNumMinWaitParagraph').innerHTML = '<b>numMinWait:</b>\n ' + localStorage.getItem("numMinWait");
  document.getElementById('lastLoginOutEvent').innerHTML = '<b>Event:</b>\n ' + localStorage.getItem("lastLoginOutEvent");
  document.getElementById('lastLoginOutDate').innerHTML = '<b>Date:</b>\n ' + localStorage.getItem("lastLoginOutDate");
  getDisplayAllAlarms();
}
