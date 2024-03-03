# ShoppingList Laravel

This is my second project in Laravel and the first one that uses an API and in a SPA form.

This is an application that allows you to create a shopping list, you can add items and categories, you can link an item to a category.
You can also edit or remove an item and remove a category.
I used Insomnia  to interact, design, debug and test the API.

This project uses:

- PHP 8.2.6
- composer version 2.6.6
- laravel 10.10
- Javascript
- Adminer
  

## Features

- Create, delete, or update an item.
- Create, delete a category.
- Display a list of items and categories, if an item is link to a category you can see it.
- Display flash-messages when something is add delete or update.

## Project status

![homepage](/backend/public/assets/img/homepage.png)

![homepage with content](/backend/public/assets/img/homepagewithcontent.png)

![new article](/backend/public/assets/img/addarticle.png)

### Done

#### Back

- [x] Composer and dependencies install
- [x] Controller and models creations (Category/Grocery)
- [x] API Rest

#### Front

- [x] Views
- [x] Fetch datas from API
- [x] Javascript forms : creation, edition, delete


## TODO

### TECH

- [ ] Refactoring folders structure

### FUNCTIONAL

- [ ] Removing the option in grocery form if no categories created + forbid the display of an item if there's no category
- [ ] Create the possibility to have several  shopping lists
