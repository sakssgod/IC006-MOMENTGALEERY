function openImage(srcImagem) {
    // Remove a parte do caminho at茅 o diret贸rio raiz do projeto e corrige os separadores
    srcImagem.replace(/^file:\/\/\/[A-Z]:\/.*?\/site\//, "").replace(/\\/g, "/");
  
    // Recupera os metadados da imagem do localStorage com base no caminho relativo
    const imageData = JSON.parse(localStorage.getItem("allPictures"));
    let correctImgs = imageData.find(image => srcImagem.includes(image.link));
  
  
    for(let image of imageData){
      if(srcImagem.includes(image.link)){
        correctImgs = image;
        break;
        
      }
    }
    if (correctImgs) {
  
      let srcEmocao;
      if (correctImgs.emocao == "admira莽茫o") {
        srcEmocao = window.location.pathname.endsWith("album.html") ? "../images/icons/admiracao.png" : "images/icons/admiracao.png";
      } else if (correctImgs.emocao == "encantamento") {
        srcEmocao = window.location.pathname.endsWith("album.html") ? "../images/icons/encantamento.png" : "images/icons/encantamento.png";
      } else if (correctImgs.emocao == "tranquilidade") {
        srcEmocao = window.location.pathname.endsWith("album.html") ? "../images/icons/tranquilidade.png" : "images/icons/tranquilidade.png";
      } else if (correctImgs.emocao == "felicidade") {
        srcEmocao = window.location.pathname.endsWith("album.html") ? "../images/icons/felicidade.png" : "images/icons/felicidade.png";
      }
  
      const pessoasInfo = correctImgs.pessoas !== "undefined" && correctImgs.pessoas.trim() !== "" 
      ? `<p>Pessoas: ${correctImgs.pessoas}</p>` 
      : "";
  
      const notasInfo = correctImgs.notas !== "undefined" && correctImgs.notas.trim() !== "" 
      ? `<p id="notas"><strong>Notas:</strong> ${correctImgs.notas}</p>` 
      : "";
  
      let srcLocal = window.location.pathname.endsWith("album.html") ? "../images/localizacao.png" : "images/localizacao.png";
      let srcPin = window.location.pathname.endsWith("album.html") ? "../images/pin.png" : "images/pin.png";
      let srcRem = window.location.pathname.endsWith("album.html") ? "../images/icons/remove.png" : "images/icons/remove.png";
  
      const body = document.body;
  
      popUp.innerHTML = `
        <section class="popup-image" id="popup-image">
          <div class="popup-imageInfo">
            <div class="image-container"><img src="${srcImagem}" class="popup-image"></div>
            <div class="text-container">
              <div id="close-popup" class="close-button"><img src="${srcRem}"></div>
              <p id="data">${correctImgs.data}</p>
              <div class="map-container">
                <div class="map-wrapper">
                  <img id="map" src="${srcLocal}" class="map-img">
                  <img id="pin_map" src="${srcPin}" class="pin-img">
                </div>
                <p class="location-text">${correctImgs.localizacao}</p>
              </div>
              <div class="detalhes-tec">
              <div class="metadados-dispositivo">${correctImgs.dispositivo}</div>
              <div class="metadados-camera"> ${correctImgs.camera}</div>
              <div class="metadados-meta">${correctImgs.metadados}</div>
              <div class="metadados-avancados"> ${correctImgs.avancados}</div>
              </div>
              <div class="emocao-container">
                <img src="${srcEmocao}" alt="emoji" class="emoji">
                <p id="emocao">
                  ${correctImgs.emocao}
                  <span class="info-icon" id="info-icon">i</span>
                  <span class="info-tooltip">Esta foto transmite um sentimento de ${correctImgs.emocao}</span>
                </p>
              </div>
              ${pessoasInfo}
              <hr>
              ${notasInfo}
            </div>
          </div>
          <span class="info-tooltip">Esta foto transmite um sentimento de tranquilidade</span>
        </section>
      `;
      popUp.style.display = "flex";
      body.style.overflow = "hidden";
  
      const imageElement = document.querySelector('.image-container img'); // A imagem no cont锚iner
      const closeButton = document.getElementById('close-popup');
  
      imageElement.addEventListener('click', function () {
        console.log(imageElement);
        imageElement.classList.toggle('show'); // Alterna a classe 'show' para fullscreen
      });
  
      document.getElementById("close-popup").addEventListener("click", closePopUp);
      document.getElementById("popup-image").addEventListener("click", function (event) {
        if (event.target.id === 'popup-image') {
          closePopUp();
        }});
  
      // Tooltip para coordenadas GPS ao passar o mouse sobre o pin
      const pinImage = document.getElementById("pin_map");
      const tooltip = document.createElement("div");
      tooltip.classList.add("tooltip");
      document.body.appendChild(tooltip);
  
      pinImage.addEventListener("mouseover", (event) => {
        tooltip.textContent = `${correctImgs.gps}`;
        tooltip.style.visibility = "visible";
  
        // Posi莽茫o fixa em rela莽茫o ao pin (ajustando para que ele fique ao lado do pin)
        const pinRect = pinImage.getBoundingClientRect();
        tooltip.style.top = `${pinRect.top + window.scrollY + 10}px`; // 10px de dist芒ncia para baixo
        tooltip.style.left = `${pinRect.left + window.scrollX + pinImage.width + 10}px`; // 10px de dist芒ncia para a direita
      });
  
      pinImage.addEventListener("mouseout", () => tooltip.style.visibility = "hidden");
    }
  }
  
  function closePopUp() {
    popUp.style.display = "none";
    document.body.style.overflow = "";
  }
  