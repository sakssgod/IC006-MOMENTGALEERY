// Supondo que 'allPictures' j谩 esteja armazenado no localStorage
const genAllPics = JSON.parse(localStorage.getItem("allPictures"));



// Seleciona a se莽茫o onde as fotos ser茫o inseridas
const photosSection = document.querySelector(".photos");

// Fun莽茫o para extrair o caminho relativo a partir de "/albuns/"
function getRelativePath(link) {
    const basePath = "/albuns/";
    const index = link.indexOf(basePath);

    if (index !== -1) {
        // Caso contenha "/albuns/", extrai o caminho relativo
        return link.substring(index + basePath.length);
    } else {
        return link;
    }
}

// Verifica se o array de imagens existe e tem conte煤do
if (allPictures && allPictures.length > 0) {
    allPictures.forEach(picture => {
        const relativePath = getRelativePath(picture.link);
        if (relativePath) {
            // Cria o cont锚iner div
            const photoDiv = document.createElement("div");
            photoDiv.className = "photo";

            // Cria o elemento de imagem
            const imgElement = document.createElement("img");
            imgElement.src = `albuns/${relativePath}`;
            imgElement.alt = picture.nome || "Imagem sem nome";
            imgElement.onclick = () => openImage(imgElement.src);

            // Adiciona a imagem 脿 div
            photoDiv.appendChild(imgElement);

            // Adiciona a div ao section
            photosSection.appendChild(photoDiv);
        }
    });
} else {
    photosSection.innerHTML = "<p>Nenhuma imagem encontrada.</p>";
}

