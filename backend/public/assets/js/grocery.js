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
        const listElement = document.createElement("p");
        const deleteElement = document.createElement("div");
        const editElement = document.createElement("div");
        const categoryElement = document.createElement("p");

        //* toutes mes modifs sur les éléments
        liElement.dataset.id = grocery.id;
        listElement.textContent = grocery.name;
        listElement.classList.add("list-item");
        categoryElement.classList.add("list-category");
        deleteElement.classList.add("delete");
        editElement.classList.add("edit");

        //-1 mettre un event sur le bouton delete

        // * raccrocher chaque sous éléments de la li à la li
        liElement.prepend(listElement, editElement, deleteElement);
        // ! A partir du moment ou quelque chose est nullable en bdd, il faut faire un affichage conditionnel dessus
        if (grocery.category) {
            categoryElement.textContent = grocery.category.name;
            liElement.prepend(categoryElement);
        }
        deleteElement.addEventListener("click", (event) => this.handleClickDelete(event, grocery.id));

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
            this.deleteSuccessMessage = document.querySelector(".message.success.delete.grocery");
            this.deleteSuccessMessage.removeAttribute("hidden");
            setTimeout(() => {
                this.deleteSuccessMessage.setAttribute("hidden","");
            }, 2000);
        } catch (error) {
            // alert(error.message);
            this.deleteFailedMessage = document.querySelector(".message.danger.delete.grocery");
            this.deleteFailedMessage.removeAttribute("hidden");
            setTimeout(() => {
                this.deleteFailedMessage.setAttribute("hidden","");
            }, 2000);
        }
    },

};

export default grocery;
