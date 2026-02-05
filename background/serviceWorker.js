/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
let muteMode = true;

chrome.runtime.onMessage.addListener((msg) => {
  if (msg.type === "START_TIMER") {
    const endTime = Date.now() + msg.minutes * 60 * 1000;

    chrome.storage.local.set({
      running: true,
      endTime,
    });

    chrome.alarms.create("sleepTimer", {
      when: endTime
    });
  }

  if (msg.type === "STOP_TIMER") {
    chrome.alarms.clear("sleepTimer");

    chrome.storage.local.set({
      running: false,
      endTime: null,
    })
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

  chrome.storage.local.set({
    running: false,
    endTime: null
  });
});
