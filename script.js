const places = document.querySelectorAll(".seat");
const inputNom = document.querySelector("#reserver-nom");
const selectSiege = document.querySelector("#reserver-siege");
const btnConfirmer = document.querySelector("#reservation-btn");
const disponibles = document.querySelector("#places-disponibles");
const recette = document.querySelector("#recette");

const prixPlace = 80;
const Reservation = []
function mettreAJour() {
    selectSiege.innerHTML = '<option value="">Choisir un siège</option>';

    places.forEach(function(place) {
        const numero = place.dataset.seat;
        const statut = place.querySelectorAll("p")[1].textContent.trim();

            if (statut === "Libre") {
            selectSiege.innerHTML +=
                "<option value='" + numero + "'>Siège " + numero + "</option>";
        }
    });
}

btnConfirmer.addEventListener("click", function() {
    const nom = inputNom.value.trim();
    const numeroChoisi = selectSiege.value;

    if (nom === "") {
        alert("Entrez le nom du passager");
        return;
    }

    if (numeroChoisi === "") {
        alert("Choisissez un siège");
        return;
    }

    let siegeTrouve = false;

    places.forEach(function(place) {
        const numero = place.dataset.seat;
        const statut = place.querySelectorAll("p")[1];

        if (numero === numeroChoisi && statut.textContent.trim() === "Libre") {
            place.classList.remove(
                "bg-[#DCFCE7]",
                "border-green-300",
                "text-green-800"
            );

            place.classList.add(
                "bg-[#FEE2E2]",
                "border-red-300",
                "text-red-800"
            );

            statut.textContent = nom;
            siegeTrouve = true;
        }
    });

    if (!siegeTrouve) {
        alert("Ce siège n'est pas disponible");
        return;
    }

    if (disponibles) {
        disponibles.textContent = Number(disponibles.textContent) - 1;
    }

    if (recette) {
        recette.textContent = Number(recette.textContent) + prixPlace;
    }

    inputNom.value = ""; 

    mettreAJour();
});
mettreAJour();
selectSiege