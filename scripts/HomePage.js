const body = document.querySelector('body'),
      shell = body.querySelector('.shell'),
      toggle = body.querySelector('.toggle'),
      searchBtn = body.querySelector('.search-box'),
      modeSwitch = body.querySelector('.toggle-switch'),
      modeText = body.querySelector('.mode-text');

// 切换侧边栏宽度
toggle.addEventListener("click", () => {
    shell.classList.toggle("close");
});

// 点击搜索框时打开侧边栏
searchBtn.addEventListener("click", () => {
    shell.classList.remove("close");
});

// 切换主题模式
modeSwitch.addEventListener("click", () => {
    body.classList.toggle("dark");
    if (body.classList.contains("dark")) {
        modeText.innerText = "Light Mode";
    } else {
        modeText.innerText = "Dark Mode";
    }
});

document.querySelectorAll('.nav-link a').forEach(link => {
    link.addEventListener('click', function(event) {
        event.preventDefault();
        const targetPage = link.getAttribute('data-target');
        if (targetPage) {
            // 获取主内容区域的 iframe 并更改其 src 属性
            const mainContentIframe = window.parent.document.querySelector('.main-content iframe');
            if (mainContentIframe) {
                mainContentIframe.src = targetPage;
            }
        }
    });
});
