document.addEventListener('DOMContentLoaded', () => {
    const initialModal = document.getElementById('initial-modal');
    const loadingModal = document.getElementById('loading-modal');
    const successModal = document.getElementById('success-modal');
    const createButton = document.getElementById('create-button');
    const cancelButton = document.getElementById('cancel-button');
    const successOkButton = document.getElementById('success-ok');
    const albumNameInput = document.getElementById('album-name');
  
  // 点击“Criar”按钮
  createButton.addEventListener('click', () => {
    const albumName = albumNameInput.value.trim();

    if (albumName === '') {
      alert('Por favor, insira o nome do álbum.');
      return;
    }

    // 清空 localStorage 中的相册名称（只保留一个）
    localStorage.setItem('albumNamesFromHomepage', JSON.stringify([albumName]));

    // 隐藏初始模态框并显示加载模态框
    initialModal.style.display = 'none';
    loadingModal.style.display = 'flex';

    setTimeout(() => {
      // 隐藏加载模态框并显示成功模态框
      loadingModal.style.display = 'none';
      successModal.style.display = 'flex';

      // 清空输入框
      albumNameInput.value = '';
    }, 2000);
  });

  
    // 点击“Cancelar”按钮
    cancelButton.addEventListener('click', () => {
      initialModal.style.display = 'none';
    });
  
    // 点击“OK”按钮
    successOkButton.addEventListener('click', () => {
      successModal.style.display = 'none';
      // 可选：重定向到其他页面或刷新
      window.location.reload();
    });
  });
  

  // 点击“OK”按钮
successOkButton.addEventListener('click', () => {
  successModal.style.display = 'none';

  // 从 localStorage 获取相册名
  const albumNames = JSON.parse(localStorage.getItem('albumNamesFromHomepage')) || [];
  const albumName = albumNames[0]; // 取最新的相册名
  
  if (!albumName) {
    alert("未找到相册名称，请重试！");
    return;
  }

  // 从 localStorage 获取已过滤的图片数据
  const selectedFiles = JSON.parse(localStorage.getItem('filtered-selectedFiles')) || [];
  
  if (selectedFiles.length === 0) {
    alert("未找到图片数据，请先选择图片！");
    return;
  }

  // 在 localStorage 中创建新相册并添加图片
  const albumData = {
    name: albumName,
    photos: selectedFiles,
  };

  let allAlbums = JSON.parse(localStorage.getItem('allAlbums')) || []; // 获取现有的相册数据
  allAlbums.push(albumData);
  localStorage.setItem('allAlbums', JSON.stringify(allAlbums));

  // 创建相册页面内容
  createAlbumInDOM(albumName, selectedFiles);

  // 可选：重定向到 AlbumPage
  window.location.href = './AlbumPage.html';
});

// 在 AlbumPage 中创建相册及图片的函数
function createAlbumInDOM(albumName, photos) {
  const albumContainer = document.querySelector('.album-container');
  if (!albumContainer) {
    console.error("Album container not found on the page.");
    return;
  }

  // 创建相册元素
  const newAlbum = document.createElement('div');
  newAlbum.classList.add('album-item');
  newAlbum.innerHTML = `
    <div class="icon album">&#xe600;</div>
    <div class="album-name">${albumName}</div>
  `;

  newAlbum.addEventListener('click', () => {
    // 重定向到 InsideAlbum.html，传递相册名称
    window.location.href = `InsideAlbum.html?albumName=${encodeURIComponent(albumName)}`;
  });

  albumContainer.appendChild(newAlbum);

  // 在 InsideAlbum 页面中显示图片（若需要自动创建）
  const insideAlbumContainer = document.querySelector('.album-container');
  if (insideAlbumContainer) {
    photos.forEach(photo => {
      const photoDiv = document.createElement('div');
      photoDiv.classList.add('album-item');
      photoDiv.innerHTML = `
        <div class="icon album">&#xe618;</div>
        <div class="Photo-name">${photo.name}</div>
      `;
      insideAlbumContainer.appendChild(photoDiv);
    });
  }
}
