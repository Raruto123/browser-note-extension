// Récupérer l'URL actuelle
// document.getElementById("save-note").addEventListener("click", async () => {
//     const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
//     const url = tab.url;
//     const note = document.getElementById("note").value;
  
//     // Stocker l'URL et la note dans le stockage local
//     chrome.storage.local.get(["notes"], (data) => {
//       const notes = data.notes || {};
//       notes[url] = note; // Associe la note à l'URL
//       chrome.storage.local.set({ notes }, () => {
//         alert("Note enregistrée !");
//         afficherSites(); // Rafraîchir la liste des sites
//       });
//     });
//   });
  
//   // Afficher les sites enregistrés
//   function afficherSites() {
//     chrome.storage.local.get(["notes"], (data) => {
//       const notes = data.notes || {};
//       const siteList = document.getElementById("site-list");
//       siteList.innerHTML = "";
  
//       for (const [url, note] of Object.entries(notes)) {
//         const li = document.createElement("li");
//         li.textContent = `${url} : ${note}`;
  
//         // Bouton modifier
//         const editButton = document.createElement("button");
//         editButton.textContent = "Modifier";
//         editButton.addEventListener("click", () => {
//           const newNote = prompt("Modifier la note :", note);
//           if (newNote !== null) {
//             notes[url] = newNote;
//             chrome.storage.local.set({ notes }, afficherSites);
//           }
//         });
  
//         // Bouton supprimer
//         const deleteButton = document.createElement("button");
//         deleteButton.textContent = "Supprimer";
//         deleteButton.addEventListener("click", () => {
//           delete notes[url];
//           chrome.storage.local.set({ notes }, afficherSites);
//         });
  
//         li.appendChild(editButton);
//         li.appendChild(deleteButton);
//         siteList.appendChild(li);
//       }
//     });
//   }
  
//   // Charger les sites enregistrés au démarrage
//   afficherSites();

//Récupérer l'URL actuelle