const serveur = {
    url: "http://127.0.0.1:8000/api",
    getGroceries: async function () {
        try {
            const response = await fetch(`${this.url}/groceries`);
            // ! spécifié que si ma réponse n'est pas bonne je ne fais pas le response.json mais je lance une erreur
            // j'ai une 404 et je décide que 404 = erreur
            if (!response.ok) {
                throw new Error(`Fetch failed : ${response.status}`);
            }
            // ! si erreur à partir d'ici on execute plus et on va dans le catch
            // * les données pas utilisable donc je traduis en json
            const groceries = await response.json();
            // * données utilisable car on a bien "parsé les données en json"
            return groceries;
        } catch (error) {
            // * ici c'est le cas ou le fetch à "foiré" donc on throw une erreur pour la partie du code qui utilise cette fonction getgroceries
            throw new Error(error.message);
        }
    },
    // -2 faire une fonction pour le fetch delete
    deleteGrocery: async function (id) {
        try {
            // fetch fait une requete http, vers l'url en premier argument avec la method fournis en deuxieme argument
            const response = await fetch(`${this.url}/groceries/${id}`, {
                method: "DELETE",
            });
            // ! spécifié  si ma réponse n'est pas bonne
            // j'ai une 404 et je décide que 404 = erreur
            if (!response.ok) {
                throw new Error(`Fetch failed : ${response.status}`);
            }
            // ! si erreur à partir d'ici on execute plus et on va dans le catch
            // * données utilisable car on a bien "parsé les données en json"
            return response;
        } catch (error) {
            // * ici c'est le cas ou le fetch à "foiré" donc on throw une erreur pour la partie du code qui utilise cette fonction getgroceries
            throw new Error(error.message);
        }
    },
    updateGrocery: async function (id, data) {
        try {
            // fetch fait une requete http, vers l'url en premier argument avec la method fournis en deuxieme argument
            const response = await fetch(`${this.url}/groceries/${id}`, {
                method: "PATCH",
                body: data,
                headers: {
                    "Content-Type": "application/json",
                },
            });
            // ! spécifié  si ma réponse n'est pas bonne
            // j'ai une 404 et je décide que 404 = erreur
            if (!response.ok) {
                throw new Error(`Fetch failed : ${response.status}`);
            }
            // ! si erreur à partir d'ici on execute plus et on va dans le catch
            const grocery = await response.json();
            // * données utilisable car on a bien "parsé les données en json"
            return grocery;
        } catch (error) {
            // * ici c'est le cas ou le fetch à "foiré" donc on throw une erreur pour la partie du code qui utilise cette fonction getgroceries
            throw new Error(error.message);
        }
    },
    createGrocery: async function (data) {
        try {
            // fetch fait une requete http, vers l'url en premier argument avec la method fournis en deuxieme argument
            const response = await fetch(`${this.url}/groceries`, {
                method: "POST",
                body: data,
                headers: {
                    "Content-Type": "application/json",
                },
            });
                        // ! spécifié  si ma réponse n'est pas bonne
            // j'ai une 404 et je décide que 404 = erreur
            if (!response.ok) {
                throw new Error(`Fetch failed : ${response.status}`);
            }
            const grocery = await response.json();
            // ! si erreur à partir d'ici on execute plus et on va dans le catch
            // * données utilisable car on a bien "parsé les données en json"
            return grocery;
        } catch (error) {
            // * ici c'est le cas ou le fetch à "foiré" donc on throw une erreur pour la partie du code qui utilise cette fonction getgroceries
            throw new Error(error.message);
        }
    },

    getCategories: async function () {
        try {
            const response = await fetch(`${this.url}/categories`);
            // ! spécifié que si ma réponse n'est pas bonne je ne fais pas le response.json mais je lance une erreur
            // j'ai une 404 et je décide que 404 = erreur
            if (!response.ok) {
                throw new Error(`Fetch failed : ${response.status}`);
            }
            // ! si erreur à partir d'ici on execute plus et on va dans le catch
            // * les données pas utilisable donc je traduis en json
            const categories = await response.json();
            // * données utilisable car on a bien "parsé les données en json"
            return categories;
        } catch (error) {
            // * ici c'est le cas ou le fetch à "foiré" donc on throw une erreur pour la partie du code qui utilise cette fonction getgroceries
            throw new Error(error.message);
        }
    },
    deleteCategory: async function (id) {
        try {
            // fetch fait une requete http, vers l'url en premier argument avec la method fournis en deuxieme argument
            const response = await fetch(`${this.url}/categories/${id}`, {
                method: "DELETE",
            });
            // ! spécifié  si ma réponse n'est pas bonne
            // j'ai une 404 et je décide que 404 = erreur
            if (!response.ok) {
                throw new Error(`Fetch failed : ${response.status}`);
            }
            // ! si erreur à partir d'ici on execute plus et on va dans le catch
            // * données utilisable car on a bien "parsé les données en json"
            return response;
        } catch (error) {
            // * ici c'est le cas ou le fetch à "foiré" donc on throw une erreur pour la partie du code qui utilise cette fonction getgroceries
            throw new Error(error.message);
        }
    },
    createCategory: async function (data) {
        try {
            // fetch fait une requete http, vers l'url en premier argument avec la method fournis en deuxieme argument
            const response = await fetch(`${this.url}/categories`, {
                method: "POST",
                body: data,
                headers: {
                    "Content-Type": "application/json",
                },
            });
            // ! spécifié  si ma réponse n'est pas bonne
            // j'ai une 404 et je décide que 404 = erreur
            if (!response.ok) {
                throw new Error(`Fetch failed : ${response.status}`);
            }
            const category = await response.json();
            // ! si erreur à partir d'ici on execute plus et on va dans le catch
            // * données utilisable car on a bien "parsé les données en json"
            return category;
        } catch (error) {
            // * ici c'est le cas ou le fetch à "foiré" donc on throw une erreur pour la partie du code qui utilise cette fonction getgroceries
            throw new Error(error.message);
        }
    },
};

export default serveur;
