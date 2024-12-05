const mainFab = document.querySelector('.main-fab');
const fabContainer = document.querySelector('.fab-container');

mainFab.addEventListener('click', () => {
    fabContainer.classList.toggle('show');
});

document.addEventListener("DOMContentLoaded", () => {
    const savedTheme = localStorage.getItem("selectedTheme");
    if (savedTheme) {
        document.body.classList.add(savedTheme); 
    }
});

    