function onGot(tabInfo) {
    console.log(tabInfo);
    document.getElementsByTagName("h2")[0].innerText = "lol";
  }
  
  function onError(error) {
    console.log(`Error: ${error}`);
  }
  
  const gettingCurrent = chrome.tabs.getCurrent();
  gettingCurrent.then(onGot, onError);
