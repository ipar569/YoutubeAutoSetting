// background.js

// Function to retrieve the current values from the extension's local storage
function getExtensionLocalStorageValues() {
  const values = {};

  const qualityValue = localStorage.getItem("yt-player-quality");
  values.quality = qualityValue ? JSON.parse(qualityValue).Data : "";

  const captionValue = localStorage.getItem("yt-player-sticky-caption");
  values.caption = captionValue ? JSON.parse(captionValue).Data : "";

  const volumeValue = localStorage.getItem("yt-player-volume");
  values.volume = volumeValue ? JSON.parse(volumeValue).Data : "";

  const autonavValue = localStorage.getItem("yt.autonav::autonav_disabled");
  values.autonav = autonavValue ? JSON.parse(autonavValue).Data : "";

  return values;
}

// Listen for messages from the popup
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === "getExtensionLocalStorageValues") {
    const values = getExtensionLocalStorageValues();
    sendResponse(values);
  }
});