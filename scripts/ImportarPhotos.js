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



document.addEventListener("DOMContentLoaded", () => {
    // 获取按钮引用
    const selectAllButton = document.getElementById("selectAllButton");
    const openButton = document.getElementById("openButton");
    const cancelButton = document.getElementById("cancelButton");

    // 绑定 Select All 按钮事件
    selectAllButton.addEventListener("click", (event) => {
        event.stopPropagation(); // 阻止事件冒泡
        toggleSelectAll(event); // 调用全选/取消全选逻辑
    });

    // 绑定 Open 按钮事件
    openButton.addEventListener("click", () => {
        
        // 打开 EscolherCritWindow
        if (iframeContainer && criteriosIframe) {
            criteriosIframe.src = "../html/EscolherCritWindow.html"; // 设置 EscolherCritWindow 的路径
            iframeContainer.style.display = 'block'; // 显示 iframe 容器
        }
        fileExplorer.style.display = 'none'; // 隐藏 file-explorer

        

        console.log("Open button clicked. This is the new logic placeholder.");


        // 记录勾选的文件信息
        const checkboxes = document.querySelectorAll('.file-checkbox'); // 获取所有复选框
        const selectedFiles = []; // 用于保存选中项的详细信息

        checkboxes.forEach((checkbox) => {
            if (checkbox.checked) {
                const fileItem = checkbox.closest('.file-item'); // 获取对应的 file-item 容器
                if (fileItem) {
                    const img = fileItem.querySelector('img'); // 获取图片元素
                    const description = fileItem.querySelector('.file-photo-description'); // 获取描述元素

                    // 使用 `img.getAttribute('src')` 获取原始路径
                    const originalSrc = img ? img.getAttribute('src') : null;

                    // 保存文件信息到列表中
                    selectedFiles.push({
                        id: fileItem.id, // file-item 的 ID
                        src: originalSrc, // 图片原始路径
                        name: description ? description.textContent : null, // 文件名
                    });
                }
            }
        });

        // 将选中文件信息存储到 localStorage
        localStorage.setItem('selectedFiles', JSON.stringify(selectedFiles));

        // 打印到控制台作为验证
        console.log("Selected files stored in localStorage:", selectedFiles);

        // TODO: 如果有进一步逻辑可以在这里实现
    });

    // 绑定 Cancel 按钮事件
    cancelButton.addEventListener("click", () => {
        fileExplorer.style.display = 'none'; // 隐藏文件浏览器
    });
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


function resizeIframe() {
    const iframe = document.getElementById('criteriosIframe');
    iframe.onload = () => {
        const iframeContent = iframe.contentWindow.document.body;
        
        // 获取内部内容的高度和宽度
        const iframeHeight = iframeContent.scrollHeight - 5;
        const iframeWidth = iframeContent.scrollWidth + 24;
        // 调整 iframe 的高度和宽度
        iframe.style.height = iframeHeight + 'px';
        iframe.style.width = iframeWidth + 'px';
    };
}






// 调用函数
resizeIframe();


// 获取相关元素
const iframeContainer = document.getElementById('iframeContainer');
const criteriosIframe = document.getElementById('criteriosIframe');
const modalPack = document.querySelector('.modal-pack');
const initialModal = document.getElementById('initial-modal');
const loadingModal = document.getElementById('loading-modal');
const successModal = document.getElementById('success-modal');




// 监听来自子页面的消息
window.addEventListener('message', (event) => {
    if (event.data.action === 'openModalPack') {
        // 隐藏 iframe 容器
        iframeContainer.style.display = 'none';
        
        // 显示 modal-pack
        modalPack.style.display = 'block';
        initialModal.style.display = 'block';
    }
});



document.addEventListener("DOMContentLoaded", () => {
    const photoGrid = document.getElementById("photo-grid");

    // 示例照片列表，包含描述信息
    const photos = [
        { src: "../风景照片/1.jpg", alt: "Photo 1", description: "Lagoa" },
        { src: "../风景照片/2.jpg", alt: "Photo 2", description: "Estrada" },
        { src: "../风景照片/3.webp", alt: "Photo 3", description: "Mar de flores" },
        { src: "../风景照片/4.jpg", alt: "Photo 4", description: "Caverna e céu estrelado" },
        { src: "../风景照片/5.jpg", alt: "Photo 5", description: "Campo " },
        { src: "../风景照片/6.jpg", alt: "Photo 6", description: "Mar de nuvens" },
        { src: "../风景照片/7.jpg", alt: "Photo 7", description: "Ponte" },
        { src: "../风景照片/8.jpg", alt: "Photo 8", description: "casa" },
        { src: "../风景照片/9.jpg", alt: "Photo 9", description: "Aurora" },
        { src: "../风景照片/11.jpg", alt: "Photo 11", description: "Luz das estrelas na neve" },
        { src: "../风景照片/12.jpg", alt: "Photo 12", description: "Lua minguante" },
        { src: "../风景照片/14.jpg", alt: "Photo 14", description: "Lua minguante" },
        { src: "../风景照片/15.jpg", alt: "Photo 15", description: "Lua minguante" },
        { src: "../风景照片/16.jpg", alt: "Photo 16", description: "Lua minguante" },
        { src: "../风景照片/17.jpg", alt: "Photo 17", description: "Lua minguante" },
    ];

     // 动态加载照片和描述信息
     photos.forEach(photo => {
        const photoDiv = document.createElement("div");
        photoDiv.classList.add("photo");

        // 创建图片元素
        const imgElement = document.createElement("img");
        imgElement.src = photo.src;
        imgElement.alt = photo.alt;

        // 创建描述元素
        const descriptionDiv = document.createElement("div");
        descriptionDiv.classList.add("photo-description");
        descriptionDiv.textContent = photo.description;

        // 创建图标区域
        const iconDiv = document.createElement("div");
        iconDiv.classList.add("photo-icons");

        // 添加删除图标
        const deleteIcon = document.createElement("i");
        deleteIcon.classList.add("iconfont", "icon-lajixiang"); // 使用自定义或外部图标字体类
        deleteIcon.style.color = "red";
        deleteIcon.addEventListener("click", () => {
            alert(`Deleted: ${photo.description}`);
        });

        // 添加收藏图标
        const favoriteIcon = document.createElement("i");
        favoriteIcon.classList.add("iconfont", "icon-shoucangxiao"); // 使用自定义或外部图标字体类
        favoriteIcon.style.color = "orange";
        favoriteIcon.addEventListener("click", () => {
            alert(`Favorited: ${photo.description}`);
        });

        
        

        // 添加分享图标
        const shareIcon = document.createElement("i");
        shareIcon.classList.add("iconfont", "icon-pengyouquan"); // 使用自定义或外部图标字体类
        shareIcon.style.color = "blue";
        shareIcon.addEventListener("click", () => {
            alert(`Shared: ${photo.description}`);
        });

        // 将图标添加到图标区域
        iconDiv.appendChild(deleteIcon);
        iconDiv.appendChild(shareIcon);
        iconDiv.appendChild(favoriteIcon);

        // 将所有内容添加到父容器
        photoDiv.appendChild(imgElement);
        photoDiv.appendChild(descriptionDiv);
        photoDiv.appendChild(iconDiv);
        photoGrid.appendChild(photoDiv);
    });
});




document.addEventListener("DOMContentLoaded", () => {
    const fileGrid = document.getElementById("fileGrid");

    // 示例文件数据
    const files = [
        { src: "../表情包 emoji/images (1).jpg", name: "Desktop" },
        { src: "../表情包 emoji/images (2).jpg", name: "Documents" },
        { src: "../表情包 emoji/images.jpg", name: "Downloads" },
        { src: "../表情包 emoji/下载 (1).jpg", name: "Music" },
        { src: "../表情包 emoji/下载 (2).jpg", name: "Pictures" },
        { src: "../表情包 emoji/下载 (3).jpg", name: ".bashrc" },
        { src: "../表情包 emoji/下载 (4).jpg", name: ".profile" },
        { src: "../表情包 emoji/images (1).jpg", name: "Desktop" },
        { src: "../表情包 emoji/images (2).jpg", name: "Documents" },
        { src: "../表情包 emoji/images.jpg", name: "Downloads" },
        { src: "../表情包 emoji/下载 (1).jpg", name: "Music" },
        { src: "../表情包 emoji/下载 (2).jpg", name: "Pictures" },
        { src: "../表情包 emoji/下载 (3).jpg", name: ".bashrc" },
        { src: "../表情包 emoji/下载 (4).jpg", name: ".profile" },
        { src: "../表情包 emoji/images (1).jpg", name: "Desktop" },
        { src: "../表情包 emoji/images (2).jpg", name: "Documents" },
        { src: "../表情包 emoji/images.jpg", name: "Downloads" },
        { src: "../表情包 emoji/下载 (1).jpg", name: "Music" },
        { src: "../表情包 emoji/下载 (2).jpg", name: "Pictures" },
        { src: "../表情包 emoji/下载 (3).jpg", name: ".bashrc" },
        { src: "../表情包 emoji/下载 (4).jpg", name: ".profile" },
        
        { src: "../表情包 emoji/下载 (5).jpg", name: "example.txt" }
    ];

    // 动态生成图片和复选框
    files.forEach((file, index) => {
        const fileId = index + 1; // 文件编号，从 1 开始

        const fileDiv = document.createElement("div");
        fileDiv.classList.add("file-item");
        fileDiv.id = `file-item-${fileId}`; // 设置 file-item 的 id

        // 创建图片容器
        const imgContainer = document.createElement("div");
        imgContainer.classList.add("file-photo");
        imgContainer.id = `file-photo-${fileId}`; // 设置图片容器的 id

        // 创建图片
        const imgElement = document.createElement("img");
        imgElement.src = file.src;
        imgElement.alt = file.name;
        imgElement.id = `img-${fileId}`; // 设置图片的 id

        // 创建标题
        const fileTitle = document.createElement("div");
        fileTitle.classList.add("file-photo-description");
        fileTitle.id = `file-photo-description-${fileId}`; // 设置标题的 id
        fileTitle.textContent = file.name;

        // 创建右上角复选框
        const checkboxContainer = document.createElement("div");
        checkboxContainer.classList.add("file-checkbox-container");
        checkboxContainer.id = `file-checkbox-container-${fileId}`; // 设置复选框容器的 id

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.classList.add("file-checkbox");
        checkbox.id = `file-checkbox-${fileId}`; // 设置复选框的 id

        // 添加复选框到右上角容器
        checkboxContainer.appendChild(checkbox);

        // 将复选框添加到图片容器
        imgContainer.appendChild(checkboxContainer);
        imgContainer.appendChild(imgElement);
        imgContainer.appendChild(fileTitle);

        // 添加图片容器到文件项
        fileDiv.appendChild(imgContainer);

        // 添加文件项到文件网格
        fileGrid.appendChild(fileDiv);
    });
});


//sdasdasdas

function changeTheme(platform) {
    const themeChanger = document.querySelector('.theme-changer');
    const icon = themeChanger.querySelector('i');
    const title = themeChanger.querySelector('h2');

    if (!themeChanger || !icon || !title) {
        console.error('Theme changer or its children are not found.');
        return;
    }

    // 移除之前的样式类
    themeChanger.classList.remove('pc', 'cloud', 'instagram', 'facebook');

    // 根据平台设置不同的类名
    switch (platform) {
        case 'pc':
            icon.className = 'iconfont icon-pc'; // 更换图标
            themeChanger.classList.add('pc'); // 添加 PC 样式类
            title.textContent = ': From PC';
            break;
        case 'cloud':
            icon.className = 'iconfont icon-cloud-upload'; // 更换图标
            themeChanger.classList.add('cloud'); // 添加 Cloud 样式类
            title.textContent = ': From Cloud';
            break;
        case 'instagram':
            icon.className = 'iconfont icon-instagram'; // 更换图标
            themeChanger.classList.add('instagram'); // 添加 Instagram 样式类
            title.textContent = ': From Instagram';
            break;
        case 'facebook':
            icon.className = 'iconfont icon-facebook1'; // 更换图标
            themeChanger.classList.add('facebook'); // 添加 Facebook 样式类
            title.textContent = ': From Facebook';
            break;
        default:
            console.error('Unknown platform:', platform);
    }

}


let isAllSelected = false; // 用于跟踪当前是否是全选状态

function toggleSelectAll(event) {
    if (event) {
        event.stopPropagation(); // 阻止事件冒泡
    }

    const checkboxes = document.querySelectorAll('.file-checkbox'); // 获取所有复选框
    const selectAllButton = document.getElementById('selectAllButton');

    if (isAllSelected) {
        // 取消全选
        checkboxes.forEach(checkbox => {
            checkbox.checked = false;
        });
        selectAllButton.textContent = 'Select All'; // 改变按钮文字
        isAllSelected = false;
    } else {
        // 全选
        checkboxes.forEach(checkbox => {
            checkbox.checked = true;
        });
        selectAllButton.textContent = 'Deselect All'; // 改变按钮文字
        isAllSelected = true;
    }
}

