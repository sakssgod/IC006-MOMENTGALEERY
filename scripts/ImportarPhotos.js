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
// function closeFileExplorer() {
//     fileExplorer.style.display = 'none'; // 隐藏文件浏览器
//     overlay.style.display = 'none'; // 隐藏遮罩
// }

// 阻止点击文件浏览器内容时关闭
fileExplorer.addEventListener('click', (event) => {
    event.stopPropagation();
});

// 绑定遮罩点击事件
overlay.addEventListener('click', closeFileExplorer);


function openIframe(url) {
    const iframeContainer = document.getElementById('iframeContainer');
    const criteriosIframe = document.getElementById('criteriosIframe');
    criteriosIframe.src = url; // 设置新的链接
    if (iframeContainer && criteriosIframe) {

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
        const iframeHeight = iframeContent.scrollHeight || 570; 
        const iframeWidth = iframeContent.scrollWidth || 870;
        // 调整 iframe 的高度和宽度
        iframe.style.height = iframeHeight + 'px';
        iframe.style.width = iframeWidth + 'px';
    };
}





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
        { src: "../风景照片/12.jpg", alt: "Photo 12", description: "Lua minguante." },
        { src: "../风景照片/14.jpg", alt: "Photo 14", description: "Lago e pôr do sol" },
        { src: "../风景照片/15.jpg", alt: "Photo 15", description: "Água do lago" },
        { src: "../风景照片/16.jpg", alt: "Photo 16", description: "Riacho na floresta" },
        { src: "../风景照片/17.jpg", alt: "Photo 17", description: "Auréola" },
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
            showCustomAlert(`Your "${photo.description}" photo has been successfully deleted!`);
        });

        // 添加收藏图标
        const favoriteIcon = document.createElement("i");
        favoriteIcon.classList.add("iconfont", "icon-shoucangxiao"); // 使用自定义或外部图标字体类
        favoriteIcon.style.color = "orange";
        favoriteIcon.addEventListener("click", () => {
            showCustomAlert(`Your "${photo.description}" photo has been successfully favorited!`);
        });

        
        

        // 添加分享图标
        const shareIcon = document.createElement("i");
        shareIcon.classList.add("iconfont", "icon-pengyouquan"); // 使用自定义或外部图标字体类
        shareIcon.style.color = "blue";
        shareIcon.addEventListener("click", () => {
            showCustomAlert(`Your "${photo.description}" photo has been successfully shared!`);
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
        { src: "../婚纱照片/casamento1.jpg", name: "casamento 1" },
        { src: "../婚纱照片/casamento2.jpg", name: "casamento 2" },
        { src: "../婚纱照片/casamento3.webp", name: "casamento 3" },
        { src: "../婚纱照片/casamento4.jpeg", name: "casamento 4" },
        { src: "../婚纱照片/casamento5.jpeg", name: "casamento 5" },
        { src: "../婚纱照片/casamento6.jpeg", name: "casamento 6" },
        { src: "../婚纱照片/casamento7.webp", name: "casamento 7" },
        { src: "../婚纱照片/casamento8.jpeg", name: "casamento 8" },
        { src: "../婚纱照片/casamento9.jpg", name: "casamento 9" },
        { src: "../婚纱照片/casamento10.jpg", name: "casamento 10" },
        { src: "../婚纱照片/casamento11.jpg", name: "casamento 11" },
        { src: "../婚纱照片/casamento12.jpeg", name: "casamento 12" },
        { src: "../婚纱照片/casamento13.jpeg", name: "casamento 13" },
        { src: "../婚纱照片/casamento14.jpeg", name: "casamento 14" },
        { src: "../婚纱照片/casamento15.jpeg", name: "casamento 15" },
        { src: "../婚纱照片/casamento16.jpeg", name: "casamento 16" },
        { src: "../婚纱照片/casamento17.jpeg", name: "casamento 17" },
        { src: "../婚纱照片/casamento18.jpeg", name: "casamento 18" },
        { src: "../婚纱照片/casamento19.jpeg", name: "casamento 19" },
        { src: "../婚纱照片/casamento20.jpg", name: "casamento 20" },
        { src: "../婚纱照片/casamento21.jpg", name: "casamento 21" },
        { src: "../婚纱照片/casamento.jpg", name: "casamento 22" },
       
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





const deleteDialogOverlay = document.getElementById('deleteDialogOverlay');
let pendingCloseAction = null;

// 显示确认对话框
function showCloseDialog(action) {
    deleteDialogOverlay.style.display = 'flex';
    pendingCloseAction = action;
}

// 确认关闭
function confirmClose() {
    if (typeof pendingCloseAction === 'function') {
        pendingCloseAction(); // 执行待定操作
    }
    closeDialog(); // 关闭对话框
}



// 取消关闭
function cancelClose() {
    closeDialog(); // 仅关闭对话框
}

// 关闭对话框
function closeDialog() {
    deleteDialogOverlay.style.display = 'none';
    pendingCloseAction = null;
}

// 修改关闭文件管理器的逻辑
function closeFileExplorer(origin) {
    if (origin === 'openButton') {
        // 如果是通过 Open 按钮触发，不显示确认对话框，直接关闭
        fileExplorer.style.display = 'none';
        overlay.style.display = 'none';
    } else {
        // 否则显示确认对话框
        showCloseDialog(() => {
            fileExplorer.style.display = 'none';
            overlay.style.display = 'none';
        });
    }
}


// 在 DOM 加载后绑定事件
document.addEventListener("DOMContentLoaded", () => {

});



function showCustomAlert(message) {
    const customAlert = document.getElementById('customAlert');
    const customOverlay = document.getElementById('customOverlay');
    const customAlertText = document.getElementById('customAlertText');

    customAlertText.textContent = message; // 设置提示信息
    customOverlay.style.display = 'block'; // 显示背景变暗的遮罩
    customAlert.style.display = 'flex'; // 显示提示窗口
}

function closeCustomAlert() {
    const customAlert = document.getElementById('customAlert');
    const customOverlay = document.getElementById('customOverlay');

    customOverlay.style.display = 'none'; // 隐藏遮罩
    customAlert.style.display = 'none'; // 隐藏提示窗口
}

