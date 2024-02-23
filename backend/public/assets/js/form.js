import grocery from "./grocery.js";
import serveur from "./serveur.js";
import category from "./category.js";

const form = {
    init: async function () {
        //  1 récupérer les éléments du dom
        /**
         * CreateGrocery queryselectors
         */
        this.createGroceryButtonElement = document.querySelector(".create-grocery-container button");
        this.createGroceryContainerElement = document.querySelector(".create-grocery-container");
        this.createGrocerymodalElement = document.querySelector(".modal-dialog-grocery");
        this.createGroceryformElement = document.querySelector(".grocery-create");
        this.inputcreateGroceryTitleElement = document.querySelector("#grocery-title");
        /**
         * CreateCategory queryselectors
         */
        this.createCategoryButtonElement = document.querySelector(".create-category-container button");
        this.createCategoryContainerElement = document.querySelector(".create-category-container");
        this.createCategorymodalElement = document.querySelector(".modal-dialog-category");
        this.createCategoryformElement = document.querySelector(".category-create");
        this.inputcreateCategoryTitleElement = document.querySelector("#category-title");

        /**
         * updateGrocery queryselectors
         */
        this.updateGrocerymodalElement = document.querySelector(".modal-dialog-grocery-update");
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
        // this.GroceryButtonElement.addEventListener("click", () => this.handleClickUpdateGroceryVisibility());
        // this.GroceryformElement.addEventListener("submit", (event) => this.handleGroceryUpdateSubmit(event));
        // this.CategoryButtonElement.addEventListener("click", () => this.handleClickUpdateCategoryVisibility());
        // this.CategoryformElement.addEventListener("submit", (event) => this.handleCategoryUpdateSubmit(event));
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
    handleClickUpdateGroceryVisibility: function () {
        this.updateGrocerymodalElement.classList.toggle("show");
        grocery.header.classList.toggle("muted");
        // permet de changer la valeur de hidden par son contraire (si true false si false true)
        grocery.groceryContainerElement.hidden = !grocery.groceryContainerElement.hidden;
        this.updateGroceryContainerElement.hidden = !this.createGroceryContainerElement.hidden;
        this.updateCategoryContainerElement.hidden = !this.createCategoryContainerElement.hidden;
    },
    // handleClickCreateCategoryVisibility: function () {
    //     this.createCategorymodalElement.classList.toggle("show");
    //     grocery.header.classList.toggle("muted");
    //     // permet de changer la valeur de hidden par son contraire (si true false si false true)
    //     grocery.groceryContainerElement.hidden = !grocery.groceryContainerElement.hidden;
    //     this.createGroceryContainerElement.hidden = !this.createGroceryContainerElement.hidden;
    //     this.createCategoryContainerElement.hidden = !this.createCategoryContainerElement.hidden;
    // },

    handleGroceryCreateSubmit: async function (event) {
        // ! 4 IMPORTANT, empêcher l'envoi du form
        event.preventDefault();
        //  5 Récupérer la valeur de l'input
        const name = this.inputcreateGroceryTitleElement.value;
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
            this.inputcreateGroceryTitleElement.value = "";
        } catch (error) {
            alert("handlegrocery",error.message);
        }
    },
    handleGroceryUpdateSubmit: async function (event) {
        // ! 4 IMPORTANT, empêcher l'envoi du form
        event.preventDefault();
        //  5 Récupérer la valeur de l'input
        const name = this.inputcreateGroceryTitleElement.value;
        //  6 transformer en json la valeur récupéré
        const jsonData = JSON.stringify({ name });
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
            this.inputcreateGroceryTitleElement.value = "";
        } catch (error) {
            alert(error.message);
        }
    },


    handleCategoryCreateSubmit: async function (event) {
        // ! 4 IMPORTANT, empêcher l'envoi du form
        event.preventDefault();
        //  5 Récupérer la valeur de l'input
        const name = this.inputcreateCategoryTitleElement.value;
        //  6 transformer en json la valeur récupéré
        const jsonData = JSON.stringify({ name });
        //  7 envoyer au serveur la donnée
        //  7.1 trycatch sur await pour capter les erreurs
        try {
            const categoryData = await serveur.createCategory(jsonData);
            //  8 changer le dom avec la nouvelle grocery
            const liElement = category.createCategoryElement(categoryData.data);
            this.createCategoryContainerElement.append(liElement);
            //  9 revenir à la page de base
            this.handleClickCreateCategoryVisibility();
            //  10 réinitialiser l'input
        } catch (error) {
            alert(error.message);
        }
    },
    loadCategories: async function () {
        try {

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
