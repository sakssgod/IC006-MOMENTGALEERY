document.addEventListener('DOMContentLoaded', () => {
    const initialModal = document.getElementById('initial-modal');
    const loadingModal = document.getElementById('loading-modal');
    const successModal = document.getElementById('success-modal');
    const createButton = document.getElementById('create-button');
    const cancelButton = document.getElementById('cancel-button');
    const successOkButton = document.getElementById('success-ok');
  
    // 点击“Criar”按钮
    createButton.addEventListener('click', () => {
      initialModal.style.display = 'none'; // 隐藏初始模态框
      loadingModal.style.display = 'flex'; // 显示加载模态框
  
      setTimeout(() => {
        loadingModal.style.display = 'none'; // 隐藏加载模态框
        successModal.style.display = 'flex'; // 显示成功模态框
      }, 2000); // 等待2秒
    });
  
    // 点击“Cancelar”按钮
    cancelButton.addEventListener('click', () => {
      initialModal.style.display = 'none'; // 隐藏初始模态框
    });
  
    // 点击“OK”按钮
    successOkButton.addEventListener('click', () => {
      successModal.style.display = 'none'; // 隐藏成功模态框
    });
  });
  