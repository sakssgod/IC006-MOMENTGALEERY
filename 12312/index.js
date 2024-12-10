// script.js
document.addEventListener("DOMContentLoaded", () => {
    const photoGrid = document.getElementById("photo-grid");

    // List of images (example URLs)
    const imageList = [
        "https://via.placeholder.com/150",
        "https://via.placeholder.com/150/0000FF",
        "https://via.placeholder.com/150/FF0000",
        "https://via.placeholder.com/150/00FF00",
        "https://via.placeholder.com/150/FFFF00",
        "https://via.placeholder.com/150/000000",
        "https://via.placeholder.com/150/FFFFFF",
        "https://via.placeholder.com/150/FF00FF",
        "https://via.placeholder.com/150/00FFFF",
        "https://via.placeholder.com/150/808080"
    ];

    // Load images into the grid
    imageList.forEach((url) => {
        const img = document.createElement("img");
        img.src = url;
        img.alt = "Photo";
        photoGrid.appendChild(img);
    });
});
