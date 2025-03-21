const siteList = document.getElementById("site-list") || null;
const dialog = document.getElementById("editNoteModal");
const closeDialog = document.getElementById("closeModal");


document.addEventListener("DOMContentLoaded", () => {
  loadAndShowNotes();
});

export function loadAndShowNotes() {
  if (!siteList) return; // Si `siteList` est null, on arrête la fonction.

  chrome.storage.local.get("notes", (data) => {
    const notes = data.notes || {}; // Assurer que notes existe
    siteList.innerHTML = ""; //Permet d'éviter les doublons
    console.log(
      `%c🎨 ⍨ Notes chargées`,
      "color:yellowgreen; font-weight:bold",
      notes
    );

    for (const url in notes) {
      //la liste des notes
      const element = document.createElement("li");
      element.textContent = `${url} : ${notes[url]}`;

      //bouton supprimer
      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Supprimer";
      deleteButton.type = "button";
      deleteButton.dataset.url = "";

      //bouton modifier
      const editButton = document.createElement("button");
      editButton.textContent = "Modifier";
      editButton.type = "button";


      //je colle le bouton supprimer à la list element
      element.appendChild(deleteButton);

      //je colle le bouton modifier à la list element
      element.appendChild(editButton);

      //je colle le element au siteList
      siteList.appendChild(element);

      //les textes à l'intérieur des listes de notes
      let elementText = [];

      //j'ajoute les textes au tableau
      for (let i = 0; i < siteList.childNodes.length; i++) {
        elementText.push(siteList.childNodes[i].innerText);
      }

      //un nouveau tableau qui modifie les textes pour les matcher avec l'url dans l'objet notes
      const newElementText = elementText.map((text) =>
        text.replace(text, text.match(/^(.*?)(?=\s:)/)[0] || text)
      );

      //attribuer un nom à chaque bouton
      newElementText.forEach((text) => (deleteButton.dataset.url = text));

      //bouton pour supprimer une note
      deleteButton.addEventListener("click", () => {
        const dataOrderName = deleteButton.dataset.url;
        for (let i = 0; i < newElementText.length; i++) {
          if (dataOrderName === newElementText[i]) {
            delete notes[dataOrderName];
            chrome.storage.local.set({ notes }, loadAndShowNotes);
            siteList.removeChild(element);
          }
        }
      });
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
        //bouton pour modifier une note
        editButton.addEventListener("click", () => {
          dialog.show();
          closeDialog.addEventListener("click", () => {
            dialog.close();
            dialog.returnValue;
          })
        })
    }
  });
}
