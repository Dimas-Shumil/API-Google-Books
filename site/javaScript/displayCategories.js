import { categories } from "./catalog";

export function displayCategories() {
    const categoriesList = document.querySelector(".catalog-categories");
    categories.forEach(function (category, index) {
        categoriesList.innerHTML += `<li><a href="#" onclick="window.fetchCategoryBooks(${index})">${category.title}</a></li>`;
    });
    showCountBooksInCart();
}
