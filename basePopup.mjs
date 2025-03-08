let notes = {};
const textField = document.getElementById("note-value");
import { loadAndShowNotes } from "./viewAllNotes.mjs";

async function getUrl() {
  const actualTab = await chrome.tabs.query({
    currentWindow: true,
    active: true,
  });

  const url = actualTab[0].url;

  return url;
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
        console.log(
          `%c🎨 ⍨ note sauvegardée`,
          "color:red; font-weight:bold",
          notes
        );
        loadAndShowNotes;
      });
    });
  } else {
    alert("Insérez des valeurs valides!");
  }
});
