document.addEventListener("DOMContentLoaded", () => {
    const ul = document.getElementById("albumList");
    const albunsMain = document.querySelector('.album-main'); // Selecionar o item "Albums"
    const arrow = albunsMain.querySelector('.arrow'); // Selecionar a seta de imagem dentro de "Albums"
  
    let upArrow, downArrow;
    const url = window.location.pathname;
  
    if(url.includes("index.html")){
      upArrow = "images/icons/up.png";
      downArrow = "images/icons/down-arrow.png";
    } else {
      upArrow = "../images/icons/up.png";
      downArrow = "../images/icons/down-arrow.png";
    }
  
  
    // Fun莽茫o para gerar um 谩lbum na sidebar
    function genSideAlbum(album) {
      const li = document.createElement("li");
      li.className = "albuns hidden";
      
      li.onclick = function() {
        redirectToPage(album);
      };
      
      li.textContent = album; 
      ul.appendChild(li);
    }
  
    // Fun莽茫o para redirecionar para a p谩gina do 谩lbum
    function redirectToPage(albumName) {
      if(url.includes("index.html")){
        window.location.href = "albuns/album.html?album=" + encodeURIComponent(albumName);
      }else if(url.includes(album)) {
        window.location.href = "album.html?album=" + encodeURIComponent(albumName); 
      }else{
        window.location.href = "../albuns/album.html?album=" + encodeURIComponent(albumName);
      }
    }
  
    // Carregar 谩lbuns pr茅-definidos e do localStorage
    function loadAllAlbums() {
  
      // Exibir 谩lbuns do localStorage
      const storedAlbums = JSON.parse(localStorage.getItem("albuns")) || {};
      Object.keys(storedAlbums).forEach(album => {
        genSideAlbum(album);
      });
    }
  
    // Configura莽茫o inicial: carregar todos os 谩lbuns
    loadAllAlbums();
  
    // Alternar exibi莽茫o de 谩lbuns na sidebar e mudar a dire莽茫o da seta
    albunsMain.addEventListener('click', () => {
      const albunsList = document.querySelectorAll('.albuns');
      
      albunsList.forEach(album => {
        album.classList.toggle('hidden');
      });
  
      // Alterar dire莽茫o da seta
      if (arrow.src.includes('up.png')) {
        arrow.src = downArrow;
      } else {
        arrow.src = upArrow;
      }
    });
  });
  