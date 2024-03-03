<!DOCTYPE html>
<html lang="fr">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Liste de courses</title>
  <meta name="description" content="Un gestionnaire de liste de courses, pour vous aider au quotidien">
  <link rel="stylesheet" href="/assets/css/style.css">
</head>

<body>

  <header>
    <h1>Listes de courses</h1>
  </header>

  <main>
    <div>
    <div class="create-grocery-container">
      <button>nouvel article</button>
    </div>

    <div class="create-category-container">
      <button>nouvelle catégorie</button>
    </div>
    </div>
    <div class="message success create grocery" hidden>
      le nouvel article a été ajouté avec succès.
    </div>
    <div class="message success create category" hidden>
      la nouvelle catégorie a été ajoutée avec succès.
    </div>
    <div class="message success edit grocery" hidden>
      l'article a été modifié avec succès.
    </div>
    <div class="message danger edit grocery" hidden>
      l'article n'a pas pu être modifié.
    </div>
    <div class="message success delete grocery" hidden>
      le nouvel article a été supprimé avec succès.
    </div>
    <div class="message success delete category" hidden>
      la nouvelle catégorie a été supprimée avec succès.
    </div>
    <div class="message danger create grocery" hidden>
      oops, impossible d'ajouter l'article, une catégorie à lier est nécessaire.
    </div>

    <div class="message danger delete grocery" hidden>
      oops, impossible de supprimer l'article.
    </div>

    <div class="message danger create category" hidden>
      oops, impossible d'ajouter la catégorie.
    </div>

    <div class="message danger delete category" hidden>
      oops, impossible de supprimer la catégorie, vérifiez bien qu'elle ne soit plus affectée à un article.
    </div>

    <ul class="grocerylist">
    </ul>

    <ul class="categoryList">
    </ul>

    <div class="modal-dialog-grocery">
      <form class="grocery-create">
        <h2 class="form-title-grocery">nouvel article</h2>
        <label for="grocery-title" class="screen-reader-only">titre de l'article'</label>
        <input name="id" id="grocery-id" type="hidden">
        <input name="name" id="grocery-title" placeholder="titre de l'article..." type="text" required>
        <!--  créer le select pour y ajouter les options dynamiquement -->
        <select name="category" id="category">

        </select>
        <button>ajouter</button>
      </form>
    </div>


    <div class="modal-dialog-category">
        <form class="category-create">
          <h2 class="form-title-category">nouvelle catégorie</h2>
          <label for="category-title" class="screen-reader-only">titre de la catégorie</label>
          <input name="id" id="category-id" type="hidden">
          <input name="title" id="category-title" placeholder="titre de la catégorie..." type="text" required>
          <!--  créer le select pour y ajouter les options dynamiquement -->
          <button>ajouter</button>
        </form>
      </div>

      <div class="modal-dialog-grocery-update">
      <form class="grocery-update">
        <h2 class="form-title-grocery-update">Modifier un article</h2>
        <label for="grocery-update-title" class="screen-reader-only">titre de l'article'</label>
        <input name="id" id="grocery-update-id" type="hidden">
        <input name="name" id="grocery-update-title" placeholder="titre de l'article..." type="text" required>
        <!--  créer le select pour y ajouter les options dynamiquement -->
        <button>ajouter</button>
      </form>
    </div>


    <div class="modal-dialog-category-update">
        <form class="category-update">
          <h2 class="form-title-category-update">nouvelle catégorie</h2>
          <label for="category-update-title" class="screen-reader-only">titre de la catégorie</label>
          <input name="id" id="category-update-id" type="hidden">
          <input name="title" id="category-update-title" placeholder="titre de la catégorie..." type="text" required>
          <!--  créer le select pour y ajouter les options dynamiquement -->
          <button>ajouter</button>
        </form>
      </div>


  </main>
  <script type="module" src="/assets/js/app.js"></script>
</body>

</html>
