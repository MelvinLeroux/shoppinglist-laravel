import serveur from "./serveur.js";
const grocery = {
    init: async function () {
        // querySelector necessaire à l'app
        this.groceryContainerElement = document.querySelector(".grocerylist");
        this.header = document.querySelector("header");
        try {
            // j'initalise le chargement des données depuis le serveur
            const groceries = await serveur.getGroceries();
            // je charge mes données dans le dom
            this.renderGroceries(groceries);
        } catch (error) {
            // * C'est ici qu'on avertis le client
            alert(error.message);
        }
    },
    renderGroceries: function (groceries) {
        //  je crée mon "transporteur"
        // fonction native de js pour créer un conteneur temporaire "invisible" afin d'éviter d'append le dom directement dans la boucle
        const fragmentElement = document.createDocumentFragment();

        for (const grocery of groceries) {
            //  créer une grocery
            const groceryElement = this.createGroceryElement(grocery);
            //  append dans un conteneur non lié au dom
            fragmentElement.append(groceryElement);
        }
        //  lié le conteneur au dom
        this.groceryContainerElement.append(fragmentElement);
    },
    createGroceryElement: function (grocery) {
        // * Je crée tous mes éléments
        const liElement = document.createElement("li");
        const pElement = document.createElement("p");
        const deleteElement = document.createElement("div");
        const editElement = document.createElement("div");
        const emElement = document.createElement("em");

        //* toutes mes modifs sur les éléments
        liElement.dataset.id = grocery.id;
        pElement.textContent = grocery.name;
        deleteElement.classList.add("delete");
        editElement.classList.add("edit");
        // ! A partir du moment ou quelque chose est nullable en bdd, il faut faire un affichage conditionnel dessus
        if (grocery.category) {
            emElement.textContent = grocery.category.name;
            console.log(grocery.category.name);
            liElement.prepend(emElement);
        }

        //-1 mettre un event sur le bouton delete
        deleteElement.addEventListener("click", (event) => this.handleClickDelete(event, grocery.id));

        // * raccrocher chaque sous éléments de la li à la li
        liElement.prepend(pElement, editElement, deleteElement);

        // je return ma li toute prête à partir dans le dom
        return liElement;
    },
    // 3 la fonction qui va se déclencher au click sur la corbeille
    handleClickDelete: async function (event, id) {
        try {
            // ! ATTENTION, si vous utiliser currentTarget dans une fonction async, toujours l'utiliser avant le moindre await, sinon il n'existe plus
            const article = event.currentTarget.parentElement;
            // je fais l'action côté serveur
            await serveur.deleteGrocery(id);
            // je supprime coté client
            article.remove();
        } catch (error) {
            alert(error.message);
        }
    },

};

export default grocery;
