// popup.js

// Function to send a message to the background script
function sendMessageToBackgroundScript(message) {
  return new Promise(function (resolve, reject) {
    chrome.runtime.sendMessage(message, function (response) {
      if (response) {
        resolve(response);
      } else {
        reject();
      }
    });
  });
}

// Function to set a value in the local storage for a specific domain
function setLocalStorageItem(key, value, domain) {
  try {
    const data = {
      Creation: new Date().getTime(),
      Expiration: new Date().getTime() + (365 * 24 * 60 * 60 * 1000), // 1 year expiration
      Data: value
    };
    localStorage.setItem(domain ? `${domain}:${key}` : key, JSON.stringify(data));
    console.log(`Value '${value}' set for key '${key}' in the local storage for '${domain}'.`);
  } catch (error) {
    console.error(`Error setting value in the local storage for '${domain}':`, error);
  }
}

// Function to handle form submission
function handleFormSubmit(event) {
  event.preventDefault();
  
  const quality = document.getElementById("qualitySelect").value;
  const caption = document.getElementById("captionSelect").value;
  const volume = document.getElementById("volumeSelect").value;
  const autonav = document.getElementById("autonavSelect").value;
  
  const youtubeDomain = "setLocalStorageItem";

  // Set local storage values for the selected keys
  setLocalStorageItem("yt-player-quality", quality, youtubeDomain);
  setLocalStorageItem("yt-player-sticky-caption", caption, youtubeDomain);
  setLocalStorageItem("yt-player-volume", volume, youtubeDomain);
  setLocalStorageItem("yt.autonav::autonav_disabled", autonav, youtubeDomain);

  setLocalStorageItem("yt-player-quality", quality);
  setLocalStorageItem("yt-player-sticky-caption", caption);
  setLocalStorageItem("yt-player-volume", volume);
  setLocalStorageItem("yt.autonav::autonav_disabled", autonav);
}

// Function to load current local storage values
function loadCurrentLocalStorageValues() {
  sendMessageToBackgroundScript({ action: "getLocalStorageValues" })
    .then(function (response) {
      const { quality, caption, volume, autonav } = response;
      
      // Set the selected values in the dropdown menus
      document.getElementById("qualitySelect").value = quality;
      document.getElementById("captionSelect").value = caption;
      document.getElementById("volumeSelect").value = volume;
      document.getElementById("autonavSelect").value = autonav;
    })
    .catch(function () {
      console.error("Error loading current local storage values.");
    });
}

// Add event listener to the form submit event
document.getElementById("valueForm").addEventListener("submit", handleFormSubmit);

// Load current local storage values when the popup page loads
loadCurrentLocalStorageValues();