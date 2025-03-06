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
}

document.addEventListener("DOMContentLoaded", () => {
  loadAndShowNotes();
});

function loadAndShowNotes() {
  siteList.innerHTML = ""; // Nettoyer la liste avant d'ajouter les éléments
  chrome.storage.local.get("notes", (data) => {
    const notes = data.notes || {}; // Assurer que notes existe

    console.log(
      `%c🎨 ⍨ Notes chargées`,
      "color:yellowgreen; font-weight:bold",
      notes
    );

    for (const url in notes) {
      const element = document.createElement("li");
      element.textContent = `${url} : ${notes[url]}`;

      //bouton supprimer
      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Supprimer";
      deleteButton.type = "button";
      deleteButton.dataset.order = "";

      // siteList.childNodes.forEach((element) => {
      //   deleteButton.dataset.order += 1;
      //   deleteButton.addEventListener("click", () => {
      //     console.log(`%c🎨 ⍨ element.textContent`, "color:pink; font-weight:bold",
      //       notes["https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/length"]);
      //   })
      // })

      //utiliser regex pour réussir à en tirer tout ce qui est element.textContent avant le : sans espace aussi
      // console.log(siteList.childNodes);

      //je colle le bouton supprimer à la list element
      element.appendChild(deleteButton);

      //je colle le element au siteList
      siteList.appendChild(element);

      //bouton pour supprimer une note
      let elementText = [];

      for(let i = 0; i < siteList.childNodes.length; i++) {
        elementText.push(siteList.childNodes[i].innerText);
      }

      // console.log(elementText);

      // const newElementText = elementText.map((text) => text.match(/^(.*?)(?=\s:)/));

      const newElementText = elementText.map((text) => text.replace(text, text.match(/^(.*?)(?=\s:)/)));


      // console.log(newElementText);

      newElementText.forEach((text) => deleteButton.dataset.order = text);


      deleteButton.addEventListener("click", () => {
        const dataOrderName = deleteButton.dataset.order;
        for(let i = 0; i < newElementText.length; i++) {
          if(dataOrderName === newElementText[i]) {
            delete notes[dataOrderName];

            console.log(`%c🎨 ⍨ testttt`, "color:blue")
            console.log(notes)
            chrome.storage.local.set({ notes }, loadAndShowNotes);
            siteList.removeChild(element);
          }
        }
      })
      //bouton pour supprimer toutes les notes pour tester
      document
        .getElementById("delete-all-notes")
        .addEventListener("click", () => {
          delete notes[url];
          console.log(
            `%c🎨 ⍨ notes nettoyées`,
            "color:blue; font-weight:bold",
            notes
          );
          chrome.storage.local.set({ notes }, loadAndShowNotes);
          siteList.removeChild(element);
        });
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
        console.log(
          `%c🎨 ⍨ note sauvegardée`,
          "color:red; font-weight:bold",
          notes
        );
        loadAndShowNotes();
      });
    });
  } else {
    alert("Insérez des valeurs valides!");
  }
});
