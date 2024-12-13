const body = document.querySelector('body'),
      shell = body.querySelector('.shell'),
      toggle = body.querySelector('.toggle'),
      searchBtn = body.querySelector('.search-box'),
      modeSwitch = body.querySelector('.toggle-switch'),
      modeText = body.querySelector('.mode-text');

// 切换侧边栏宽度
toggle.addEventListener("click", () => {
    shell.classList.toggle("close");

    const isClosed = shell.classList.contains("close");
    window.parent.postMessage({ shellClosed: isClosed }, "*");
});

// 点击搜索框时打开侧边栏
searchBtn.addEventListener("click", () => {
    shell.classList.remove("close");

    window.parent.postMessage({ shellClosed: false }, "*");
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
        event.preventDefault(); // 阻止默认链接行为
        const targetPage = link.getAttribute('data-target'); // 获取目标路径
        if (targetPage) {
            // 向父窗口发送消息，通知更新 iframe 路径
            window.parent.postMessage({ targetIframe: "f2", newSrc: targetPage }, "*");
        }
    });
});

