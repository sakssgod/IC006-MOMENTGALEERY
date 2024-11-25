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
const overlay = document.getElementById('overlay');

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


overlay.classList.add('overlay');
document.body.appendChild(overlay);

// 打开文件浏览器并显示遮罩
function openFileExplorer() {
    fileExplorer.style.display = 'flex'; // 显示文件浏览器
    overlay.style.display = 'block'; // 显示遮罩
}

// 关闭文件浏览器并隐藏遮罩
function closeFileExplorer() {
    fileExplorer.style.display = 'none'; // 隐藏文件浏览器
    overlay.style.display = 'none'; // 隐藏遮罩
}

// 阻止点击文件浏览器内容时关闭
fileExplorer.addEventListener('click', (event) => {
    event.stopPropagation();
});

// 绑定遮罩点击事件
overlay.addEventListener('click', closeFileExplorer);
