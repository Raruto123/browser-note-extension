let notes = {};
const siteList = document.getElementById("site-list");
const textField = document.getElementById("note-value");

async function getUrl() {
  const actualTab = await chrome.tabs.query({
    currentWindow: true,
    active: true,
  });

  const url = actualTab[0].url;

  return url;
};

document.addEventListener("DOMContentLoaded", () => {
  loadAndShowNotes();
});

function loadAndShowNotes() {
  siteList.innerHTML = ""; // Nettoyer la liste avant d'ajouter les éléments
  chrome.storage.local.get("notes", (data) => {
    const notes = data.notes || {}; // Assurer que notes existe

    console.log(`%c🎨 ⍨ Notes chargées`, "color:yellowgreen; font-weight:bold", notes);

    for (const url in notes) {
      const element = document.createElement("li");
      element.textContent = `${url} : ${notes[url]}`;
      siteList.appendChild(element);
    }
  });
}


document.getElementById("save-note").addEventListener("click", async () => {
  const urlString = await getUrl();
  const noteValue = textField.value;

  if (urlString && noteValue.trim() !== "") {
    // Récupérer les notes existantes avant d'ajouter la nouvelle
    chrome.storage.local.get("notes", (data) => {
      let notes = data.notes || {}; // Si notes n'existe pas encore, on crée un objet vide
      notes[urlString] = noteValue; // Ajouter la nouvelle note
      
      // Sauvegarde de l'objet mis à jour
      chrome.storage.local.set({ notes }, () => {
        console.log(`%c🎨 ⍨ note sauvegardée`, "color:yellowgreen; font-weight:bold", notes);
        loadAndShowNotes();
      });
    });
  } else {
    alert("Insérez des valeurs valides!");
  }
});