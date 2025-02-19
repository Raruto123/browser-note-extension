let notes = {};
const siteList = document.getElementById("site-list");
const textField = document.getElementById("note-value");


async function getUrl() {
  const actualTab = await chrome.tabs.query({
    currentWindow: true,
    active: true,
  });

  const url = actualTab[0].url;

  return url
  
}

document.addEventListener("DOMContentLoaded", () => {
  chrome.storage.local.get(["notes"], (data) => {
    const notes = data.notes || {};


    for (const [url, note] of Object.entries(notes)) {
        let listItem = document.createElement("li");
        listItem.textContent = `${url} : ${note}`;
        siteList.appendChild(listItem);
    }
});
})


document.getElementById("save-note").addEventListener("click", () => {


  // console.log(`%c🎨 ⍨ getUrl`, "Your_CSS_Goes_Here", getUrl().then((url) => {
  // console.log(`%c🎨 ⍨ url`, "Your_CSS_Goes_Here", url);
    
  // }));


  const noteValue = textField.value;

  //créer la base de données
  if (getUrl() && noteValue.trim() !== "") {
    chrome.storage.local.set({notes}).then(() => {
      console.log(`%c🎨 ⍨ base de données crées`, "Your_CSS_Goes_Here");
      loadAndShowNotes(getUrl().then((url) => {
        return url
      }), noteValue);
    });
  } else {
    alert("insérer des valeurs valides!")
  }
});


function loadAndShowNotes(url, notevalue) {
  chrome.storage.local.get("notes").then((data) => {
    const note = data.notes;
    note[url] = notevalue;
    console.log(`%c🎨 ⍨ note`, "color:yellowgreen; font-weight:bold", note);


    const element = document.createElement("li");
    if (note) {
      for(const url in note) {
        element.textContent=`${url} : ${note[url]}`;
        console.log(`%c🎨 ⍨ element`, "color:yellow; font-weight:bold", element);
        siteList.appendChild(element);
      }
    }
  })
};

// loadNotes();

// function showNotes() {
//   chrome.storage.local.get("notes").then((data) => {
//     const note = data.notes;
//     const element = document.createElement("li");

//     if (note) {
//       for(const url in note) {
//         element.textContent=`${url} : ${note[url]}`;
//         console.log(`%c🎨 ⍨ element`, "color:yellow; font-weight:bold", element);
//       }
//     }
//   })
// }

