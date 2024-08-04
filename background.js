chrome.tabs.onActivated.addListener(activeInfo => {
  chrome.tabs.get(activeInfo.tabId, tab => {
    startTimer(tab.url);
  });
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete') {
    startTimer(tab.url);
  }
});

let startTime = null;

function startTimer(url) {
  if (startTime !== null) {
    let timeSpent = (Date.now() - startTime) / 1000;
    saveTime(url, timeSpent);
  }
  startTime = Date.now();
}

function saveTime(url, timeSpent) {
  chrome.storage.local.get([url], result => {
    let totalTime = (result[url] || 0) + timeSpent;
    chrome.storage.local.set({[url]: totalTime});
  });
}
