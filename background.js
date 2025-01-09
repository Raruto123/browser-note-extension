chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === "complete" && tab.url) {
      chrome.storage.local.get(["notes"], (data) => {
        const notes = data.notes || {};
        if (notes[tab.url]) {
          chrome.notifications.create({
            type: "basic",
            iconUrl: "browser-notes 16.png",
            title: "Note trouvée !",
            message: `Vous avez une note pour ce site : "${notes[tab.url]}".`
          });
        }
      });
    }
  });