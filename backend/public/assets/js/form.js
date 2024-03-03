import grocery from "./grocery.js";
import serveur from "./serveur.js";
import category from "./category.js";

const form = {
    init: async function () {
        this.editGroceryId = null;
        //  1 récupérer les éléments du dom
        /**
         * CreateGrocery queryselectors
         */
        this.createGroceryButtonElement = document.querySelector(".create-grocery-container button");
        this.createGroceryContainerElement = document.querySelector(".create-grocery-container");
        this.createGrocerymodalElement = document.querySelector(".modal-dialog-grocery");
        this.createGroceryformElement = document.querySelector(".grocery-create");
        this.inputCreateGroceryTitleElement = document.querySelector("#grocery-title");
        /**
         * CreateCategory queryselectors
         */
        this.createCategoryButtonElement = document.querySelector(".create-category-container button");
        this.createCategoryContainerElement = document.querySelector(".create-category-container");
        this.createCategorymodalElement = document.querySelector(".modal-dialog-category");
        this.createCategoryformElement = document.querySelector(".category-create");
        this.inputcreateCategoryTitleElement = document.querySelector("#category-title");
        this.listCategoryCreateList = document.querySelector(".categoryList")

        /**
         * updateGrocery queryselectors
         */
        this.updateGroceryModalElement = document.querySelector(".modal-dialog-grocery-update");
        this.updateGroceryformElement = document.querySelector(".grocery-update");
        this.inputupdateGroceryTitleElement = document.querySelector("#grocery-update-title");

        /**
         * CreateCategory queryselectors
         */
        this.updateCategorymodalElement = document.querySelector(".modal-dialog-category-update");
        this.updateCategoryformElement = document.querySelector(".category-update-title");
        this.inputupdateCategoryTitleElement = document.querySelector("#category-title");

        this.selectCategoryElement = document.querySelector("#category");
        //  2 EventListener ou action
        this.createGroceryButtonElement.addEventListener("click", () => this.handleClickCreateGroceryVisibility());
        this.createGroceryformElement.addEventListener("submit", (event) => this.handleGroceryCreateSubmit(event));
        this.createCategoryButtonElement.addEventListener("click", () => this.handleClickCreateCategoryVisibility());
        this.createCategoryformElement.addEventListener("submit", (event) => this.handleCategoryCreateSubmit(event));
        this.updateGroceryformElement.addEventListener("submit", (event) => this.handleGroceryUpdateSubmit(event));

        try {
            await this.loadCategories();
        } catch (error) {
            alert(error.message);
        }
    },
    //  3 réaliser l'action
    handleClickCreateGroceryVisibility: function () {
        this.createGrocerymodalElement.classList.toggle("show");
        grocery.header.classList.toggle("muted");
        // permet de changer la valeur de hidden par son contraire (si true false si false true)
        grocery.groceryContainerElement.hidden = !grocery.groceryContainerElement.hidden;
        category.categoryContainerElement.hidden = ! category.categoryContainerElement.hidden;

        this.createGroceryContainerElement.hidden = !this.createGroceryContainerElement.hidden;
        this.createCategoryContainerElement.hidden = !this.createCategoryContainerElement.hidden;
    },
    handleClickCreateCategoryVisibility: function () {
        this.createCategorymodalElement.classList.toggle("show");
        grocery.header.classList.toggle("muted");
        // permet de changer la valeur de hidden par son contraire (si true false si false true)
        grocery.groceryContainerElement.hidden = !grocery.groceryContainerElement.hidden;
        category.categoryContainerElement.hidden = ! category.categoryContainerElement.hidden;

        this.createGroceryContainerElement.hidden = !this.createGroceryContainerElement.hidden;
        this.createCategoryContainerElement.hidden = !this.createCategoryContainerElement.hidden;
    },
    handleClickUpdateGroceryVisibility: function (id) {
        this.editGroceryId = id;
        this.updateGroceryModalElement.classList.toggle("show");
        grocery.header.classList.toggle("muted");
        // permet de changer la valeur de hidden par son contraire (si true false si false true)
        grocery.groceryContainerElement.hidden = !grocery.groceryContainerElement.hidden;
        category.categoryContainerElement.hidden = ! category.categoryContainerElement.hidden;
        this.createGroceryContainerElement.hidden = !this.createGroceryContainerElement.hidden;
        this.createCategoryContainerElement.hidden = !this.createCategoryContainerElement.hidden;
    },

    handleGroceryCreateSubmit: async function (event) {
        // ! 4 IMPORTANT, empêcher l'envoi du form
        event.preventDefault();
        //  5 Récupérer la valeur de l'input
        const name = this.inputCreateGroceryTitleElement.value;
        const category_id= this.selectCategoryElement.value;
        //  6 transformer en json la valeur récupéré
        const jsonData = JSON.stringify({ name, category_id });
        //  7 envoyer au serveur la donnée
        //  7.1 trycatch sur await pour capter les erreurs
        try {
            const groceryData = await serveur.createGrocery(jsonData);

            //  8 changer le dom avec la nouvelle grocery

            const liElement = grocery.createGroceryElement(groceryData.data);
            grocery.groceryContainerElement.append(liElement);
            //  9 revenir à la page de base
            this.handleClickCreateGroceryVisibility();
            //  10 réinitialiser l'input
            this.inputCreateGroceryTitleElement.value = "";
            this.createGroceryMessageCreated = document.querySelector(".message.success.create.grocery");
            this.createGroceryMessageCreated.removeAttribute('hidden');
            setTimeout(() => {
                this.createGroceryMessageCreated.setAttribute("hidden","");
            }, 2000);

        } catch (error) {
            // alert("handlegrocery",error.message);
            this.createGroceryMessageError = document.querySelector(".message.danger.create.grocery");
            this.createGroceryMessageError.removeAttribute("hidden");

            setTimeout(() => {
                this.createGroceryMessageError.setAttribute("hidden", "");
            }, 2000);
        }
    },
    handleGroceryUpdateSubmit: async function (event) {
        // ! 4 IMPORTANT, empêcher l'envoi du form
        event.preventDefault();
        //  5 Récupérer la valeur de l'input
        const name = this.inputupdateGroceryTitleElement.value;
        //  6 transformer en json la valeur récupéré
        const jsonData = JSON.stringify({ name });
        //  7 envoyer au serveur la donnée
        //  7.1 trycatch sur await pour capter les erreurs
        try {
            const groceryData = await serveur.updateGrocery(this.editGroceryId,jsonData);
            //  8 changer le dom avec la nouvelle grocery
            //  9 revenir à la page de base
            const groceryListItem = document.querySelector('li[data-grocery-id="' + this.editGroceryId + '"');
            const groceryListItemName = groceryListItem.querySelector(".list-item");
            groceryListItemName.innerHTML = groceryData.data.name;
            this.handleClickUpdateGroceryVisibility();
            //  10 réinitialiser l'input
            this.inputupdateGroceryTitleElement.value = "";
            this.updateSucessMessage = document.querySelector(".message.success.edit.grocery");
            this.updateSucessMessage.removeAttribute("hidden");
            setTimeout(() => {
                this.updateSucessMessage.setAttribute("hidden","");
            }, 2000);

        } catch (error) {
            this.updateFailedMessage = document.querySelector(".message.danger.edit.grocery");
            this.updateFailedMessage.removeAttribute("hidden");
            setTimeout(() => {
                this.updateFailedMessage.setAttribute("hidden","");
            }, 2000);

        }
    },

    handleCategoryCreateSubmit: async function (event) {
        // ! 4 IMPORTANT, empêcher l'envoi du form
        event.preventDefault();
        //  5 Récupérer la valeur de l'input
        const name = this.inputcreateCategoryTitleElement.value;
        //  6 transformer en json la valeur récupéré
        console.log(this.inputcreateCategoryTitleElement.value);
        const jsonData = JSON.stringify({ name });
        //  7 envoyer au serveur la donnée
        //  7.1 trycatch sur await pour capter les erreurs
        try {
            const categoryData = await serveur.createCategory(jsonData);
            //  8 changer le dom avec la nouvelle grocery
            const liElement = category.createCategoryElement(categoryData.data);
            this.listCategoryCreateList.append(liElement);
            //  9 revenir à la page de base
            this.loadCategories();
            this.handleClickCreateCategoryVisibility();
            this.createCategoryMessageCreated = document.querySelector(".message.success.create.category");
            this.createCategoryMessageCreated.removeAttribute('hidden');
            setTimeout(() => {
                this.createCategoryMessageCreated.setAttribute("hidden","");
            }, 2000);
            //  10 réinitialiser l'input
            this.inputcreateCategoryTitleElement.value = '';
        } catch (error) {
            this.createCategoryMessageError = document.querySelector(".message.danger.create.category");
            this.createCategoryMessageError.removeAttribute("hidden");
            setTimeout(() => {
                this.createGroceryMessageError.setAttribute("hidden","");
            }, 2000);
            // alert(error.message);
        }
    },
    loadCategories: async function () {
        try {
            this.selectCategoryElement.innerHTML = "";
            // je récupère les catégories en bdd
            const categories = await serveur.getCategories();
            //  boucler sur les categories
            for (const categoryItem of categories) {
                //  créer l'option de la category
                const option = document.createElement("option");
                option.value = categoryItem.id;
                option.textContent = categoryItem.name;
                this.selectCategoryElement.append(option);

            }
        } catch (error) {
            throw new Error(error.message);
        }
    },
};

export default form;
