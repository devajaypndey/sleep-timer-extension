/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
let muteMode = true;

chrome.runtime.onMessage.addListener((msg) => {
  if (msg.type === "START_TIMER") {
    muteMode = msg.mute;

    chrome.alarms.create("sleepTimer", {
      delayInMinutes: msg.minutes
    });
  }

  if (msg.type === "STOP_TIMER") {
    chrome.alarms.clear("sleepTimer");
  }
});

chrome.alarms.onAlarm.addListener(() => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (!tabs[0]) return;

    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      files: ["content/contentScript.js"]
    });
  });
});
