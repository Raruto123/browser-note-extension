
document.getElementsByTagName("p")[0].addEventListener("click", () => {
    chrome.tabs.create({
        url : "https://getrecut.com/download/"
    })
})