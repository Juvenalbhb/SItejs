const API_URL = "https://jsonplaceholder.typicode.com/posts";

const postsContainer = document.getElementById("postsContainer");
const form = document.getElementById("postForm");

// READ
async function chargerPublications() {

    try {

        const reponse = await fetch(API_URL);

        const publications = await reponse.json();

        postsContainer.innerHTML = "";

        publications.forEach((publication) => {

            postsContainer.innerHTML += `
                <div class="card" id="post-${publication.id}">

                    <h3>${publication.title}</h3>

                    <p>${publication.body}</p>

                    <p>
                        <strong>Auteur :</strong>
                        ${publication.userId}
                    </p>

                    <button
                        class="btn-edit"
                        onclick="modifierPublication(${publication.id})"
                    >
                        Modifier
                    </button>

                    <button
                        class="btn-delete"
                        onclick="supprimerPublication(${publication.id})"
                    >
                        Supprimer
                    </button>

                </div>
            `;
        });

    } catch (erreur) {

        console.error("Erreur :", erreur);

    }

}

// CREATE
async function ajouterPublication(event) {

    event.preventDefault();

    const userId = document.getElementById("userId").value;
    const title = document.getElementById("title").value;
    const body = document.getElementById("body").value;

    const nouvellePublication = {
        userId,
        title,
        body
    };

    try {

        const reponse = await fetch(API_URL, {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(nouvellePublication)

        });

        const publicationAjoutee = await reponse.json();

        postsContainer.innerHTML =
        `
            <div class="card">

                <h3>${publicationAjoutee.title}</h3>

                <p>${publicationAjoutee.body}</p>

                <p>
                    <strong>Auteur :</strong>
                    ${publicationAjoutee.userId}
                </p>

                <button class="btn-edit">
                    Modifier
                </button>

                <button class="btn-delete">
                    Supprimer
                </button>

            </div>
        `
        + postsContainer.innerHTML;

        form.reset();

        alert("Publication ajoutée !");

    } catch (erreur) {

        console.error("Erreur :", erreur);

    }

}

// DELETE
async function supprimerPublication(id) {

    const confirmation = confirm( "Voulez-vous vraiment supprimer cette publication ?"
    );

    if (!confirmation) {
        return;
    }

    try {

        await fetch(`${API_URL}/${id}`, {
            method: "DELETE"
        });

        document
            .getElementById(`post-${id}`)
            .remove();

        alert("Publication supprimée !");

    } catch (erreur) {

        console.error("Erreur :", erreur);

    }

}

// UPDATE
async function modifierPublication(id) {

    const nouveauTitre = prompt("Nouveau titre :");

    if (!nouveauTitre) {
        return;
    }

    const nouveauContenu = prompt("Nouveau contenu :");

    if (!nouveauContenu) {
        return;
    }

    try {

        const reponse = await fetch(`${API_URL}/${id}`, {

            method: "PUT",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                id: id,
                title: nouveauTitre,
                body: nouveauContenu,
                userId: 1
            })

        });

        const publicationModifiee =
            await reponse.json();

        const carte =
            document.getElementById(`post-${id}`);

        carte.querySelector("h3").textContent =
            publicationModifiee.title;

        carte.querySelector("p").textContent =
            publicationModifiee.body;

        alert("Publication modifiée !");

    } catch (erreur) {

        console.error("Erreur :", erreur);

    }

}

form.addEventListener(
    "submit",
    ajouterPublication
);

chargerPublications();