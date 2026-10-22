
const reserverNom = document.querySelector("#reserver-nom");
const reserverSiege = document.querySelector("#reserver-siege");
const suppression = document.querySelector("#supprimer-reservation");
const modification = document.querySelector("#modifier-reservation");
const reservationBtn = document.querySelector("#reservation-btn");
const placesDisponibles = document.querySelector("#places-disponibles");
const recette = document.querySelector("#recette");
const sieges = document.querySelectorAll(".seat");

const prix = 80;
const reservations = [];

sieges.forEach(function(siege) {
    const numero = Number(siege.dataset.seat);
    const nom = siege.querySelectorAll("p")[1].textContent.trim();

    if (nom !== "Libre") {
        reservations.push({
            siege: numero,
            nom: nom
        });
    }
});
