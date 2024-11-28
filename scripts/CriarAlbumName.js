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
  
      // 从 localStorage 获取现有的相册名称数组
      let albumList = JSON.parse(localStorage.getItem('albumNames')) || [];
  
      // 将新的相册名称添加到数组
      albumList.push(albumName);
  
      // 将更新后的数组保存回 localStorage
      localStorage.setItem('albumNames', JSON.stringify(albumList));
  
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
  