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
    const key = document.getElementById("keyInput").value;
    const value = document.getElementById("valueInput").value;
    sendMessageToBackgroundScript({ action: "setLocalStorageValue", key: key, value: value })
      .then(function (response) {
        console.log(response.message);
      })
      .catch(function () {
        console.error("Error setting value in YouTube's local storage.");
      });
  }
  
  // Add event listener to the form submit event
  document.getElementById("valueForm").addEventListener("submit", handleFormSubmit);