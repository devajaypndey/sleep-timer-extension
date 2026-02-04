/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
let muteMode = true;

chrome.runtime.onMessage.addListener((msg) => {
  if (msg.type === "START_TIMER") {
    const endTime = Date.now() + msg.minutes * 60 * 1000;

    chrome.storage.local.set({
      running: true,
      endTime,
      mute: msg.mute
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
  chrome.storage.local.get("mute", ({mute}) =>{
    chrome.tabs.query({active: true, currentWindow: true}, (tabs)=>{
      if(!tabs[0]) return;


      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id},
        func: (muteMode) => {
          document.querySelectorAll("video").forEach((v) =>{
            muteMode ? (v.muted = true) : v.pause();
          });
        },
        args: [mute]
      });
    });
  });

  chrome.storage.local.set({
    running: false,
    endTime: null
  });
});
