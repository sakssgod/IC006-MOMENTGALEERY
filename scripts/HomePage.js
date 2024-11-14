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
