const places = document.querySelectorAll(".seat");
const passangername = document.querySelector("#reserver-nom");
const selectSiege = document.querySelector("#reserver-siege");
const btnConfirmer = document.querySelector("#reservation-btn");
const disponibles = document.querySelector("#places-disponibles");
const chiffreaffaire = document.querySelector("#chiffreaffaire");

const modification = document.querySelector("#modifier-reservation");
const suppresion = document.querySelector("#supprimer-reservation");

const prixPlace = 80;
const STORAGE_KEY = "reservations";

function saveState() {
    let reservations = [];

    places.forEach(function(place) {
        const numero = place.dataset.seat;
        const nom = place.querySelectorAll("p")[1].textContent.trim();

        if (nom !== "Libre") {
            reservations.push({
                siege: numero,
                nom: nom
            });
        }
    });

    localStorage.setItem(STORAGE_KEY, JSON.stringify(reservations));
}

function loadState() {
    let data = localStorage.getItem(STORAGE_KEY);

    if (data !== null) {
        let reservations = JSON.parse(data);

        places.forEach(function(place) {
            const numero = place.dataset.seat;
            const statut = place.querySelectorAll("p")[1];

            statut.textContent = "Libre";

            place.classList.remove(
                "bg-[#FEE2E2]",
                "border-red-300",
                "text-red-800"
            );

            place.classList.add(
                "bg-[#DCFCE7]",
                "border-green-300",
                "text-green-800"
            );

            reservations.forEach(function(reservation) {
                if (reservation.siege === numero) {
                    statut.textContent = reservation.nom;

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
                }
            });
        });

        disponibles.textContent = 20 - reservations.length;
        chiffreaffaire.textContent = reservations.length * prixPlace;
    }

    mettreajour();
}

function mettreajour() {
    selectSiege.innerHTML = '<option value="">Choisir un siège</option>';
    modification.innerHTML = '<option value="">Choisir une réservation</option>';
    suppresion.innerHTML = '<option value="">Choisir une réservation</option>';

    places.forEach(function(place) {
        const numero = place.dataset.seat;
        const statut = place.querySelectorAll("p")[1].textContent.trim();

        if (statut === "Libre") {
            selectSiege.innerHTML +=
                "<option value='" + numero + "'>Siège " + numero + "</option>";
        } else {
            modification.innerHTML +=
                "<option value='" + numero + "'>Siège " + numero + " - " + statut + "</option>";

            suppresion.innerHTML +=
                "<option value='" + numero + "'>Siège " + numero + " - " + statut + "</option>";
        }
    });
}

btnConfirmer.addEventListener("click", function() {
    const nom = passangername.value.trim();
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
    let nomExiste = false;

    places.forEach(function(place) {
        const statut = place.querySelectorAll("p")[1].textContent.trim();

        if (statut.toLowerCase() === nom.toLowerCase()) {
            nomExiste = true;
        }
    });

    if (nomExiste) {
        alert("Ce passager possède déjà une réservation.");
        return;
    }

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

    disponibles.textContent = Number(disponibles.textContent) - 1;
    chiffreaffaire.textContent = Number(chiffreaffaire.textContent) + prixPlace;

    passangername.value = "";

    mettreajour();
    saveState();
});

const modifierReservation = document.querySelector("#modifier-reservation");
const modifierNom = document.querySelector("#modifier-nom");
const modifierSiege = document.querySelector("#modifier-siege");
const boutonModifier = document.querySelector("#bouton-modifier");

boutonModifier.addEventListener("click", function() {
    const numeroActuel = modifierReservation.value;
    const nouveauNom = modifierNom.value.trim();
    const nouveauSiege = modifierSiege.value;
    let placeActuelle = null;
    let placeNouvelle = null;

    places.forEach(function(place) {
        if (place.dataset.seat === numeroActuel) {
            placeActuelle = place;
        }

        if (place.dataset.seat === nouveauSiege) {
            placeNouvelle = place;
        }
    });

    if (placeActuelle === null) {
        alert("Choisissez une réservation");
        return;
    }

    const statutActuel = placeActuelle.querySelectorAll("p")[1];
    const nomActuel = statutActuel.textContent.trim();

    if (nouveauNom !== "") {
        let nomExiste = false;

        places.forEach(function(place) {
            const statut = place.querySelectorAll("p")[1].textContent.trim();

            if (statut.toLowerCase() === nouveauNom.toLowerCase() && statut !== nomActuel) {
                nomExiste = true;
            }
        });

        if (nomExiste) {
            alert("Ce nom existe déjà");
            return;
        }

        statutActuel.textContent = nouveauNom;
    }

    if (nouveauSiege !== "" && nouveauSiege !== numeroActuel) {
        const statutNouveau = placeNouvelle.querySelectorAll("p")[1];

        if (statutNouveau.textContent.trim() !== "Libre") {
            alert("Ce siège est déjà occupé");
            return;
        }

        statutNouveau.textContent = statutActuel.textContent;

        placeNouvelle.classList.remove(
            "bg-[#DCFCE7]",
            "border-green-300",
            "text-green-800"
        );

        placeNouvelle.classList.add(
            "bg-[#FEE2E2]",
            "border-red-300",
            "text-red-800"
        );

        statutActuel.textContent = "Libre";

        placeActuelle.classList.remove(
            "bg-[#FEE2E2]",
            "border-red-300",
            "text-red-800"
        );

        placeActuelle.classList.add(
            "bg-[#DCFCE7]",
            "border-green-300",
            "text-green-800"
        );
    }

    mettreajour();
    saveState();
});

const boutonSupprimer = document.querySelector("#bouton-supprimer");

boutonSupprimer.addEventListener("click", function() {
    const numeroChoisi = suppresion.value;

    if (numeroChoisi === "") {
        alert("Choisissez une réservation");
        return;
    }

    places.forEach(function(place) {
        if (place.dataset.seat === numeroChoisi) {
            const statut = place.querySelectorAll("p")[1];

            statut.textContent = "Libre";
            place.classList.remove(
                "bg-[#FEE2E2]",
                "border-red-300",
                "text-red-800"
            );
            place.classList.add(
                "bg-[#DCFCE7]",
                "border-green-300",
                "text-green-800"
            );
        }
    });
    disponibles.textContent = Number(disponibles.textContent) + 1;
    chiffreaffaire.textContent = Number(chiffreaffaire.textContent) - prixPlace;
    mettreajour();
    saveState();
    notification(modifierNotification, "Modification reussie avec success")
});
loadState();

const ajout = document.querySelector("#ajout");
const modifierNotification= document.querySelector("#modificationNotification")
const suppresionnotif = document.querySelector("#suppresion");
function notification (id,statut) {
    const p = document.createElement ("p");
    p.className = "bg-green-600 text-white px-4 py-2 rounded";
    p.textContent = Message;

    id.innerHTML = "";
    id.appendChild(p);

    setTimeout(function() {
        p.remove();
    }, 3000);
}