
const addFolderBtn = document.getElementById("add-folder");
const popUp = document.getElementById("pop-up");
const albumList = document.getElementById("albumList");
document.addEventListener("DOMContentLoaded", () => {
  // Function to create the popup
  function showPopUp() {
    // Create popup content
    const popUpContent = `
      <div class="popup-container">
        <h2>Criar novo album</h2>
        <input type="text" id="folder-name" placeholder="Digite o nome do album...">
        <button id="create-folder">Pr贸ximo</button>
        <button id="close-photos-popup">X</button>
      </div>
    `;

    // Set popup content
    popUp.innerHTML = popUpContent;

    // Display the popup and darken the background
    popUp.style.display = "flex";

    // Close the popup when 'Cancel' is clicked
    document.getElementById("close-photos-popup").addEventListener("click", closePopUp);

    // Handle folder creation and move to filters when 'Next' is clicked
    document.getElementById("create-folder").addEventListener("click", showFiltersPopUp);
  }

  // Function to close the popup
  function closePopUp() {
    popUp.style.display = "none";
  }// Function to show filters in the popup
function showFiltersPopUp() {
  const folderName = document.getElementById("folder-name").value.trim();

  if (folderName) {
    // Recuperar 谩lbuns atuais do armazenamento local
    const albums = JSON.parse(localStorage.getItem("albuns")) || {};

    // Verificar se o nome do 谩lbum j谩 existe
    if (albums[folderName]) {
      alert("O 谩lbum j谩 existe. Por favor, escolha outro nome.");
      return;
    }



    // Save the folder name in local storage temporarily for later use
    localStorage.setItem("currentFolderName", folderName);

    let filterList = [];
    const allPicturesAlbum = JSON.parse(localStorage.getItem("allPictures"));

    if (Array.isArray(allPicturesAlbum)) {
      // Se allPicturesAlbum for um array v谩lido, execute a l贸gica de filtro
      allPicturesAlbum.forEach(picture => {
        if (Array.isArray(picture.filtro)) { // Verifica se picture.filtro 茅 um array
          picture.filtro.forEach(filtro => {
            filterList.push(filtro);
          });
        }
      });
    }

    filterList = [...new Set(filterList)]; // Remove duplicados
    console.log(filterList);

    // Start building the filter popup content dynamically
    let filterGroupsContent = '';
    const groupSize = 3; // Definindo o n煤mero de filtros por grupo (pode ser ajustado conforme necess谩rio)

    // Split filterList into groups of groupSize
    for (let i = 0; i < filterList.length; i += groupSize) {
      const filterGroup = filterList.slice(i, i + groupSize);
      filterGroupsContent += `
        <div class="filter-group">
          ${filterGroup.map((filter, index) => {
            const filterId = `filter${i + index + 1}`;
            return `<label><input type="checkbox" class="filter-checkbox" data-filter="${filter}"> ${filter}</label>`;
          }).join('')}
        </div>
      `;
    }

    // Update the popup content with dynamically generated filters
    let srcBackButton = window.location.pathname.endsWith("album.html") ? "../images/back.png" : "images/back.png";
    const popUpContent = `
      <div class="popup-container-Filtros">
      <a id="back-button" class="back-button">
        <img src="${srcBackButton}" alt="Voltar">
      </a>
        <h2>Aplicar filtros a "${folderName}"</h2>
        ${filterGroupsContent}
        <div>
          <p><strong>Fotos dispon铆veis: </strong><span id="photo-count">0</span></p> <!-- Campo de contagem de fotos -->
        </div>
        <div>
          <label for="photo-limit"><strong>Quantas fotos quer?</strong></label>
          <input type="number" id="photo-limit" min="1" placeholder="Limite de fotos">
        </div>
        <button id="apply-filters">Criar</button>
        <button id="close-photos-popup">X</button>
      </div>
    `;

    // Update popup content
    popUp.innerHTML = popUpContent;

    // Close the popup when 'Cancel' is clicked
    document.getElementById("close-photos-popup").addEventListener("click", closePopUp);

    // Handle applying filters when 'Apply' is clicked
    document.getElementById("apply-filters").addEventListener("click", applyFilters);
    document.getElementById("back-button").addEventListener("click", () => {
      showPopUp();
    });
    

    // Update photo count whenever a checkbox is clicked
    const checkboxes = document.querySelectorAll('.filter-checkbox');
    checkboxes.forEach(checkbox => {
      checkbox.addEventListener('change', updatePhotoCount);
    });

    // Initial photo count update
    updatePhotoCount();
  } else {
    alert("Por favor, coloque um nome para o album!");
  }
}

// Function to update photo count based on selected filters and photo limit
function updatePhotoCount() {
  const allPicturesAlbum = JSON.parse(localStorage.getItem("allPictures"));
  const selectedFilters = Array.from(document.querySelectorAll('.filter-checkbox:checked')).map(checkbox => checkbox.getAttribute('data-filter'));
  
  let filteredPhotosCount = 0;

  // Filter photos based on selected filters
  allPicturesAlbum.forEach(picture => {
    const pictureFilters = picture.filtro || [];
    if (selectedFilters.every(filter => pictureFilters.includes(filter))) {
      filteredPhotosCount++;
    }
  });

  // Get the photo limit value from the input field
  const photoLimit = parseInt(document.getElementById("photo-limit").value) || filteredPhotosCount;

  // Update the photo count display, considering the limit
  document.getElementById("photo-count").textContent = Math.min(filteredPhotosCount, photoLimit);
}
// Fun莽茫o para aplicar filtros e finalizar a cria莽茫o do 谩lbum
function applyFilters() {
  const folderName = localStorage.getItem("currentFolderName");

  if (folderName) {
    // Recuperar 谩lbuns atuais do armazenamento local
    let albums = JSON.parse(localStorage.getItem("albuns")) || {};

    // Obter os filtros selecionados
    const selectedFilters = Array.from(document.querySelectorAll('.filter-checkbox:checked')).map(checkbox => checkbox.getAttribute('data-filter'));

    // Recuperar todas as imagens
    const allPicturesAlbum = JSON.parse(localStorage.getItem("allPictures"));

    // Filtrar as fotos de acordo com os filtros selecionados
    const filteredPhotos = allPicturesAlbum.filter(picture => {
      const pictureFilters = picture.filtro || [];
      return selectedFilters.every(filter => pictureFilters.includes(filter));
    });

    // Contar o n煤mero de fotos filtradas
    const filteredPhotosCount = filteredPhotos.length;

    // Obter o limite de fotos desejado
    const photoLimit = parseInt(document.getElementById("photo-limit").value) || filteredPhotosCount;

    // Exibir mensagem de aviso se n茫o houver fotos para os filtros
    if (filteredPhotosCount === 0) {
      alert("Nao existem fotos suficientes para os filtros especificados.");
      return;
    }

    // Exibir mensagem de aviso se o n煤mero de fotos desejado for maior que o n煤mero poss铆vel de fotos
    if (photoLimit > filteredPhotosCount) {
      alert("O n煤mero de fotos que pretende selecionar 茅 menor ao n煤mero poss铆vel de selecionar.");
      return;
    }

    // Selecionar fotos aleat贸rias (se houver mais fotos do que o limite)
    const randomPhotos = getRandomItems(filteredPhotos, photoLimit);

    // Adicionar as fotos ao 谩lbum
    albums[folderName] = randomPhotos; // Adiciona as fotos aleat贸rias ao 谩lbum

    // Atualizar o armazenamento local com o novo 谩lbum
    localStorage.setItem("albuns", JSON.stringify(albums));

    // Atualizar a interface do lado do 谩lbum (opcional, se necess谩rio)
    genSideAlbum(folderName);

    // Fechar o popup ap贸s a aplica莽茫o dos filtros
    
    closePopUp();
    setTimeout(() => {
      alert("O album foi gerado com sucesso.");
      redirectToPage(folderName);
    }, 100); // Redireciona ap贸s 2 segundos
  } else {
    alert("Ocorreu um erro. Tente novamente.");
  }
}

// Fun莽茫o para selecionar itens aleat贸rios de um array
function getRandomItems(array, count) {
  const shuffled = array.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}



  // Function to generate album item in the sidebar
  function genSideAlbum(album) {
    var allAlbuns = document.querySelectorAll('.albuns');
    if (document.getElementsByClassName('albuns hidden').length != 0) {
      allAlbuns.forEach(album => {
        album.classList.toggle('hidden');
      });
    }

    const li = document.createElement("li");
    li.className = "albuns";
    li.onclick = function () {
      redirectToPage(album);
    };
    li.textContent = album;
    albumList.appendChild(li);
  }

  // Function to redirect to album page
  function redirectToPage(albumName) {
    const url = window.location.pathname;
    if (url.includes("index.html")) {
      window.location.href = "albuns/album.html?album=" + encodeURIComponent(albumName);
    } else {
      window.location.href = "album.html?album=" + encodeURIComponent(albumName);
    }
  }

  // Add event listener to 'Add Folder' button
  addFolderBtn.addEventListener("click", showPopUp);
});