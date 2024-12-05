let albumWallpaper = [
    {
        nome: "1.",
        link: "WallPaper PC/db31c07309ab23e4b3362f1ded552f52.jpg"
    },
    {
        nome: "2.",
        link: "WallPaper PC/6a4735c883b23d2746e0cffd490039c6.jpg"
    },
    {
        nome: "3.",
        link: "WallPaper PC/6c70ea06dc78e6aa89a3aa85193e8fce.jpg"
    },
    {
        nome: "4.",
        link: "WallPaper PC/048eefa870867053d3ada94669ec5ad2.jpg"
    },
    {
        nome: "5.",
        link: "WallPaper PC/960ade594130e49866277c442c43c8b6.jpg"
    },
    {
        nome: "6.",
        link: "WallPaper PC/a701889d509e726cc352da8044aa4f24.jpg"
    }
];



// Tenta carregar "allPictures" do localStorage
let wallpaperPc = JSON.parse(localStorage.getItem("albuns")) || {};


// Se "wallpaperPc" n茫o existir, inicializa-o com o conte煤do do "album"
wallpaperPc["wallpaper PC"] =albumWallpaper;
localStorage.setItem("albuns", JSON.stringify(wallpaperPc));