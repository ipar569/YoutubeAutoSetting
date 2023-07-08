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

// Function to handle form submission
function handleFormSubmit(event) {
  event.preventDefault();
  
  const quality = document.getElementById("qualitySelect").value;
  const caption = document.getElementById("captionSelect").value;
  const volume = document.getElementById("volumeSelect").value;
  const autonav = document.getElementById("autonavSelect").value;
  
  // Set local storage values for the selected keys
  setYouTubeLocalStorageItem("yt-player-quality", quality);
  setYouTubeLocalStorageItem("yt-player-sticky-caption", caption);
  setYouTubeLocalStorageItem("yt-player-volume", volume);
  setYouTubeLocalStorageItem("yt.autonav::autonav_disabled", autonav);
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