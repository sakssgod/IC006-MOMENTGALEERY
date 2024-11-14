const cityList = [
    "Albufeira", "Almada", "Amadora", "Amarante", "Angra do Heroísmo", 
    "Aveiro", "Barcelos", "Beja", "Braga", "Bragança", "Caldas da Rainha", 
    "Caminha", "Cantanhede", "Cascais", "Chaves", "Coimbra", 
    "Celorico de Basto", "Faro", "Figueira da Foz", "Funchal", "Guimarães", 
    "Lamego", "Leiria", "Lisboa", "Loulé", "Mafra", "Maia", "Matosinhos", 
    "Montalegre", "Montijo", "Odivelas", "Olhão", "Póvoa de Varzim", 
    "Porto", "Ponta Delgada", "Penafiel", "Paredes", "Porto", "Santarém", 
    "Setúbal", "Sintra", "Sines", "Tomar", "Tavira", "Torres Vedras", "Viana do Castelo", 
    "Vila do Conde", "Vila Nova de Gaia", "Vila Real", "Viseu"
];


let element = document.getElementById("selecionaCidade")

for(let city of cityList){
    let x = document.createElement("option")
    x.textContent = city
    element.appendChild(x)
    
}
