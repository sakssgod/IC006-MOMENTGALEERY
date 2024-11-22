function toggleDropdown(event) {
    event.stopPropagation(); // 阻止事件冒泡
    const dropdownMenu = document.getElementById('dropdownMenu');
    dropdownMenu.style.display = dropdownMenu.style.display === 'block' ? 'none' : 'block';
}

// 点击页面其他地方时隐藏下拉菜单
document.addEventListener('click', function() {
    const dropdownMenu = document.getElementById('dropdownMenu');
    if (dropdownMenu.style.display === 'block') {
        dropdownMenu.style.display = 'none';
    }
});


// 获取 file-explorer 的引用
const fileExplorer = document.getElementById('fileExplorer');
const warningAddContainer = document.getElementById('warningAddContainer');

// 为 open 按钮添加事件监听器
document.querySelector('.bottom-open-cancele .bottom-button:first-child').addEventListener('click', function () {
    const thumbnailContainer = document.querySelector('.thumbnail-container');
    if (thumbnailContainer) {
        thumbnailContainer.style.display = 'block'; // 显示图片容器
    }
    fileExplorer.style.display = 'none'; // 隐藏 file-explorer
    warningAddContainer.style.display = 'none';
});

// 为 cancele 按钮添加事件监听器
document.querySelector('.bottom-open-cancele .bottom-button:last-child').addEventListener('click', function () {
    fileExplorer.style.display = 'none'; // 隐藏 file-explorer
});

function openIframe(url) {
    const iframeContainer = document.getElementById('iframeContainer');
    const criteriosIframe = document.getElementById('criteriosIframe');
    if (iframeContainer && criteriosIframe) {
        criteriosIframe.src = url; // 设置 iframe 的链接
        iframeContainer.style.display = 'block'; // 显示 iframe 容器
    }
}

function closeIframe() {
    const iframeContainer = document.getElementById('iframeContainer');
    const criteriosIframe = document.getElementById('criteriosIframe');
    if (iframeContainer && criteriosIframe) {
        criteriosIframe.src = ''; // 清空 iframe 的链接
        iframeContainer.style.display = 'none'; // 隐藏 iframe 容器
    }
}

