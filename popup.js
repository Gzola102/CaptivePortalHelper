window.onload = function() {
  // setup autologin, which should be disabled on all but OS = cros
  document.getElementById('checkboxAutoLogin').addEventListener('change', function() {
    var checkboxAutoLogin = document.getElementById('checkboxAutoLogin');
    document.getElementById('lastStatus').innerHTML = '<b>Status:</b> autoLogin checkbox changed';
    localStorage.setItem("autoLogin", checkboxAutoLogin.checked);
    // after store value, create or remove alarm as necessary
    if (checkboxAutoLogin.checked) {
      createAlarm();
      strAlertToSave = '<b>ALERT:</b> Alarm added';
      localStorage.setItem("lastAlertSaved", strAlertToSave);
      document.getElementById('lastAlertSaved').innerHTML = strAlertToSave;
    } else {
      removeAlarm();
      strAlertToSave = '<b>ALERT:</b> Alarm removed';
      localStorage.setItem("lastAlertSaved", strAlertToSave);
      document.getElementById('lastAlertSaved').innerHTML = strAlertToSave;
    }
    });
  // setup button clicks
  // - buttonCaptureLogout
  document.getElementById('buttonCaptureLogout').addEventListener('click', function() {
    document.getElementById('lastStatus').innerHTML = '<b>Status:</b> Button buttonCaptureLogout click event';
    captureLogout();
  });
  // - buttonLogin
  document.getElementById('buttonLogin').addEventListener('click', function() {
    document.getElementById('lastStatus').innerHTML = '<b>Status:</b> buttonLogin click event';
    tryLogin("popup.js");
  });
  // - buttonLgout
  document.getElementById('buttonLogout').addEventListener('click', function() {
    document.getElementById('lastStatus').innerHTML = '<b>Status:</b> buttonLogout click event';
    tryLogout("popup.js");
  });
  // - buttonResetStorage
  document.getElementById('buttonResetStorage').addEventListener('click', function() {
    document.getElementById('lastStatus').innerHTML = '<b>Status:</b> Button buttonResetStorage click event';
    localStorage.clear();
    initStoredValues();
    setStoredValuesStatic();
    getStoreIPInfo();
    getStoreUserInfo();
    getStoreHostInfo();
    displayStoredInfo();
    strAlertToSave = '<b>ALERT:</b>  Local Storage reset, you may need to reopen popup.';
    localStorage.setItem("lastAlertSaved", strAlertToSave);
    document.getElementById('lastAlertSaved').innerHTML = strAlertToSave;
  });
  // - buttonNewTabSSCPS
  document.getElementById('buttonTestWebsite').addEventListener('click', function() {
    document.getElementById('lastStatus').innerHTML = '<b>Status:</b> Button buttonNewTabSSCPS click event';
    loadTestWebsite();
  });
  // - buttonGetAlarms
  document.getElementById('buttonGetAlarms').addEventListener('click', function() {
    document.getElementById('lastStatus').innerHTML = '<b>Status:</b> Button buttonGetAlarms click event';
    getDisplayAllAlarms();
  });
  // check passed Status before displaying it
  checkTestWebsite();
  // now other stuff
  // show version in popup by using wrapper function for it in misc.js
  displayVersion();
  document.getElementById('lastStatus').innerHTML = '<b>Status:</b> version dispayed';
  // show stored values after all is setup
  displayStoredInfo();
  document.getElementById('lastStatus').innerHTML = '<b>Status:</b> stored info dispayed';
  //  everything should be done
  document.getElementById('lastStatus').innerHTML = '<b>Status:</b> popup onload done';
};

function doNotUseJustHidingCodeHere() {
  //blah
}
