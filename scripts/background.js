// background.js

// Function to set a value in YouTube's local storage
function setYouTubeLocalStorageItem(key, value) {
    chrome.tabs.query({ url: "*://*.youtube.com/*" }, function (tabs) {
      tabs.forEach(function (tab) {
        chrome.tabs.executeScript(tab.id, {
          code: `localStorage.setItem("${key}", "${value}");`
        });
      });
    });
  }
  
  // Example usage: set a specific value in YouTube's local storage
  setYouTubeLocalStorageItem("yourLocalStorageKey", "yourValue");