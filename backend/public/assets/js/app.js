import form from "./form.js";
import grocery from "./grocery.js";
import category from "./category.js";
const app = {
    // création d'une propriété dans l'objet
    init: async function () {
        grocery.init();
        form.init();
        category.init();
    },
};

document.addEventListener("DOMContentLoaded", () => app.init());
