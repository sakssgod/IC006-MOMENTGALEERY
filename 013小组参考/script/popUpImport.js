const uploadBtn = document.getElementById("upload"); // Change button to "upload-btn"

let ThisImport;


document.addEventListener("DOMContentLoaded", () => {
  // Function to create the popup as shown in the image
  function showPopUp() {
    const body = document.body;
    // Create popup content with four options
    const popUpContent = `
      <div class="popup-container">
        <h2>Carregar a partir de...</h2>
        <div class="upload-options">
          <button class="upload-option" id="google-drive">Google Drive</button>
          <button class="upload-option" id="icloud">iCloud</button>
          <button class="upload-option" id="one-drive">OneDrive</button>
          <button class="upload-option" id="outro">Outro</button>
        </div>
        <button id="close-popupI">X</button>
      </div>
    `;

    // Set popup content
    popUp.innerHTML = popUpContent;
    popUp.style.display = "flex"; // Display the popup
    body.style.overflow = "hidden";

    // Close the popup when 'X' is clicked
    document.getElementById("close-popupI").addEventListener("click", closePopUp);
    // FECHA QUANDO CLICA SE FORA DO POP-UP
    document.addEventListener("click", function(event) {
      const popupContainer = document.querySelector(".popup-container");
      if (event.target === popUp && !popupContainer.contains(event.target)) {
        closePopUp(); // Fechar o pop-up
      }
    });

    // Event listeners for each upload option
    document.getElementById("google-drive").addEventListener("click", () => { closePopUp(); showImportPhotos("GoogleDrive")});
    document.getElementById("icloud").addEventListener("click", () => showImportPhotos("ICloud"));
    document.getElementById("one-drive").addEventListener("click", () => showImportPhotos("OneDrive"));
    document.getElementById("outro").addEventListener("click", () => showImportPhotos("Outro"));
  }

 

  // Function to close the popup
  function closePopUp() {
    popUp.style.display = "none";
    document.body.style.overflow = "";
  }

  // Add event listener to 'Upload' button
  uploadBtn.addEventListener("click", showPopUp);

  function showImportPhotos(whichImport) {
    ThisImport = whichImport
    const body = document.body;
    let photos = JSON.parse(localStorage.getItem("albuns_import")); // Recupera os 谩lbuns do localStorage
    if (photos && photos[whichImport]) {
      // Gera o conte煤do do pop-up como uma string completa
      
      popUp.innerHTML = `
        <div class = "popUpcontainer" id = "popup-container">
            <button id="close-photos-popup">X</button>
            <div class="tittle-import">
              <h2>Selecione as fotografias que deseja importar</h2>
              <p>Selecionar todas</p>
            </div>
          <div class="photo-gallery">
            ${photos[whichImport].map(photo =>            
              `              <div class="photo-item">
                <img src="${window.location.pathname.endsWith("album.html") ?photo.link : "albuns/"+ photo.link}" alt="${photo.nome}" />
              </div>
            `).join('')}
          </div>
          <div>
          <button id = "return-button">Back</button>
          <button id = "concluir-import">Avan莽ar</button>
            </div>
        </div>
      `;
  
      popUp.style.display = "flex";
      body.style.overflow = "hidden";
      
      // CODIGO PARA SELECIONAR FOTO
      document.querySelectorAll('.photo-item').forEach(item => {
        item.addEventListener('click', function () {
            // Marca ou desmarca a foto clicada
            item.classList.toggle('selected');
        });
      });
      
      //"X"
      document.getElementById("close-photos-popup").addEventListener("click", () => {
        closePopUp(); // Fecha o pop-up ao clicar no botao 'X'
      });

      //VOLTA AO POPUP ANTERIOR
      document.getElementById("return-button").addEventListener("click", function() {
        closePopUp();   // Fecha o pop-up atual
        showPopUp();    // Chama a fun莽茫o que exibe o pop-up inicial
      });
  
      // FECHA AO CLICAR FORA DO POP UP
      document.addEventListener("click", function (event) {
        const popupContainer = document.getElementById("popup-container");
        if (event.target === popUp && !popupContainer.contains(event.target)) {
          closePopUp(); // Fecha o pop-up ao clicar fora dele
        }
      });

    } else {
      alert(`Funcionalidade de importar com ${ThisImport} n茫o disponivel!`)
      console.error("N茫o h谩 fotos do Google Drive para exibir.");
    }
  }
  }
);

// Adiciona o evento ao bot茫o "Concluir Import"
document.addEventListener("click", (event) => {
  if (event.target && event.target.id === "concluir-import") {
    // Seleciona todas as fotos marcadas como selecionadas
    const selectedPhotos = document.querySelectorAll(".photo-item.selected");
    const selectedPhotosCount = selectedPhotos.length;

    if (selectedPhotosCount > 0) {
      // Exibe popup de confirma莽茫o
      showConfirmationPopup(selectedPhotosCount, selectedPhotos);
    } else {
      alert("Selecione pelo menos uma foto antes de continuar.");
    }
  }
});

// Fun莽茫o para exibir o popup de confirma莽茫o
function showConfirmationPopup(selectedPhotosCount, selectedPhotos) {
  const body = document.body;

  // Conte煤do do popup de confirma莽茫o
  const confirmationContent = `
    <div class="confirmation-container">
      <h2>Tem a certeza que quer importar ${selectedPhotosCount} foto${selectedPhotosCount > 1 ? 's' : ''}?</h2>
      <div class="confirmation-buttons">
        <button id="confirm-import">Sim</button>
        <button id="cancel-import">N茫o</button>
      </div>
    </div>
  `;

  popUp.innerHTML = confirmationContent;
  popUp.style.display = "flex"; // Exibe o popup
  body.style.overflow = "hidden";


  // Evento para confirmar a importa莽茫o
  document.getElementById("confirm-import").addEventListener("click", () => {
    importSelectedPhotos(selectedPhotos); // Chama a fun莽茫o de importa莽茫o
    closePopUp();
    setTimeout(() => {
      alert("As fotos foram importadas com sucesso");
      window.location.href = `albuns/album.html?album=${ThisImport}`;
    }, 100); // Redireciona ap贸s 2 segundos
  });

  // Evento para cancelar a importa莽茫o
  document.getElementById("cancel-import").addEventListener("click", closePopUp);

  // Fecha ao clicar fora do popup
  document.addEventListener("click", function (event) {
    const confirmationContainer = document.querySelector(".confirmation-container");
    if (event.target === popUp && !confirmationContainer.contains(event.target)) {
      closePopUp();
    }
  });
}

// Fun莽茫o para realizar a importa莽茫o das fotos selecionadas
function importSelectedPhotos(selectedPhotos) {
  // Recupera os dados completos do localStorage
  const photosData = JSON.parse(localStorage.getItem("albuns_import")) || {};

  // Cria um array de fotos selecionadas com todos os dados
  const allSelectedPictures = Array.from(selectedPhotos).map(item => {
    const imgElement = item.querySelector("img");
    const relativeLink = imgElement.src.replace(window.location.origin, ""); // Link relativo

    // Localiza os dados completos da foto com base no "contains" no link
    const photoData = Object.values(photosData)
      .flat() // Une todos os 谩lbuns em um 煤nico array
      .find(photo => relativeLink.includes(photo.link)); // Verifica se o link cont茅m a parte relativa

    if (photoData) {
      return { ...photoData }; // Retorna os dados completos da foto
    } else {
      console.warn(`Dados da foto n茫o encontrados para o link: ${relativeLink}`);
      return null; // Ignora fotos que n茫o foram encontradas
    }
  }).filter(photo => photo !== null); // Remove entradas nulas

  // Verifica se as fotos j谩 existem em "allPictures" e as filtra
  const allPictures = JSON.parse(localStorage.getItem("allPictures")) || [];
  
  // Filtra as fotos que n茫o existem em "allPictures" para evitar duplicatas
  const uniquePhotos = allSelectedPictures.filter(newPhoto => {
    return !allPictures.some(existingPhoto => existingPhoto.link === newPhoto.link);
  });

  // Adiciona ao localStorage apenas as fotos 煤nicas
  const updatedPictures = [...allPictures, ...uniquePhotos];
  localStorage.setItem("allPictures", JSON.stringify(updatedPictures));

  // Atualiza ou cria o 谩lbum escolhido em "albuns"
  const albuns = JSON.parse(localStorage.getItem("albuns")) || {};
  console.log(ThisImport)
  albuns[ThisImport] = albuns[ThisImport] ? [...albuns[ThisImport], ...allSelectedPictures] : allSelectedPictures;
  localStorage.setItem("albuns", JSON.stringify(albuns));

  console.log(`${allSelectedPictures.length} foto(s) importada(s) com sucesso.`);
}