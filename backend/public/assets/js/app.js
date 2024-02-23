import form from "./form.js";
import grocery from "./grocery.js";
const app = {
    // création d'une propriété dans l'objet
    init: async function () {
        grocery.init();
        form.init();
    },
};

document.addEventListener("DOMContentLoaded", () => app.init());
