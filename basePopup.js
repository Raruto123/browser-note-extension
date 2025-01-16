let notes = {
  singleNote : null,
  singleUrl : null
};

async function getActualTabAndNote() {

  const actualTab = await chrome.tabs.query(
    {
      currentWindow : true,
      active : true
    }
  );

  const url = actualTab[0].url;

    document.getElementById("save-note").addEventListener("click", () => {
      //Récupérer la valeur de la note
      const noteValue = document.getElementsByTagName("input")[0].value;
      //Si les deux éléments sont réunis permet l'enregistrement
      if (url && noteValue.trim() !== "") {

        //Créer la base de données
        chrome.storage.local.set({notes}).then(() => {
          alert(`Note Enregistrée ! voici la longueur de l'url : ${url.length} et la valeur de la note : ${noteValue}`);
          showRegisteredSites()
        });

        //Récupérer les informations sur la base de données
        chrome.storage.local.get("notes").then((data) => {
          const notes = data.notes;
          notes[url] = noteValue;
          // let note = data.notes.singleNote;
          // note = noteValue;
          // let noteUrl = data.notes.singleUrl;
          // noteUrl = url;
        })
      } else {
        alert("veuillez entrer une valeur valide")
      }
    })

    //afficher les sites enregistrées
    function showRegisteredSites() {

      chrome.storage.local.get("notes").then((data) => {
        const notes = data.notes;
        const siteList = document.getElementById("site-list");

        for(const note in notes) {
          const li = document.createElement("li");
          li.textContent = `${note} : ${notes[note]}`;

          siteList.appendChild(li);
        }
      })
    }
}

getActualTabAndNote();
