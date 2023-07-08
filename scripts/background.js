// background.js

// Function to retrieve the current values from YouTube's local storage
function getYouTubeLocalStorageValues() {
  const values = {};
  
  if (typeof yt !== "undefined" && typeof yt.config_ !== "undefined") {
    values.quality = yt.config_.get("yt-player-quality");
    values.caption = yt.config_.get("yt-player-sticky-caption");
    values.volume = yt.config_.get("yt-player-volume");
    values.autonav = yt.config_.get("yt.autonav::autonav_disabled");
  }
  
  return values;
}

// Listen for messages from the popup
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === "getLocalStorageValues") {
    const values = getYouTubeLocalStorageValues();
    sendResponse(values);
  }
});