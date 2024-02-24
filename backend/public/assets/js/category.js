import serveur from "./serveur.js";
const category = {
    init: async function () {
        // querySelector necessaire à l'app
        this.categoryContainerElement = document.querySelector(".categoryList");
        try {
            // j'initalise le chargement des données depuis le serveur
            const categories = await serveur.getCategories();
            // je charge mes données dans le dom
            this.renderCategories(categories);
        } catch (error) {
            // * C'est ici qu'on avertis le client
            alert(error.message);
        }
    },
    renderCategories: function (categories) {
        //  je crée mon "transporteur"
        // fonction native de js pour créer un conteneur temporaire "invisible" afin d'éviter d'append le dom directement dans la boucle
        const fragmentElement = document.createDocumentFragment();

        for (const category of categories) {
            //  créer une category
            const categoryElement = this.createCategoryElement(category);
            //  append dans un conteneur non lié au dom
            fragmentElement.append(categoryElement);
        }
        //  lié le conteneur au dom
        this.categoryContainerElement.append(fragmentElement);
    },
    createCategoryElement: function (category) {
        // * Je crée tous mes éléments
        const liElement = document.createElement("li");
        const pElement = document.createElement("p");
        const deleteElement = document.createElement("div");
        pElement.classList.add("list-item");

        //* toutes mes modifs sur les éléments
        liElement.dataset.id = category.id;
        pElement.textContent = category.name;
        deleteElement.classList.add("delete");


        //-1 mettre un event sur le bouton delete
        deleteElement.addEventListener("click", (event) => this.handleClickDelete(event, category.id));

        // * raccrocher chaque sous éléments de la li à la li
        liElement.prepend(pElement, deleteElement);
        // je return ma li toute prête à partir dans le dom
        return liElement;
    },


    // 3 la fonction qui va se déclencher au click sur la corbeille
    handleClickDelete: async function (event, id) {
        try {
            // ! ATTENTION, si vous utiliser currentTarget dans une fonction async, toujours l'utiliser avant le moindre await, sinon il n'existe plus
            const article = event.currentTarget.parentElement;
            // je fais l'action côté serveur
            await serveur.deleteCategory(id);
            // je supprime coté client
            article.remove();
        } catch (error) {
            this.deleteFailedMessage = document.querySelector(".message.danger.category");
            this.deleteFailedMessage.removeAttribute("hidden");
        }
    },

};

export default category;
