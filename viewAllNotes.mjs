const siteList = document.getElementById("site-list");

document.addEventListener("DOMContentLoaded", () => {
  loadAndShowNotes();
});

export function loadAndShowNotes() {
  // siteList.innerHTML = ""; // Nettoyer la liste avant d'ajouter les éléments
  chrome.storage.local.get("notes", (data) => {
    const notes = data.notes || {}; // Assurer que notes existe

    console.log(
      `%c🎨 ⍨ Notes chargées`,
      "color:yellowgreen; font-weight:bold",
      notes
    );

    for (const url in notes) {
      // Vérifie si siteList existe avant d'essayer d'ajouter des éléments
      //le problème est au niveau de basepopup.html vu que y'a pas sitelist
      //là-bas quand je repasse sur la page ça déclence cette erreur
      if (!siteList) {
        console.warn(
          "⚠️ `siteList` est null, impossible d'ajouter des notes !"
        );
        return;
      }
      //la liste des notes
      const element = document.createElement("li");
      element.textContent = `${url} : ${notes[url]}`;

      //bouton supprimer
      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Supprimer";
      deleteButton.type = "button";
      deleteButton.dataset.url = "";

      //je colle le bouton supprimer à la list element
      element.appendChild(deleteButton);

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
    }
  });
}
