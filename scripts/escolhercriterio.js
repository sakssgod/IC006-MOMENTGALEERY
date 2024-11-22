function openEscolherWindow() {
    const escolherCritWindow = document.getElementById('escolherCritWindow');
    if (escolherCritWindow) {
        escolherCritWindow.style.display = 'flex';
    }
}

function closeEscolherWindow() {
    const escolherCritWindow = document.getElementById('escolherCritWindow');
    if (escolherCritWindow) {
        escolherCritWindow.style.display = 'none';
    }
}

// Ensure that filter options are initially hidden
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.hidden-option').forEach(option => {
        option.style.display = 'none';
    });
});


function toggleOptions() {
    const hiddenOptions = document.querySelectorAll('.hidden-option');
    const showToggle = document.querySelector('.show-toggle');
    
    hiddenOptions.forEach(option => {
        option.style.display = option.style.display === 'none' ? 'block' : 'none';
    });
    
    if (showToggle.innerText === 'Show more') {
        showToggle.innerText = 'Show less';
    } else {
        showToggle.innerText = 'Show more';
    }
}

// 初始隐藏选项
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.hidden-option').forEach(option => {
        option.style.display = 'none';
    });
});