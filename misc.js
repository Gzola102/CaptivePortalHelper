function displayVersion() {
  testDisplayElement('showVersion', '<b>VERSION:</b> 0.1.0.0');
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
  testDisplayElement(passedStatus, '<b>Passed?</b>\n ' + localStorage.getItem("passedStatus"));
  testDisplayElement('showNetMaskParagraph', '<b>netMask:</b>\n ' + localStorage.getItem("netMask"));
  testDisplayElement('showURLPrefixParagraph', '<b>urlPrefix:</b>\n ' + localStorage.getItem("urlPrefix"));
  testDisplayElement('showDomainNameParagraph', '<b>domainName:</b>\n ' + localStorage.getItem("domainName"));
  testDisplayElement('showIPAddressParagraph', '<b>ipAddress:</b>\n ' + localStorage.getItem("ipAddress"));
  testDisplayElement('showIPGatewayParagraph', '<b>ipGateway:</b>\n ' + localStorage.getItem("ipGateway"));
  testDisplayElement('showTestWebsiteParagraph', '<b>Test Website:</b>\n ' + localStorage.getItem("testWebsite"));
  testDisplayElement('showUserNameParagraph', '<b>userName:</b>\n ' + localStorage.getItem("userName"));
  testDisplayElement('showHostnameParagraph', '<b>hostName:</b>\n ' + localStorage.getItem("hostName"));
  testDisplayElement('showHostOSParagraph', '<b>hostOS:</b>\n ' + localStorage.getItem("hostOS"));
  testDisplayElement('showNumMinWaitParagraph', '<b>numMinWait:</b>\n ' + localStorage.getItem("numMinWait"));
  testDisplayElement('lastLoginOutEvent', '<b>Event:</b>\n ' + localStorage.getItem("lastLoginOutEvent"));
  testDisplayElement('lastLoginOutDate', '<b>Date:</b>\n ' + localStorage.getItem("lastLoginOutDate"));
  getDisplayAllAlarms();
}

// wrapper to test if element exists before displaying
function testDisplayElement(strElementToFind, strTextToDisplay) {
  if (document.getElementById(strElementToFind)) {
    document.getElementById(strElementToFind).innerHTML = strTextToDisplay;
  }
}
